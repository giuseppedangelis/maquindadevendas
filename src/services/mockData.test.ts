import { describe, expect, it } from "vitest";

import {
  calculatePlanPrice,
  findPlanById,
  getBillingCycleMultiplier,
} from "@/services/mockData";

describe("mockData pricing helpers", () => {
  it("calcula preço do plano semestral", () => {
    const plan = findPlanById("semestral", 5);

    expect(plan).not.toBeNull();
    expect(plan?.users).toBe(5);
    expect(plan?.totalPrice).toBe(117 * 5 * 6);
  });

  it("calcula preço e desconto do plano anual", () => {
    const plan = findPlanById("anual", 4);

    expect(plan).not.toBeNull();
    expect(plan?.totalPrice).toBe(97 * 4 * 12);
    expect(plan?.discount).toBeGreaterThan(0);
  });

  it("retorna null para plano inexistente", () => {
    const plan = findPlanById("inexistente" as never, 3);
    expect(plan).toBeNull();
  });

  it("retorna multiplicador correto por ciclo", () => {
    expect(getBillingCycleMultiplier("SEMESTRAL")).toBe(6);
    expect(getBillingCycleMultiplier("YEARLY")).toBe(12);
  });

  it("recalcula um plano base com novos usuários", () => {
    const base = findPlanById("anual", 3);
    expect(base).not.toBeNull();

    const updated = calculatePlanPrice(base!, 10);
    expect(updated.users).toBe(10);
    expect(updated.totalPrice).toBe(97 * 10 * 12);
  });
});
