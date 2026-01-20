import { motion } from "framer-motion";
import { Shield, Lock, Eye, Database, UserCheck, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { NavLink } from "@/components/NavLink";
import Footer from "@/components/landing/Footer";

const PrivacyPage = () => {
  const privacyData = {
    title: "Política de Privacidade\n App Máquina de Vendas",
    introduction: "A sua privacidade é fundamental para nós. Esta Política de Privacidade descreve como a CRIS REIS ESCOLA DE EMPRESÁRIOS LTDA (CNPJ: 33.546.747/0001-07), desenvolvedora do aplicativo Máquina de Vendas, coleta, usa, armazena e protege os seus dados.\nAo utilizar o nosso aplicativo, você concorda com as práticas descritas neste documento.",
    
    sections: [
      {
        title: "1. Dados que Coletamos",
        icon: Database,
        content: [
          "Dados de Cadastro: Nome, e-mail, telefone, nome da empresa, cargo.",
          "Dados de Uso do Aplicativo: Informações sobre as funcionalidades que você utiliza, frequência de uso, interações com a interface.",
          "Dados Inseridos no Aplicativo: Metas de vendas, resultados de vendas, nomes de vendedores, valores, produtos e outras informações que você e seu time inserem para a gestão comercial. Estes dados são de sua propriedade e tratados como estritamente confidenciais."
        ]
      },
      {
        title: "2. Como Usamos os Seus Dados",
        icon: Eye,
        content: [
          "Fornecer e Manter o Serviço: Autenticar seu acesso, exibir seus dashboards e permitir o uso das funcionalidades do app.",
          "Melhorar o Aplicativo: Analisar dados de uso de forma anonimizada para identificar bugs, melhorar a usabilidade e desenvolver novas funcionalidades.",
          "Comunicação: Enviar notificações importantes sobre sua conta, atualizações do app e informações sobre nossos serviços.",
          "Suporte ao Cliente: Ajudar a resolver problemas técnicos e responder às suas dúvidas."
        ]
      },
      {
        title: "3. Armazenamento e Segurança",
        icon: Lock,
        content: [
          "Seus dados são armazenados em servidores seguros em nuvem, com as melhores práticas de segurança do mercado, incluindo criptografia de ponta-a-ponta para proteger suas informações contra acessos não autorizados."
        ]
      },
      {
        title: "4. Compartilhamento de Dados",
        icon: AlertCircle,
        content: [
          "Nós não vendemos, alugamos ou compartilhamos seus dados pessoais ou os dados comerciais inseridos no app com terceiros para fins de marketing.",
          "Podemos compartilhar informações com provedores de serviços (como servidores em nuvem) que nos ajudam a operar o aplicativo, mas eles são contratualmente obrigados a manter a confidencialidade e segurança dos dados."
        ]
      },
      {
        title: "5. Seus Direitos (LGPD)",
        icon: UserCheck,
        content: [
          "Acessar seus dados a qualquer momento.",
          "Corrigir dados incompletos, inexatos ou desatualizados.",
          "Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários.",
          "Solicitar a portabilidade dos seus dados a outro fornecedor de serviço.",
          "Solicitar a exclusão da sua conta e de todos os seus dados."
        ]
      }
    ],
    
    contact: {
      title: "6. Contato",
      content: "Se você tiver qualquer dúvida sobre esta Política de Privacidade, entre em contato conosco pelo e-mail: suporte@maquinadevendas.app",
      company: "Copyright 2025 - CRIS REIS ESCOLA DE EMPRESÁRIOS - CNPJ: 33.546.747/0001-07 - Todos os direitos reservados"
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Component */}
      <div className="fixed top-0 left-0 right-0 z-50">
        {/* Você pode importar e usar o Header aqui se quiser */}
      </div>
      
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
              className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-8 glow-orange"
            >
              <Shield className="w-10 h-10 text-white" />
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">
              <span className="gradient-text text-glow">
                Política de Privacidade
              </span>
            </h1>
            
            <p className="text-xl text-gray-text leading-relaxed max-w-2xl mx-auto whitespace-pre-line">
              {privacyData.introduction}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Privacy Sections */}
            {privacyData.sections.map((section, index) => (
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
                    {privacyData.contact.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-text leading-relaxed">
                    {privacyData.contact.content}
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
                {privacyData.contact.company}
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

export default PrivacyPage;