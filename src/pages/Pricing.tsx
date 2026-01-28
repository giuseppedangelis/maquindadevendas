import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, Users, TrendingUp, Shield, Zap, AlertCircle, Phone, Clock, BarChart3, MessageSquare, FileText, HelpCircle, HeadphonesIcon, RefreshCw, Target } from "lucide-react";

const Pricing = () => {
  const [userCount, setUserCount] = useState([3]);

  // Preços base por usuário
  const monthlyPriceSemestral = 117;
  const monthlyPriceAnual = 97;

  // Cálculo dos valores totais
  const semestralTotal = userCount[0] * monthlyPriceSemestral;
  const anualTotal = userCount[0] * monthlyPriceAnual;

  // Funcionalidades
  const features = [
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: "Gestão da Rotina Comercial",
      description: "Acompanhe os 4 momentos do dia que garantem a performance do seu time."
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: "Dashboard em Tempo Real",
      description: "Tenha uma visão clara dos KPIs mais importantes (Meta, Realizado, Projeção, % Atingido) e tome decisões baseadas em dados, não em achismos."
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Ranking de Vendedores",
      description: "Crie uma cultura de competição saudável e meritocracia, reconhecendo quem realmente performa."
    },
    {
      icon: <Target className="w-5 h-5" />,
      title: "Definição de Metas",
      description: "Desdobre a meta do mês em metas diárias e individuais para todo o time, deixando claro o que se espera de cada um."
    },
    {
      icon: <AlertCircle className="w-5 h-5" />,
      title: "Alertas e Notificações",
      description: "Receba avisos sobre o desempenho do time e tome ações rápidas antes que seja tarde demais."
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      title: "Biblioteca de Mensagens",
      description: "Pare de improvisar. Use mensagens prontas para motivar, engajar e treinar seu time via WhatsApp."
    },
    {
      icon: <FileText className="w-5 h-5" />,
      title: "Relatórios de Adesão ao Método",
      description: "Veja quem está seguindo o método e quem precisa de ajuda, acabando com a desculpa do 'não sabia o que fazer'."
    },
    {
      icon: <HeadphonesIcon className="w-5 h-5" />,
      title: "Suporte Técnico",
      description: "Conte com nosso time para resolver qualquer problema e tirar suas dúvidas."
    },
    {
      icon: <RefreshCw className="w-5 h-5" />,
      title: "Atualizações Constantes",
      description: "Receba todas as novas funcionalidades e melhorias sem custo adicional, garantindo que seu app esteja sempre na vanguarda."
    }
  ];

  // FAQ items
  const faqItems = [
    {
      question: "Como funciona o mínimo de 3 usuários?",
      answer: "Para garantir a viabilidade e o melhor suporte, nossos planos começam com um mínimo de 3 licenças. Se você tem 5 vendedores, pagará por 5; se tiver 15, pagará por 15. O importante é começar com pelo menos 3 usuários para ter acesso à plataforma."
    },
    {
      question: "Posso adicionar ou remover usuários no meio do plano?",
      answer: "Sim! Você pode adicionar novos usuários a qualquer momento, pagando o valor proporcional. A remoção de usuários pode ser feita no momento da renovação do seu plano (semestral ou anual)."
    },
    {
      question: "Como funciona o parcelamento?",
      answer: "O valor total do seu plano (semestral ou anual) pode ser parcelado no cartão de crédito. Os juros do parcelamento são repassados diretamente ao cliente, conforme as taxas da operadora. Esta é a prática padrão do mercado, que nos permite oferecer o melhor preço possível no produto."
    },
    {
      question: "Existe algum tipo de fidelidade ou multa?",
      answer: "Não existe multa de cancelamento. Seu compromisso é apenas pelo período contratado (6 ou 12 meses). Ao final do ciclo, você pode optar por não renovar, sem nenhuma complicação."
    }
  ];

  return (
    <main className="pt-16 lg:pt-20 min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
              <span className="gradient-text text-glow">
                Planos transparentes para escalar seu time
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-text leading-relaxed mb-12 max-w-3xl mx-auto">
              Chega de surpresas. Nossa precificação é simples e direta, baseada no tamanho do seu time. 
              Todos os planos incluem acesso total a todas as funcionalidades do App Máquina de Vendas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* User Calculator */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-center mb-8">
              <label className="text-lg font-medium text-foreground mb-4 block">
                Selecione o número de usuários do seu time
              </label>
              <div className="flex items-center justify-center gap-4 mb-6">
                <Users className="w-6 h-6 text-primary" />
                <span className="text-3xl font-bold gradient-text">{userCount[0]} usuários</span>
              </div>
            </div>

            <div className="space-y-6">
              <Slider
                value={userCount}
                onValueChange={setUserCount}
                max={20}
                min={3}
                step={1}
                className="w-full"
              />
              
              <div className="flex justify-between text-sm text-gray-text">
                <span>3</span>
                <span>20</span>
              </div>

              <div className="text-center">
                <Input
                  type="number"
                  min={3}
                  max={20}
                  value={userCount[0]}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 3;
                    setUserCount([Math.min(20, Math.max(3, value))]);
                  }}
                  className="max-w-xs mx-auto text-center text-lg"
                  placeholder="Digite o número de usuários"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Plano Semestral */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full card-hover bg-card border-border/50 hover:border-primary/50 flex flex-col">
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      Plano Semestral
                    </h3>
                    <p className="text-gray-text">
                      Flexibilidade para começar a organizar seu time.
                    </p>
                  </div>

                  <div className="text-center mb-6">
                    <div className="text-4xl font-black gradient-text mb-2">
                      R$ {monthlyPriceSemestral}
                    </div>
                    <p className="text-gray-text">por usuário/mês</p>
                    <p className="text-sm text-gray-text mt-2">
                      Cobrado semestralmente | Mínimo de 3 usuários
                    </p>
                  </div>

                  <div className="text-center mb-6">
                    <div className="text-xl font-semibold text-foreground">
                      Total: R$ {semestralTotal.toLocaleString('pt-BR')}/mês
                    </div>
                    <div className="text-sm text-gray-text">
                      R$ {(semestralTotal * 6).toLocaleString('pt-BR')} por 6 meses
                    </div>
                  </div>

                  <div className="mt-auto">
                    <Button
                      size="lg"
                      className="w-full py-6 text-lg font-semibold hover:scale-105 transition-transform duration-300"
                      variant="outline"
                    >
                      Contratar Plano Semestral
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Plano Anual - Destaque */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              {/* Badge de destaque */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                <div className="gradient-orange text-white px-4 py-1 rounded-full text-sm font-bold">
                  MAIS ECONÔMICO
                </div>
              </div>

              <Card className="h-full card-hover bg-gradient-to-br from-primary/5 to-orange-primary/10 border-primary/50 hover:border-primary glow-orange flex flex-col">
                <CardContent className="p-8 relative flex flex-col h-full">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      Plano Anual
                    </h3>
                    <p className="text-gray-text">
                      O melhor custo-benefício para quem busca crescimento a longo prazo.
                    </p>
                  </div>

                  <div className="text-center mb-6">
                    <div className="text-4xl font-black gradient-text mb-2">
                      R$ {monthlyPriceAnual}
                    </div>
                    <p className="text-gray-text">por usuário/mês</p>
                    <p className="text-sm text-gray-text mt-2">
                      Cobrado anualmente | Mínimo de 3 usuários
                    </p>
                  </div>

                  <div className="text-center mb-6">
                    <div className="text-xl font-semibold text-foreground">
                      Total: R$ {anualTotal.toLocaleString('pt-BR')}/mês
                    </div>
                    <div className="text-sm text-gray-text">
                      R$ {(anualTotal * 12).toLocaleString('pt-BR')} por 12 meses
                    </div>
                    <div className="text-sm text-green-500 font-semibold mt-1">
                      Economia: R$ {((monthlyPriceSemestral - monthlyPriceAnual) * userCount[0] * 12).toLocaleString('pt-BR')}/ano
                    </div>
                  </div>

                  <div className="mt-auto">
                    <Button
                      size="lg"
                      className="w-full py-6 text-lg font-semibold gradient-orange glow-orange hover:scale-105 transition-transform duration-300"
                    >
                      Quero o Plano Anual!
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features List */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                ✅ Todas as funcionalidades incluídas em qualquer plano:
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start space-x-4 p-4 rounded-lg bg-card/50 card-hover"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-text leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enterprise Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="gradient-orange border-0 glow-orange">
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Precisa de um plano para mais de 20 usuários?
                </h2>
                <p className="text-xl text-white/90 mb-8">
                  Temos a solução perfeita para grandes times.
                </p>
                <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                  Seu time tem mais de 20 pessoas? Oferecemos um plano personalizado com condições especiais, 
                  onboarding assistido e um gerente de contas dedicado para garantir o seu sucesso em larga escala.
                </p>
                <Button
                  size="lg"
                  className="bg-white text-orange-primary hover:bg-gray-100 px-8 py-6 text-lg font-semibold hover:scale-105 transition-transform duration-300"
                >
                  Fale com um especialista
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Perguntas Frequentes (FAQ)
              </h2>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-card rounded-lg px-6 border-border/50">
                  <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-primary">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-text leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>
    </main>
  );
};



export default Pricing;