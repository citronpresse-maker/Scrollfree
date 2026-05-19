export type GradientType = "radial" | "linear" | "conic";
export type ThemeMode = "dark" | "light";
export type HaloKind = "dark" | "main" | "accent";

export type SourceColor = { id: number; color: string; opacity: number };
export type SourceGroup = { id: number; name: string; colors: SourceColor[] };

export type Halo = {
  id: number;
  kind: HaloKind;
  gradientType: GradientType;
  color: string;
  x: number;
  y: number;
  size: number;
  blur: number;
  stretch: number;
  intensity: number;
  opacity: number;
  locked?: boolean;
  enabled?: boolean;
};

export type HaloGroup = {
  id: number;
  name: string;
  index: number;
  enabled: boolean;
  locked: boolean;
  scale: number;
  intensity: number;
  halos: Halo[];
};

export type AnimationMode = "static" | "atmospheric" | "cinematic" | "floating" | "deep" | "liquid" | "aurora" | "energy";

export type AutoSettings = {
  theme: ThemeMode;
  verticalDensity: number;
  horizontalSpread: number;
  groupSize: number;
  groupBlur: number;
  groupIntensity: number;
  variation: number;
  darkPercent: number;
  mainPercent: number;
  accentPercent: number;
  avoidHero: boolean;
  groupsPanelHeight: number;
  animationEnabled: boolean;
  animationMode: AnimationMode;
  animationIntensity: number;
  animationSpeed: number;
  animationDriftX: number;
  animationDriftY: number;
  animationBreathing: number;
  animationBlur: number;
  animationParallax: number;
  animatedPercent: number;
  animationMorph: number;
  animationHue: number;
  animationShape: number;
};

export type SavedGradient = {
  id: number;
  name: string;
  sourceGroups: SourceGroup[];
  selectedSourceGroupId: number;
  haloGroups: HaloGroup[];
  floatingGroups: HaloGroup[];
  settings: AutoSettings;
};
