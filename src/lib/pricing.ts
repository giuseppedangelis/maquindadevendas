import { Plan, PublicSitePlanContract } from "@/services/types";

export const DEFAULT_SITE_MIN_USERS = 3;
export const DEFAULT_SITE_MAX_USERS = 20;

function roundCurrency(value: number): number {
  return Math.round(value * 100) / 100;
}

export function getCycleMonths(
  billingCycle: PublicSitePlanContract["billingCycle"] | Plan["billingCycle"],
): number {
  return billingCycle === "YEARLY" ? 12 : 6;
}

export function clampUsersByContract(
  users: number,
  contract: Pick<PublicSitePlanContract, "usersMin" | "usersMax">,
): number {
  const minUsers = Number.isFinite(contract.usersMin)
    ? contract.usersMin
    : DEFAULT_SITE_MIN_USERS;
  const maxUsers = Number.isFinite(contract.usersMax)
    ? contract.usersMax
    : DEFAULT_SITE_MAX_USERS;
  const normalizedMin = Math.min(minUsers, maxUsers);
  const normalizedMax = Math.max(minUsers, maxUsers);

  return Math.min(normalizedMax, Math.max(normalizedMin, users));
}

export function buildPlanFromContract(
  contract: PublicSitePlanContract,
  userCount: number,
): Plan {
  const normalizedUsers = clampUsersByContract(userCount, contract);
  const cycleMonths = getCycleMonths(contract.billingCycle);
  const billingCycle: Plan["billingCycle"] =
    contract.billingCycle === "YEARLY" ? "YEARLY" : "SEMESTRAL";
  const totalPrice = roundCurrency(contract.monthlyPrice * normalizedUsers * cycleMonths);

  return {
    id: contract.code,
    name:
      contract.name ??
      (contract.code === "semestral" ? "Plano Semestral" : "Plano Anual"),
    description:
      contract.description ??
      (contract.code === "semestral"
        ? "Flexibilidade para começar a organizar seu time."
        : "O melhor custo-benefício para quem busca crescimento a longo prazo."),
    monthlyPrice: contract.monthlyPrice,
    billingCycle,
    users: normalizedUsers,
    features: [],
    popular: contract.popular ?? contract.code === "anual",
    totalPrice,
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}
