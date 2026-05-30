import { m } from 'motion/react';
import { Check, ShieldCheck } from 'lucide-react';

interface PricingProps {
  onWaitlistClick: (pack?: string) => void;
}

export const Pricing = ({ onWaitlistClick }: PricingProps) => {
  return (
    <section className="relative z-10 px-6 py-24 md:py-32 md:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
      <m.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "100px" }} className="text-[11px] font-bold tracking-[0.18em] text-[#D4A373] uppercase mb-4">Prix de lancement</m.p>
      <m.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "100px" }}
        className="text-3xl md:text-4xl lg:text-5xl text-white mb-6 max-w-4xl"
      >
        Choisis ton <span className="text-[#D4A373]">accès.</span>
      </m.h2>

      <m.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "100px" }}
        className="text-lg text-white/70 max-w-3xl mb-16 leading-relaxed"
      >
        Tarif réduit de 40 % pour les premiers inscrits, en échange de témoignages. Accès à vie, toutes les mises à jour incluses.
      </m.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left w-full max-w-5xl mb-8">
        {/* Solo Pack */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[32px] p-10 flex flex-col overflow-hidden bg-white/[0.04] backdrop-blur-2xl border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_4px_24px_rgba(0,0,0,0.25)] transition-[transform,background-color,border-color,box-shadow,backdrop-filter] duration-500 hover:-translate-y-2 hover:bg-white/[0.09] hover:backdrop-blur-[48px] hover:border-[#D4A373]/60 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.32),0_0_20px_-6px_rgba(212,163,115,0.28)] will-change-transform group"
        >
          {/* Frost top-edge */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/55 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          {/* Golden glow on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4A373]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div className="relative z-10 flex flex-col h-full">
            <p className="text-[10px] font-bold tracking-[0.18em] text-[#D4A373] uppercase mb-4">Ados &amp; jeunes adultes</p>
            <h3 className="text-[1.6rem] text-white mb-4">Tu scrolles trop<br/>et tu le sais.</h3>
            <p className="text-white/55 text-[14px] leading-relaxed mb-6">Tu passes des heures sur ton téléphone sans vraiment le vouloir. Ton sommeil en pâtit, ta concentration aussi. Tu as essayé d'arrêter, mais la volonté ne suffit pas.</p>
            <ul className="flex flex-col gap-3 mb-8 flex-grow">
              {["Comprendre pourquoi tu n'arrives pas à décrocher", "Briser les boucles de scroll compulsif", "Exercices adaptés à ton profil", "Communauté privée d'entraide"].map(item => (
                <li key={item} className="flex items-start gap-2.5 text-[14px] text-white/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373] shrink-0 mt-[6px]" />{item}
                </li>
              ))}
            </ul>
            <div className="mb-2 flex items-baseline gap-2"><span className="text-5xl font-extrabold text-white tracking-[-0.04em]">28 €</span></div>
            <p className="text-[13px] text-white/40 mb-6">au lieu de 47 € — prix de lancement</p>
            <div className="h-[1px] w-full bg-white/10 mb-6" />
            <ul className="flex flex-col gap-3 mb-8 text-[14px] font-medium text-white/90">
              {["4 modules guidés", "Communauté privée d'entraide", "Accès à vie"].map(item => (
                <li key={item} className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-[#D4A373]/20 text-[#D4A373] flex items-center justify-center shrink-0"><Check size={12} strokeWidth={3} /></div>{item}</li>
              ))}
            </ul>
            <button onClick={() => onWaitlistClick('Solo')} className="btn-profile-glow w-full">S'inscrire à la liste d'attente</button>
          </div>
        </m.div>

        {/* Family Pack */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative rounded-[32px] p-10 flex flex-col overflow-hidden bg-white/[0.04] backdrop-blur-2xl border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_4px_24px_rgba(0,0,0,0.25)] transition-[transform,background-color,border-color,box-shadow,backdrop-filter] duration-500 hover:-translate-y-2 hover:bg-white/[0.09] hover:backdrop-blur-[48px] hover:border-[#D4A373]/60 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.32),0_0_20px_-6px_rgba(212,163,115,0.28)] will-change-transform group"
        >
          {/* Frost top-edge */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/55 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          {/* Golden glow on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4A373]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div className="relative z-10 flex flex-col h-full">
            <p className="text-[10px] font-bold tracking-[0.18em] text-[#D4A373] uppercase mb-4">Parents</p>
            <h3 className="text-[1.6rem] text-white mb-4">Tu veux aider<br/>sans aggraver.</h3>
            <p className="text-white/55 text-[14px] leading-relaxed mb-6">Tu vois l'impact sur ton ado : sommeil, humeur, résultats scolaires. Confisquer le téléphone ne marche pas. Tu cherches une approche qui fonctionne sans blesser la relation.</p>
            <ul className="flex flex-col gap-3 mb-8 flex-grow">
              {["Comprendre ton ado (et son cerveau)", "Savoir quoi dire, sans aggraver", "Poser un cadre qui fonctionne", "Module parents + programme complet inclus"].map(item => (
                <li key={item} className="flex items-start gap-2.5 text-[14px] text-white/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373] shrink-0 mt-[6px]" />{item}
                </li>
              ))}
            </ul>
            <div className="mb-2 flex items-baseline gap-2"><span className="text-5xl font-extrabold text-white tracking-[-0.04em]">47 €</span></div>
            <p className="text-[13px] text-white/40 mb-6">au lieu de 79 € — prix de lancement</p>
            <div className="h-[1px] w-full bg-white/10 mb-6" />
            <ul className="flex flex-col gap-3 mb-8 text-[14px] font-medium text-white/90">
              {["4 modules guidés + module parent", "Communauté privée d'entraide", "Espace parents dédié"].map(item => (
                <li key={item} className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-[#D4A373]/20 text-[#D4A373] flex items-center justify-center shrink-0"><Check size={12} strokeWidth={3} /></div>{item}</li>
              ))}
            </ul>
            <button onClick={() => onWaitlistClick('Famille')} className="btn-profile-glow w-full">S'inscrire à la liste d'attente</button>
          </div>
        </m.div>
      </div>

      {/* Guarantee */}
      <m.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "100px" }}
        className="relative w-full max-w-5xl rounded-[32px] p-8 flex flex-col md:flex-row items-center gap-8 text-left overflow-hidden mt-8 bg-white/[0.04] backdrop-blur-[48px] backdrop-saturate-150 border border-white/[0.08] border-t-white/[0.14] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_8px_40px_rgba(0,0,0,0.35)]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4A373]/6 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 flex items-center justify-center w-20 h-20 shrink-0">
          <div className="absolute inset-0 bg-[#D4A373]/20 rounded-3xl rotate-12 opacity-80 blur-md"></div>
          <div className="relative bg-[#D4A373]/10 w-16 h-16 rounded-2xl flex items-center justify-center border border-[#D4A373]/30 shadow-xl">
            <ShieldCheck size={32} className="text-[#F4D3A1]" />
          </div>
        </div>

        <div className="relative z-10">
          <h3 className="text-white text-xl font-medium mb-2">Satisfait ou remboursé — 7 jours</h3>
          <p className="text-white/70 text-[14px] leading-relaxed">Si tu suis le programme et que tu ne constates aucun changement<br className="hidden md:block"/>dans les 7 jours, <span className="text-white font-medium">on te rembourse intégralement</span>. Sans question, sans délai.</p>
        </div>
      </m.div>
    </section>
  );
};
