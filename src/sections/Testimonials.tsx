import { m } from 'motion/react';

const testimonials = [
  {
    text: "Ma fille de 14 ans a été hospitalisée 3 semaines pour dépression sévère. Les médecins ont été clairs : l'usage nocturne des réseaux avait déclenché un épisode psychiatrique. Personne ne nous avait dit que c'était possible. Personne.",
    name: "Isabelle, 44 ans",
    role: "Mère de famille, Bordeaux",
    avatar: "https://i.pravatar.cc/150?u=isabelle",
    tag: "Parent",
  },
  {
    text: "J'ai raté mon bac parce que je passais mes nuits sur TikTok au lieu de dormir. C'est quand j'ai compris le mécanisme que j'ai pu m'en sortir. J'ai eu mon bac l'année d'après.",
    name: "Mathis, 18 ans",
    role: "Lycéen, Lyon",
    avatar: "https://i.pravatar.cc/150?u=mathis",
    tag: "Bac raté → rattrapé",
  },
  {
    text: "Les apps de contrôle du temps d'écran, ça tient 3 jours. Elles mettent un pansement sur une hémorragie. Comprendre pourquoi mon cerveau cherchait cette dopamine : ça, ça a tout changé.",
    name: "Laurent, 27 ans",
    role: "Développeur, Paris",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=250&auto=format&fit=crop",
    tag: "4h → 35 min/jour",
  },
];

export const Testimonials = () => {
  return (
    <section className="relative z-10 px-6 py-24 md:py-32 md:px-12 max-w-7xl mx-auto">
      <div className="mb-14 md:mb-20">
        <m.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-[11px] font-bold tracking-[0.18em] text-[#D4A373] uppercase mb-4"
        >
          Témoignages
        </m.p>
        <m.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.07 }}
          className="text-3xl md:text-4xl lg:text-5xl text-white max-w-2xl"
        >
          Ce qu'ils disent.
        </m.h2>
      </div>
      <div className="flex flex-col">
        {testimonials.map((t, i) => (
          <m.article
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
            className={`py-10 md:py-14 flex flex-col md:flex-row gap-8 md:gap-20 items-start${i > 0 ? ' border-t border-[#D4A373]/15' : ''}`}
          >
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold tracking-[0.18em] text-[#D4A373] uppercase mb-5">{t.tag}</p>
              <blockquote className="text-[17px] md:text-[19px] font-light text-white/80 leading-[1.65] text-pretty">
                «&nbsp;{t.text}&nbsp;»
              </blockquote>
            </div>
            <div className="flex items-center gap-4 md:flex-col md:items-start md:w-44 md:pt-10 shrink-0">
              <img src={t.avatar} alt={t.name} loading="lazy" decoding="async" width="52" height="52" className="w-13 h-13 rounded-full object-cover border border-white/15 shrink-0" />
              <div>
                <p className="text-white font-semibold text-[14px] leading-snug">{t.name}</p>
                <p className="text-white/45 text-[12px] mt-1">{t.role}</p>
              </div>
            </div>
          </m.article>
        ))}
      </div>
    </section>
  );
};
