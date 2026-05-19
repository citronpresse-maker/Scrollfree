import { m, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Plus, Minus, ChevronRight } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="border-b border-white/5 last:border-0"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className="flex w-full items-center justify-between py-6 text-left transition-colors duration-300 group"
        aria-expanded={isOpen}
      >
        <span className={`text-[16px] md:text-[18px] font-medium transition-colors duration-300 pr-4 ${isOpen ? 'text-[#F4D3A1]' : 'text-white/70 group-hover:text-white'}`}>
          {question}
        </span>
        <div className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          {isOpen ? (
            <Minus size={20} className="text-[#D4A373]" />
          ) : (
            <Plus size={20} className="text-white/30 group-hover:text-white/60" />
          )}
        </div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-[15px] md:text-[16px] leading-relaxed text-white/50">
              {answer}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const faqData = [
  {
    category: "Programme & Résultats",
    questions: [
      { 
        q: "Comment Scrollfree aide-t-il à réduire l’addiction aux écrans ?", 
        a: "Contrairement aux applications de blocage qui ne traitent que les symptômes, Scrollfree s'attaque à la racine : les circuits de la dopamine dans ton cerveau. On t'apprend à identifier les déclencheurs psychologiques et à reprogrammer tes réflexes de 'scroll' automatique." 
      },
      { 
        q: "En combien de temps puis-je voir des changements ?", 
        a: "La prise de conscience est immédiate. La plupart de nos membres constatent une réduction drastique de leur temps d'écran 'passif' dès la première semaine, une fois les premiers exercices de déconnexion intentionnelle mis en place." 
      },
      { 
        q: "Que vais-je concrètement apprendre dans la formation ?", 
        a: "Tu vas apprendre à cartographier ton profil d'utilisateur, à configurer ton environnement numérique pour qu'il cesse de te solliciter, et surtout, à gérer l'ennui ou le stress sans avoir besoin de ton téléphone comme béquille émotionnelle." 
      },
      { 
        q: "Combien de temps faut-il consacrer à Scrollfree chaque semaine ?", 
        a: "Le programme est conçu pour les gens occupés. 15 à 20 minutes par jour suffisent pour regarder les modules et appliquer les micro-changements demandés. C'est un investissement minime pour regagner des heures chaque jour." 
      },
      { 
        q: "Comment Scrollfree m’aide-t-il à retrouver du temps pour moi ?", 
        a: "En éliminant le scroll 'zombie' (celui qu'on fait sans s'en rendre compte), nos utilisateurs regagnent en moyenne 2h par jour. Ce temps est automatiquement réalloué à ce qui compte vraiment : ton sommeil, tes projets ou tes proches." 
      }
    ]
  },
  {
    category: "Est-ce fait pour moi ?",
    questions: [
      { 
        q: "Et si j’ai déjà essayé sans réussir ?", 
        a: "C'est normal. Les méthodes classiques reposent sur la seule volonté, qui finit toujours par s'épuiser. Scrollfree repose sur la neuroscience et le design environnemental : on rend la déconnexion plus facile que le scroll." 
      },
      { 
        q: "Scrollfree est-il adapté si je passe plusieurs heures par jour sur mon téléphone ?", 
        a: "Absolument. Que tu sois à 3h ou 8h par jour, le mécanisme d'addiction est le même. Le programme est justement calibré pour ceux qui sentent qu'ils ont perdu le contrôle et qui veulent une méthode structurée pour en sortir." 
      },
      { 
        q: "Dois-je supprimer TikTok, Instagram ou YouTube ?", 
        a: "Non, sauf si c'est ton choix. L'objectif n'est pas l'abstinence totale, mais l'intentionnalité. On t'apprend à utiliser ces outils à ton service, plutôt que d'être au service de leurs algorithmes." 
      },
      { 
        q: "Puis-je avancer à mon rythme ?", 
        a: "Oui. Une fois inscrit, tu avances à la vitesse qui te convient. Certains dévorent le programme en un week-end, d'autres préfèrent laisser infuser chaque module pendant une semaine." 
      },
      { 
        q: "Comment éviter de rechuter après la formation ?", 
        a: "Le dernier module de la formation est entièrement dédié à la prévention de la rechute. Tu repartiras avec un 'plan de survie digital' et un accès à notre communauté pour rester inspiré sur le long terme." 
      }
    ]
  },
  {
    category: "Accès & Engagement",
    questions: [
      { 
        q: "Ai-je accès à la formation à vie ?", 
        a: "Oui. Ton accès n'expire jamais. Tu pourras revenir sur les modules dans 6 mois ou un an si tu en ressens le besoin, et tu bénéficieras gratuitement de toutes les futures mises à jour du programme." 
      },
      { 
        q: "La formation est-elle adaptée si je manque de discipline ?", 
        a: "Oui, c'est tout l'intérêt. On ne te demande pas d'être un moine bouddhiste. La méthode utilise des 'Nudges' (coups de pouce) et des changements de configuration qui ne demandent aucune discipline une fois mis en place." 
      },
      { 
        q: "Y a-t-il un accompagnement ou un support ?", 
        a: "Oui, tu as accès à notre communauté privée d'entraide où tu peux poser tes questions. Pour toute question technique ou personnelle, notre équipe support te répond sous 24h ouvrées." 
      },
      { 
        q: "Que se passe-t-il si Scrollfree ne me convient pas ?", 
        a: "Nous offrons une garantie 'Satisfait ou Remboursé' de 7 jours. Si après avoir testé le programme tu ne constates pas de changement, on te rembourse intégralement. C'est sans risque pour toi." 
      },
      { 
        q: "Comment accéder à la formation après mon inscription ?", 
        a: "Immédiatement après ton paiement, tu recevras un email avec tes identifiants personnels. Tu pourras te connecter à ta plateforme membre et commencer le premier module dans moins de 2 minutes." 
      }
    ]
  }
];

