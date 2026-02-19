import { useFormContext } from "react-hook-form";
import { CreditCard, Smartphone } from "lucide-react";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckoutFormData } from "@/lib/checkoutSchemas";

const options = [
  {
    id: "PIX" as const,
    title: "PIX",
    description: "Pagamento imediato no checkout seguro.",
    icon: Smartphone,
  },
  {
    id: "CREDIT_CARD" as const,
    title: "Cartão de Crédito",
    description: "Cobrança no ambiente seguro do Asaas (fase 2).",
    icon: CreditCard,
  },
];

export function PaymentMethodSelector() {
  const { control } = useFormContext<CheckoutFormData>();

  return (
    <FormField
      control={control}
      name="paymentMethods"
      render={() => (
        <FormItem className="space-y-4">
          <FormLabel className="text-base">Métodos de pagamento disponíveis</FormLabel>
          <FormDescription>
            Nesta fase, só habilitamos os métodos. A captura do pagamento ocorre na
            integração real com o Asaas.
          </FormDescription>

          <div className="grid gap-3 sm:grid-cols-2">
            {options.map((option) => (
              <FormField
                key={option.id}
                control={control}
                name="paymentMethods"
                render={({ field }) => {
                  const isChecked = field.value?.includes(option.id);
                  const Icon = option.icon;

                  return (
                    <FormItem className="border border-border/50 rounded-lg p-4 card-hover">
                      <div className="flex items-start gap-3">
                        <FormControl>
                          <Checkbox
                            checked={isChecked}
                            onCheckedChange={(checked) => {
                              const currentValues = field.value ?? [];
                              const nextValues = checked
                                ? [...currentValues, option.id]
                                : currentValues.filter((value) => value !== option.id);
                              field.onChange(nextValues);
                            }}
                          />
                        </FormControl>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4 text-primary" />
                            <span className="font-medium">{option.title}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{option.description}</p>
                        </div>
                      </div>
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

