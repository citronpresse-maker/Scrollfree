import { m } from 'motion/react';
import { User, Users, ChevronRight, Check, ShieldCheck, Sparkles } from 'lucide-react';

interface PricingProps {
  onWaitlistClick: (pack?: string) => void;
}

export const Pricing = ({ onWaitlistClick }: PricingProps) => {
  return (
    <section className="relative z-10 px-6 py-24 md:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
      <m.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "100px" }}
        className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white mb-6 max-w-4xl"
      >
        Choisis ton <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F4D3A1] to-[#D4A373]">accès</span>
      </m.h2>

      <m.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "100px" }}
        className="text-lg text-white/70 max-w-3xl mb-16 leading-relaxed"
      >
        Prix de lancement — <span className="font-semibold text-[#D4A373]">-40% pour les premiers</span> en échange de témoignages.
      </m.p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left w-full max-w-5xl mb-8">
        {/* Solo Pack */}
        <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "100px" }}
            transition={{ duration: 0.6 }}
            className="relative rounded-[32px] p-10 flex flex-col overflow-hidden bg-[#0A0A0A] border border-[#D4A373]/30 transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-2 hover:border-[#D4A373] hover:shadow-[0_0_50px_-12px_rgba(212,163,115,0.5)] will-change-transform group"
          >
            {/* Internal glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4A373]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
              <User size={120} />
            </div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-[10px] uppercase tracking-wider font-semibold w-fit mb-6">
                Ados • Jeunes Adultes
              </div>
              
              <h3 className="text-white text-3xl font-medium mb-2 uppercase tracking-tight">Pack Solo</h3>
              <p className="text-white/60 text-[14px] leading-relaxed mb-6">Reprends le contrôle de ton attention.<br/>Accès immédiat, à ton rythme.</p>
              
              <div className="mb-8 flex items-baseline gap-2">
                <span className="text-6xl font-medium text-white tracking-tighter">28€</span>
                <div className="flex flex-col text-sm text-white/40">
                  <span>au lieu de <span className="line-through">47€</span></span>
                </div>
              </div>
              
              <ul className="flex flex-col gap-4 mb-8 text-[15px] text-white/70 flex-grow">
                <li className="flex items-start gap-3"><ChevronRight size={18} className="text-white mt-0.5 shrink-0" /><span>Comprendre pourquoi tu n'arrives pas à t'arrêter</span></li>
                <li className="flex items-start gap-3"><ChevronRight size={18} className="text-white mt-0.5 shrink-0" /><span>Briser les boucles de scroll</span></li>
                <li className="flex items-start gap-3"><ChevronRight size={18} className="text-white mt-0.5 shrink-0" /><span>Exercices adaptés à TON profil</span></li>
              </ul>
              
              <div className="h-[1px] w-full bg-white/10 mb-8" />
              
              <ul className="flex flex-col gap-4 mb-8 text-[15px] font-medium text-white/90">
                <li className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-[#D4A373]/20 text-[#D4A373] flex items-center justify-center shrink-0"><Check size={14} strokeWidth={3} /></div><span>+ 4 modules guidés</span></li>
                <li className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-[#D4A373]/20 text-[#D4A373] flex items-center justify-center shrink-0"><Check size={14} strokeWidth={3} /></div><span>+ Communauté privée d'entraide</span></li>
                <li className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-[#D4A373]/20 text-[#D4A373] flex items-center justify-center shrink-0"><Check size={14} strokeWidth={3} /></div><span>+ Accès à vie</span></li>
              </ul>
              
              <button 
                onClick={() => onWaitlistClick('Solo')}
                className="btn-profile-glow w-full"
              >
                S'inscrire à la liste d'attente (Pack Solo)
              </button>
            </div>
        </m.div>

        {/* Family Pack */}
        <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative rounded-[32px] p-10 flex flex-col overflow-hidden bg-[#0A0A0A] border border-[#D4A373]/30 transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-2 hover:border-[#D4A373] hover:shadow-[0_0_50px_-12px_rgba(212,163,115,0.5)] will-change-transform group"
          >
            {/* Internal glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4A373]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
              <Users size={150} />
            </div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-[10px] uppercase tracking-wider font-bold w-fit mb-6">
                <Sparkles size={12} /> Le plus choisi • Parents + Ados
              </div>
              
              <h3 className="text-white text-3xl font-medium mb-2 uppercase tracking-tight">Pack Famille</h3>
              <p className="text-white/60 text-[14px] leading-relaxed mb-6">Aide ton ado — sans conflit.<br/>Pour une approche systémique.</p>
              
              <div className="mb-8 flex items-baseline gap-2">
                <span className="text-6xl font-medium text-white tracking-tighter">47€</span>
                <div className="flex flex-col text-sm text-white/40">
                  <span>au lieu de <span className="line-through">79€</span></span>
                </div>
              </div>
              
              <ul className="flex flex-col gap-4 mb-8 text-[15px] text-white/70 flex-grow">
                <li className="flex items-start gap-3"><ChevronRight size={18} className="text-white mt-0.5 shrink-0" /><span>Comprendre ton ado</span></li>
                <li className="flex items-start gap-3"><ChevronRight size={18} className="text-white mt-0.5 shrink-0" /><span>Savoir quoi dire (sans aggraver)</span></li>
                <li className="flex items-start gap-3"><ChevronRight size={18} className="text-white mt-0.5 shrink-0" /><span>Poser un cadre qui fonctionne</span></li>
              </ul>
              
              <div className="h-[1px] w-full bg-white/10 mb-8" />
              
              <ul className="flex flex-col gap-4 mb-8 text-[15px] font-medium text-white/90">
                <li className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-[#D4A373]/20 text-[#D4A373] flex items-center justify-center shrink-0"><Check size={14} strokeWidth={3} /></div><span>+ Tout le Pack Solo</span></li>
                <li className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-[#D4A373]/20 text-[#D4A373] flex items-center justify-center shrink-0"><Check size={14} strokeWidth={3} /></div><span>+ Module parents guidé</span></li>
                <li className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-[#D4A373]/20 text-[#D4A373] flex items-center justify-center shrink-0"><Check size={14} strokeWidth={3} /></div><span>+ Communauté privée d'entraide</span></li>
                <li className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-[#D4A373]/20 text-[#D4A373] flex items-center justify-center shrink-0"><Check size={14} strokeWidth={3} /></div><span>+ Espace parents dédié</span></li>
              </ul>
              
              <button 
                onClick={() => onWaitlistClick('Famille')}
                className="btn-profile-glow w-full"
              >
                S'inscrire à la liste d'attente (Pack Famille)
              </button>
            </div>
        </m.div>
      </div>

      {/* Guarantee */}
      <m.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "100px" }}
        className="relative w-full max-w-5xl rounded-[32px] p-8 flex flex-col md:flex-row items-center gap-8 text-left overflow-hidden mt-8 bg-[#0A0A0A] border border-[#D4A373]/30 shadow-2xl"
      >
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4A373]/5 to-transparent pointer-events-none" />

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
      </m.div>    </section>
  );
};