export const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section className="relative z-10 px-6 py-24 md:px-12 max-w-7xl mx-auto w-full">
      <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "100px" }}
        className="text-center mb-20"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white mb-6">
          Questions <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F4D3A1] to-[#D4A373]">Fréquentes</span>
        </h2>
        <p className="text-white/50 max-w-2xl mx-auto text-lg">
          Tout ce que vous devez savoir sur Scrollfree et notre méthode pour reprendre le contrôle de votre attention.
        </p>
      </m.div>

      <div className="flex flex-col md:flex-row gap-12 lg:gap-24 items-start">
        {/* Left Sidebar: Categories */}
        <div className="w-full md:w-1/3 flex flex-col gap-4">
          {faqData.map((category, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setActiveCategory(idx)}
              className={`relative cursor-pointer py-6 px-8 rounded-3xl transition-all duration-500 border ${
                activeCategory === idx 
                ? 'bg-white/5 border-white/10 shadow-[0_10px_30px_-10px_rgba(212,163,115,0.15)]' 
                : 'bg-transparent border-transparent hover:bg-white/[0.02]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-lg md:text-xl font-medium transition-colors duration-300 ${
                  activeCategory === idx ? 'text-[#F4D3A1]' : 'text-white/40'
                }`}>
                  {category.category}
                </span>
                <ChevronRight 
                  size={20} 
                  className={`transition-all duration-300 ${
                    activeCategory === idx ? 'text-[#D4A373] translate-x-1 opacity-100' : 'text-white/10 opacity-0'
                  }`} 
                />
              </div>
              
              {/* Active Indicator Line */}
              {activeCategory === idx && (
                <m.div 
                  layoutId="activeCategory"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#D4A373] rounded-full"
                />
              )}
            </div>
          ))}
        </div>

        {/* Right Content: Questions */}
        <div className="w-full md:w-2/3 min-h-[500px]">
          <AnimatePresence mode="wait">
            <m.div
              key={activeCategory}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col"
            >
              <h3 className="text-sm uppercase tracking-[0.2em] text-[#D4A373]/60 font-semibold mb-8 pl-1">
                {faqData[activeCategory].category}
              </h3>
              <div className="flex flex-col">
                {faqData[activeCategory].questions.map((item, idx) => (
                  <FAQItem key={`${activeCategory}-${idx}`} question={item.q} answer={item.a} />
                ))}
              </div>
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
