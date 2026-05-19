import React, { useState, useEffect } from "react";
import { GradientBackground } from "./GradientBackground";
import { GradientEditorPanel } from "./GradientEditorPanel";
import { HaloGroup, AutoSettings, SourceGroup } from "./types";
import { initialSettings, initialSourceGroups } from "./presets";
import { generatePageGroups } from "./gradientEngine";

// Import the saved json statically to avoid fetch delays
import defaultPreset from "../../../public/gradients/home.gradient.json";

export const GradientTweak = ({ children, presetPath = "/gradients/home.gradient.json" }: { children: React.ReactNode, presetPath?: string }) => {
  const isDefault = presetPath === "/gradients/home.gradient.json";
  
  const [settings, setSettings] = useState<AutoSettings>(isDefault && defaultPreset.settings ? defaultPreset.settings as any : initialSettings);
  const [haloGroups, setHaloGroups] = useState<HaloGroup[]>(isDefault && defaultPreset.haloGroups ? defaultPreset.haloGroups as any : []);
  const [sourceGroups, setSourceGroups] = useState<SourceGroup[]>(isDefault && defaultPreset.sourceGroups ? defaultPreset.sourceGroups as any : initialSourceGroups);
  const [selectedSourceGroupId, setSelectedSourceGroupId] = useState<number>(isDefault && defaultPreset.selectedSourceGroupId ? defaultPreset.selectedSourceGroupId : 1);
  const [showOutlines, setShowOutlines] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [isDev] = useState(import.meta.env.DEV || process.env.NODE_ENV === "development");
  const [loading, setLoading] = useState(!isDefault);

  useEffect(() => {
    // If it's the default static preset, we check if we need to generate initial halos
    if (isDefault) {
      if (!defaultPreset.haloGroups || defaultPreset.haloGroups.length === 0) {
        const colors = defaultPreset.sourceGroups?.[0]?.colors || initialSourceGroups[0].colors;
        const groups = generatePageGroups(colors as any, defaultPreset.settings as any || initialSettings, 800, []);
        setHaloGroups(groups);
      }
      return;
    }

    const timer = setTimeout(() => {
      if (loading) {
        console.warn("GradientTweak: Loading timeout, forcing render.");
        setLoading(false);
      }
    }, 2000);

    fetch(presetPath)
      .then(r => r.json())
      .then(data => {
        clearTimeout(timer);
        if (data.settings) setSettings(data.settings);
        if (data.sourceGroups) setSourceGroups(data.sourceGroups);
        if (data.selectedSourceGroupId) setSelectedSourceGroupId(data.selectedSourceGroupId);
        
        if (data.haloGroups && data.haloGroups.length > 0) {
          setHaloGroups(data.haloGroups);
        } else {
          const colors = data.sourceGroups?.[0]?.colors || initialSourceGroups[0].colors;
          const groups = generatePageGroups(colors, data.settings || initialSettings, 800, []);
          setHaloGroups(groups);
        }
        setLoading(false);
      })
      .catch(() => {
        clearTimeout(timer);
        const groups = generatePageGroups(sourceGroups[0].colors, initialSettings, 800, []);
        setHaloGroups(groups);
        setLoading(false);
      });
  }, [presetPath, isDefault]);

  const resetAll = () => {
    if (confirm("Réinitialiser tous les réglages ?")) {
      setSettings(initialSettings);
      const groups = generatePageGroups(sourceGroups[0].colors, initialSettings, 800, []);
      setHaloGroups(groups);
    }
  };

  const saveGradientToProject = async () => {
    try {
      const response = await fetch("/api/save-gradient", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          preset: { 
            settings, 
            haloGroups, 
            sourceGroups,
            selectedSourceGroupId 
          } 
        })
      });
      if (response.ok) alert("Gradient sauvegardé !");
      else alert("Erreur de sauvegarde.");
    } catch (err) {
      alert("Erreur réseau.");
    }
  };

  return (
    <>
      <div className="relative w-full min-h-full">
        {isEnabled && !loading && (
          <GradientBackground 
            groups={haloGroups.filter(g => g.enabled)} 
            settings={settings} 
            pageVh={800} 
            showOutlines={showOutlines}
          />
        )}
        
        <div className="relative z-0 w-full h-full">
          {children}
        </div>

        {isDev && (
          <>
            <button
              onClick={() => setIsPanelOpen(!isPanelOpen)}
              className="fixed left-6 top-6 z-[110] px-6 py-3 rounded-full bg-[#0D1117] border border-white/10 text-white font-bold text-[14px] shadow-2xl transition-all hover:bg-[#161B22] active:scale-95 flex items-center gap-2 group"
            >
              <div className={`w-1.5 h-1.5 rounded-full ${isPanelOpen ? 'bg-indigo-400' : 'bg-white/20'}`} />
              Gradient Tweak
            </button>

            <GradientEditorPanel 
              isOpen={isPanelOpen}
              settings={settings}
              updateSettings={(p) => setSettings(s => ({ ...s, ...p }))}
              haloGroups={haloGroups}
              setHaloGroups={setHaloGroups}
              sourceGroups={sourceGroups}
              setSourceGroups={setSourceGroups}
              selectedSourceGroupId={selectedSourceGroupId}
              setSelectedSourceGroupId={setSelectedSourceGroupId}
              saveGradientToProject={saveGradientToProject}
              showOutlines={showOutlines}
              setShowOutlines={setShowOutlines}
              isEnabled={isEnabled}
              setIsEnabled={setIsEnabled}
              resetAll={resetAll}
            />
          </>
        )}
      </div>
    </>
  );
};
export default GradientTweak;
