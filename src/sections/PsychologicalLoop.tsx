import { useState } from 'react';
import { m, useReducedMotion } from 'motion/react';
import vortexImage from '../vortex.webp';
import CustomBrain from '../components/CustomBrain';
import { GradientIcon } from '../components/GradientIcon';

const steps = [
  { name: 'Déclencheur', desc: "Une notification ou un moment d'ennui active un réflexe automatique d'ouverture." },
  { name: 'Scroll', desc: "Ton attention s'engouffre dans un flux infini, à la recherche d'une récompense variable." },
  { name: 'Dopamine', desc: "Ton cerveau libère une micro-dose de plaisir qui anesthésie instantanément l'effort." },
  { name: 'Chute', desc: "L'excitation retombe, laissant une fatigue mentale et un sentiment de vide." },
  { name: 'Répétition', desc: "Le cycle se verrouille, transformant un geste conscient en un besoin automatique." },
];

const nodeIcons = [
  <GradientIcon paths={['M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9', 'M10.3 21a1.94 1.94 0 0 0 3.4 0']} size={22} strokeWidth="2" />,
  <GradientIcon paths={['M6 6L18 18', 'M18 6L6 18']} size={22} strokeWidth="2" />,
  <CustomBrain size={28} />,
  <GradientIcon paths={['circle:12:12:10', 'M16 16s-1.5-2-4-2-4 2-4 2']} size={22} strokeWidth="2" eyes={true} />,
  <GradientIcon paths={['M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8', 'M3 3v5h5']} size={22} strokeWidth="2" />,
];

const nodePositions = [
  { left: '50%', top: '20%' },
  { left: '78.4%', top: '40.6%' },
  { left: '67.6%', top: '74.2%' },
  { left: '32.4%', top: '74.2%' },
  { left: '21.6%', top: '40.6%' },
];

