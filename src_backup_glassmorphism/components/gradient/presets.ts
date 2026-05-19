import { SourceColor, SourceGroup, AutoSettings } from "./types";

export const initialSourceColors: SourceColor[] = [
  { id: 1, color: "#F54927", opacity: 1 },
  { id: 2, color: "#FFB981", opacity: 0.75 },
  { id: 3, color: "#0A0A0A", opacity: 1 },
  { id: 4, color: "#1A0F1F", opacity: 0.7 },
  { id: 5, color: "#FF3CAC", opacity: 0.45 },
];

export const initialSourceGroups: SourceGroup[] = [
  { id: 1, name: "Source 1 · Base", colors: initialSourceColors },
];

export const initialSettings: AutoSettings = {
  theme: "dark",
  verticalDensity: 85,
  horizontalSpread: 72,
  groupSize: 1,
  groupBlur: 1,
  groupIntensity: 1,
  variation: 0.45,
  darkPercent: 40,
  mainPercent: 40,
  accentPercent: 20,
  avoidHero: false,
  groupsPanelHeight: 260,
  animationEnabled: false, // Animation désactivée par défaut
  animationMode: "static",
  animationIntensity: 0.45,
  animationSpeed: 0.55,
  animationDriftX: 3,
  animationDriftY: 5,
  animationBreathing: 0.12,
  animationBlur: 0.1,
  animationParallax: 0,
  animatedPercent: 30,
  animationMorph: 0.45,
  animationHue: 0.08,
  animationShape: 0.45,
};

export const darkPalette = ["#020202", "#050505", "#090606", "#120C0C", "#0C0712"];
export const lightPalette = ["#F6F1EA", "#EFE7DD", "#E4D7C9", "#F8F4EF", "#DDD1C4"];
export const accentDark = ["#FFB981", "#FF6A3D", "#8A4DFF", "#FF3CAC", "#F54927"];
export const accentLight = ["#FFD7B1", "#FF8B5E", "#A989FF", "#FF9BD5", "#F54927"];
