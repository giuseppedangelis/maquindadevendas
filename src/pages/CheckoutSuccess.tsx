import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { CheckCircle2, Copy, Home, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  LATEST_CHECKOUT_SESSION_KEY,
} from "@/services/checkoutSession.service";
import { LatestCheckoutSession } from "@/services/types";

const CheckoutSuccess = () => {
  const location = useLocation();
  const { toast } = useToast();

  const latestSession = useMemo(() => {
    const state = location.state as LatestCheckoutSession | undefined;
    if (state) {
      return state;
    }

    const local = localStorage.getItem(LATEST_CHECKOUT_SESSION_KEY);
    if (!local) {
      return null;
    }

    try {
      return JSON.parse(local) as LatestCheckoutSession;
    } catch {
      return null;
    }
  }, [location.state]);

  if (!latestSession) {
    return (
      <main className="pt-16 lg:pt-20 min-h-screen bg-background">
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
            <Card className="border-border/50">
              <CardContent className="p-8 text-center space-y-4">
                <h1 className="text-2xl font-bold">Sessão não encontrada</h1>
                <p className="text-muted-foreground">
                  Não encontramos uma sessão recente de checkout.
                </p>
                <Button asChild className="gradient-orange">
                  <Link to="/pricing">Voltar para Comece Agora</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    );
  }

  const copySessionId = async () => {
    try {
      await navigator.clipboard.writeText(latestSession.response.sessionId);
      toast({
        title: "ID copiado",
        description: "Session ID copiado para a área de transferência.",
      });
    } catch {
      toast({
        title: "Falha ao copiar",
        description: "Não foi possível copiar o ID da sessão.",
        variant: "destructive",
      });
    }
  };

  return (
    <main className="pt-16 lg:pt-20 min-h-screen bg-background">
      <section className="py-14 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 max-w-3xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="space-y-6"
          >
            <Card className="border-border/50">
              <CardHeader className="pb-0">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <CheckCircle2 className="w-7 h-7 text-green-500" />
                  Assinatura iniciada com sucesso
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6 pt-6">
                <p className="text-muted-foreground">
                  Recebemos sua solicitação. O próximo passo é concluir o pagamento
                  quando a integração real com Asaas estiver ativa.
                </p>

                <div className="rounded-lg border border-border/50 p-4 space-y-3 bg-card/40">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm text-muted-foreground">Session ID</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={copySessionId}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copiar
                    </Button>
                  </div>
                  <code className="break-all text-sm">{latestSession.response.sessionId}</code>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="rounded-lg border border-border/50 p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      Plano
                    </p>
                    <p className="font-semibold capitalize">
                      {latestSession.request.selection.plan}
                    </p>
                  </div>

                  <div className="rounded-lg border border-border/50 p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      Usuários
                    </p>
                    <p className="font-semibold">{latestSession.request.selection.users}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button asChild className="gradient-orange">
                    <Link to="/pricing">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Voltar para planos
                    </Link>
                  </Button>

                  <Button asChild variant="outline">
                    <Link to="/">
                      <Home className="w-4 h-4 mr-2" />
                      Ir para início
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default CheckoutSuccess;

