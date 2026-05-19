import { m } from 'motion/react';
import vortexImage from '../vortex.webp';
import CustomBrain from '../components/CustomBrain';
import { GradientIcon } from '../components/GradientIcon';

export const PsychologicalLoop = () => {
  return (
    <section className="relative z-10 px-6 py-24 md:px-12 max-w-5xl mx-auto w-full flex flex-col items-center">
      {/* La Boucle Psychologique */}
      <m.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative flex flex-col items-center text-center overflow-visible w-full"
      >
        <div className="relative z-10 w-full mb-10 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-white mb-6 max-w-4xl mx-auto uppercase">
             LA BOUCLE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffcda5] to-[#f97316]">PSYCHOLOGIQUE</span>
          </h2>
          <p className="text-white/60 text-[14px] md:text-base max-w-md mx-auto">
            Un cycle invisible qui alimente le scrolling compulsif et nous garde piégés.
          </p>
        </div>

        <div className="relative w-full max-w-[650px] aspect-square mx-auto mt-4 mb-20 hidden sm:block">
          {/* Background elements */}
          
          {/* Center Swirl - Improved Vortex matching image design */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 flex items-center justify-center overflow-visible z-10 pointer-events-none">
             <m.div
               animate={{ rotate: 360 }}
               transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
               className="relative w-full h-full flex items-center justify-center opacity-100"
             >
               <img src={vortexImage} alt="Vortex" className="w-[105%] h-[105%] max-w-none object-contain pointer-events-none drop-shadow-[0_0_20px_rgba(249,115,22,0.3)]" />
             </m.div>
              
             {/* Background Glow */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-white/5 blur-[100px] pointer-events-none" />
          </div>

          {/* Connecting Arrows (Individual Paths with Gradients) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0" viewBox="0 0 500 500">
             <defs>
               <linearGradient id="grad-v1" x1="0%" y1="100%" x2="100%" y2="0%">
                 <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
                 <stop offset="100%" stopColor="#ffffff" stopOpacity="0.5" />
               </linearGradient>
               <marker id="head-v1" viewBox="0 0 10 10" refX="0" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                 <path d="M 0 0 L 10 5 L 0 10 z" fill="#ffffff" fillOpacity="0.5"/>
               </marker>

               <linearGradient id="grad-v2" x1="0%" y1="0%" x2="100%" y2="100%">
                 <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
                 <stop offset="100%" stopColor="#ffffff" stopOpacity="0.5" />
               </linearGradient>
               <marker id="head-v2" viewBox="0 0 10 10" refX="0" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                 <path d="M 0 0 L 10 5 L 0 10 z" fill="#ffffff" fillOpacity="0.5"/>
               </marker>

               <linearGradient id="grad-v3" x1="100%" y1="0%" x2="0%" y2="100%">
                 <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
                 <stop offset="100%" stopColor="#ffffff" stopOpacity="0.5" />
               </linearGradient>
               <marker id="head-v3" viewBox="0 0 10 10" refX="0" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                 <path d="M 0 0 L 10 5 L 0 10 z" fill="#ffffff" fillOpacity="0.5"/>
               </marker>

               <linearGradient id="grad-v4" x1="100%" y1="0%" x2="0%" y2="0%">
                 <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
                 <stop offset="100%" stopColor="#ffffff" stopOpacity="0.5" />
               </linearGradient>
               <marker id="head-v4" viewBox="0 0 10 10" refX="0" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                 <path d="M 0 0 L 10 5 L 0 10 z" fill="#ffffff" fillOpacity="0.5"/>
               </marker>

               <linearGradient id="grad-v5" x1="0%" y1="100%" x2="0%" y2="0%">
                 <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
                 <stop offset="100%" stopColor="#ffffff" stopOpacity="0.5" />
               </linearGradient>
               <marker id="head-v5" viewBox="0 0 10 10" refX="0" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                 <path d="M 0 0 L 10 5 L 0 10 z" fill="#ffffff" fillOpacity="0.5"/>
               </marker>
             </defs>
             <style>
               {`
                 @keyframes pulseGlow {
                   0%, 100% { filter: drop-shadow(0 0 2px rgba(255,160,100,0)); opacity: 0.3; }
                   50% { filter: drop-shadow(0 0 15px rgba(255,160,100,1)); opacity: 1; }
                 }
                 .arrow-path { 
                   animation: pulseGlow 5s ease-in-out infinite;
                   transition: all 0.3s ease; 
                 }
               `}
             </style>
             {/* Répétition -> Déclencheur */}
             <path d="M 121 173 A 150 150 0 0 1 201 108" fill="none" stroke="url(#grad-v5)" strokeWidth="3" markerEnd="url(#head-v1)" className="arrow-path" style={{animationDelay: '4s'}} />
             {/* Déclencheur -> Scroll */}
             <path d="M 284 104 A 150 150 0 0 1 370 160" fill="none" stroke="url(#grad-v1)" strokeWidth="3" markerEnd="url(#head-v2)" className="arrow-path" style={{animationDelay: '0s'}} />
             {/* Scroll -> Dopamine */}
             <path d="M 399 237 A 150 150 0 0 1 373 336" fill="none" stroke="url(#grad-v2)" strokeWidth="3" markerEnd="url(#head-v3)" className="arrow-path" style={{animationDelay: '1s'}} />
             {/* Dopamine -> Chute */}
             <path d="M 309 388 A 150 150 0 0 1 206 393" fill="none" stroke="url(#grad-v3)" strokeWidth="3" markerEnd="url(#head-v4)" className="arrow-path" style={{animationDelay: '2s'}} />
             {/* Chute -> Répétition */}
             <path d="M 137 348 A 150 150 0 0 1 100 253" fill="none" stroke="url(#grad-v4)" strokeWidth="3" markerEnd="url(#head-v5)" className="arrow-path" style={{animationDelay: '3s'}} />
          </svg>

          {/* Loop Items positioned between arrows */}
          {/* Déclencheur */}
          <div className="absolute z-30 flex items-center justify-center" style={{ left: "50%", top: "20%", transform: "translate(-50%, -50%)" }}>
             <div className="relative flex items-center justify-center w-16 h-16">
               <div className="z-10 bg-[#050505] rounded-full text-transparent border border-transparent flex items-center justify-center">
                 <GradientIcon paths={["M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9", "M10.3 21a1.94 1.94 0 0 0 3.4 0"]} size={48} strokeWidth="2.5" />
               </div>
               <div className="absolute bottom-full mb-6 left-1/2 -translate-x-1/2 bg-[#050505]/80 backdrop-blur-sm py-3.5 px-6 rounded-2xl border border-white/5 w-max flex flex-col items-center text-center shadow-[0_0_20px_rgba(0,0,0,0.6)]">
                  <h4 className="text-white text-[13px] md:text-[15px] font-bold uppercase tracking-widest mb-1.5">Déclencheur</h4>
                  <p className="text-[#a0a0a0] text-[11px] md:text-[13px] leading-tight font-light">Un signal te pousse à agir.</p>
               </div>
             </div>
          </div>

          {/* Scroll */}
          <div className="absolute z-30 flex items-center justify-center" style={{ left: "78.4%", top: "40.6%", transform: "translate(-50%, -50%)" }}>
             <div className="relative flex items-center justify-center w-16 h-16">
               <div className="z-10 bg-[#050505] rounded-full text-transparent border border-transparent flex items-center justify-center">
                 <GradientIcon paths={["M6 6L18 18", "M18 6L6 18"]} size={56} strokeWidth="2.5" />
               </div>
               <div className="absolute left-full ml-6 top-1/2 -translate-y-1/2 bg-[#050505]/80 backdrop-blur-sm py-3.5 px-6 rounded-2xl border border-white/5 w-max flex flex-col items-start text-left shadow-[0_0_20px_rgba(0,0,0,0.6)]">
                  <h4 className="text-white text-[13px] md:text-[15px] font-bold uppercase tracking-widest mb-1.5">Scroll</h4>
                  <p className="text-[#a0a0a0] text-[11px] md:text-[13px] leading-tight font-light">Recherche effrénée de stimuli.</p>
               </div>
             </div>
          </div>

          {/* Dopamine */}
          <div className="absolute z-30 flex items-center justify-center" style={{ left: "67.6%", top: "74.2%", transform: "translate(-50%, -50%)" }}>
             <div className="relative flex items-center justify-center w-16 h-16">
               <div className="z-10 bg-[#050505] rounded-full border border-transparent flex items-center justify-center -ml-1.5 -mt-1.5">
                 <CustomBrain size={60} />
               </div>
               <div className="absolute left-full ml-6 top-1/2 -translate-y-1/2 bg-[#050505]/80 backdrop-blur-sm py-3.5 px-6 rounded-2xl border border-white/5 w-max flex flex-col items-start text-left shadow-[0_0_20px_rgba(0,0,0,0.6)]">
                  <h4 className="text-white text-[13px] md:text-[15px] font-bold uppercase tracking-widest mb-1.5">Dopamine</h4>
                  <p className="text-[#a0a0a0] text-[11px] md:text-[13px] leading-tight font-light">Plaisir éphémère et addictif.</p>
               </div>
             </div>
          </div>

          {/* Chute */}
          <div className="absolute z-30 flex items-center justify-center" style={{ left: "32.4%", top: "74.2%", transform: "translate(-50%, -50%)" }}>
             <div className="relative flex items-center justify-center w-16 h-16">
               <div className="z-10 bg-[#050505] rounded-full text-transparent border border-transparent flex items-center justify-center">
                 <GradientIcon paths={["circle:12:12:10", "M16 16s-1.5-2-4-2-4 2-4 2"]} size={48} strokeWidth="2.5" eyes={true} />
               </div>
               <div className="absolute right-full mr-6 top-1/2 -translate-y-1/2 bg-[#050505]/80 backdrop-blur-sm py-3.5 px-6 rounded-2xl border border-white/5 w-max flex flex-col items-start text-left shadow-[0_0_20px_rgba(0,0,0,0.6)]">
                  <h4 className="text-white text-[13px] md:text-[15px] font-bold uppercase tracking-widest mb-1.5">Chute</h4>
                  <p className="text-[#a0a0a0] text-[11px] md:text-[13px] leading-tight font-light">Culpabilité et vide émotionnel.</p>
               </div>
             </div>
          </div>

          {/* Répétition */}
          <div className="absolute z-30 flex items-center justify-center" style={{ left: "21.6%", top: "40.6%", transform: "translate(-50%, -50%)" }}>
             <div className="relative flex items-center justify-center w-16 h-16">
               <div className="z-10 bg-[#050505] text-transparent rounded-full border border-transparent flex items-center justify-center">
                 <GradientIcon paths={["M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", "M3 3v5h5"]} size={48} strokeWidth="2.5" />
               </div>
               <div className="absolute right-full mr-6 top-1/2 -translate-y-1/2 bg-[#050505]/80 backdrop-blur-sm py-3.5 px-6 rounded-2xl border border-white/5 w-max flex flex-col items-start text-left shadow-[0_0_20px_rgba(0,0,0,0.6)]">
                  <h4 className="text-white text-[13px] md:text-[15px] font-bold uppercase tracking-widest mb-1.5">Répétition</h4>
                  <p className="text-[#a0a0a0] text-[11px] md:text-[13px] leading-tight font-light">Ancrage profond du mécanisme.</p>
               </div>
             </div>
          </div>
        </div>

           {/* Mobile Fallback Layout for the Loop */}
        <div className="sm:hidden w-full flex flex-col space-y-6 mt-8 mb-4">
           <div className="flex flex-col items-center text-center">
              <div className="mb-2">
                 <GradientIcon paths={["M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9", "M10.3 21a1.94 1.94 0 0 0 3.4 0"]} size={40} strokeWidth="2.5" />
              </div>
              <h4 className="text-white text-[10px] font-semibold uppercase tracking-wider mb-1">Déclencheur</h4>
              <p className="text-white/50 text-[9px] leading-snug max-w-[200px]">Un déclencheur te pousse à ouvrir ton téléphone.</p>
           </div>
           
           <div className="flex justify-center my-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/20 animate-bounce">
                 <path d="M12 5v14M19 12l-7 7-7-7"/>
              </svg>
           </div>

           <div className="flex flex-col items-center text-center">
              <div className="text-white mb-2 w-[48px] h-[48px] flex items-center justify-center">
                 <GradientIcon paths={["M6 6L18 18", "M18 6L6 18"]} size={48} strokeWidth="2.5" />
              </div>
              <h4 className="text-white text-[10px] font-semibold uppercase tracking-wider mb-1">Scroll</h4>
              <p className="text-white/50 text-[9px] leading-snug max-w-[200px]">Recherche effrénée de stimuli, défilement sans fin.</p>
           </div>
           
           <div className="flex justify-center my-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/20 animate-bounce">
                 <path d="M12 5v14M19 12l-7 7-7-7"/>
              </svg>
           </div>

           <div className="flex flex-col items-center text-center">
              <div className="text-white mb-2 w-[48px] h-[48px] flex items-center justify-center">
                 <CustomBrain size={48} />
              </div>
              <h4 className="text-white text-[10px] font-semibold uppercase tracking-wider mb-1">Dopamine</h4>
              <p className="text-white/50 text-[9px] leading-snug max-w-[200px]">Ton cerveau libère de la dopamine, un plaisir court et addictif.</p>
           </div>
           
           <div className="flex justify-center my-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/20 animate-bounce">
                 <path d="M12 5v14M19 12l-7 7-7-7"/>
              </svg>
           </div>

           <div className="flex flex-col items-center text-center">
              <div className="text-white mb-2">
                 <GradientIcon paths={["circle:12:12:10", "M16 16s-1.5-2-4-2-4 2-4 2"]} size={40} strokeWidth="2.5" eyes={true} />
              </div>
              <h4 className="text-white text-[10px] font-semibold uppercase tracking-wider mb-1">Chute</h4>
              <p className="text-white/50 text-[9px] leading-snug max-w-[200px]">Vide émotionnel, perte de temps, culpabilité.</p>
           </div>
        </div>
      </m.div>
    </section>
  );
};
