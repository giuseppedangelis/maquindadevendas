import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import Checkout from "@/pages/Checkout";
import CheckoutSuccess from "@/pages/CheckoutSuccess";

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

const { createCheckoutSessionMock } = vi.hoisted(() => ({
  createCheckoutSessionMock: vi.fn(),
}));

vi.mock("@/services/checkoutSession.service", async () => {
  const actual = await vi.importActual<
    typeof import("@/services/checkoutSession.service")
  >("@/services/checkoutSession.service");

  return {
    ...actual,
    createCheckoutSession: createCheckoutSessionMock,
  };
});

vi.mock("@/services/pricing.service", () => ({
  getPublicSitePlans: vi.fn().mockResolvedValue(mockContracts),
}));

function PricingProbe() {
  return <div>Página de pricing</div>;
}

describe("Checkout page", () => {
  const renderWithProviders = (initialEntry: string) => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
      },
    });

    return render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[initialEntry]}>
          <Routes>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout/sucesso" element={<CheckoutSuccess />} />
            <Route path="/pricing" element={<PricingProbe />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>,
    );
  };

  beforeEach(() => {
    createCheckoutSessionMock.mockReset();
    localStorage.clear();
  });

  it("redireciona para pricing quando query é inválida", async () => {
    renderWithProviders("/checkout?plan=invalido&users=1");

    await waitFor(() => {
      expect(screen.getByText("Página de pricing")).toBeInTheDocument();
    });
  });

  it("bloqueia submit sem dados obrigatórios", async () => {
    createCheckoutSessionMock.mockResolvedValue({
      sessionId: "sess_test_1",
      status: "CREATED",
      expiresAt: new Date().toISOString(),
    });

    renderWithProviders("/checkout?plan=semestral&users=3");

    fireEvent.click(
      await screen.findByRole("button", { name: /Continuar para confirmação/i }),
    );

    await waitFor(() => {
      expect(
        screen.getByText(/Você precisa aceitar os termos para continuar/i),
      ).toBeInTheDocument();
    });
    expect(createCheckoutSessionMock).not.toHaveBeenCalled();
  });

  it("submete checkout válido e redireciona para sucesso", async () => {
    createCheckoutSessionMock.mockResolvedValue({
      sessionId: "sess_test_2",
      status: "CREATED",
      expiresAt: new Date().toISOString(),
    });

    renderWithProviders("/checkout?plan=anual&users=5");

    fireEvent.change(await screen.findByLabelText(/Nome completo/i), {
      target: { value: "Usuário Teste" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "usuario@teste.com" },
    });
    fireEvent.change(screen.getByLabelText(/Celular com DDD/i), {
      target: { value: "11988889999" },
    });
    fireEvent.change(screen.getByLabelText(/CPF ou CNPJ/i), {
      target: { value: "12345678900" },
    });

    fireEvent.click(
      screen.getByRole("checkbox", { name: /Li e aceito os/i }),
    );
    fireEvent.click(
      screen.getByRole("button", { name: /Continuar para confirmação/i }),
    );

    await waitFor(() => {
      expect(createCheckoutSessionMock).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(
        screen.getByText(/Assinatura iniciada com sucesso/i),
      ).toBeInTheDocument();
    });
  });
});
