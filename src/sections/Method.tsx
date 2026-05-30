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
    moduleNum: "BONUS",
    tag: "INCLUS",
    title: "Ce qui t'accompagne",
    desc: "Tout ce dont tu as besoin pour rester sur la bonne voie et ancrer les changements durablement.",
    features: [
      "Plan d'action jour par jour",
      "Communauté privée d'entraide",
      "Exercices pratiques adaptés",
      "Fiches ressources téléchargeables",
      "Suivi de progression",
      "Accès à vie + mises à jour incluses",
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
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  },
};

export const Method = () => {
  return (
    <section className="relative z-10 px-6 py-24 md:py-32 md:px-12 max-w-7xl mx-auto flex flex-col flex-wrap text-center items-center">
      <m.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "100px" }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="text-[11px] font-bold tracking-[0.18em] text-[#D4A373] uppercase mb-4">
        La méthode Origine
      </m.p>
      <m.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "100px" }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.07 }}
        className="text-3xl md:text-4xl lg:text-5xl text-white mb-6 max-w-4xl"
      >
        Tu n'as pas besoin de plus de volonté. <br className="hidden md:block"/>
        Tu as besoin de <span className="text-[#D4A373]">la bonne méthode.</span>
      </m.h2>

      <m.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "100px" }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
        className="text-white/70 max-w-3xl mb-16 leading-relaxed"
      >
        Un programme en 5 modules pour comprendre les mécanismes, briser les automatismes et construire des habitudes durables, à ton rythme.
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
            className="relative rounded-[32px] p-12 flex flex-col overflow-hidden group bg-white/[0.04] backdrop-blur-2xl border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_4px_24px_rgba(0,0,0,0.25)] transition-[transform,background-color,border-color,box-shadow,backdrop-filter] duration-500 hover:-translate-y-2 hover:bg-white/[0.09] hover:backdrop-blur-[48px] hover:border-[#D4A373]/60 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.32),0_0_20px_-6px_rgba(212,163,115,0.28)] will-change-transform w-full md:w-[calc(50%-2rem)] lg:w-[calc(33.333%-2rem)] min-w-[300px] max-w-[400px]"
          >
            {/* Frost top-edge */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/55 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            {/* Golden glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4A373]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex flex-col mb-6">
                <div className="inline-flex items-center gap-2 mb-2">
                  <span className="text-[12px] uppercase tracking-[0.2em] font-black text-[#D4A373]">
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
