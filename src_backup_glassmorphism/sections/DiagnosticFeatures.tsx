import { m } from 'motion/react';
import { User, Activity, Brain, Clock, Zap, Sparkles, ChevronRight } from 'lucide-react';

const diagnosticFeatures = [
  { icon: <User size={24} />, title: "Découvre ton profil de scroll", desc: "Le diagnostic révèle le type de mécanisme comportemental qui influence ton rapport aux réseaux." },
  { icon: <Activity size={24} />, title: "Mesure ton niveau d’emprise", desc: "Vois l’impact réel de ton scroll sur ton attention, ton temps et tes habitudes." },
  { icon: <Brain size={24} />, title: "Observe tes schémas invisibles", desc: "Comprends les comportements qui influencent automatiquement ta manière de scroller." }
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

export const DiagnosticFeatures = () => {
  return (
    <section className="relative z-10 px-6 pt-64 pb-32 md:py-40 md:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
      <m.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "100px" }}
        className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white mb-6 max-w-4xl mx-auto"
      >
        Tu ne scrolles pas pour les <br className="hidden md:block"/>
        raisons que tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffcda5] to-[#f97316]">crois.</span>
      </m.h2>
      
      <m.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "100px" }}
        className="text-[17px] text-white/70 max-w-2xl mb-16 md:mb-12 leading-relaxed"
      >
        Le temps d'écran n'est que la partie visible.<br/>
        Ce diagnostic révèle ton profil de scroll, ton niveau d'emprise et les schémas comportementaux qui influencent ton rapport au téléphone.
      </m.p>
      
      <m.button
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "100px" }}
        className="group relative px-8 py-4 bg-gradient-to-r from-white to-[#ffcda5] rounded-full font-bold text-[#1a1a24] text-lg hover:shadow-[0_0_40px_8px_rgba(255,205,165,0.4)] transition-all duration-300 flex items-center justify-center gap-3 w-full sm:w-auto"
      >
        <Sparkles size={20} className="mr-2 text-[#1a1a24]" />
        Découvrir mon profil de scroll
        <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform text-[#1a1a24]" />
      </m.button>
      
      <m.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "100px" }}
        className="flex flex-wrap justify-center gap-6 mt-6 text-sm text-white mb-20"
      >
        <div className="flex items-center gap-2"><Clock size={16} className="text-white" /> 1 minute</div>
        <div className="flex items-center gap-2"><Zap size={16} className="text-white" /> Résultat immédiat</div>
        <div className="flex items-center gap-2"><User size={16} className="text-white" /> Gratuit</div> 
      </m.div>

      <m.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full"
      >
        {diagnosticFeatures.map((feature, i) => (
          <m.div
            key={i}
            variants={itemVariants}
            className="relative border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] rounded-[40px] p-10 min-h-[320px] flex flex-col items-center justify-center text-center hover:border-white/30 hover:-translate-y-2 transition-all duration-500 group overflow-hidden bg-white/[0.02] backdrop-blur-sm"
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500 pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center justify-center h-full">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform duration-500 shrink-0">
                {feature.icon}
              </div>
              <h3 className="text-white text-lg font-medium mb-4">{feature.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-2 max-w-[280px] mx-auto">{feature.desc}</p>
            </div>
          </m.div>
        ))}
      </m.div>
    </section>
  );
};
