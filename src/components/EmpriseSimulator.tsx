import React from 'react';
import { m, AnimatePresence } from 'motion/react';

const metrics = [
  {
    name: 'Sommeil',
    value: 42,
    sign: '-',
    status: 'Perturbé',
    desc: 'Mélatonine bloquée par la lumière bleue des écrans tardifs',
    // Sommeil: orange curve = erratic/fragmented (jagged), blue = smooth regular
    orangePath: `M 5 148 C 20 148, 35 140, 50 120 C 58 108, 62 95, 72 88 C 82 80, 88 76, 95 72 C 102 68, 107 65, 112 60 C 117 55, 120 48, 125 42 C 130 36, 134 28, 140 20 C 145 13, 150 6, 155 3 C 160 6, 165 14, 170 24 C 175 34, 178 45, 183 56 C 188 67, 192 75, 198 85 C 204 95, 210 108, 220 120 C 232 133, 250 142, 275 148 C 285 150, 293 150, 300 150`,
    bluePath: `M 5 150 C 30 150, 60 148, 90 144 C 115 140, 135 134, 155 122 C 170 112, 180 102, 190 94 C 198 88, 205 84, 212 82 C 220 80, 228 82, 238 88 C 250 96, 262 110, 278 130 C 287 140, 294 147, 300 150`,
    orangePeak: { cx: 155, cy: 3 },
    bluePeak: { cx: 212, cy: 82 },
    orangeAnnot: { cx: 90, cy: 80, labelX: 4, labelY: 30, lineX2: 38, lineY2: 50 },
    blueAnnot: { cx: 250, cy: 110, labelX: 200, labelY: 50, lineX2: 230, lineY2: 70 },
    orangeVline: { x: 155, yTop: 3 },
    blueVline: { x: 212, yTop: 82 },
  },
  {
    name: 'Estime de soi',
    value: 61,
    sign: '-',
    status: 'Dégradée',
    desc: 'Baisse par la comparaison sociale continue et inconsciente',
    // Estime: orange = slow steady decline (plateau then drop), blue = gentle shallow
    orangePath: `M 5 148 C 20 148, 40 145, 60 135 C 75 126, 85 115, 100 98 C 112 84, 122 65, 135 42 C 143 28, 150 14, 157 5 C 163 14, 168 28, 174 42 C 182 62, 188 82, 198 100 C 208 116, 220 130, 240 140 C 258 147, 278 150, 300 150`,
    bluePath: `M 5 151 C 35 151, 70 149, 105 145 C 135 141, 158 133, 180 118 C 196 107, 208 96, 218 88 C 225 83, 232 80, 240 80 C 250 80, 260 86, 272 98 C 283 110, 292 130, 300 150`,
    orangePeak: { cx: 157, cy: 5 },
    bluePeak: { cx: 240, cy: 80 },
    orangeAnnot: { cx: 95, cy: 100, labelX: 4, labelY: 30, lineX2: 40, lineY2: 50 },
    blueAnnot: { cx: 255, cy: 88, labelX: 200, labelY: 40, lineX2: 232, lineY2: 60 },
    orangeVline: { x: 157, yTop: 5 },
    blueVline: { x: 240, yTop: 80 },
  },
  {
    name: 'Anxiété',
    value: 82,
    sign: '+',
    status: 'Accrue',
    desc: 'Hyper-vigilance constante et peur de rater quelque chose (FOMO)',
    // Anxiété: orange = sharp narrow spike (high anxiety peak), blue = lower wide bell
    orangePath: `M 5 148 C 25 148, 55 145, 75 128 C 90 114, 100 96, 112 75 C 120 61, 128 44, 138 26 C 145 14, 151 5, 155 3 C 159 5, 164 14, 170 28 C 178 46, 185 66, 193 86 C 200 102, 210 122, 228 136 C 248 146, 272 150, 300 150`,
    bluePath: `M 5 150 C 40 150, 80 148, 115 143 C 140 138, 160 128, 178 113 C 190 102, 198 91, 206 84 C 212 79, 218 77, 225 77 C 234 77, 244 84, 256 96 C 268 109, 280 128, 295 144 C 298 147, 300 149, 300 150`,
    orangePeak: { cx: 155, cy: 3 },
    bluePeak: { cx: 225, cy: 77 },
    orangeAnnot: { cx: 100, cy: 88, labelX: 4, labelY: 25, lineX2: 42, lineY2: 45 },
    blueAnnot: { cx: 258, cy: 96, labelX: 200, labelY: 40, lineX2: 232, lineY2: 60 },
    orangeVline: { x: 155, yTop: 3 },
    blueVline: { x: 225, yTop: 77 },
  },
  {
    name: 'Dopamine',
    value: 95,
    sign: '+',
    status: 'Piratée',
    desc: 'Surcharge et épuisement complet des récepteurs de récompense',
    // Dopamine: orange = very sharp extreme spike (addiction spike), blue = gentle baseline
    orangePath: `M 5 148 C 20 148, 45 146, 68 138 C 85 130, 98 116, 112 96 C 122 81, 132 58, 142 34 C 148 18, 152 7, 155 2 C 158 7, 162 20, 168 38 C 176 60, 183 82, 192 104 C 200 122, 212 136, 230 143 C 252 149, 278 150, 300 150`,
    bluePath: `M 5 151 C 45 151, 88 149, 128 143 C 155 137, 175 125, 192 109 C 204 97, 212 86, 220 80 C 226 76, 233 74, 240 76 C 250 79, 262 92, 275 110 C 286 125, 294 140, 300 150`,
    orangePeak: { cx: 155, cy: 2 },
    bluePeak: { cx: 240, cy: 76 },
    orangeAnnot: { cx: 100, cy: 106, labelX: 4, labelY: 30, lineX2: 42, lineY2: 50 },
    blueAnnot: { cx: 262, cy: 92, labelX: 200, labelY: 40, lineX2: 232, lineY2: 60 },
    orangeVline: { x: 155, yTop: 2 },
    blueVline: { x: 240, yTop: 76 },
  },
];

