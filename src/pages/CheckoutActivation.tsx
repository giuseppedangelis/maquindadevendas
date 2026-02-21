import { FormEvent, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CheckCircle2, Loader2, Lock, Shuffle, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { activateManager, getActivationManagerPreview } from "@/services/checkoutSession.service";
import { buildSiteApiUrl } from "@/services/siteApi";

function getPasswordStrength(password: string): { level: number; label: string; barClass: string } {
  if (!password) return { level: 0, label: "", barClass: "bg-transparent" };

  let strength = 0;
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  if (strength <= 1) return { level: 1, label: "Fraca",  barClass: "bg-red-500" };
  if (strength <= 3) return { level: 2, label: "Média",  barClass: "bg-yellow-500" };
  if (strength <= 4) return { level: 3, label: "Boa",    barClass: "bg-blue-500" };
  return              { level: 4, label: "Forte", barClass: "bg-green-500" };
}

function generatePassword(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789@#$%&*";
  let result = "";
  for (let i = 0; i < 12; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
  return result;
}

const CheckoutActivation = () => {
  const [searchParams] = useSearchParams();
  const [password, setPassword]               = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage]       = useState("");
  const [isSubmitting, setIsSubmitting]       = useState(false);
  const [sendInvite, setSendInvite]           = useState(true);
  const [isActivated, setIsActivated]         = useState(false);
  const [isLoadingCustomer, setIsLoadingCustomer] = useState(false);
  const [emailStatus, setEmailStatus]         = useState<"sent" | "failed" | null>(null);

  const [checkoutName,  setCheckoutName]  = useState("");
  const [checkoutEmail, setCheckoutEmail] = useState("");
  const [checkoutPhone, setCheckoutPhone] = useState("");

  const token = useMemo(() => searchParams.get("token") || "", [searchParams]);
  const passwordStrength = getPasswordStrength(password);

  useEffect(() => {
    const loadPreview = async () => {
      if (!token) return;
      try {
        setIsLoadingCustomer(true);
        const response = await getActivationManagerPreview(token);
        setCheckoutName(response.customer?.name   || "");
        setCheckoutEmail(response.customer?.email || "");
        setCheckoutPhone(response.customer?.mobilePhone || "");
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : "Não foi possível carregar dados de ativação.");
      } finally {
        setIsLoadingCustomer(false);
      }
    };
    loadPreview();
  }, [token]);

  const handleGeneratePassword = () => {
    const next = generatePassword();
    setPassword(next);
    setConfirmPassword(next);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    if (!token) { setErrorMessage("Token de ativação inválido."); return; }
    if (password.length < 6) { setErrorMessage("A senha deve ter no mínimo 6 caracteres."); return; }
    if (password !== confirmPassword) { setErrorMessage("A confirmação de senha não confere."); return; }

    setIsSubmitting(true);
    try {
      await activateManager({ token, password, sendInvite });

      // Dispara o email de boas-vindas se a flag estiver marcada
      if (sendInvite && checkoutEmail) {
        try {
          const emailRes = await fetch(buildSiteApiUrl("/send-welcome-email"), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: checkoutEmail,
              name: checkoutName,
              password,       // senha que o próprio usuário definiu
              role: "GESTOR",
              link: import.meta.env.VITE_SYSTEM_LOGIN_URL || window.location.origin,
            }),
          });
          setEmailStatus(emailRes.ok ? "sent" : "failed");
        } catch {
          setEmailStatus("failed");
        }
      }

      setIsActivated(true);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Não foi possível ativar sua conta.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-16 lg:pt-20 min-h-screen bg-background">
      <section className="py-14 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
          <Card className="border-[#2d2d2d] bg-[#121212] text-white shadow-2xl">
            <CardHeader className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#FF6B35] bg-[#FF6B35]/10 border border-[#FF6B35]/30 rounded-full px-3 py-1 w-fit">
                <Shield className="w-3.5 h-3.5" />
                Ativação de Gestor
              </div>
              <CardTitle className="text-2xl font-bold">Finalizar Cadastro</CardTitle>
              <p className="text-sm text-gray-400">
                Defina sua credencial de acesso. O cadastro da empresa será feito no primeiro acesso ao sistema.
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              {!token && (
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
                  Token inválido ou ausente. Solicite um novo link de ativação.
                </div>
              )}

              {isActivated ? (
                <div className="space-y-4">
                  <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-green-300 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    Conta ativada com sucesso.
                  </div>

                  {emailStatus === "sent" && (
                    <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-3 text-sm text-blue-300">
                      ✉️ Email de boas-vindas enviado para <strong>{checkoutEmail}</strong>.
                    </div>
                  )}
                  {emailStatus === "failed" && (
                    <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-3 text-sm text-yellow-300">
                      ⚠️ Conta ativada, mas não foi possível enviar o email de boas-vindas.
                    </div>
                  )}

                  <p className="text-sm text-gray-300">
                    Seu acesso gestor já foi criado. Agora você pode entrar no sistema.
                  </p>
                  <Button asChild className="gradient-orange w-full text-white font-semibold">
                    <a href={import.meta.env.VITE_SYSTEM_LOGIN_URL}>Ir para o início</a>
                  </Button>
                </div>
              ) : (
                <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                  {/* Nome */}
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-300">Nome Completo</label>
                    <input
                      type="text"
                      value={checkoutName}
                      placeholder={isLoadingCustomer ? "Carregando..." : ""}
                      readOnly
                      className="w-full px-4 py-3 rounded-lg border-2 font-medium transition-all bg-[#0a0a0a] border-[#262626] text-white placeholder-gray-500"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-300">Email</label>
                    <input
                      type="email"
                      value={checkoutEmail}
                      placeholder={isLoadingCustomer ? "Carregando..." : ""}
                      readOnly
                      className="w-full px-4 py-3 rounded-lg border-2 font-medium transition-all bg-[#0a0a0a] border-[#262626] text-white placeholder-gray-500"
                    />
                  </div>

                  {/* Telefone */}
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-300">Telefone</label>
                    <input
                      type="tel"
                      value={checkoutPhone}
                      placeholder={isLoadingCustomer ? "Carregando..." : ""}
                      readOnly
                      className="w-full px-4 py-3 rounded-lg border-2 font-medium transition-all bg-[#0a0a0a] border-[#262626] text-white placeholder-gray-500"
                    />
                  </div>

                  {/* Senha */}
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-300">Senha</label>
                    <div className="flex gap-2">
                      <div className="flex-1 relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Mínimo de 6 caracteres"
                          className="w-full pl-11 pr-4 py-3 rounded-lg border-2 font-mono text-sm transition-all bg-[#0a0a0a] border-[#262626] text-white placeholder-gray-500 focus:border-[#FF6B35]"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleGeneratePassword}
                        className="px-4 py-3 bg-[#FF6B35] hover:bg-[#ff5722] text-white font-semibold rounded-lg transition-all flex items-center gap-2 whitespace-nowrap"
                      >
                        <Shuffle className="w-5 h-5" />
                        Gerar Senha
                      </button>
                    </div>

                    {password && (
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="h-2 flex-1 rounded-full overflow-hidden bg-[#262626]">
                            <div
                              className={`h-full ${passwordStrength.barClass} transition-all duration-300`}
                              style={{ width: `${(passwordStrength.level / 4) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs font-semibold text-gray-300">{passwordStrength.label}</span>
                        </div>
                        <p className="text-xs text-gray-500">
                          Use letras maiúsculas, minúsculas, números e caracteres especiais (@#$%&*)
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Confirmar senha */}
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-2 text-gray-300">
                      Confirmar senha
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repita a senha"
                      className="w-full px-4 py-3 rounded-lg border-2 font-medium transition-all bg-[#0a0a0a] border-[#262626] text-white placeholder-gray-500 focus:border-[#FF6B35]"
                    />
                  </div>

                  {/* Flag enviar email */}
                  <div className="rounded-lg p-4 border-2 bg-[#0a0a0a] border-[#262626]">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={sendInvite}
                        onChange={(e) => setSendInvite(e.target.checked)}
                        className="mt-1 w-5 h-5 rounded border-2 border-[#FF6B35] text-[#FF6B35] focus:ring-[#FF6B35] cursor-pointer"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-white">
                          Enviar email com credenciais de acesso
                        </p>
                        <p className="text-xs mt-1 text-gray-400">
                          Um email de boas-vindas será enviado para{" "}
                          <strong>{checkoutEmail || "o usuário"}</strong> com login e senha.
                        </p>
                      </div>
                    </label>
                  </div>

                  {errorMessage && (
                    <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
                      {errorMessage}
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="gradient-orange w-full text-white font-semibold"
                    disabled={!token || isSubmitting || isLoadingCustomer}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Ativando...
                      </>
                    ) : "Ativar conta"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default CheckoutActivation;