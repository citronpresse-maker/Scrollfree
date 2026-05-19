import { m } from 'motion/react';

export const BrainEffectGraph = () => (
  <div className="w-full h-32 md:h-40 mt-4 relative">
    <svg viewBox="0 0 400 100" className="w-full h-full overflow-visible">
      <defs>
        <linearGradient id="graphGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.2" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Grid line */}
      <line x1="0" y1="98" x2="400" y2="98" stroke="white" strokeOpacity="0.05" strokeWidth="1" />
      
      {/* Area under the curve */}
      <m.path
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        d="M10,98 C150,97 250,90 320,40 S390,0 398,0 L398,98 L10,98 Z"
        fill="url(#graphGradient)"
      />

      {/* The Curve */}
      <m.path
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        d="M10,98 C150,97 250,90 320,40 S390,0 398,0"
        fill="none"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      
      {/* Glow path */}
      <m.path
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.2 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        d="M10,98 C150,97 250,90 320,40 S390,0 398,0"
        fill="none"
        stroke="white"
        strokeWidth="6"
        className="blur-md"
        strokeLinecap="round"
      />
      
      {/* Dots on the path */}
      {[
        { x: 10, y: 98 },
        { x: 150, y: 97 },
        { x: 320, y: 40 },
        { x: 398, y: 0 }
      ].map((p, i) => (
        <m.circle
          key={i}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: 0.5 + i * 0.2 }}
          cx={p.x}
          cy={p.y}
          r="4"
          fill="white"
          className="drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
        />
      ))}
    </svg>
  </div>
);
