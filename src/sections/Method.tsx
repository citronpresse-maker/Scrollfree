import { m } from 'motion/react';
import { Check } from 'lucide-react';

const modules = [
  { 
    moduleNum: "MODULE 1", 
    title: "Sortir du pilote automatique", 
    desc: "Comprends les mécanismes invisibles qui capturent ton attention et t’empêchent de décrocher.",
    features: [
      "Identifier pourquoi tu ouvres ton téléphone sans y penser",
      "Comprendre comment les applications manipulent ton attention",
      "Repérer les moments et émotions qui déclenchent le scroll"
    ]
  },
  { 
    moduleNum: "MODULE 2", 
    title: "Briser les automatismes", 
    desc: "Réduis les réflexes compulsifs et retrouve de l’espace mental pour respirer à nouveau.",
    features: [
      "Identifier les déclencheurs invisibles qui te poussent à scroller",
      "Réduire les réflexes automatiques sans frustration",
      "Créer un environnement qui limite naturellement les distractions"
    ]
  },
  { 
    moduleNum: "MODULE 3", 
    title: "Reprendre le contrôle", 
    desc: "Transforme ton environnement et tes habitudes pour retrouver une attention stable et durable.",
    features: [
      "Réorganiser ton quotidien pour limiter les distractions",
      "Retrouver des périodes de concentration profondes",
      "Construire des habitudes qui soutiennent tes objectifs"
    ]
  },
  { 
    moduleNum: "MODULE 4", 
    title: "Ne plus rechuter", 
    desc: "Renforce ton équilibre, dépasse les moments difficiles et garde le contrôle sur le long terme.",
    features: [
      "Gérer les envies de replonger dans le scroll compulsif",
      "Éviter les rechutes pendant les périodes de stress ou d’ennui",
      "Installer des routines durables qui remplacent les anciens réflexes"
    ]
  },
  { 
    moduleNum: "MODULE 5", 
    tag: "PARENT",
    title: "Devenir un repère", 
    desc: "Aide ton enfant à construire une relation plus saine aux écrans avec calme et confiance.",
    features: [
      "Comprendre pourquoi les écrans captent autant les enfants",
      "Poser des limites sans conflits permanents ni culpabilité",
      "Mettre en place des habitudes plus saines à la maison"
    ]
  },
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
    <section id="methode" className="relative z-10 px-6 py-24 md:px-12 max-w-7xl mx-auto flex flex-col flex-wrap text-center items-center">
      <m.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "100px" }}
        className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white mb-6 max-w-4xl"
      >
        Tu n'as pas besoin de plus de volonté. <br className="hidden md:block"/>
        Tu as besoin de <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F4D3A1] to-[#D4A373]">la bonne méthode.</span>
      </m.h2>

      <m.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "100px" }}
        className="text-lg text-white/70 max-w-3xl mb-16 leading-relaxed"
      >
        Un programme complet en 5 modules, dont 1 module <span className="text-[#D4A373] font-semibold">parent</span> (pack famille) pour t'aider à reprendre le contrôle de ton attention et construire une vie alignée, plus claire et pleine de sens.
      </m.p>
      
      <m.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "100px" }}
        className="flex flex-wrap justify-center gap-8 text-left w-full"
      >
        {modules.map((mod, i) => (
          <m.div
            key={i}
            variants={itemVariants}
            className="relative rounded-[32px] p-12 flex flex-col overflow-hidden group bg-[#0A0A0A] border border-[#D4A373]/30 transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-2 hover:border-[#D4A373] hover:shadow-[0_0_50px_-12px_rgba(212,163,115,0.5)] will-change-transform w-full md:w-[calc(50%-2rem)] lg:w-[calc(33.333%-2rem)] min-w-[300px] max-w-[400px]"
          >
            {/* Internal glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4A373]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex flex-col mb-6">
                <div className="inline-flex items-center gap-2 mb-2">
                  <span className="text-[12px] uppercase tracking-[0.2em] font-black text-transparent bg-clip-text bg-gradient-to-r from-[#F4D3A1] to-[#D4A373]">
                    {mod.moduleNum}
                  </span>
                  {mod.tag && (
                    <span className="px-2 py-0.5 rounded-full bg-[#D4A373]/10 border border-[#D4A373]/20 text-[9px] uppercase tracking-widest text-[#D4A373] font-bold">
                      {mod.tag}
                    </span>
                  )}
                </div>
                <div className="h-px w-12 bg-gradient-to-r from-[#D4A373] to-transparent opacity-30" />
              </div>
              
              <h3 className="text-white text-xl font-medium mb-4 leading-tight group-hover:text-[#F4D3A1] transition-colors duration-300">
                {mod.title}
              </h3>
              
              <p className="text-white/60 text-[14px] leading-relaxed mb-10">
                {mod.desc}
              </p>
              
              <ul className="flex flex-col gap-5 mt-auto">
                {mod.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-4 text-[14px] text-white/70 leading-relaxed">
                    <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-[#D4A373]/30 transition-colors">
                      <Check size={12} className="text-[#D4A373]" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Subtle card glow on hover */}
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#D4A373]/5 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          </m.div>
        ))}
      </m.div>
    </section>
  );
};
