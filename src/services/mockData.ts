import { Plan, PlanCode, PublicSitePlanContract } from "./types";

// Dados mock dos planos alinhados com valores existentes no Pricing
const defaultFeatures = [
  "Gestão da Rotina Comercial",
  "Dashboard em Tempo Real",
  "Ranking de Vendedores",
  "Definição de Metas",
  "Alertas e Notificações",
  "Biblioteca de Mensagens",
  "Relatórios de Adesão ao Método",
  "Suporte Técnico",
  "Atualizações Constantes",
];

export const mockPlans: Plan[] = [
  {
    id: "semestral",
    name: "Plano Semestral",
    description: "Flexibilidade para começar a organizar seu time.",
    monthlyPrice: 117,
    billingCycle: "SEMESTRAL",
    users: 3, // mínimo
    features: defaultFeatures,
    popular: false,
    totalPrice: 702, // 117 * 6 meses
  },
  {
    id: "anual",
    name: "Plano Anual",
    description: "O melhor custo-benefício para quem busca crescimento a longo prazo.",
    monthlyPrice: 97,
    billingCycle: "YEARLY",
    users: 3, // mínimo
    features: defaultFeatures,
    popular: true,
    totalPrice: 1164, // 97 * 12 meses
    discount: 20, // economia de R$20/mês em relação ao semestral
  },
];

export const mockPublicSitePlanContracts: PublicSitePlanContract[] = [
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
];

// Função para calcular preço total baseado em número de usuários
export const calculatePlanPrice = (plan: Plan, userCount: number): Plan => {
  const totalPrice = plan.monthlyPrice * userCount * getBillingCycleMultiplier(plan.billingCycle);
  const annualReference = 117 * userCount * 12;

  return {
    ...plan,
    users: userCount,
    totalPrice,
    // Calcular desconto se for plano anual em comparação com semestral
    ...(plan.billingCycle === "YEARLY"
      ? {
          discount: Math.round(((annualReference - totalPrice) / annualReference) * 100),
        }
      : {}),
  };
};

export const buildPlanFromContract = (
  contract: PublicSitePlanContract,
  userCount: number,
): Plan => {
  const normalizedUsers = Math.max(
    contract.usersMin,
    Math.min(contract.usersMax, userCount),
  );

  const template: Plan = {
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
    billingCycle: contract.billingCycle === "SEMIANNUALLY" ? "SEMESTRAL" : "YEARLY",
    users: normalizedUsers,
    features: defaultFeatures,
    popular: contract.popular ?? contract.code === "anual",
    totalPrice: 0,
  };

  return calculatePlanPrice(template, normalizedUsers);
};

// Obter multiplicador baseado no ciclo de cobrança
export const getBillingCycleMultiplier = (billingCycle: Plan['billingCycle']): number => {
  switch (billingCycle) {
    case "SEMESTRAL":
      return 6;
    case "YEARLY":
      return 12;
    default: return 1;
  }
};

// Encontrar plano por ID
export const findPlanById = (planId: PlanCode, userCount: number = 3): Plan | null => {
  const contract = mockPublicSitePlanContracts.find((plan) => plan.code === planId);
  if (!contract) return null;

  return buildPlanFromContract(contract, userCount);
};

// Formatar valor para moeda brasileira
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

// Gerar ID de pedido único (mock)
export const generateOrderId = (): string => {
  return `ORDER_${Date.now()}_${Math.random().toString(36).slice(2, 11).toUpperCase()}`;
};
