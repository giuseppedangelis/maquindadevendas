import { describe, expect, it } from "vitest";

import { checkoutFormSchema } from "@/lib/checkoutSchemas";

const validPayload = {
  selection: {
    plan: "anual" as const,
    users: 5,
  },
  customer: {
    name: "Teste Usuário",
    email: "teste@maquinadevendas.com",
    cpfCnpj: "123.456.789-00",
    mobilePhone: "(11) 98888-9999",
    acceptTerms: true as const,
  },
  paymentMethods: ["PIX", "CREDIT_CARD"] as const,
  source: "site" as const,
};

describe("checkoutFormSchema", () => {
  it("aceita payload válido", () => {
    const result = checkoutFormSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it("rejeita sem aceite de termos", () => {
    const result = checkoutFormSchema.safeParse({
      ...validPayload,
      customer: {
        ...validPayload.customer,
        acceptTerms: false,
      },
    });

    expect(result.success).toBe(false);
  });

  it("rejeita menos de 3 usuários", () => {
    const result = checkoutFormSchema.safeParse({
      ...validPayload,
      selection: {
        ...validPayload.selection,
        users: 2,
      },
    });

    expect(result.success).toBe(false);
  });

  it("rejeita sem métodos de pagamento", () => {
    const result = checkoutFormSchema.safeParse({
      ...validPayload,
      paymentMethods: [],
    });

    expect(result.success).toBe(false);
  });
});

