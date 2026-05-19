import { m } from 'motion/react';
import { Users, Brain, Activity, HeartCrack, Moon, Frown } from 'lucide-react';
import { BrainEffectGraph } from '../components/BrainEffectGraph';

const stats = [
  {
    icon: <Users size={32} strokeWidth={1.5} className="mt-1" />,
    value: "73%",
    text: "des gens qui essaient de réduire leur usage seuls rechutent dans les 3 premiers mois.",
    source: "Journal of Behavioral Addictions\nAPA Digital Health Report 2024",
    hasGraph: false
  },
  {
    icon: <Brain size={32} className="mt-1" strokeWidth={1.5} />,
    value: "21j",
    text: "suffisent pour recâbler les circuits dopaminergiques et retrouver un rapport sain à l'écran.",
    source: "Neuroplasticité comportementale\nEuropean Journal of Social Psychology, 2010",
    hasGraph: false
  },
  {
    icon: <Activity size={32} strokeWidth={1.5} className="mt-1" />,
    value: "×2,14",
    text: "Un usage problématique rend 2,14 fois plus susceptible de souffrir d'anxiété chronique. Corrélation confirmée sur 33 650 étudiants.",
    source: "J. Behavioral Addictions -\nMéta-analyse, 2020",
    hasGraph: false
  },
  {
    icon: <HeartCrack size={32} strokeWidth={1.5} className="mt-1" />,
    value: "×2,15",
    text: "Chaque notification déclenche une réponse au stress, augmentant le niveau de cortisol basal.",
    source: "Impact des notifications sur le stress\nÉtudes scientifiques peer-reviewed",
    hasGraph: true
  },
  {
    icon: <Moon size={32} strokeWidth={1.5} className="mt-1" />,
    value: "×2,60",
    text: "La lumière bleue et la stimulation dopaminergique retardent l'endormissement en moyenne de 1h30.",
    source: "BMC Psychiatry - Sohn et al.,\nKing's College London, 2019",
    hasGraph: true
  },
  {
    icon: <Frown size={32} strokeWidth={1.5} className="mt-1" />,
    value: "×3,17",
    text: "Les ados avec un usage problématique sont 3,17 fois plus susceptibles de souffrir de dépression.",
    source: "BMC Psychiatry -\nKing's College London, 2019",
    hasGraph: true
  }
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
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  },
};

export const Stats = () => {
  return (
    <section className="relative px-6 py-24 md:px-12 md:py-32 max-w-7xl mx-auto">
      <div className="text-center mb-16 md:mb-20">
        <m.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white mb-6 max-w-4xl mx-auto"
        >
          Le Coût <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F4D3A1] to-[#D4A373]">Invisible</span>
        </m.h2>
        <m.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ delay: 0.1 }}
          className="text-white/70 text-[17px] max-w-2xl mx-auto"
        >
          Les chiffres qui montrent pourquoi reprendre le contrôle de ton attention change tout.
        </m.p>
      </div>

      <m.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      >
        {stats.map((stat, i) => (
          <m.div
            key={i}
            variants={itemVariants}
            className="relative rounded-[32px] p-7 lg:p-8 flex flex-col items-start overflow-hidden group bg-[#0A0A0A] border border-[#D4A373]/30 transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-2 hover:border-[#D4A373] hover:shadow-[0_0_50px_-12px_rgba(212,163,115,0.5)] will-change-transform"
          >
            {/* Internal glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4A373]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            {/* Optimized overlay transitions using opacity */}
            <div className="absolute inset-0 transition-opacity duration-500 pointer-events-none bg-black/40 group-hover:opacity-0" />

            {/* Subtle top edge highlight for glass effect */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />
            {/* Subtle internal glare on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full w-full">
              <div className="flex items-center gap-4 mb-5">
                <div className="text-white shrink-0 [&_svg]:!w-8 [&_svg]:!h-8 [&_svg]:!stroke-1">
                  {stat.icon}
                </div>
                <span 
                  className="text-4xl lg:text-[48px] font-light tracking-tight text-white"
                  style={{ textShadow: '0 0 15px rgba(255,255,255,0.4), 0 0 30px rgba(255,255,255,0.2)' }}
                >
                  {stat.value}
                </span>
              </div>
              <p className="text-white text-[14px] lg:text-[15px] font-normal leading-[1.6] mb-8 flex-grow">
                {stat.text}
              </p>
              {stat.hasGraph && (
                <div className="mb-6 w-full opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  <BrainEffectGraph />
                </div>
              )}
              <p className="text-[#a0a0a0] text-[10px] whitespace-pre-line leading-[1.5] mt-auto uppercase tracking-widest">
                {stat.source}
              </p>
            </div>
          </m.div>
        ))}
      </m.div>
    </section>
  );
};
