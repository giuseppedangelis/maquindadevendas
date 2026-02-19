import {
  CreateCheckoutSessionRequest,
  CreateCheckoutSessionResponse,
} from "./types";
import { createCheckoutSessionMock } from "./checkoutSession.mock";
import { buildSiteApiUrl } from "./siteApi";

export const PUBLIC_SITE_CHECKOUT_SESSIONS_ENDPOINT = "/public/site/checkout-sessions";
export const LATEST_CHECKOUT_SESSION_KEY = "checkout_session_latest_v1";

const USE_MOCK_CHECKOUT = import.meta.env.VITE_USE_MOCK_CHECKOUT === "true";
const FALLBACK_TO_MOCK_ON_ERROR =
  import.meta.env.VITE_FALLBACK_TO_MOCK !== "false";

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
