import { m, AnimatePresence } from 'motion/react';

const steps = [
  { hours: 5.8, days: 88 },
  { hours: 3.2, days: 49 },
  { hours: 2.5, days: 38 },
  { hours: 4.5, days: 68 },
];

interface ScreenTimeSimulatorProps {
  stepIndex: number;
}

export const ScreenTimeSimulator = ({ stepIndex }: ScreenTimeSimulatorProps) => {
  const step = steps[stepIndex % steps.length];
  const maxH = 8;
  const pct = Math.min(step.hours / maxH, 1);

  return (
    <div className="flex flex-col justify-between items-center w-full h-full px-5 pt-5 pb-7 text-center">

      {/* Slider inner card */}
      <div className="w-full rounded-2xl bg-white/[0.05] border border-white/[0.06] px-5 py-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-white/50">
            Temps d'écran quotidien
          </span>
          <AnimatePresence mode="wait">
            <m.span
              key={step.hours}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.25 }}
              className="text-[0.85rem] font-bold text-white tabular-nums"
            >
              {step.hours}h<span className="text-white/35 font-normal"> / jour</span>
            </m.span>
          </AnimatePresence>
        </div>
        <div className="relative w-full h-[3px] rounded-full bg-white/20">
          <m.div
            className="absolute left-0 top-0 h-full rounded-full bg-white"
            animate={{ width: `${pct * 100}%` }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
          <m.div
            className="absolute top-1/2 -translate-y-1/2 w-[18px] h-[18px] rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.55)]"
            animate={{ left: `calc(${pct * 100}% - 9px)` }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Days — centered */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-white/30">
          Jours de vie perdus par an
        </span>
        <div className="flex items-baseline justify-center gap-3">
          <AnimatePresence mode="wait">
            <m.span
              key={step.days}
              initial={{ opacity: 0, scale: 0.82 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-[5rem] font-black leading-none text-white tabular-nums"
              style={{ textShadow: '0 0 48px rgba(255,255,255,0.12)' }}
            >
              {step.days}
            </m.span>
          </AnimatePresence>
          <span className="text-[1rem] font-bold uppercase tracking-[0.1em] text-white/50 pb-1">
            Jours
          </span>
        </div>
      </div>

    </div>
  );
};