interface EmpriseSimulatorProps {
  activeIndex: number;
}

export const EmpriseSimulator: React.FC<EmpriseSimulatorProps> = ({ activeIndex }) => {
  const activeMetric = metrics[activeIndex % metrics.length];

  return (
    <div className="emprise-simulator will-change-transform">
      <div className="emprise-simulator__container" style={{ padding: '16px 8px 12px' }}>

        {/* Metric name + percentage — top row */}
        <div className="flex justify-center items-center gap-3 w-full mb-1" style={{ minHeight: 38 }}>
          <AnimatePresence mode="wait">
            <m.div
              key={activeMetric.name}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.25 }}
              className="flex items-baseline gap-2"
            >
              <span className="text-[0.9rem] font-bold uppercase tracking-[0.12em] text-white">
                {activeMetric.name}
              </span>
              <span
                className="text-[1.6rem] font-black leading-none text-white"
                style={{ textShadow: '0 0 18px rgba(255,255,255,0.35)' }}
              >
                {activeMetric.sign}{activeMetric.value}%
              </span>
              <span className="text-[0.65rem] font-bold uppercase tracking-wider text-white/40">
                {activeMetric.status}
              </span>
            </m.div>
          </AnimatePresence>
        </div>

        {/* Dual Curve Chart — full width */}
        <div className="w-full flex-1 relative" style={{ minHeight: 220 }}>
          <AnimatePresence mode="wait">
            <m.svg
              key={activeMetric.name}
              className="w-full h-full"
              viewBox="0 0 300 160"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ overflow: 'visible', display: 'block' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <defs>
                <filter id="oglow" x="-20%" y="-40%" width="140%" height="180%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="bglow" x="-20%" y="-40%" width="140%" height="180%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Horizontal grid lines */}
              {[30, 60, 90, 120].map((y) => (
                <line
                  key={y}
                  x1="0" y1={y} x2="300" y2={y}
                  stroke="rgba(255,255,255,0.04)"
                  strokeDasharray="4 4"
                />
              ))}

              {/* === ORANGE CURVE (avec écran) === */}
              {/* Glow layer */}
              <m.path
                d={activeMetric.orangePath}
                stroke="rgba(251, 146, 60, 0.45)"
                strokeWidth="7"
                strokeLinecap="round"
                filter="url(#oglow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.3, ease: 'easeOut' }}
              />
              {/* Main stroke */}
              <m.path
                d={activeMetric.orangePath}
                stroke="#FB923C"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.3, ease: 'easeOut' }}
              />

              {/* === BLUE CURVE (sans écran) === */}
              {/* Glow layer */}
              <m.path
                d={activeMetric.bluePath}
                stroke="rgba(56, 189, 248, 0.38)"
                strokeWidth="7"
                strokeLinecap="round"
                filter="url(#bglow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.3, ease: 'easeOut', delay: 0.2 }}
              />
              {/* Main stroke */}
              <m.path
                d={activeMetric.bluePath}
                stroke="#38BDF8"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.3, ease: 'easeOut', delay: 0.2 }}
              />

              {/* === Vertical dashed lines from peaks === */}
              <m.line
                x1={activeMetric.orangeVline.x} y1={activeMetric.orangeVline.yTop}
                x2={activeMetric.orangeVline.x} y2="154"
                stroke="rgba(251, 146, 60, 0.3)"
                strokeWidth="1"
                strokeDasharray="3 3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              />
              <m.line
                x1={activeMetric.blueVline.x} y1={activeMetric.blueVline.yTop}
                x2={activeMetric.blueVline.x} y2="154"
                stroke="rgba(56, 189, 248, 0.25)"
                strokeWidth="1"
                strokeDasharray="3 3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              />

              {/* === Orange peak dot === */}
              <m.circle
                cx={activeMetric.orangePeak.cx} cy={activeMetric.orangePeak.cy} r="5"
                fill="#FB923C"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.4 }}
                style={{ filter: 'drop-shadow(0 0 6px rgba(251,146,60,0.95))' }}
              />

              {/* === Orange annotation dot (mid-curve) === */}
              <m.circle
                cx={activeMetric.orangeAnnot.cx} cy={activeMetric.orangeAnnot.cy} r="4.5"
                fill="#0d0d1a"
                stroke="#FB923C"
                strokeWidth="2"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.4 }}
              />
              <m.circle
                cx={activeMetric.orangeAnnot.cx} cy={activeMetric.orangeAnnot.cy} r="10"
                fill="none"
                stroke="#FB923C"
                strokeWidth="1"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: [0.6, 1.6, 0.6], opacity: [0.8, 0, 0.8] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut', delay: 1.5 }}
              />

              {/* === Blue peak dot === */}
              <m.circle
                cx={activeMetric.bluePeak.cx} cy={activeMetric.bluePeak.cy} r="5"
                fill="#38BDF8"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.4 }}
                style={{ filter: 'drop-shadow(0 0 6px rgba(56,189,248,0.95))' }}
              />

              {/* === Blue annotation dot === */}
              <m.circle
                cx={activeMetric.blueAnnot.cx} cy={activeMetric.blueAnnot.cy} r="4.5"
                fill="#0d0d1a"
                stroke="#38BDF8"
                strokeWidth="2"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.4 }}
              />
              <m.circle
                cx={activeMetric.blueAnnot.cx} cy={activeMetric.blueAnnot.cy} r="10"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="1"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: [0.6, 1.6, 0.6], opacity: [0.8, 0, 0.8] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut', delay: 1.7 }}
              />

              {/* === Orange label connector + pill === */}
              <m.line
                x1={activeMetric.orangeAnnot.cx} y1={activeMetric.orangeAnnot.cy}
                x2={activeMetric.orangeAnnot.lineX2} y2={activeMetric.orangeAnnot.lineY2}
                stroke="rgba(251, 146, 60, 0.45)"
                strokeWidth="1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.4 }}
              />
              <m.rect
                x={activeMetric.orangeAnnot.labelX} y={activeMetric.orangeAnnot.labelY}
                width="76" height="20" rx="10"
                fill="rgba(12, 12, 24, 0.88)"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3, duration: 0.4 }}
              />
              <m.circle
                cx={activeMetric.orangeAnnot.labelX + 13}
                cy={activeMetric.orangeAnnot.labelY + 10}
                r="3.5"
                fill="#FB923C"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                style={{ filter: 'drop-shadow(0 0 3px rgba(251,146,60,0.8))' }}
              />
              <m.text
                x={activeMetric.orangeAnnot.labelX + 21}
                y={activeMetric.orangeAnnot.labelY + 14}
                fill="rgba(255,255,255,0.88)"
                fontSize="7"
                fontFamily="'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif"
                fontWeight="600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                Avec écran
              </m.text>

              {/* === Blue label connector + pill === */}
              <m.line
                x1={activeMetric.blueAnnot.cx} y1={activeMetric.blueAnnot.cy}
                x2={activeMetric.blueAnnot.lineX2} y2={activeMetric.blueAnnot.lineY2}
                stroke="rgba(56, 189, 248, 0.45)"
                strokeWidth="1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.4 }}
              />
              <m.rect
                x={activeMetric.blueAnnot.labelX} y={activeMetric.blueAnnot.labelY}
                width="78" height="20" rx="10"
                fill="rgba(12, 12, 24, 0.88)"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, duration: 0.4 }}
              />
              <m.circle
                cx={activeMetric.blueAnnot.labelX + 13}
                cy={activeMetric.blueAnnot.labelY + 10}
                r="3.5"
                fill="#38BDF8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
                style={{ filter: 'drop-shadow(0 0 3px rgba(56,189,248,0.8))' }}
              />
              <m.text
                x={activeMetric.blueAnnot.labelX + 21}
                y={activeMetric.blueAnnot.labelY + 14}
                fill="rgba(255,255,255,0.88)"
                fontSize="7"
                fontFamily="'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif"
                fontWeight="600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
              >
                Sans écran
              </m.text>

              {/* Baseline */}
              <line x1="0" y1="154" x2="300" y2="154" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
            </m.svg>
          </AnimatePresence>
        </div>

        {/* Description */}
        <div className="w-full px-2 mb-1">
          <AnimatePresence mode="wait">
            <m.p
              key={activeMetric.desc}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="text-white/55 text-[11px] leading-relaxed text-center"
            >
              {activeMetric.desc}
            </m.p>
          </AnimatePresence>
        </div>

        {/* Legend bar */}
        <div className="flex items-center justify-center gap-5 pt-2 border-t border-white/[0.05] w-full">
          <div className="flex items-center gap-1.5">
            <div
              className="w-6 h-[2px] rounded-full"
              style={{ background: '#FB923C', boxShadow: '0 0 6px rgba(251,146,60,0.7)' }}
            />
            <span className="text-white/55 text-[10px] font-medium">Avec écran</span>
          </div>
          <div className="w-px h-3.5 bg-white/10" />
          <div className="flex items-center gap-1.5">
            <div
              className="w-6 h-[2px] rounded-full"
              style={{ background: '#38BDF8', boxShadow: '0 0 6px rgba(56,189,248,0.7)' }}
            />
            <span className="text-white/55 text-[10px] font-medium">Sans écran</span>
          </div>
        </div>

      </div>
    </div>
  );
};