export const PsychologicalLoop = () => {
  const reduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section className="relative z-10 px-6 py-24 md:py-32 md:px-12 max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-16 lg:gap-24 items-start">

        <m.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="flex flex-col">
          <p className="text-[11px] font-bold tracking-[0.18em] text-[#D4A373] uppercase mb-4">La boucle psychologique</p>
          <h2 className="text-3xl md:text-4xl lg:text-[2.6rem] text-white mb-6">Tu ne manques pas de volonté.</h2>
          <p className="text-white/60 text-[15px] leading-relaxed mb-8 max-w-[54ch]">
            Derrière ton écran, des armées d'ingénieurs utilisent les neurosciences pour une seule chose : maximiser ton temps de présence. Tu n'es pas faible, tu es simplement face à une mécanique conçue pour te piéger.
          </p>
          <div className="flex flex-col gap-3">
            {steps.map((step, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, x: 16, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
                onMouseEnter={() => setActiveStep(i)}
                onMouseLeave={() => setActiveStep(null)}
                className="flex gap-3.5 px-4 py-4 rounded-[32px] bg-white/[0.04] backdrop-blur-xl border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] cursor-default transition-[border-color,box-shadow,background-color] duration-300 hover:border-[#D4A373]/45 hover:bg-white/[0.07] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_0_16px_-4px_rgba(212,163,115,0.25)]"
              >
                <span className="w-5 h-5 rounded-full text-[#D4A373] text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 bg-[#D4A373]/20">{i + 1}</span>
                <div>
                  <p className="font-semibold text-[14px] mb-0.5 leading-snug text-white/90">{step.name}</p>
                  <p className="text-white/50 text-[13px] leading-relaxed">{step.desc}</p>
                </div>
              </m.div>
            ))}
          </div>
        </m.div>

        <div className="relative w-full aspect-square max-w-[520px] md:max-w-[620px] lg:max-w-[720px] mx-auto block mt-6 md:mt-[165px] lg:mt-[175px] scale-110 md:scale-[1.22] lg:scale-[1.28]" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[58%] h-[58%] flex items-center justify-center z-10 pointer-events-none">
            <m.div animate={reduceMotion ? {} : { rotate: 360 }} transition={reduceMotion ? {} : { duration: 50, repeat: Infinity, ease: 'linear' }} className="relative w-full h-full flex items-center justify-center will-change-transform">
              <img src={vortexImage} alt="" loading="lazy" decoding="async" width="400" height="400" className="w-[110%] h-[110%] max-w-none object-contain pointer-events-none drop-shadow-[0_0_10px_rgba(249,115,22,0.15)] opacity-80" />
            </m.div>
            <div className="absolute inset-0 m-auto w-40 h-40 rounded-full bg-white/5 blur-[70px] pointer-events-none" />
          </div>
          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0" viewBox="0 0 500 500">
            <defs>
              <linearGradient id="grad-v1" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#F4D3A1" stopOpacity="0.3" /><stop offset="100%" stopColor="#D4A373" stopOpacity="0.85" /></linearGradient>
              <marker id="head-v1" viewBox="0 0 10 10" refX="0" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#D4A373" fillOpacity="0.85" /></marker>
              <linearGradient id="grad-v2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#F4D3A1" stopOpacity="0.3" /><stop offset="100%" stopColor="#D4A373" stopOpacity="0.85" /></linearGradient>
              <marker id="head-v2" viewBox="0 0 10 10" refX="0" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#D4A373" fillOpacity="0.85" /></marker>
              <linearGradient id="grad-v3" x1="100%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#F4D3A1" stopOpacity="0.3" /><stop offset="100%" stopColor="#D4A373" stopOpacity="0.85" /></linearGradient>
              <marker id="head-v3" viewBox="0 0 10 10" refX="0" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#D4A373" fillOpacity="0.85" /></marker>
              <linearGradient id="grad-v4" x1="100%" y1="0%" x2="0%" y2="0%"><stop offset="0%" stopColor="#F4D3A1" stopOpacity="0.3" /><stop offset="100%" stopColor="#D4A373" stopOpacity="0.85" /></linearGradient>
              <marker id="head-v4" viewBox="0 0 10 10" refX="0" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#D4A373" fillOpacity="0.85" /></marker>
              <linearGradient id="grad-v5" x1="0%" y1="100%" x2="0%" y2="0%"><stop offset="0%" stopColor="#F4D3A1" stopOpacity="0.3" /><stop offset="100%" stopColor="#D4A373" stopOpacity="0.85" /></linearGradient>
              <marker id="head-v5" viewBox="0 0 10 10" refX="0" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#D4A373" fillOpacity="0.85" /></marker>
            </defs>
            <style>{`@keyframes pulseGlow{0%,100%{opacity:0.3}50%{opacity:1}}.arrow-path{filter:drop-shadow(0 0 8px rgba(212,163,115,0.8));animation:pulseGlow 5s ease-in-out infinite}@media(prefers-reduced-motion:reduce){.arrow-path{animation:none;opacity:0.6}}`}</style>
            <path d="M 121 173 A 150 150 0 0 1 201 108" fill="none" stroke="url(#grad-v5)" strokeWidth="3" markerEnd="url(#head-v1)" className="arrow-path" style={{ animationDelay: '4s' }} />
            <path d="M 284 104 A 150 150 0 0 1 370 160" fill="none" stroke="url(#grad-v1)" strokeWidth="3" markerEnd="url(#head-v2)" className="arrow-path" style={{ animationDelay: '0s' }} />
            <path d="M 399 237 A 150 150 0 0 1 373 336" fill="none" stroke="url(#grad-v2)" strokeWidth="3" markerEnd="url(#head-v3)" className="arrow-path" style={{ animationDelay: '1s' }} />
            <path d="M 309 388 A 150 150 0 0 1 206 393" fill="none" stroke="url(#grad-v3)" strokeWidth="3" markerEnd="url(#head-v4)" className="arrow-path" style={{ animationDelay: '2s' }} />
            <path d="M 137 348 A 150 150 0 0 1 100 253" fill="none" stroke="url(#grad-v4)" strokeWidth="3" markerEnd="url(#head-v5)" className="arrow-path" style={{ animationDelay: '3s' }} />
          </svg>
          {steps.map((step, i) => {
            const pos = nodePositions[i];
            const isActive = activeStep === i;
            return (
              <div key={i} className="absolute z-30 flex flex-col items-center gap-1.5 cursor-default" style={{ left: pos.left, top: pos.top, transform: 'translate(-50%, -50%)' }} onMouseEnter={() => setActiveStep(i)} onMouseLeave={() => setActiveStep(null)}>
                <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-[border-color,background-color,box-shadow] duration-300 ${isActive ? 'bg-[#1F1912] border border-[#D4A373] shadow-[0_0_14px_0px_rgba(212,163,115,0.28)]' : 'bg-[#0B0F19] border border-[#D4A373]/30'}`}>
                  {nodeIcons[i]}
                </div>
                <span className={`text-[9px] font-bold tracking-[0.07em] uppercase whitespace-nowrap transition-colors duration-300 ${isActive ? 'text-[#D4A373]' : 'text-white/40'}`}>{step.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
