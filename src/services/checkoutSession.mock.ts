import {
  CreateCheckoutSessionRequest,
  CreateCheckoutSessionResponse,
} from "./types";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const buildMockSessionId = () =>
  `sess_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

export async function createCheckoutSessionMock(
  request: CreateCheckoutSessionRequest,
): Promise<CreateCheckoutSessionResponse> {
  await sleep(550);

  // Hook simples para testar erro sem backend real.
  if (request.customer.email.toLowerCase().includes("+erro")) {
    throw new Error("Falha simulada no checkout. Ajuste o email e tente novamente.");
  }

  return {
    sessionId: buildMockSessionId(),
    status: "CREATED",
    expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
  };
}

