import { motion } from "framer-motion";
import { Trash2, AlertTriangle, Mail, Send, User, Database, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NavLink } from "@/components/NavLink";
import Footer from "@/components/landing/Footer";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const AccountDeletionPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally send this to your backend
    console.log('Form submitted:', formData);
    alert('Solicitação de exclusão enviada! Processaremos em até 7 dias úteis.');
    setFormData({ name: '', email: '', reason: '' });
  };

  const deletionData = {
    title: "Exclusão de Conta",
    subtitle: "App Máquina de Vendas",
    introduction: "De acordo com a Lei Geral de Proteção de Dados (LGPD) e as diretrizes da Apple e do Google, você tem o direito de solicitar a exclusão permanente da sua conta e de todos os dados associados a ela.",
    
    consequences: [
      {
        icon: User,
        title: "Sua conta de usuário será permanentemente desativada."
      },
      {
        icon: Database,
        title: "Todos os dados cadastrais (nome, e-mail, etc.) serão excluídos de nossos sistemas."
      },
      {
        icon: Shield,
        title: "Todos os dados comerciais inseridos por você e seu time (metas, resultados, informações de vendedores, etc.) serão permanentemente excluídos."
      },
      {
        icon: AlertTriangle,
        title: "Esta ação é irreversível. Uma vez que os dados são excluídos, não há como recuperá-los."
      }
    ],
    
    formInstructions: [
      "Para iniciar o processo de exclusão da sua conta e de todos os seus dados, por favor, preencha o formulário abaixo.",
      "Nossa equipe processará sua solicitação em até 7 dias úteis e enviará uma confirmação para o seu e-mail quando o processo for concluído."
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
              className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-8"
            >
              <Trash2 className="w-10 h-10 text-white" />
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4">
              <span className="gradient-text text-glow">
                {deletionData.title}
              </span>
            </h1>
            
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              {deletionData.subtitle}
            </h2>
            
            <p className="text-xl text-gray-text leading-relaxed max-w-2xl mx-auto">
              {deletionData.introduction}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Consequences Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-16"
            >
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-foreground text-center mb-8">
                    O que acontece ao excluir sua conta?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {deletionData.consequences.map((consequence, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                      className="flex items-start space-x-4"
                    >
                      <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <consequence.icon className="w-6 h-6 text-red-500" />
                      </div>
                      <p className="text-gray-text leading-relaxed flex-1">
                        {consequence.title}
                      </p>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Instructions Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mb-16"
            >
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-foreground text-center mb-8">
                    Como solicitar a exclusão
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {deletionData.formInstructions.map((instruction, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                      <p className="text-gray-text leading-relaxed flex-1">
                        {instruction}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Deletion Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mb-12"
            >
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-foreground text-center mb-8">
                    Formulário de Solicitação de Exclusão
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium text-foreground">
                        Nome Completo *
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Digite seu nome completo"
                        required
                        className="bg-background/50 border-border/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-foreground">
                        E-mail da Conta *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Digite o e-mail da sua conta"
                        required
                        className="bg-background/50 border-border/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reason" className="text-sm font-medium text-foreground">
                        Motivo da Exclusão *
                      </Label>
                      <Textarea
                        id="reason"
                        value={formData.reason}
                        onChange={(e) => handleInputChange('reason', e.target.value)}
                        placeholder="Por favor, nos informe o motivo da exclusão da sua conta"
                        required
                        rows={4}
                        className="bg-background/50 border-border/50 resize-none"
                      />
                    </div>

                    <div className="flex items-start space-x-2">
                      <input
                        type="checkbox"
                        id="confirmation"
                        required
                        className="mt-1"
                      />
                      <Label htmlFor="confirmation" className="text-sm text-gray-text leading-relaxed">
                        Entendo que esta ação é irreversível e que todos os meus dados serão permanentemente excluídos.
                      </Label>
                    </div>

                    <div className="flex justify-center pt-4">
                      <Button
                        type="submit"
                        size="lg"
                        className="bg-red-500 hover:bg-red-600 text-white font-medium px-8 py-3 rounded-lg transition-colors duration-300"
                      >
                        <Send className="w-5 h-5 mr-3" />
                        Enviar Solicitação de Exclusão
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="text-center mb-12"
            >
              <p className="text-sm text-gray-text">
                {deletionData.company}
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

export default AccountDeletionPage;