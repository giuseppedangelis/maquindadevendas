import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import ctaIcon from "@/assets/cta-icon.svg";

const CTASection = () => {
  return (
    <section className="py-20 lg:py-32 bg-background relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <img 
              src={ctaIcon} 
              alt="Máquina de Vendas App" 
              className="w-16 h-16 object-contain"
            />
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            Pronto para{" "}
            <span className="gradient-text">acender a luz</span> da sua Gestão Comercial?
          </h2>

          <p className="text-lg sm:text-xl text-gray-text mb-10 leading-relaxed">
            Baixe o app e comece a transformar seu time em uma{" "}
            <strong className="text-foreground">Máquina de Vendas</strong> hoje.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="gradient-orange text-lg sm:text-xl font-bold px-10 py-7 rounded-xl glow-orange hover:scale-105 transition-transform duration-300 w-full sm:w-auto"
            >
              <Download className="w-6 h-6 mr-3" />
              BAIXAR O APP AGORA
            </Button>
          </motion.div>

          {/* App Store Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex items-center justify-center gap-4 mt-8"
          >
            <a
              href="#"
              className="opacity-60 hover:opacity-100 transition-opacity duration-300"
            >
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="Download on App Store"
                className="h-12"
              />
            </a>
            <a
              href="#"
              className="opacity-60 hover:opacity-100 transition-opacity duration-300"
            >
              <img
                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                alt="Get it on Google Play"
                className="h-[72px] -my-3"
              />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
