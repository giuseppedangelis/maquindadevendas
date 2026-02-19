import { fireEvent, render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";

import Pricing from "@/pages/Pricing";

const { mockContracts } = vi.hoisted(() => ({
  mockContracts: [
    {
      code: "semestral",
      usersMin: 3,
      usersMax: 20,
      monthlyPrice: 117,
      billingCycle: "SEMIANNUALLY",
      name: "Plano Semestral",
      description: "Flexibilidade para começar a organizar seu time.",
      popular: false,
    },
    {
      code: "anual",
      usersMin: 3,
      usersMax: 20,
      monthlyPrice: 97,
      billingCycle: "YEARLY",
      name: "Plano Anual",
      description: "O melhor custo-benefício para quem busca crescimento a longo prazo.",
      popular: true,
    },
  ],
}));

vi.mock("@/services/pricing.service", () => ({
  getPublicSitePlans: vi.fn().mockResolvedValue(mockContracts),
}));

function CheckoutRouteProbe() {
  const location = useLocation();
  return <div data-testid="checkout-location">{`${location.pathname}${location.search}`}</div>;
}

describe("Pricing page", () => {
  it("envia para checkout com plano e usuários na query", async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
      },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/pricing"]}>
          <Routes>
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/checkout" element={<CheckoutRouteProbe />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>,
    );

    fireEvent.click(
      await screen.findByRole("button", { name: /Contratar Plano Semestral/i }),
    );

    expect(screen.getByTestId("checkout-location")).toHaveTextContent(
      "/checkout?plan=semestral&users=3",
    );
  });
});
