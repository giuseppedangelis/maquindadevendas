import { z } from "zod";

const paymentMethodSchema = z.enum(["PIX", "CREDIT_CARD"]);

export const checkoutSelectionSchema = z.object({
  plan: z.enum(["semestral", "anual"]),
  users: z.number().int().min(3, "O mínimo é 3 usuários").max(20, "O máximo é 20 usuários"),
});

export const checkoutCustomerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  email: z.string().trim().email("Email inválido").max(255, "Email muito longo"),
  cpfCnpj: z
    .string()
    .trim()
    .refine((value) => {
      const digits = value.replace(/\D/g, "");
      return digits.length === 11 || digits.length === 14;
    }, "CPF ou CNPJ inválido"),
  mobilePhone: z
    .string()
    .trim()
    .refine((value) => {
      const digits = value.replace(/\D/g, "");
      return digits.length >= 10 && digits.length <= 11;
    }, "Celular com DDD inválido"),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "Você precisa aceitar os termos para continuar" }),
  }),
});

export const checkoutFormSchema = z.object({
  selection: checkoutSelectionSchema,
  customer: checkoutCustomerSchema,
  paymentMethods: z
    .array(paymentMethodSchema)
    .min(1, "Selecione ao menos um método de pagamento"),
  source: z.literal("site"),
});

export type CheckoutSelectionFormData = z.infer<typeof checkoutSelectionSchema>;
export type CheckoutCustomerFormData = z.infer<typeof checkoutCustomerSchema>;
export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;

