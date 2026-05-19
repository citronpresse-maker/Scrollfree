import { m } from 'motion/react';
import { Calendar, Users, FileEdit, FileText, LineChart, Infinity as InfinityIcon } from 'lucide-react';

const successFeatures = [
  { icon: <Calendar size={28} />, title: "Plan d'action jour par jour", desc: "Un parcours structuré et progressif pour passer à l'action chaque jour." },
  { icon: <Users size={28} />, title: "Communauté privée d'entraide", desc: "Échange, partage et soutien avec des personnes qui vivent la même chose que toi." },
  { icon: <FileEdit size={28} />, title: "Des exercices pratiques", desc: "Des actions concrètes, simples et efficaces pour appliquer la méthode dans ta vie réelle." },
  { icon: <FileText size={28} />, title: "Des fiches ressources", desc: "Des guides et outils téléchargeables pour aller plus loin à tout moment." },
  { icon: <LineChart size={28} />, title: "Suivi de progression", desc: "Suis tes avancées, célèbre tes victoires et reste motivé sur le long terme." },
  { icon: <InfinityIcon size={28} />, title: "Accès à vie et mise à jour", desc: "Accède à vie à tous les contenus et profite des mises à jour et nouveautés." },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  },
};

export const SuccessFeatures = () => {
  return (
    <section className="relative z-10 px-6 py-24 md:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
      <m.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "100px" }}
        className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white mb-6 max-w-4xl"
      >
        Tout ce qu'il te faut <br className="hidden md:block"/>
        pour <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F4D3A1] to-[#D4A373]">réussir</span>
      </m.h2>

      <m.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "100px" }}
        className="text-lg text-white/70 max-w-3xl mb-16 leading-relaxed"
      >
        Un accompagnement complet, étape par étape, <br className="hidden md:block"/>
        pour des résultats durables.
      </m.p>
      
      <m.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left w-full mb-6"
      >
        {successFeatures.map((feat, i) => (
          <m.div
            key={i}
            variants={itemVariants}
            className="relative rounded-[32px] p-8 flex flex-col overflow-hidden group bg-[#0A0A0A] border border-[#D4A373]/30 transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-2 hover:border-[#D4A373] hover:shadow-[0_0_50px_-12px_rgba(212,163,115,0.5)] will-change-transform"
          >
            {/* Internal glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4A373]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-500">
                {feat.icon}
              </div>
              
              <h3 className="text-white text-xl font-medium mb-3">{feat.title}</h3>
              <p className="text-white/60 text-[14px] leading-relaxed flex-grow">{feat.desc}</p>
            </div>
          </m.div>
        ))}
      </m.div>
    </section>
  );
};
