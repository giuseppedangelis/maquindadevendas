import { motion } from "framer-motion";
import { Check } from "lucide-react";

const benefits = [
  "Faça seu vendedor mediano superar o vendedor estrela inconstante.",
  "Aumente seu faturamento com a base de clientes que você já tem.",
];

const BenefitsSection = () => {
  return (
    <section className="py-20 lg:py-32 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            A Rotina Comercial Lucrativa,{" "}
            <span className="gradient-text">na Palma da Sua Mão</span>
          </h2>
        </motion.div>

        {/* Comparison Statements */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12 mb-16"
        >
          <div className="flex items-center gap-4">
            <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground">
              Venda Ativa
            </span>
            <span className="text-3xl sm:text-4xl lg:text-5xl font-black gradient-text">{">"}</span>
            <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-muted-foreground">
              Tráfego Pago
            </span>
          </div>
          
          <div className="hidden lg:block w-1 h-16 gradient-orange rounded-full" />
          
          <div className="flex items-center gap-4">
            <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground">
              Sistema
            </span>
            <span className="text-3xl sm:text-4xl lg:text-5xl font-black gradient-text">{">"}</span>
            <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-muted-foreground">
              Sorte
            </span>
          </div>
        </motion.div>

        {/* Benefits List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl mx-auto space-y-6"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              className="flex items-start gap-4"
            >
              <div className="w-8 h-8 rounded-full gradient-orange flex items-center justify-center flex-shrink-0 mt-1">
                <Check className="w-5 h-5 text-foreground" />
              </div>
              <p className="text-lg sm:text-xl text-gray-text leading-relaxed">
                {benefit}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;
