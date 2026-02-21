import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const goHome = () => {
    navigate("/");
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <main className="min-h-screen bg-background hero-pattern flex items-center justify-center">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* 404 Animated Number */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="text-9xl lg:text-[12rem] font-black gradient-text text-glow">
              404
            </div>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
              Ops! Página não encontrada
            </h1>
            <p className="text-lg sm:text-xl text-gray-text leading-relaxed mb-8 max-w-2xl mx-auto">
              Parece que você tentou acessar uma página que não existe na Máquina de Vendas. 
              Mas não se preocupe, nossa ferramenta de previsibilidade comercial está bem aqui!
            </p>

            {/* Show attempted URL in development */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mb-8 p-4 bg-card/50 border border-border/50 rounded-lg">
                <p className="text-sm text-gray-text mb-2">URL acessada:</p>
                <code className="text-xs bg-secondary px-2 py-1 rounded text-muted-foreground">
                  {location.pathname}
                </code>
              </div>
            )}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              onClick={goHome}
              className="gradient-orange glow-orange hover:scale-105 transition-transform duration-300 px-8 py-6 text-lg font-semibold"
            >
              <Home className="w-5 h-5 mr-2" />
              Voltar para a Página Inicial
            </Button>

            <Button
              size="lg"
              onClick={goBack}
              variant="outline"
              className="hover:scale-105 transition-transform duration-300 px-8 py-6 text-lg font-semibold"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Voltar para a Página Anterior
            </Button>
          </motion.div>

          {/* Helpful Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 pt-16 border-t border-border/30"
          >
            <h2 className="text-xl font-semibold text-foreground mb-6">
              O que você está procurando?
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <motion.a
                href="/"
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-card/50 border border-border/50 rounded-lg card-hover text-center"
              >
                <Home className="w-6 h-6 mx-auto mb-2 text-primary" />
                <span className="text-sm font-medium text-foreground">Início</span>
              </motion.a>

              <motion.a
                href="/pricing"
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-card/50 border border-border/50 rounded-lg card-hover text-center"
              >
                <Search className="w-6 h-6 mx-auto mb-2 text-primary" />
                <span className="text-sm font-medium text-foreground">Planos</span>
              </motion.a>

              <motion.a
                href="/support"
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-card/50 border border-border/50 rounded-lg card-hover text-center"
              >
                <Home className="w-6 h-6 mx-auto mb-2 text-primary" />
                <span className="text-sm font-medium text-foreground">Suporte</span>
              </motion.a>

              <motion.a
                href="/terms"
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-card/50 border border-border/50 rounded-lg card-hover text-center"
              >
                <Search className="w-6 h-6 mx-auto mb-2 text-primary" />
                <span className="text-sm font-medium text-foreground">Termos</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Fun Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-gray-text italic">
              "Em vendas, como na vida, às vezes nos perdemos. O importante é saber voltar ao caminho certo."
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              — Máquina de Vendas
            </p>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
};

export default NotFound;