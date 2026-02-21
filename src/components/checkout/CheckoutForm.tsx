import { useEffect, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import {
  checkoutFormSchema,
  CheckoutFormData,
} from "@/lib/checkoutSchemas";
import { useToast } from "@/hooks/use-toast";
import { createCheckoutSession } from "@/services/checkoutSession.service";
import {
  CreateCheckoutSessionRequest,
  CreateCheckoutSessionResponse,
  Plan,
  PlanCode,
} from "@/services/types";

import { CustomerForm } from "./CustomerForm";
import { PaymentMethodSelector } from "./PaymentMethodSelector";
import { PlanSummaryCard } from "./PlanSummaryCard";

const CHECKOUT_PROGRESS_KEY = "checkout_form_progress_v1";

interface CheckoutFormProps {
  plan: Plan;
  users: number;
  onSuccess: (
    response: CreateCheckoutSessionResponse,
    request: CreateCheckoutSessionRequest,
  ) => void;
}

interface CheckoutProgressStorage {
  plan: PlanCode;
  users: number;
  values: CheckoutFormData;
}

export function CheckoutForm({ plan, users, onSuccess }: CheckoutFormProps) {
  const { toast } = useToast();

  const defaultValues = useMemo<CheckoutFormData>(
    () => ({
      selection: {
        plan: plan.id,
        users,
      },
      customer: {
        name: "",
        email: "",
        cpfCnpj: "",
        mobilePhone: "",
        acceptTerms: false,
      },
      paymentMethods: ["PIX", "CREDIT_CARD"],
      source: "site",
    }),
    [plan.id, users],
  );

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const { isSubmitting } = form.formState;

  useEffect(() => {
    const raw = localStorage.getItem(CHECKOUT_PROGRESS_KEY);
    if (!raw) {
      return;
    }

    try {
      const parsed = JSON.parse(raw) as CheckoutProgressStorage;
      if (parsed.plan === plan.id && parsed.users === users) {
        form.reset(parsed.values);
      }
    } catch {
      // Ignora payload inválido e segue com valores padrão.
    }
  }, [form, plan.id, users]);

  useEffect(() => {
    const subscription = form.watch((currentValues) => {
      const payload: CheckoutProgressStorage = {
        plan: plan.id,
        users,
        values: {
          ...defaultValues,
          ...currentValues,
          selection: {
            plan: plan.id,
            users,
          },
          source: "site",
        },
      };

      localStorage.setItem(CHECKOUT_PROGRESS_KEY, JSON.stringify(payload));
    });

    return () => subscription.unsubscribe();
  }, [defaultValues, form, plan.id, users]);

  const handleSubmit = async (values: CheckoutFormData) => {
    const payload: CreateCheckoutSessionRequest = {
      selection: values.selection,
      customer: values.customer,
      paymentMethods: values.paymentMethods,
      source: "site",
    };

    try {
      const response = await createCheckoutSession(payload);
      localStorage.removeItem(CHECKOUT_PROGRESS_KEY);

      toast({
        title: "Checkout iniciado",
        description: "Geramos sua sessão de assinatura com sucesso.",
      });

      onSuccess(response, payload);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Não foi possível iniciar sua assinatura. Tente novamente.";

      toast({
        title: "Erro ao iniciar assinatura",
        description: message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <Card className="border-border/50">
        <CardContent className="p-5 sm:p-6 lg:p-8">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-8"
              noValidate
            >
              <CustomerForm />
              <PaymentMethodSelector />

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="border-t border-border/50 pt-6 flex flex-col gap-4"
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="lg"
                  className="w-full h-11 gradient-orange glow-orange hover:scale-[1.01] transition-transform"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Criando checkout...
                    </>
                  ) : (
                    "Continuar para confirmação"
                  )}
                </Button>

                <div className="text-xs text-muted-foreground flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                  Sem captura de cartão no site nesta fase.
                </div>
              </motion.div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="space-y-6 lg:sticky lg:top-24 h-fit">
        <PlanSummaryCard plan={plan} />
      </div>
    </div>
  );
}

