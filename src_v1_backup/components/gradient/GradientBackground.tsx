import React from "react";
import { Halo, HaloGroup, AutoSettings } from "./types";
import { liveHalo, groupTop, haloGradient, isHaloAnimated, seededRandom, clamp } from "./gradientEngine";

interface GradientBackgroundProps {
  groups: HaloGroup[];
  settings: AutoSettings;
  pageVh: number;
  showOutlines?: boolean;
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({ groups, settings, pageVh, showOutlines }) => {
  return (
    <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden" style={{ minHeight: `${pageVh}vh` }}>
      <AnimationStyles />
      {groups.map((group) => group.halos.filter(h => h.enabled !== false).map((halo) => (
        <HaloLayer key={`${group.id}-${halo.id}`} group={group} halo={halo} settings={settings} showOutlines={showOutlines} />
      )))}
    </div>
  );
};

function HaloLayer({ group, halo, settings, showOutlines }: any) {
  const live = liveHalo(halo, settings);
  const top = groupTop(group, settings) + live.y;
  const size = live.size * group.scale * settings.groupSize;
  const animated = isHaloAnimated(halo, settings);
  const seed = seededRandom(halo.id * 0.071 + 3);
  const duration = `${clamp(42 / Math.max(0.1, settings.animationSpeed) + seed * 22, 10, 90)}s`;
  const driftX = `${settings.animationDriftX * settings.animationIntensity * (seed > 0.5 ? 1 : -1)}vw`;
  const driftY = `${settings.animationDriftY * settings.animationIntensity * (seededRandom(halo.id * 0.081) > 0.5 ? 1 : -1)}vh`;
  const morph = settings.animationMorph * settings.animationIntensity;
  const shape = settings.animationShape * settings.animationIntensity;
  const hue = settings.animationHue * settings.animationIntensity;
  
  return (
    <div
      className="absolute rounded-full"
      style={{
        ["--halo-drift-x" as string]: driftX,
        ["--halo-drift-y" as string]: driftY,
        ["--halo-base-stretch" as string]: String(live.stretch / 100),
        ["--halo-radius-a" as string]: `${50 - shape * 18}% ${50 + shape * 22}% ${50 - shape * 12}% ${50 + shape * 18}% / ${50 + shape * 20}% ${50 - shape * 15}% ${50 + shape * 10}% ${50 - shape * 22}%`,
        ["--halo-radius-b" as string]: `${50 + shape * 24}% ${50 - shape * 16}% ${50 + shape * 20}% ${50 - shape * 10}% / ${50 - shape * 18}% ${50 + shape * 25}% ${50 - shape * 12}% ${50 + shape * 16}%`,
        ["--halo-hue" as string]: `${hue * 90}deg`,
        left: `${live.x}%`,
        top: `${top}vh`,
        width: `${size * 2.2}vh`,
        height: `${size * 2.2}vh`,
        transform: `translate3d(-50%, -50%, 0) scale(${live.stretch / 100}, 1)`,
        opacity: live.opacity * live.intensity * group.intensity * settings.groupIntensity,
        filter: showOutlines ? 'none' : `blur(${live.blur * settings.groupBlur}px)`,
        mixBlendMode: showOutlines ? 'normal' : "screen",
        background: showOutlines ? 'none' : haloGradient(live),
        border: showOutlines ? `1px solid ${halo.color}` : 'none',
        borderRadius: animated ? "var(--halo-radius-a)" : "9999px",
        animation: animated ? `haloFluid ${duration} ease-in-out infinite alternate` : undefined,
        willChange: "transform",
      }}
    >
      {showOutlines && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[10px] bg-black/60 px-1 rounded" style={{ color: halo.color }}>{halo.kind}</span>
        </div>
      )}
    </div>
  );
}

function AnimationStyles() {
  return (
    <style>{`
      @keyframes haloFluid {
        0% { transform: translate(-50%, -50%) scale(var(--halo-base-stretch), 1) rotate(0deg); border-radius: var(--halo-radius-a); }
        100% { transform: translate(calc(-50% + var(--halo-drift-x)), calc(-50% + var(--halo-drift-y))) scale(var(--halo-base-stretch), 1) rotate(10deg); border-radius: var(--halo-radius-b); }
      }
    `}</style>
  );
}
