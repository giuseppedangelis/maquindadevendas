import { useFormContext } from "react-hook-form";
import { FileText, Mail, Phone, User } from "lucide-react";
import { Link } from "react-router-dom";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CheckoutFormData } from "@/lib/checkoutSchemas";
import { masks } from "@/lib/checkoutUtils";

export function CustomerForm() {
  const { control } = useFormContext<CheckoutFormData>();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Dados do Assinante</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Preencha os dados para iniciarmos sua assinatura.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          control={control}
          name="customer.name"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>Nome completo *</FormLabel>
              <div className="relative">
                <User className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                <FormControl>
                  <Input
                    className="pl-10 h-11"
                    placeholder="Seu nome completo"
                    autoComplete="name"
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="customer.email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email *</FormLabel>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                <FormControl>
                  <Input
                    className="pl-10 h-11"
                    placeholder="voce@empresa.com"
                    autoComplete="email"
                    type="email"
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="customer.mobilePhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Celular com DDD *</FormLabel>
              <div className="relative">
                <Phone className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                <FormControl>
                  <Input
                    className="pl-10 h-11"
                    placeholder="(11) 98888-9999"
                    autoComplete="tel"
                    inputMode="tel"
                    {...field}
                    onChange={(event) => field.onChange(masks.phone(event.target.value))}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="customer.cpfCnpj"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>CPF ou CNPJ *</FormLabel>
              <div className="relative">
                <FileText className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                <FormControl>
                  <Input
                    className="pl-10 h-11"
                    placeholder="000.000.000-00"
                    autoComplete="off"
                    inputMode="numeric"
                    {...field}
                    onChange={(event) => field.onChange(masks.cpfCnpj(event.target.value))}
                  />
                </FormControl>
              </div>
              <FormDescription>
                Aceitamos pessoa física (CPF) e pessoa jurídica (CNPJ).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="customer.acceptTerms"
        render={({ field }) => (
          <FormItem className="rounded-lg border border-border/50 p-4">
            <div className="flex items-start gap-3">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(Boolean(checked))}
                />
              </FormControl>
              <div className="space-y-1 leading-snug">
                <FormLabel className="cursor-pointer">
                  Li e aceito os{" "}
                  <Link to="/terms" className="text-primary hover:underline" target="_blank">
                    Termos de Uso
                  </Link>{" "}
                  e a{" "}
                  <Link to="/privacy" className="text-primary hover:underline" target="_blank">
                    Política de Privacidade
                  </Link>
                  .
                </FormLabel>
              </div>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
