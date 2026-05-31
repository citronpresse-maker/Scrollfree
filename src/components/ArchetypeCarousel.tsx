import { m, AnimatePresence } from 'motion/react';

export const archetypes = [
  { key: 'automate',    label: "L'AUTOMATE",    highlight: 'AUTO',   color: '#D4A373', level: 3 },
  { key: 'explorateur', label: "L'EXPLORATEUR", highlight: 'EXPLOR', color: '#38BDF8', level: 1 },
  { key: 'flaneur',     label: 'LE FLÂNEUR',    highlight: 'FLÂN',   color: '#A78BFA', level: 1 },
  { key: 'fugitif',     label: 'LE FUGITIF',    highlight: 'FUGIT',  color: '#FB923C', level: 2 },
  { key: 'relie',       label: 'LE RELIÉ',      highlight: 'RELI',   color: '#4ADE80', level: 1 },
  { key: 'observateur', label: "L'OBSERVATEUR", highlight: 'OBSERV', color: '#F472B6', level: 2 },
  { key: 'stimule',     label: 'LE STIMULÉ',    highlight: 'STIMUL', color: '#FACC15', level: 3 },
  { key: 'valide',      label: 'LE VALIDÉ',     highlight: 'VALID',  color: '#34D399', level: 1 },
];

interface ArchetypeCarouselProps {
  currentIndex: number;
}

export const ArchetypeCarousel = ({ currentIndex }: ArchetypeCarouselProps) => {
  const arch = archetypes[currentIndex % archetypes.length];
  const imgSrc = `/image/${arch.key}_${arch.level}.webp`;

  return (
    <div className="relative w-full h-full">

      {/* Image — absolute fill, object-contain so nothing is cropped */}
      <AnimatePresence mode="wait">
        <m.img
          key={`img-${arch.key}`}
          src={imgSrc}
          alt={arch.label}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 w-full h-full object-contain object-center"
          loading="lazy"
          draggable={false}
        />
      </AnimatePresence>

    </div>
  );
};
