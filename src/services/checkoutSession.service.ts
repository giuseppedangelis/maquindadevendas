import {
  ActivateManagerPreviewResponse,
  ActivateManagerRequest,
  ActivateManagerResponse,
  CreateCheckoutSessionRequest,
  CreateCheckoutSessionResponse,
  CheckoutSessionDetailsResponse,
} from "./types";
import { createCheckoutSessionMock } from "./checkoutSession.mock";
import { buildSiteApiUrl, isUsingDirectPublicSiteFunction } from "./siteApi";

const IS_DIRECT_PUBLIC_SITE = isUsingDirectPublicSiteFunction();
export const PUBLIC_SITE_CHECKOUT_SESSIONS_ENDPOINT = IS_DIRECT_PUBLIC_SITE
  ? "/checkout-sessions"
  : "/public/site/checkout-sessions";
export const PUBLIC_SITE_ACTIVATE_MANAGER_ENDPOINT = IS_DIRECT_PUBLIC_SITE
  ? "/activate-manager"
  : "/public/site/activate-manager";
export const LATEST_CHECKOUT_SESSION_KEY = "checkout_session_latest_v1";

const USE_MOCK_CHECKOUT = import.meta.env.VITE_USE_MOCK_CHECKOUT === "true";
const FALLBACK_TO_MOCK_ON_ERROR =
  import.meta.env.VITE_FALLBACK_TO_MOCK === "true";

export async function createCheckoutSession(
  payload: CreateCheckoutSessionRequest,
): Promise<CreateCheckoutSessionResponse> {
  if (USE_MOCK_CHECKOUT) {
    return createCheckoutSessionMock(payload);
  }

  try {
    const response = await fetch(buildSiteApiUrl(PUBLIC_SITE_CHECKOUT_SESSIONS_ENDPOINT), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Não foi possível criar a sessão de checkout");
    }

    return response.json() as Promise<CreateCheckoutSessionResponse>;
  } catch (error) {
    if (FALLBACK_TO_MOCK_ON_ERROR) {
      return createCheckoutSessionMock(payload);
    }
    throw error;
  }
}

export async function getCheckoutSession(
  sessionId: string,
): Promise<CheckoutSessionDetailsResponse> {
  const response = await fetch(
    buildSiteApiUrl(`${PUBLIC_SITE_CHECKOUT_SESSIONS_ENDPOINT}/${encodeURIComponent(sessionId)}`),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Não foi possível consultar a sessão de checkout");
  }

  return response.json() as Promise<CheckoutSessionDetailsResponse>;
}

export async function getActivationManagerPreview(
  token: string,
): Promise<ActivateManagerPreviewResponse> {
  const response = await fetch(
    buildSiteApiUrl(`${PUBLIC_SITE_ACTIVATE_MANAGER_ENDPOINT}?token=${encodeURIComponent(token)}`),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const json = (await response.json().catch(() => ({}))) as ActivateManagerPreviewResponse;

  if (!response.ok || !json.success) {
    throw new Error(json.error || "Não foi possível carregar os dados de ativação");
  }

  return json;
}

export async function activateManager(
  payload: ActivateManagerRequest,
): Promise<ActivateManagerResponse> {
  const response = await fetch(buildSiteApiUrl(PUBLIC_SITE_ACTIVATE_MANAGER_ENDPOINT), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const json = (await response.json().catch(() => ({}))) as ActivateManagerResponse;

  if (!response.ok || !json.success) {
    throw new Error(json.error || "Não foi possível ativar sua conta");
  }

  return json;
}
