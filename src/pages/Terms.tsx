import { motion } from "framer-motion";
import { Shield, CreditCard, Lock, AlertTriangle, Settings, MessageSquare, Gavel } from "lucide-react";
import termsIcon from "@/assets/logo-white.svg";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NavLink } from "@/components/NavLink";
import Footer from "@/components/landing/Footer";

const TermsPage = () => {
  const termsData = {
    title: "Termos e Condições de Uso - Máquina de Vendas",
    introduction: "Bem-vindo à Máquina de Vendas. Ao utilizar nosso aplicativo e serviços, você concorda em cumprir e estar vinculado aos seguintes Termos e Condições de Uso.\nPor favor, leia-os cuidadosamente antes de acessar ou utilizar a plataforma.",
    
    sections: [
      {
        title: "1. Aceitação dos Termos",
        icon: Shield,
        content: [
          "Ao criar uma conta ou utilizar a plataforma Máquina de Vendas, você declara ter capacidade legal e estar de acordo com estes termos. Se você estiver utilizando a plataforma em nome de uma empresa, você declara ter autoridade para vincular referida entidade a estes termos."
        ]
      },
      {
        title: "2. Descrição do Serviço",
        icon: Settings,
        content: [
          "A Máquina de Vendas é uma plataforma de gestão comercial destinada a auxiliar empresários e gestores no acompanhamento de metas, rotinas comerciais e performance de vendas. O serviço inclui, mas não se limita a:",
          "Dashboard de indicadores em tempo real.",
          "Sistema de projeção de vendas e recálculo de metas.",
          "Checklists de rotina comercial (Método OMC).",
          "Diário de gestão e ranking de vendedores."
        ]
      },
      {
        title: "3. Contas e Segurança",
        icon: Shield,
        content: [
          "Para acessar as funcionalidades, é necessário realizar um cadastro (Onboarding).",
          "Responsabilidade: Você é o único responsável por manter a confidencialidade de sua senha e conta, bem como por todas as atividades que ocorram sob sua autenticação.",
          "Precisão dos Dados: Você concorda em fornecer informações verdadeiras e atualizadas, especialmente no que tange ao faturamento e dados da equipe de vendas."
        ]
      },
      {
        title: "4. Planos e Pagamentos",
        icon: CreditCard,
        content: [
          "O acesso à Máquina de Vendas pode envolver uma taxa de implementação e mensalidades de manutenção/assinatura, conforme acordado no momento da contratação.",
          "Assinatura: O serviço opera no modelo SaaS (Software as a Service). A interrupção do pagamento poderá resultar na suspensão do acesso aos dados.",
          "Reajustes: Os valores poderão ser reajustados anualmente conforme índices de inflação ou melhorias estruturais, mediante aviso prévio."
        ]
      },
      {
        title: "5. Propriedade Intelectual",
        icon: Lock,
        content: [
          "Todo o conteúdo disponível na plataforma, incluindo o design, código-fonte, logotipos, ícones e a metodologia de rotinas (Método OMC - Rotina Comercial Lucrativa), é de propriedade exclusiva da Máquina de Vendas ou de seus licenciadores e está protegido por leis de direitos autorais e propriedade industrial.",
          "É proibida a reprodução, engenharia reversa ou distribuição do software sem autorização expressa."
        ]
      },
      {
        title: "6. Limitação de Responsabilidade",
        icon: AlertTriangle,
        content: [
          "A Máquina de Vendas fornece ferramentas para auxílio na gestão, porém:",
          "Resultados: Não garantimos o atingimento de metas ou aumento de faturamento, visto que o sucesso comercial depende da execução das estratégias pelo usuário e sua equipe.",
          "Disponibilidade: Esforçamo-nos para manter a plataforma online 24/7, mas não nos responsabilizamos por interrupções devidas a falhas técnicas externas, manutenção programada ou problemas de conexão do usuário."
        ]
      },
      {
        title: "7. Uso do WhatsApp e Notificações",
        icon: MessageSquare,
        content: [
          "A plataforma utiliza notificações push e integrações manuais/automáticas com o WhatsApp para envio de alertas e mensagens de motivação/cobrança. O usuário é responsável por garantir que o uso dessas comunicações com sua equipe respeite as legislações trabalhistas locais e de privacidade."
        ]
      },
      {
        title: "8. Privacidade e Dados",
        icon: Shield,
        content: [
          "O tratamento de seus dados pessoais e dos dados de sua equipe é regido por nossa Política de Privacidade. Ao aceitar estes termos, você também reconhece o processamento de dados conforme descrito em referida política, em conformidade com a LGPD (Lei Geral de Proteção de Dados)."
        ]
      },
      {
        title: "9. Rescisão",
        icon: Gavel,
        content: [
          "O descumprimento de qualquer cláusula destes termos poderá resultar na suspensão imediata ou encerramento de sua conta sem aviso prévio. O usuário pode solicitar o cancelamento da assinatura a qualquer momento, respeitando as cláusulas de fidelidade/aviso prévio estabelecidas no contrato comercial."
        ]
      },
      {
        title: "10. Jurisdição",
        icon: Gavel,
        content: [
          "Estes Termos e Condições são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da comarca da sede da empresa detentora da marca para dirimir quaisquer dúvidas oriundas deste documento."
        ]
      }
    ],
    
    contact: {
      title: "Contato",
      content: "Para dúvidas sobre estes termos, entre em contato através do e-mail: suporte@maquinadevendas.app",
      company: "Copyright 2025 - CRIS REIS ESCOLA DE EMPRESÁRIOS - CNPJ: 33.546.747/0001-07 - Todos os direitos reservados"
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-pattern" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex justify-center mb-8"
            >
              <img 
                src={termsIcon} 
                alt="Termos de Uso" 
                className="h-12 lg:h-16 w-auto object-contain"
              />
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">
              <span className="gradient-text text-glow">
                Termos de Uso
              </span>
            </h1>
            
            <p className="text-xl text-gray-text leading-relaxed max-w-2xl mx-auto whitespace-pre-line">
              {termsData.introduction}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Terms Sections */}
            {termsData.sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                className="mb-12"
              >
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardHeader className="flex flex-row items-center space-y-0 pb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                        <section.icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-2xl font-bold text-foreground">
                        {section.title}
                      </CardTitle>
                    </CardHeader>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                        <p className="text-gray-text leading-relaxed flex-1">
                          {item}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-foreground">
                    {termsData.contact.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-text leading-relaxed">
                    {termsData.contact.content}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="text-center mb-12"
            >
              <p className="text-sm text-gray-text">
                {termsData.contact.company}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button
                  size="lg"
                  className="gradient-orange glow-orange-sm hover:scale-105 transition-transform duration-300"
                >
                  Fale Conosco
                </Button>
                <NavLink to="/">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary/50 text-foreground hover:bg-primary/10"
                  >
                    Voltar ao Início
                  </Button>
                </NavLink>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsPage;