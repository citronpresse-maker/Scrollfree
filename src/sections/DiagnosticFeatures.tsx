import React, { useState, useEffect } from 'react';
import { m } from 'motion/react';
import { Clock, Zap, User, Sparkles, ChevronRight } from 'lucide-react';
import { ArchetypeCarousel } from '../components/ArchetypeCarousel';
import { ScreenTimeSimulator } from '../components/ScreenTimeSimulator';
import { EmpriseSimulator } from '../components/EmpriseSimulator';

const cardTitles = [
  "Le temps volé sur une année et ce que tu aurais pu faire à la place.",
  "Ton archétype de scroller et ton niveau d'emprise.",
  "L'impact sur ton cerveau, ta concentration et ton énergie mentale.",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export const DiagnosticFeatures = () => {
  const [animationIndex, setAnimationIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationIndex((prev) => (prev + 1) % 8);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative z-10 px-6 py-24 md:py-32 md:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">

      <m.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "100px" }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="text-3xl md:text-4xl lg:text-5xl text-white mb-8 max-w-4xl mx-auto"
      >
        Le vrai coût de ton temps d'écran,{' '}
        <span className="text-[#D4A373]">enfin chiffré.</span>
      </m.h2>

      <m.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "100px" }}
        transition={{ delay: 0.08 }}
        className="text-xs font-bold tracking-[0.25em] text-[#D4A373] uppercase mb-12"
      >
        CE QUE TON RAPPORT SUR-MESURE DÉVOILE…
      </m.p>

      {/* Card titles */}
      <m.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "100px" }}
        className="hidden md:grid grid-cols-3 gap-8 md:gap-10 w-full mb-8 text-center"
      >
        {cardTitles.map((title, idx) => (
          <div key={idx} className="px-4 text-white/75 font-semibold text-[14px] leading-relaxed">
            {title}
          </div>
        ))}
      </m.div>

      {/* Cards */}
      <m.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-20"
      >
        <m.div variants={itemVariants} className="diagnostic-card relative rounded-[28px] h-[460px] overflow-hidden border border-white/[0.08] bg-[#0d0d18] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_8px_32px_rgba(0,0,0,0.4)] transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-[#D4A373]/30 will-change-transform">
          <ScreenTimeSimulator stepIndex={animationIndex % 4} />
        </m.div>

        <m.div variants={itemVariants} className="diagnostic-card relative rounded-[28px] h-[460px] overflow-hidden border border-white/[0.08] bg-[#0d0d18] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_8px_32px_rgba(0,0,0,0.4)] transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-[#D4A373]/30 will-change-transform">
          <ArchetypeCarousel currentIndex={animationIndex} />
        </m.div>

        <m.div variants={itemVariants} className="diagnostic-card relative rounded-[28px] h-[460px] overflow-hidden border border-white/[0.08] bg-[#0d0d18] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_8px_32px_rgba(0,0,0,0.4)] transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-[#D4A373]/30 will-change-transform">
          <EmpriseSimulator activeIndex={animationIndex % 4} />
        </m.div>
      </m.div>

      {/* CTA */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "100px" }}
        className="relative inline-flex w-full sm:w-auto justify-center"
      >
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 rounded-full bg-[#D4A373]/60 blur-[28px] pointer-events-none" />
        <a
          href="/simulateur"
          className="group relative z-10 inline-flex items-center gap-3 bg-[#F5EDE0] text-[#1a1209] rounded-full px-9 py-4 font-bold text-[1.05rem] tracking-[-0.015em] no-underline cursor-pointer shadow-[0_2px_0_rgba(255,255,255,0.7)_inset,0_-1px_0_rgba(0,0,0,0.12)_inset,0_8px_28px_rgba(0,0,0,0.22)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 active:scale-[0.96]"
        >
          <Sparkles size={18} className="text-[#C07830] shrink-0" />
          Calculer mon temps perdu
          <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform text-[#C07830] shrink-0" />
        </a>
      </m.div>

      <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "100px" }}
        className="flex flex-wrap justify-center gap-6 mt-6 text-sm text-white/60"
      >
        <div className="flex items-center gap-2"><Clock size={16} /> 1 minute</div>
        <div className="flex items-center gap-2"><Zap size={16} /> Résultat immédiat</div>
        <div className="flex items-center gap-2"><User size={16} /> Gratuit</div>
      </m.div>

    </section>
  );
};
