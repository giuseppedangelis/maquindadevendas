import { motion } from "framer-motion";
import { Shield, Lock, Eye, Database, UserCheck, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { NavLink } from "@/components/NavLink";
import Footer from "@/components/landing/Footer";

const PrivacyPage = () => {
  const sections = [
    {
      icon: Shield,
      title: "Coleta de Dados",
      content: "Coletamos apenas informações essenciais para fornecer nossos serviços, incluindo dados de contato e informações de uso do sistema."
    },
    {
      icon: Lock,
      title: "Armazenamento Seguro",
      content: "Todos os dados são armazenados em servidores criptografados com padrões de segurança industriais."
    },
    {
      icon: Eye,
      title: "Transparência",
      content: "Você tem direito total para acessar, corrigir ou excluir seus dados a qualquer momento."
    },
    {
      icon: Database,
      title: "Uso de Dados",
      content: "Seus dados são usados exclusivamente para melhorar nossos serviços e fornecer suporte personalizado."
    },
    {
      icon: UserCheck,
      title: "Consentimento",
      content: "Obtemos seu consentimento explícito antes de coletar ou processar qualquer informação pessoal."
    },
    {
      icon: AlertCircle,
      title: "Notificações",
      content: "Informamos imediatamente sobre qualquer alteração em nossas políticas de privacidade."
    }
  ];

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
            
            <p className="text-xl text-gray-text leading-relaxed max-w-2xl mx-auto">
              Sua privacidade é nossa prioridade. Saiba como protegemos e gerenciamos seus dados.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-16"
            >
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-foreground">
                    Nossa Missão de Privacidade
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-text leading-relaxed">
                    Na Máquina de Vendas, estamos comprometidos em proteger sua privacidade e garantir 
                    a segurança das suas informações. Esta política descreve como coletamos, usamos, 
                    armazenamos e protegemos seus dados pessoais.
                  </p>
                  <p className="text-gray-text leading-relaxed">
                    Respeitamos sua privacidade e operamos em conformidade com a Lei Geral de Proteção 
                    de Dados (LGPD) e outras regulamentações aplicáveis de proteção de dados.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Privacy Principles Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-16">
              {sections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                >
                  <Card className="bg-card/30 backdrop-blur-sm border-border/30 card-hover h-full">
                    <CardHeader className="flex flex-row items-center space-y-0 pb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                        <section.icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg font-semibold text-foreground">
                        {section.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-text leading-relaxed">
                        {section.content}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Data Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="mb-16"
            >
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-foreground mb-4">
                    Categorias de Dados Coletados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3">
                        Dados Pessoais
                      </h3>
                      <ul className="space-y-2 text-gray-text">
                        <li>• Nome completo</li>
                        <li>• Endereço de e-mail</li>
                        <li>• Telefone de contato</li>
                        <li>• Cargo e empresa</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3">
                        Dados de Uso
                      </h3>
                      <ul className="space-y-2 text-gray-text">
                        <li>• Dados de navegação</li>
                        <li>• Interações com o sistema</li>
                        <li>• Preferências de uso</li>
                        <li>• Dados de performance</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Rights Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="mb-16"
            >
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-foreground mb-4">
                    Seus Direitos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        Acesso e Retificação
                      </h3>
                      <p className="text-gray-text">
                        Você tem direito de acessar seus dados e solicitar correções de informações incorretas.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        Portabilidade e Exclusão
                      </h3>
                      <p className="text-gray-text">
                        Solicite a portabilidade de seus dados ou sua exclusão a qualquer momento.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        Revogação de Consentimento
                      </h3>
                      <p className="text-gray-text">
                        Você pode revogar seu consentimento a qualquer momento sem afetar serviços já prestados.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        Informações de Contato
                      </h3>
                      <p className="text-gray-text">
                        Entre em contato através do e-mail privacidade@maquinadevendas.com para exercer seus direitos.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold mb-6 gradient-text">
                Dúvidas ou Preocupações?
              </h2>
              <p className="text-gray-text mb-8 max-w-2xl mx-auto">
                Nossa equipe de proteção de dados está disponível para responder 
                todas as suas perguntas sobre privacidade e segurança.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
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