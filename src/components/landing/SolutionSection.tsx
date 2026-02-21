import { motion } from "framer-motion";
import { Sun, Clock, Trophy, MessageCircle } from "lucide-react";

const steps = [
  {
    icon: Sun,
    time: "8h45",
    title: "Abertura do Dia",
    description: "Metas claras e foco definido.",
  },
  {
    icon: Clock,
    time: "12h00",
    title: "Status do Meio-Dia",
    description: "Acompanhamento de performance em tempo real.",
  },
  {
    icon: Trophy,
    time: "18h00",
    title: "Fechamento do Dia",
    description: "Ranking e reconhecimento.",
  },
  {
    icon: MessageCircle,
    time: "18h30",
    title: "Conversa com os Últimos",
    description: "Apoio e plano de ação.",
  },
];

const SolutionSection = () => {
  return (
    <section className="py-20 lg:py-32 bg-background relative overflow-hidden">
      {/* Center Glow Effect */}
      <div className="absolute inset-0 center-glow" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">
            <span className="gradient-text text-glow">Rotina {">"} Talento</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-text max-w-3xl mx-auto leading-relaxed">
            O App Máquina de Vendas é a ferramenta que implementa o método da{" "}
            <strong className="text-foreground">Rotina Comercial Lucrativa</strong> no seu time. 
            Com ele, você acompanha em tempo real os 4 momentos que garantem a previsibilidade:
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="mt-16 lg:mt-24">
          {/* Desktop Timeline */}
          <div className="hidden lg:block relative">
            {/* Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20 -translate-y-1/2" />
            
            <div className="grid grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative"
                >
                  {/* Connector Dot */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 z-10">
                    <div className="w-6 h-6 rounded-full gradient-orange glow-orange-sm animate-pulse-glow" />
                  </div>

                  <div className="bg-card border border-border rounded-2xl p-6 text-center card-hover mt-8">
                    <div className="w-16 h-16 rounded-full gradient-orange flex items-center justify-center mx-auto mb-4">
                      <step.icon className="w-8 h-8 text-foreground" />
                    </div>
                    <span className="text-primary font-bold text-lg">{step.time}</span>
                    <h3 className="text-xl font-bold text-foreground mt-2 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden relative">
            {/* Vertical Line */}
            <div className="absolute top-0 bottom-0 left-6 w-1 bg-gradient-to-b from-primary via-primary to-primary/20" />
            
            <div className="space-y-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative pl-16"
                >
                  {/* Connector Dot */}
                  <div className="absolute left-4 top-6 z-10">
                    <div className="w-5 h-5 rounded-full gradient-orange glow-orange-sm" />
                  </div>

                  <div className="bg-card border border-border rounded-2xl p-5 card-hover">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-12 h-12 rounded-full gradient-orange flex items-center justify-center flex-shrink-0">
                        <step.icon className="w-6 h-6 text-foreground" />
                      </div>
                      <div>
                        <span className="text-primary font-bold">{step.time}</span>
                        <h3 className="text-lg font-bold text-foreground">
                          {step.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
