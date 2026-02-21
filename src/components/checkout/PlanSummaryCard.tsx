import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/pricing";
import { Plan } from "@/services/types";

interface PlanSummaryCardProps {
  plan: Plan;
}

export function PlanSummaryCard({ plan }: PlanSummaryCardProps) {
  const months = plan.billingCycle === "SEMESTRAL" ? 6 : 12;
  const monthlyTotal = plan.monthlyPrice * plan.users;

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <span>Resumo do Plano</span>
          {plan.popular && (
            <Badge className="gradient-orange text-white border-0">
              Mais Econômico
            </Badge>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-semibold">{plan.name}</span>
          <span className="text-sm text-muted-foreground">{plan.users} usuários</span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Valor por usuário/mês:</span>
            <span className="font-medium">{formatCurrency(plan.monthlyPrice)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Total mensal:</span>
            <span className="font-medium">{formatCurrency(monthlyTotal)}</span>
          </div>

          <div className="flex justify-between text-lg font-bold">
            <span>Total do ciclo ({months} meses):</span>
            <span className="gradient-text">{formatCurrency(plan.totalPrice)}</span>
          </div>

          {plan.discount ? (
            <div className="text-sm text-green-500 font-semibold">
              Economia estimada de {plan.discount}% no plano anual
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
