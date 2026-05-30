import { useRef, useEffect } from 'react';
import { m, useInView, useReducedMotion } from 'motion/react';
import { Users, Brain, Activity, HeartCrack, Moon, Frown } from 'lucide-react';

function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const reduceMotion = useReducedMotion();
  const match = value.match(/^(\+?)(\d+)(.*)/);
  const prefix = match?.[1] ?? '';
  const target = parseInt(match?.[2] ?? '0');
  const suffix = match?.[3] ?? '';
  useEffect(() => {
    if (!ref.current) return;
    if (!isInView || reduceMotion) { ref.current.textContent = value; return; }
    const duration = 1400;
    let start: number | null = null;
    let raf: number;
    function expo(t: number) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); }
    function tick(now: number) {
      if (start === null) start = now;
      const t = Math.min((now - start) / duration, 1);
      if (ref.current) ref.current.textContent = prefix + Math.round(expo(t) * target) + suffix;
      if (t < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, reduceMotion, target, prefix, suffix, value]);
  return <span ref={ref} className={className}>{value}</span>;
}

const stats = [
  {
    icon: <Users size={32} strokeWidth={1.5} className="mt-1" />,
    value: "73%",
    text: "des gens qui essaient de réduire leur usage seuls rechutent dans les 3 premiers mois.",
    source: "Journal of Behavioral Addictions\nAPA Digital Health Report 2024",
  },
  {
    icon: <Brain size={32} className="mt-1" strokeWidth={1.5} />,
    value: "21j",
    text: "suffisent pour recâbler les circuits dopaminergiques et retrouver un rapport sain à l'écran.",
    source: "Neuroplasticité comportementale\nEuropean Journal of Social Psychology, 2010",
  },
  {
    icon: <Activity size={32} strokeWidth={1.5} className="mt-1" />,
    value: "+114%",
    text: "de risque supplémentaire de souffrir d'anxiété chronique en cas d'usage problématique.",
    source: "J. Behavioral Addictions -\nMéta-analyse, 2020",
  },
  {
    icon: <HeartCrack size={32} strokeWidth={1.5} className="mt-1" />,
    value: "+115%",
    text: "d'augmentation du cortisol basal. Chaque notification déclenche une réponse au stress mesurable.",
    source: "Impact des notifications sur le stress\nÉtudes scientifiques peer-reviewed",
  },
  {
    icon: <Moon size={32} strokeWidth={1.5} className="mt-1" />,
    value: "+160%",
    text: "de risque de troubles du sommeil. La lumière bleue et la dopamine retardent l'endormissement en moyenne de 1h30.",
    source: "BMC Psychiatry - Sohn et al.,\nKing's College London, 2019",
  },
  {
    icon: <Frown size={32} strokeWidth={1.5} className="mt-1" />,
    value: "+217%",
    text: "de risque de dépression chez les ados avec un usage problématique des réseaux sociaux.",
    source: "BMC Psychiatry -\nKing's College London, 2019",
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
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  },
};

export const Stats = () => {
  return (
    <section className="relative px-6 py-24 md:py-32 md:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-16 md:mb-20">
        <m.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-[11px] font-bold tracking-[0.18em] text-[#D4A373] uppercase mb-4"
        >
          Ce que dit la science
        </m.p>
        <m.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.07 }}
          className="text-3xl md:text-4xl lg:text-5xl text-white mb-6 max-w-4xl mx-auto"
        >
          Le coût <span className="text-[#D4A373]">invisible</span>
        </m.h2>
        <m.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
          className="text-white/70 text-[17px] max-w-2xl mx-auto"
        >
          Les données qui expliquent pourquoi reprendre le contrôle est crucial.
        </m.p>
      </div>

      <m.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
      >
        {stats.map((stat, i) => (
          <m.div
            key={i}
            variants={itemVariants}
            className="relative rounded-[32px] p-7 lg:p-8 flex flex-col items-start overflow-hidden group
              bg-white/[0.04] backdrop-blur-2xl
              border border-white/[0.10]
              shadow-[inset_0_1px_0_rgba(255,255,255,0.14),inset_0_-1px_0_rgba(255,255,255,0.04),0_4px_24px_rgba(0,0,0,0.25)]
              transition-[transform,background-color,border-color,box-shadow,backdrop-filter] duration-500
              hover:-translate-y-2
              hover:bg-white/[0.09] hover:backdrop-blur-[48px]
              hover:border-[#D4A373]/60
              hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.32),inset_0_-1px_0_rgba(255,255,255,0.08),0_0_20px_-6px_rgba(212,163,115,0.28)]
              will-change-transform"
          >
            {/* Frost top-edge shimmer — always visible */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

            {/* Frost top-edge shimmer — intensifies on hover */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/55 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />

            {/* Golden glow on hover — identique aux cartes Pricing */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4A373]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full w-full">
              <CountUp value={stat.value} className="text-4xl lg:text-[52px] font-extrabold tracking-[-0.04em] leading-none text-white mb-5" />
              <p className="text-white text-[14px] lg:text-[15px] font-normal leading-[1.6] mb-8 flex-grow">
                {stat.text}
              </p>
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
