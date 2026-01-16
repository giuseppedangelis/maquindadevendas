import { motion } from "framer-motion";
import { Target, Users, Eye, DollarSign } from "lucide-react";

const problems = [
  {
    icon: Target,
    title: "Dependência de Heróis",
    description: "Seu faturamento depende de 1 ou 2 vendedores estrela?",
  },
  {
    icon: Users,
    title: "Time Desengajado",
    description: "Seus vendedores não têm uma rotina clara e vivem de sorte?",
  },
  {
    icon: Eye,
    title: "Cegueira de Gestão",
    description: "Você só descobre o resultado do mês quando ele acaba?",
  },
  {
    icon: DollarSign,
    title: "Vício em Tráfego Pago",
    description: "Você queima rios de dinheiro com novos leads todo mês?",
  },
];

const ProblemsSection = () => {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Você se identifica com algum desses{" "}
            <span className="gradient-text">problemas</span>?
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-card border border-border rounded-2xl p-6 lg:p-8 h-full card-hover group">
                <div className="w-14 h-14 rounded-xl gradient-orange flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <problem.icon className="w-7 h-7 text-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {problem.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {problem.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemsSection;
