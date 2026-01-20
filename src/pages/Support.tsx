import { motion } from "framer-motion";
import { Mail, MessageSquare, HelpCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NavLink } from "@/components/NavLink";
import Footer from "@/components/landing/Footer";

const SupportPage = () => {
  const supportData = {
    title: "Suporte App Máquina de Vendas",
    subtitle: "Precisa de Ajuda?",
    introduction: "Nossa missão é garantir que você tenha a melhor experiência possível com o App Máquina de Vendas. Se você encontrou um problema técnico, tem alguma dúvida ou precisa de ajuda, estamos aqui para te ajudar!",
    
    sections: [
      {
        title: "1. Envie um E-mail",
        icon: Mail,
        content: [
          "Para dúvidas técnicas, problemas ou sugestões, envie um e-mail para nossa equipe de suporte. Responderemos o mais rápido possível.",
          "E-mail: suporte@maquinadevendas.app"
        ]
      },
      {
        title: "2. Fale Conosco no WhatsApp",
        icon: MessageSquare,
        content: [
          "Para um atendimento mais rápido, clique no link abaixo e fale diretamente com um de nossos especialistas no WhatsApp."
        ],
        whatsappLink: "https://wa.me/5551997844352?text=Olá!%20Preciso%20de%20ajuda%20com%20o%20App%20Máquina%20de%20Vendas"
      },
      {
        title: "3. Perguntas Frequentes (FAQ)",
        icon: HelpCircle,
        content: [
          {
            question: "Como altero minha senha?",
            answer: "Você pode redefinir sua senha na tela de login, clicando em \"Esqueci minha senha\"."
          },
          {
            question: "Como adiciono um novo vendedor ao meu time?",
            answer: "No menu principal, vá para a seção \"P\" e clique em \"Adicionar Vendedor\"."
          }
        ]
      }
    ],
    
    company: "Copyright 2025 - CRIS REIS ESCOLA DE EMPRESÁRIOS - CNPJ: 33.546.747/0001-07 - Todos os direitos reservados"
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
              className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-8 glow-orange"
            >
              <Phone className="w-10 h-10 text-white" />
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4">
              <span className="gradient-text text-glow">
                {supportData.title}
              </span>
            </h1>
            
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              {supportData.subtitle}
            </h2>
            
            <p className="text-xl text-gray-text leading-relaxed max-w-2xl mx-auto">
              {supportData.introduction}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Support Sections */}
            {supportData.sections.map((section, index) => (
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
                  <CardContent className="space-y-4">
                    {section.content.map((item, itemIndex) => {
                      if (typeof item === 'string') {
                        return (
                          <div key={itemIndex} className="flex items-start">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                            <p className="text-gray-text leading-relaxed flex-1">
                              {item}
                            </p>
                          </div>
                        );
                      } else if (typeof item === 'object' && item.question && item.answer) {
                        return (
                          <div key={itemIndex} className="space-y-3">
                            <div className="flex items-start">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                              <div>
                                <h4 className="font-semibold text-foreground mb-2">
                                  {item.question}
                                </h4>
                                <p className="text-gray-text leading-relaxed">
                                  {item.answer}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })}
                    
                    {/* WhatsApp Link */}
                    {section.whatsappLink && (
                      <div className="mt-6 flex justify-center">
                        <Button
                          size="lg"
                          className="gradient-orange glow-orange-sm hover:scale-105 transition-transform duration-300"
                          onClick={() => window.open(section.whatsappLink, '_blank')}
                        >
                          <MessageSquare className="w-5 h-5 mr-3" />
                          Fale no WhatsApp
                        </Button>
                      </div>
                    )}
                    
                    {/* Email Link */}
                    {section.title.includes("E-mail") && (
                      <div className="mt-6 flex justify-center">
                        <Button
                          size="lg"
                          className="gradient-orange glow-orange-sm hover:scale-105 transition-transform duration-300"
                          onClick={() => window.open('mailto:suporte@maquinadevendas.app', '_blank')}
                        >
                          <Mail className="w-5 h-5 mr-3" />
                          Enviar E-mail
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="text-center mb-12"
            >
              <p className="text-sm text-gray-text">
                {supportData.company}
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

export default SupportPage;