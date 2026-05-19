import { m } from 'motion/react';
import { Star, Quote, Sparkles } from 'lucide-react';

const testimonials = [
  {
    text: "Ma fille de 14 ans a été hospitalisée 3 semaines pour dépression sévère. Les médecins ont été clairs : l'usage nocturne des réseaux avait déclenché un épisode psychiatrique. Personne ne nous avait dit que c'était possible. Personne.",
    name: "Isabelle, 44 ans",
    role: "Mère de famille, Bordeaux",
    avatar: "https://i.pravatar.cc/150?u=isabelle",
    tag: "PARENT"
  },
  {
    text: "J'ai raté mon bac parce que je passais mes nuits sur TikTok au lieu de dormir. C'est quand j'ai compris le mécanisme que j'ai pu m'en sortir. J'ai eu mon bac l'année d'après.",
    name: "Mathis, 18 ans",
    role: "Lycéen, Lyon",
    avatar: "https://i.pravatar.cc/150?u=mathis",
    tag: "BAC RATÉ → RATTRAPÉ"
  },
  {
    text: "Les apps de contrôle du temps d'écran : ça tient 3 jours. Elles mettent un pansement sur une hémorragie. Comprendre pourquoi mon cerveau cherchait cette dopamine — ça, ça a tout changé.",
    name: "Laurent, 27 ans",
    role: "Développeur, Paris",
    avatar: "https://i.pravatar.cc/150?u=laurent",
    tag: "4H → 35MIN/JOUR"
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
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  },
};

export const Testimonials = () => {
  return (
    <section className="relative z-10 px-6 py-24 md:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
      <m.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "100px" }}
        className="uppercase tracking-widest text-[11px] text-white/50 mb-4"
      >
        Ce qu'ils disent
      </m.p>
      <m.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "100px" }}
        className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white mb-6 max-w-4xl mx-auto"
      >
        Ils ont repris le <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffcda5] to-[#f97316]">Contrôle</span>
      </m.h2>

      <m.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left"
      >
        {testimonials.map((testimonial, i) => (
          <m.div
            key={i}
            variants={itemVariants}
            className="relative border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] rounded-[32px] p-8 flex flex-col hover:border-white/30 hover:-translate-y-2 transition-all duration-500 group overflow-hidden bg-white/[0.02] backdrop-blur-sm"
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-1.5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={16} className="fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <Quote size={40} className="text-white/10 -mt-2" />
              </div>
              
              <p className="text-white/80 text-[15px] leading-relaxed mb-8 flex-grow">
                {testimonial.text}
              </p>
              
              <div className="flex items-center gap-4 mb-8">
                {/* Img with lazy loading applied */}
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  loading="lazy"
                  className="w-12 h-12 rounded-full object-cover border border-white/20" 
                />
                <div>
                  <h4 className="text-white font-medium text-sm">{testimonial.name}</h4>
                  <p className="text-white/50 text-xs mt-1">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="inline-flex items-center justify-center w-full py-2.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-[11px] font-medium tracking-wide">
                <Sparkles size={12} className="mr-2 opacity-50" />
                {testimonial.tag}
              </div>
            </div>
          </m.div>
        ))}
      </m.div>
    </section>
  );
};
