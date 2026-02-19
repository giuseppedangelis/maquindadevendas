import { PlanCode, PublicSitePlanContract } from "./types";
import { buildSiteApiUrl } from "./siteApi";

export const PUBLIC_SITE_PLANS_ENDPOINT = "/public/site/plans";
const SUPABASE_SITE_PLAN_PRICING_QUERY =
  "/rest/v1/site_plan_pricing?select=plan_code,label,cycle_months,unit_price_monthly,min_users,max_users,active&active=eq.true&order=cycle_months.asc";
const ENABLE_SUPABASE_FALLBACK =
  import.meta.env.VITE_FALLBACK_TO_SUPABASE_PLANS !== "false";

type UnknownPlanRecord = Record<string, unknown>;

const isPlanCode = (value: unknown): value is PlanCode =>
  value === "semestral" || value === "anual";

const parsePositiveInt = (value: unknown, fallback: number) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(1, Math.floor(parsed));
};

const parsePositiveNumber = (value: unknown, fallback: number) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }
  return parsed;
};

function normalizeBillingCycle(
  value: unknown,
): "SEMIANNUALLY" | "YEARLY" | null {
  if (value === "YEARLY" || value === 12 || value === "12") {
    return "YEARLY";
  }

  if (value === "SEMIANNUALLY" || value === 6 || value === "6") {
    return "SEMIANNUALLY";
  }

  return null;
}

function normalizeContract(record: UnknownPlanRecord): PublicSitePlanContract | null {
  const code =
    record.code ??
    record.plan ??
    record.planCode ??
    record.plan_code ??
    record.id;

  if (!isPlanCode(code)) {
    return null;
  }

  const billingCycle = normalizeBillingCycle(
    record.billingCycle ?? record.billing_cycle ?? record.cycleMonths ?? record.cycle_months,
  );

  if (!billingCycle) {
    return null;
  }

  const monthlyPrice = parsePositiveNumber(
    record.monthlyPrice ??
      record.monthly_price ??
      record.unitPriceMonthly ??
      record.unit_price_monthly,
    NaN,
  );

  if (!Number.isFinite(monthlyPrice) || monthlyPrice <= 0) {
    return null;
  }

  const usersMin = parsePositiveInt(
    record.usersMin ?? record.minUsers ?? record.min_users,
    3,
  );
  const usersMax = parsePositiveInt(
    record.usersMax ?? record.maxUsers ?? record.max_users,
    20,
  );

  return {
    code,
    usersMin: Math.min(usersMin, usersMax),
    usersMax: Math.max(usersMin, usersMax),
    monthlyPrice,
    billingCycle,
    name:
      typeof record.name === "string"
        ? record.name
        : typeof record.label === "string"
          ? record.label
          : undefined,
    description:
      typeof record.description === "string" ? record.description : undefined,
    popular: typeof record.popular === "boolean" ? record.popular : undefined,
  };
}

function extractContracts(payload: unknown): PublicSitePlanContract[] {
  if (Array.isArray(payload)) {
    return payload
      .map((entry) =>
        typeof entry === "object" && entry !== null
          ? normalizeContract(entry as UnknownPlanRecord)
          : null,
      )
      .filter((entry): entry is PublicSitePlanContract => Boolean(entry));
  }

  if (typeof payload === "object" && payload !== null) {
    const plans = (payload as UnknownPlanRecord).plans;
    if (Array.isArray(plans)) {
      return extractContracts(plans);
    }
  }

  return [];
}

async function fetchContractsFromEndpoint(
  endpoint: string,
  init: RequestInit,
): Promise<PublicSitePlanContract[]> {
  const response = await fetch(endpoint, init);

  if (!response.ok) {
    throw new Error(`Falha ao buscar planos públicos (${response.status})`);
  }

  const payload = (await response.json()) as unknown;
  const contracts = extractContracts(payload);

  if (!contracts.length) {
    throw new Error("Resposta de planos vazia ou inválida");
  }

  return contracts;
}

async function fetchContractsFromSupabase(): Promise<PublicSitePlanContract[]> {
  const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL ?? "").trim();
  const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY ?? "").trim();

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase não configurado para fallback de planos");
  }

  return fetchContractsFromEndpoint(
    `${supabaseUrl}${SUPABASE_SITE_PLAN_PRICING_QUERY}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
    },
  );
}

export async function getPublicSitePlans(): Promise<PublicSitePlanContract[]> {
  try {
    return await fetchContractsFromEndpoint(buildSiteApiUrl(PUBLIC_SITE_PLANS_ENDPOINT), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (apiError) {
    if (!ENABLE_SUPABASE_FALLBACK) {
      throw apiError;
    }

    try {
      return await fetchContractsFromSupabase();
    } catch (supabaseError) {
      const apiMessage =
        apiError instanceof Error ? apiError.message : "erro desconhecido";
      const supabaseMessage =
        supabaseError instanceof Error ? supabaseError.message : "erro desconhecido";

      throw new Error(
        `Falha ao buscar planos públicos (api: ${apiMessage}; supabase: ${supabaseMessage})`,
      );
    }
  }
}
