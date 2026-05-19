import { m } from 'motion/react';
import { Brain, Power, Target, Star, Users, Clock } from 'lucide-react';

const modules = [
  { moduleNum: "MODULE 1", title: "Comprendre", desc: "Comprends ton cerveau, le fonctionnement de ton attention et pourquoi ton usage te contrôle.", duration: "Durée : 5 jours", icon: <Brain size={28} /> },
  { moduleNum: "MODULE 2", title: "Désactiver", desc: "Désactive les déclencheurs, réduis ton usage problématique et crée de l'espace mental.", duration: "Durée : 5 jours", icon: <Power size={28} /> },
  { moduleNum: "MODULE 3", title: "Reprogrammer", desc: "Reprogramme ton environnement et ton cerveau pour soutenir ta concentration et tes objectifs.", duration: "Durée : 5 jours", icon: <Target size={28} /> },
  { moduleNum: "MODULE 4", title: "Tenir", desc: "Renforce ta discipline, surmonte les obstacles et construis des habitudes durables qui te font avancer chaque jour.", duration: "Durée : 5 jours", icon: <Star size={28} /> },
  { moduleNum: "MODULE 5", tag: "PARENT", title: "Accompagner avec impact", desc: "Des outils et repères pour accompagner ton enfant avec bienveillance et efficacité.", duration: "Durée : 4 jours", icon: <Users size={28} /> },
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

export const Method = () => {
  return (
    <section className="relative z-10 px-6 py-24 md:px-12 max-w-7xl mx-auto flex flex-col flex-wrap text-center items-center">
      <m.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "100px" }}
        className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white mb-6 max-w-4xl"
      >
        Tu n'as pas besoin de plus de volonté. <br className="hidden md:block"/>
        Tu as besoin de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffcda5] to-[#f97316]">la bonne méthode.</span>
      </m.h2>

      <m.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "100px" }}
        className="text-lg text-white/70 max-w-3xl mb-16 leading-relaxed"
      >
        Un programme complet en 5 modules, dont 1 module parent (pack famille) pour t'aider à reprendre le contrôle de ton attention et construire une vie alignée, plus claire et pleine de sens.
      </m.p>
      
      <m.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "100px" }}
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 text-left w-full"
      >
        {modules.map((mod, i) => (
          <m.div
            key={i}
            variants={itemVariants}
            className="relative border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] rounded-[32px] p-6 flex flex-col hover:border-white/30 hover:-translate-y-2 transition-all duration-500 group overflow-hidden bg-white/[0.02] backdrop-blur-sm"
          >
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-500">
                {mod.icon}
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] uppercase tracking-widest text-white/50 font-semibold">{mod.moduleNum}</span>
                {mod.tag && (
                  <span className="text-[10px] uppercase tracking-widest text-orange-400 font-bold">{mod.tag}</span>
                )}
              </div>
              
              <h3 className="text-white text-xl font-medium mb-3">{mod.title}</h3>
              <p className="text-white/60 text-[13px] leading-relaxed mb-6 flex-grow">{mod.desc}</p>
              
              <div className="flex items-center gap-2 text-white/40 text-xs font-medium mt-auto pt-4 border-t border-white/10">
                <Clock size={14} />
                {mod.duration}
              </div>
            </div>
          </m.div>
        ))}
      </m.div>
    </section>
  );
};
