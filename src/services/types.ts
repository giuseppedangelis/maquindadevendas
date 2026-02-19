export type PlanCode = "semestral" | "anual";
export type PaymentMethod = "PIX" | "CREDIT_CARD";

export interface Plan {
  id: PlanCode;
  name: string;
  description: string;
  monthlyPrice: number;
  billingCycle: "SEMESTRAL" | "YEARLY";
  users: number;
  features: string[];
  popular?: boolean;
  totalPrice: number;
  discount?: number;
}

export interface CheckoutSelection {
  plan: PlanCode;
  users: number;
}

export interface CheckoutCustomer {
  name: string;
  email: string;
  cpfCnpj: string;
  mobilePhone: string;
  acceptTerms: boolean;
}

export interface CreateCheckoutSessionRequest {
  selection: CheckoutSelection;
  customer: CheckoutCustomer;
  paymentMethods: PaymentMethod[];
  source: "site";
}

export interface CreateCheckoutSessionResponse {
  sessionId: string;
  status: "CREATED" | "PENDING";
  checkoutUrl?: string;
  expiresAt?: string;
}

export interface LatestCheckoutSession {
  createdAt: string;
  request: CreateCheckoutSessionRequest;
  response: CreateCheckoutSessionResponse;
}

export interface PublicSitePlanContract {
  code: PlanCode;
  usersMin: number;
  usersMax: number;
  monthlyPrice: number;
  billingCycle: "SEMIANNUALLY" | "YEARLY";
  name?: string;
  description?: string;
  popular?: boolean;
}
