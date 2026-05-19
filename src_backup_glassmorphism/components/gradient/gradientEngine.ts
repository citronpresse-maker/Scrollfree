import { 
  Halo, 
  HaloGroup, 
  AutoSettings, 
  SourceColor, 
  HaloKind, 
  AnimationMode 
} from "./types";
import { 
  initialSourceColors, 
  darkPalette, 
  lightPalette, 
  accentDark, 
  accentLight 
} from "./presets";

export function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function hexToRgb(hex: string) {
  const clean = hex.replace("#", "").padEnd(6, "0").slice(0, 6);
  const value = parseInt(clean, 16);
  return { r: (value >> 16) & 255, g: (value >> 8) & 255, b: value & 255 };
}

export function rgbToHex(r: number, g: number, b: number) {
  return `#${[r, g, b]
    .map((v) => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, "0"))
    .join("")}`.toUpperCase();
}

export function rgba(hex: string, alpha: number) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${clamp(alpha, 0, 1)})`;
}

function normalized(settings: AutoSettings) {
  const total = Math.max(1, settings.darkPercent + settings.mainPercent + settings.accentPercent);
  return { dark: settings.darkPercent / total, main: settings.mainPercent / total };
}

export function pickKind(index: number, settings: AutoSettings): HaloKind {
  const pct = normalized(settings);
  const value = seededRandom(index * 31.7 + 9);
  if (value < pct.dark) return "dark";
  if (value < pct.dark + pct.main) return "main";
  return "accent";
}

export function pickColor(kind: HaloKind, sourceColors: SourceColor[], settings: AutoSettings, seed: number) {
  const source = sourceColors.length ? sourceColors : initialSourceColors;
  const palette =
    kind === "dark"
      ? settings.theme === "dark"
        ? darkPalette
        : lightPalette
      : kind === "accent"
        ? settings.theme === "dark"
          ? accentDark
          : accentLight
        : source.map((color) => color.color);
  const index = Math.floor(seededRandom(seed) * 999);
  return palette[index % palette.length];
}

export function nextIndex(groups: HaloGroup[]) {
  return groups.length ? Math.max(...groups.map((group) => group.index)) + 1 : 0;
}

export function createHaloGroup(index: number, sourceColors: SourceColor[], settings: AutoSettings): HaloGroup {
  const groupSeed = index * 100;
  const now = Date.now();
  const halosPerGroup = 3 + Math.floor(seededRandom(groupSeed + 1) * 3);

  // Normalized percentages
  const total = Math.max(1, settings.darkPercent + settings.mainPercent + settings.accentPercent);
  const pDark = settings.darkPercent / total;
  const pMain = settings.mainPercent / total;

  // Find a pivot point for clumping
  const side = index % 2 === 0 ? -1 : 1;
  const pivotX = clamp(
    50 + side * (15 + seededRandom(groupSeed + 2) * settings.horizontalSpread * 0.45),
    10,
    90
  );
  const pivotY = (seededRandom(groupSeed + 3) - 0.5) * settings.verticalDensity * 0.5;

  const halos: Halo[] = Array.from({ length: halosPerGroup }, (_, haloIndex) => {
    const seed = groupSeed + haloIndex * 17;
    const rng = seededRandom(seed + 9);
    
    let kind: HaloKind = "main";
    if (rng < pDark) kind = "dark";
    else if (rng > pDark + pMain) kind = "accent";

    const color = pickColor(kind, sourceColors, settings, seed + 6);
    
    // Intelligent Positioning: Accents clump near Main/Pivot
    const isAtmospheric = kind === "dark";
    const isAccent = kind === "accent";
    
    // Spread logic
    const spreadX = isAtmospheric ? 30 : (isAccent ? 8 : 15);
    const spreadY = isAtmospheric ? 40 : (isAccent ? 12 : 20);
    
    const x = clamp(pivotX + (seededRandom(seed + 11) - 0.5) * spreadX, 0, 100);
    const y = pivotY + (seededRandom(seed + 12) - 0.5) * spreadY;
    
    // Size logic: Dark = Massive, Accent = Tiny but sharp
    let size = 30 + seededRandom(seed + 5) * 40;
    if (isAtmospheric) size *= 2.5; // Huge atmospheric layer
    if (isAccent) size *= 0.6; // Small spark
    
    // Blur logic
    let blur = 40 + seededRandom(seed + 7) * 40;
    if (isAtmospheric) blur *= 2; // Very soft
    if (isAccent) blur *= 0.4; // Sharper
    
    // Intensity and Opacity
    let intensity = 0.8 + seededRandom(seed + 9) * 0.4;
    if (isAccent) intensity *= 1.8; // Hotspot
    
    let opacityBase = kind === "dark" ? 0.12 : (kind === "main" ? 0.22 : 0.18);
    if (isAtmospheric) opacityBase *= 0.6; // Very subtle
    
    const opacity = opacityBase * (0.8 + seededRandom(seed + 10) * 0.4);

    return {
      id: now + index * 20 + haloIndex,
      kind,
      gradientType: "radial",
      color,
      x,
      y,
      size: clamp(size, 5, 200),
      blur: clamp(blur, 0, 400),
      stretch: 80 + seededRandom(seed + 8) * 120,
      intensity,
      opacity,
      enabled: true,
      locked: false,
    };
  });

  return {
    id: now + index,
    name: `Groupe ${index + 1}`,
    index,
    enabled: true,
    locked: false,
    scale: 1,
    intensity: 1,
    halos,
  };
}

export function generatePageGroups(sourceColors: SourceColor[], settings: AutoSettings, pageVh: number, previousGroups: HaloGroup[]) {
  const locked = previousGroups.filter((group) => group.locked);
  const start = settings.avoidHero ? 100 : 0;
  const count = Math.max(2, Math.ceil((pageVh - start) / settings.verticalDensity));
  const lockedIndexes = new Set(locked.map((group) => group.index));
  const groups = [...locked];

  for (let index = 0; index < count; index += 1) {
    if (!lockedIndexes.has(index)) groups.push(createHaloGroup(index, sourceColors, settings));
  }

  return groups.sort((a, b) => a.index - b.index);
}

export function liveHalo(halo: Halo, settings: AutoSettings) {
  const variation = settings.variation;
  const xShift = (seededRandom(halo.id * 0.013 + 1) - 0.5) * 22 * variation;
  const yShift = (seededRandom(halo.id * 0.017 + 2) - 0.5) * 34 * variation;
  const sizeMultiplier = 1 + (seededRandom(halo.id * 0.019 + 3) - 0.5) * 0.55 * variation;
  const blurMultiplier = 1 + (seededRandom(halo.id * 0.023 + 4) - 0.5) * 0.7 * variation;

  return {
    ...halo,
    x: clamp(halo.x + xShift, 0, 100),
    y: halo.y + yShift,
    size: clamp(halo.size * sizeMultiplier, 4, 140),
    blur: clamp(halo.blur * blurMultiplier, 0, 220),
  };
}

export function isHaloAnimated(halo: Halo, settings: AutoSettings) {
  if (!settings.animationEnabled || settings.animationMode === "static") return false;
  const threshold = clamp(settings.animatedPercent, 0, 100) / 100;
  return seededRandom(halo.id * 0.041 + 10) < threshold;
}

export function animationPreset(mode: AnimationMode): Partial<AutoSettings> {
  if (mode === "static") {
    return {
      animationMode: "static",
      animationEnabled: false,
      animationIntensity: 0,
      animationSpeed: 0.1,
      animationDriftX: 0,
      animationDriftY: 0,
      animationBreathing: 0,
      animationBlur: 0,
      animationParallax: 0,
      animatedPercent: 0,
      animationMorph: 0,
      animationHue: 0,
      animationShape: 0,
    };
  }
  if (mode === "cinematic") {
    return { animationMode: "cinematic", animationEnabled: true, animationIntensity: 0.72, animationSpeed: 0.42, animationDriftX: 5, animationDriftY: 8, animationBreathing: 0.22, animationBlur: 0.18, animationParallax: 0.08, animatedPercent: 45, animationMorph: 0.55, animationHue: 0.05, animationShape: 0.45 };
  }
  if (mode === "floating") {
    return { animationMode: "floating", animationEnabled: true, animationIntensity: 0.85, animationSpeed: 0.62, animationDriftX: 8, animationDriftY: 12, animationBreathing: 0.26, animationBlur: 0.18, animationParallax: 0.12, animatedPercent: 58, animationMorph: 0.65, animationHue: 0.07, animationShape: 0.58 };
  }
  if (mode === "deep") {
    return { animationMode: "deep", animationEnabled: true, animationIntensity: 0.62, animationSpeed: 0.28, animationDriftX: 4, animationDriftY: 7, animationBreathing: 0.18, animationBlur: 0.34, animationParallax: 0.18, animatedPercent: 42, animationMorph: 0.48, animationHue: 0.04, animationShape: 0.65 };
  }
  if (mode === "liquid") {
    return { animationMode: "liquid", animationEnabled: true, animationIntensity: 1.15, animationSpeed: 0.78, animationDriftX: 10, animationDriftY: 14, animationBreathing: 0.35, animationBlur: 0.28, animationParallax: 0.08, animatedPercent: 80, animationMorph: 1.15, animationHue: 0.12, animationShape: 1 };
  }
  if (mode === "aurora") {
    return { animationMode: "aurora", animationEnabled: true, animationIntensity: 1, animationSpeed: 0.55, animationDriftX: 16, animationDriftY: 5, animationBreathing: 0.18, animationBlur: 0.22, animationParallax: 0.16, animatedPercent: 72, animationMorph: 0.65, animationHue: 0.28, animationShape: 0.72 };
  }
  if (mode === "energy") {
    return { animationMode: "energy", animationEnabled: true, animationIntensity: 1.25, animationSpeed: 1.15, animationDriftX: 7, animationDriftY: 10, animationBreathing: 0.5, animationBlur: 0.16, animationParallax: 0.04, animatedPercent: 90, animationMorph: 0.95, animationHue: 0.22, animationShape: 0.85 };
  }
  return { animationMode: "atmospheric", animationEnabled: true, animationIntensity: 0.7, animationSpeed: 0.48, animationDriftX: 6, animationDriftY: 9, animationBreathing: 0.2, animationBlur: 0.16, animationParallax: 0.1, animatedPercent: 52, animationMorph: 0.55, animationHue: 0.06, animationShape: 0.42 };
}

export function groupTop(group: HaloGroup, settings: AutoSettings) {
  return (settings.avoidHero ? 100 : 0) + group.index * settings.verticalDensity + settings.verticalDensity * 0.5;
}

export function haloGradient(halo: Halo) {
  if (halo.gradientType === "linear") {
    return `linear-gradient(135deg, ${rgba(halo.color, 0.95)} 0%, ${rgba(halo.color, 0.38)} 45%, transparent 80%)`;
  }
  if (halo.gradientType === "conic") {
    return `conic-gradient(from 180deg, ${rgba(halo.color, 0.95)} 0deg, ${rgba(halo.color, 0.28)} 130deg, transparent 260deg)`;
  }
  return halo.kind === "dark"
    ? `radial-gradient(circle, ${rgba(halo.color, 0.95)} 0%, ${rgba(halo.color, 0.42)} 38%, transparent 70%)`
    : `radial-gradient(circle, ${rgba(halo.color, 0.95)} 0%, ${rgba(halo.color, 0.38)} 42%, transparent 72%)`;
}

export async function extractPaletteFromImage(file: File): Promise<string[]> {
  const imageUrl = URL.createObjectURL(file);
  const image = new Image();
  image.crossOrigin = "anonymous";
  image.src = imageUrl;

  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
  });

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) return initialSourceColors.map((color) => color.color);

  canvas.width = 80;
  canvas.height = 80;
  context.drawImage(image, 0, 0, canvas.width, canvas.height);

  const data = context.getImageData(0, 0, canvas.width, canvas.height).data;
  const buckets = new Map<string, { r: number; g: number; b: number; count: number }>();

  for (let index = 0; index < data.length; index += 16) {
    const r = data[index];
    const g = data[index + 1];
    const b = data[index + 2];
    const a = data[index + 3];
    if (a < 180 || (r + g + b) / 3 > 248) continue;

    const key = `${Math.round(r / 32) * 32}-${Math.round(g / 32) * 32}-${Math.round(b / 32) * 32}`;
    const current = buckets.get(key) ?? { r: 0, g: 0, b: 0, count: 0 };
    current.r += r;
    current.g += g;
    current.b += b;
    current.count += 1;
    buckets.set(key, current);
  }

  URL.revokeObjectURL(imageUrl);

  const palette = [...buckets.values()]
    .sort((a, b) => b.count - a.count)
    .slice(0, 6)
    .map((bucket) => rgbToHex(bucket.r / bucket.count, bucket.g / bucket.count, bucket.b / bucket.count));

  return palette.length ? palette : initialSourceColors.map((color) => color.color);
}
export function randomizeGroup(group: HaloGroup, sourceColors: SourceColor[], settings: AutoSettings): HaloGroup {
  const seed = Date.now();
  const count = 2 + Math.floor(seededRandom(seed) * 5);
  return {
    ...group,
    scale: 0.5 + seededRandom(seed + 1) * 2.5,
    intensity: 0.2 + seededRandom(seed + 2) * 1.8,
    halos: Array.from({ length: count }, (_, i) => {
      const hSeed = seed + i * 13;
      const kind = pickKind(hSeed, settings);
      return {
        id: Date.now() + i,
        kind,
        gradientType: "radial",
        color: pickColor(kind, sourceColors, settings, hSeed + 7),
        x: seededRandom(hSeed + 8) * 100,
        y: (seededRandom(hSeed + 9) - 0.5) * 150,
        size: 10 + seededRandom(hSeed + 10) * 100,
        blur: 20 + seededRandom(hSeed + 11) * 250,
        stretch: 50 + seededRandom(hSeed + 12) * 300,
        intensity: 0.3 + seededRandom(hSeed + 13) * 1.2,
        opacity: 0.1 + seededRandom(hSeed + 14) * 0.9,
        enabled: true
      };
    })
  };
}
