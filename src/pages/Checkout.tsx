import { useEffect, useMemo } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import {
  LATEST_CHECKOUT_SESSION_KEY,
} from "@/services/checkoutSession.service";
import { buildPlanFromContract } from "@/lib/pricing";
import { getPublicSitePlans } from "@/services/pricing.service";
import {
  CreateCheckoutSessionRequest,
  CreateCheckoutSessionResponse,
  LatestCheckoutSession,
  PlanCode,
} from "@/services/types";

const MIN_USERS = 3;
const MAX_USERS = 20;

function parsePlan(value: string | null): PlanCode | null {
  if (value === "semestral" || value === "anual") {
    return value;
  }

  return null;
}

function parseUsers(value: string | null): number | null {
  const users = Number(value);
  if (Number.isNaN(users) || !Number.isInteger(users)) {
    return null;
  }
  if (users < MIN_USERS || users > MAX_USERS) {
    return null;
  }
  return users;
}

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { data: contracts, isLoading } = useQuery({
    queryKey: ["public-site-plans"],
    queryFn: getPublicSitePlans,
    staleTime: 60 * 1000,
  });

  const selectedPlan = parsePlan(searchParams.get("plan"));
  const selectedUsers = parseUsers(searchParams.get("users"));

  const plan = useMemo(() => {
    if (!selectedPlan || !selectedUsers) {
      return null;
    }

    const contract = contracts?.find((item) => item.code === selectedPlan);
    if (!contract) {
      return null;
    }

    return buildPlanFromContract(contract, selectedUsers);
  }, [contracts, selectedPlan, selectedUsers]);

  useEffect(() => {
    if (!selectedPlan || !selectedUsers) {
      navigate("/pricing", { replace: true });
    }
    if (!isLoading && !plan) {
      navigate("/pricing", { replace: true });
    }
  }, [isLoading, navigate, plan, selectedPlan, selectedUsers]);

  const handleSuccess = (
    response: CreateCheckoutSessionResponse,
    request: CreateCheckoutSessionRequest,
  ) => {
    const latestSession: LatestCheckoutSession = {
      createdAt: new Date().toISOString(),
      request,
      response,
    };

    localStorage.setItem(LATEST_CHECKOUT_SESSION_KEY, JSON.stringify(latestSession));
    navigate("/checkout/sucesso", { state: latestSession });
  };

  if (isLoading) {
    return (
      <main className="pt-16 lg:pt-20 min-h-screen bg-background">
        <section className="py-24">
          <div className="container mx-auto px-4 lg:px-8 flex items-center justify-center">
            <div className="inline-flex items-center gap-3 text-muted-foreground">
              <Loader2 className="w-5 h-5 animate-spin" />
              Carregando preços do sistema...
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (!plan || !selectedUsers) {
    return null;
  }

  return (
    <main className="pt-16 lg:pt-20 min-h-screen bg-background">
      <section className="py-14 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="space-y-4"
          >
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para Comece Agora
            </Link>

            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black">
                <span className="gradient-text text-glow">Checkout de Assinatura</span>
              </h1>
              <p className="text-gray-text mt-3 max-w-2xl">
                Você está contratando {plan.name} para {selectedUsers} usuários.
                Preencha os dados para gerar sua sessão de checkout.
              </p>
            </div>
          </motion.div>

          <CheckoutForm plan={plan} users={selectedUsers} onSuccess={handleSuccess} />
        </div>
      </section>
    </main>
  );
};

export default Checkout;
