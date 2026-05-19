import React, { useState, useRef, useEffect, useCallback } from "react";
import { 
  AutoSettings, 
  HaloGroup, 
  SourceGroup, 
  AnimationMode, 
  Halo, 
  HaloKind,
  SourceColor,
  GradientType,
  SavedGradient
} from "./types";
import { 
  animationPreset, 
  createHaloGroup, 
  pickColor, 
  generatePageGroups,
  pickKind,
  randomizeGroup,
  extractPaletteFromImage,
  clamp
} from "./gradientEngine";

interface GradientEditorPanelProps {
  isOpen: boolean;
  settings: AutoSettings;
  updateSettings: (patch: Partial<AutoSettings>) => void;
  haloGroups: HaloGroup[];
  setHaloGroups: React.Dispatch<React.SetStateAction<HaloGroup[]>>;
  sourceGroups: SourceGroup[];
  setSourceGroups: React.Dispatch<React.SetStateAction<SourceGroup[]>>;
  selectedSourceGroupId: number;
  setSelectedSourceGroupId: (id: number) => void;
  saveGradientToProject: () => Promise<void>;
  showOutlines: boolean;
  setShowOutlines: (v: boolean) => void;
  isEnabled: boolean;
  setIsEnabled: (v: boolean) => void;
  resetAll: () => void;
}

export const GradientEditorPanel: React.FC<GradientEditorPanelProps> = ({
  isOpen,
  settings,
  updateSettings,
  haloGroups,
  setHaloGroups,
  sourceGroups,
  setSourceGroups,
  selectedSourceGroupId,
  setSelectedSourceGroupId,
  saveGradientToProject,
  showOutlines,
  setShowOutlines,
  isEnabled,
  setIsEnabled,
  resetAll,
}) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    source: true,
    aspect: true,
    groups: true,
    animation: false,
  });

  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [savedGradients, setSavedGradients] = useState<SavedGradient[]>([]);
  const [activePageId, setActivePageId] = useState<number | null>(null);
  const [draggedId, setDraggedId] = useState<number | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("gradient-tweak-saved-pages");
    if (saved) {
      try { setSavedGradients(JSON.parse(saved)); } catch (e) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("gradient-tweak-saved-pages", JSON.stringify(savedGradients));
  }, [savedGradients]);

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const selectedSourceGroup = sourceGroups.find(g => g.id === selectedSourceGroupId) || sourceGroups[0];

  // --- Optimization: Debounced Regeneration ---
  const debouncedRegenerate = useCallback((newDensity: number) => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      const bodyHeight = document.body.scrollHeight || 5000;
      const viewHeight = window.innerHeight;
      const totalVH = (bodyHeight / viewHeight) * 100;
      setHaloGroups(generatePageGroups(selectedSourceGroup.colors, { ...settings, verticalDensity: newDensity }, totalVH, []));
    }, 50); // 50ms delay for smoothness
  }, [selectedSourceGroup.colors, settings, setHaloGroups]);

  // --- Handlers ---

  const handleDensityChange = (v: number) => {
    updateSettings({ verticalDensity: v });
    debouncedRegenerate(v);
  };

  const handleGlobalAspectChange = (patch: Partial<AutoSettings>) => {
    updateSettings(patch);
    const s = { ...settings, ...patch };
    
    // Apply changes to existing groups that are not locked
    setHaloGroups(prev => prev.map(g => {
      if (g.locked) return g;
      return {
        ...g,
        scale: s.groupSize !== undefined ? s.groupSize : g.scale,
        intensity: s.groupIntensity !== undefined ? s.groupIntensity : g.intensity,
        halos: g.halos.map((h, idx) => {
           // Re-pick kind and color based on new percentages
           const shouldUpdate = patch.darkPercent !== undefined || patch.mainPercent !== undefined || patch.accentPercent !== undefined || patch.theme !== undefined;
           if (!shouldUpdate) return {
             ...h,
             blur: s.groupBlur !== undefined ? s.groupBlur * 120 : h.blur,
             size: s.groupSize !== undefined ? s.groupSize * 60 : h.size,
             intensity: s.groupIntensity !== undefined ? s.groupIntensity : h.intensity,
           };
           
           const newKind = pickKind(g.index * 100 + idx, s);
           const newColor = pickColor(newKind, selectedSourceGroup.colors, s, g.index * 100 + idx + 7);
           
           return {
             ...h,
             kind: newKind,
             color: newColor,
             blur: s.groupBlur !== undefined ? s.groupBlur * 120 : h.blur,
             size: s.groupSize !== undefined ? s.groupSize * 60 : h.size,
             intensity: s.groupIntensity !== undefined ? s.groupIntensity : h.intensity,
           };
        })
      };
    }));
  };

  const addOneGroup = () => {
    const nextIdx = haloGroups.length ? Math.max(...haloGroups.map(g => g.index)) + 1 : 0;
    const g = createHaloGroup(nextIdx, selectedSourceGroup.colors, settings);
    setHaloGroups(prev => [...prev, g].sort((a, b) => a.index - b.index));
  };

  const savePage = () => {
    const newPage: SavedGradient = {
      id: Date.now(),
      name: `Page ${savedGradients.length + 1}`,
      sourceGroups: JSON.parse(JSON.stringify(sourceGroups)),
      selectedSourceGroupId,
      haloGroups: JSON.parse(JSON.stringify(haloGroups)),
      floatingGroups: [],
      settings: JSON.parse(JSON.stringify(settings)),
    };
    setSavedGradients(prev => [newPage, ...prev]);
    setActivePageId(newPage.id);
  };

  const updateActivePage = (id: number) => {
    setSavedGradients(prev => prev.map(p => p.id === id ? {
      ...p,
      sourceGroups: JSON.parse(JSON.stringify(sourceGroups)),
      selectedSourceGroupId,
      haloGroups: JSON.parse(JSON.stringify(haloGroups)),
      settings: JSON.parse(JSON.stringify(settings)),
    } : p));
  };

  const applySavedPage = (page: SavedGradient) => {
    updateSettings(page.settings);
    setSourceGroups(page.sourceGroups);
    setSelectedSourceGroupId(page.selectedSourceGroupId);
    setHaloGroups(page.haloGroups);
    setActivePageId(page.id);
  };

  const moveHalo = (haloId: number, fromGroupId: number, toGroupId: number) => {
    setHaloGroups(prev => {
      const fromGroup = prev.find(g => g.id === fromGroupId);
      const toGroup = prev.find(g => g.id === toGroupId);
      if (!fromGroup || !toGroup) return prev;
      
      const halo = fromGroup.halos.find(h => h.id === haloId);
      if (!halo) return prev;
      
      return prev.map(g => {
        if (g.id === fromGroupId) return { ...g, halos: g.halos.filter(h => h.id !== haloId) };
        if (g.id === toGroupId) return { ...g, halos: [...g.halos, halo] };
        return g;
      });
    });
  };

  return (
    <aside 
      className={`fixed right-4 top-4 z-[100] h-[calc(100vh-32px)] w-[400px] overflow-y-auto rounded-[24px] border border-white/10 bg-[#0D1117]/95 p-6 text-[11px] shadow-2xl backdrop-blur-sm text-white scrollbar-hide transition-all duration-300 ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 pointer-events-none'}`}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold tracking-tight text-white/95">Gradient Tweak</h2>
          <span className="text-[10px] opacity-40 uppercase tracking-[0.2em] font-medium">PANNEAU D’ÉDITION</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[9px] opacity-40 font-bold uppercase tracking-widest">GRADIENT</span>
          <Toggle checked={isEnabled} onChange={setIsEnabled} />
        </div>
      </div>

      <hr className="border-white/5 my-6" />

      <div className="space-y-2">
        {/* SOURCE DE COULEURS */}
        <PanelSection title="SOURCE DE COULEURS" id="source" isOpen={openSections.source} onToggle={() => toggleSection("source")}>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <input type="file" ref={fileInputRef} onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const palette = await extractPaletteFromImage(file);
                setSourceGroups(prev => prev.map(g => g.id === selectedSourceGroupId ? { ...g, colors: palette.map((color, i) => ({ id: Date.now() + i, color, opacity: i === 0 ? 1 : 0.75 })) } : g));
              }} className="hidden" accept="image/*" />
              <button onClick={() => fileInputRef.current?.click()} className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg text-[11px] font-bold transition-all">Choisir un fichier</button>
              <button onClick={() => setSourceGroups(prev => [...prev, { id: Date.now(), name: `Source ${prev.length + 1}`, colors: [{ id: Date.now() + 1, color: "#FFFFFF", opacity: 1 }] }])} className="px-4 py-2 border border-white/10 rounded-lg hover:bg-white/5 transition-all text-[11px] font-bold">+ Source</button>
              <span className="opacity-30 truncate flex-1 italic text-right text-[10px]">Aucun fichier</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {sourceGroups.map(g => (
                <div key={g.id} className={`p-2 rounded-lg border flex items-center justify-between transition-all cursor-pointer ${selectedSourceGroupId === g.id ? 'bg-indigo-500/20 border-indigo-500/30' : 'bg-white/[0.03] border-white/5'}`} onClick={() => setSelectedSourceGroupId(g.id)}>
                  <input value={g.name} onChange={(e) => setSourceGroups(prev => prev.map(item => item.id === g.id ? { ...item, name: e.target.value } : item))} className="bg-transparent font-bold text-[11px] outline-none min-w-0 flex-1" />
                  <button onClick={(e) => { e.stopPropagation(); setSourceGroups(prev => prev.filter(item => item.id !== g.id)); }} className="text-red-400 opacity-50 hover:opacity-100 text-lg px-1 shrink-0">×</button>
                </div>
              ))}
            </div>
            <div className="space-y-2 pt-2">
              {selectedSourceGroup.colors.map(c => (
                <div key={c.id} className="flex items-center gap-2 bg-black/20 p-2 rounded-lg border border-white/5">
                  <div className="w-5 h-5 rounded relative overflow-hidden border border-white/5 shrink-0">
                    <div className="absolute inset-0" style={{ backgroundColor: c.color }} />
                    <input type="color" value={c.color} onChange={(e) => setSourceGroups(prev => prev.map(g => g.id === selectedSourceGroupId ? { ...g, colors: g.colors.map(color => color.id === c.id ? { ...color, color: e.target.value } : color) } : g))} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                  </div>
                  
                  <input value={c.color} onChange={(e) => setSourceGroups(prev => prev.map(g => g.id === selectedSourceGroupId ? { ...g, colors: g.colors.map(color => color.id === c.id ? { ...color, color: e.target.value } : color) } : g))} className="bg-black/40 border border-white/10 rounded px-1.5 py-1 text-[9px] font-mono w-14 outline-none text-white/80 shrink-0" />
                  
                  <div className="flex items-center gap-2 flex-1">
                     <span className="text-[9px] text-white/40 w-5">{Math.round(c.opacity * 100)}%</span>
                     <input type="range" min="0" max="1" step="0.01" value={c.opacity} onChange={(e) => setSourceGroups(prev => prev.map(g => g.id === selectedSourceGroupId ? { ...g, colors: g.colors.map(color => color.id === c.id ? { ...color, opacity: Number(e.target.value) } : color) } : g))} className="flex-1 appearance-none bg-white/10 h-1 rounded-full accent-indigo-500 min-w-0" />
                  </div>

                  <button onClick={() => setSourceGroups(prev => prev.map(g => g.id === selectedSourceGroupId ? { ...g, colors: g.colors.filter(color => color.id !== c.id) } : g))} className="text-red-400 opacity-50 hover:opacity-100 transition-all text-sm px-1 shrink-0">×</button>
                </div>
              ))}
            </div>
            <button onClick={() => setSourceGroups(prev => prev.map(g => g.id === selectedSourceGroupId ? { ...g, colors: [...g.colors, { id: Date.now(), color: "#FFFFFF", opacity: 0.8 }] } : g))} className="w-full py-2 border border-white/5 rounded-lg hover:bg-white/5 transition-all text-[11px] font-bold text-white/30">+ Couleur source</button>
          </div>
        </PanelSection>

        {/* ASPECT GLOBAL */}
        <PanelSection title="ASPECT GLOBAL" id="aspect" isOpen={openSections.aspect} onToggle={() => toggleSection("aspect")}>
            <div className="space-y-6">
              {/* TOGGLES GROUP */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-white/70">Afficher contours</span>
                  <Toggle checked={showOutlines} onChange={setShowOutlines} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-white/70">Désactiver dans le hero</span>
                  <Toggle checked={settings.avoidHero} onChange={(v) => updateSettings({ avoidHero: v })} />
                </div>
              </div>

              <div className="h-px bg-white/5" />

              {/* AUTO LAYOUT CONTROLS */}
              <div className="space-y-1">
                <CompactSlider label="Densité Y" value={settings.verticalDensity} min={40} max={160} suffix="vh" onChange={handleDensityChange} />
                <CompactSlider label="Spread X" value={settings.horizontalSpread} min={10} max={100} suffix="%" onChange={(v: number) => handleGlobalAspectChange({ horizontalSpread: v })} />
              </div>

              <div className="h-px bg-white/5" />

              {/* DIMENSIONS */}
              <div className="space-y-2">
                <CompactSlider label="Taille" value={settings.groupSize} min={0.1} max={3} step={0.01} onChange={(v: number) => handleGlobalAspectChange({ groupSize: v })} />
                <CompactSlider label="Flou" value={settings.groupBlur} min={0} max={4} step={0.01} onChange={(v: number) => handleGlobalAspectChange({ groupBlur: v })} />
                <CompactSlider label="Intensité" value={settings.groupIntensity} min={0} max={2} step={0.01} onChange={(v: number) => handleGlobalAspectChange({ groupIntensity: v })} />
              </div>

              <div className="h-px bg-white/5" />

              {/* AMBIANCE */}
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/70">Mode</span>
                  <div className="flex bg-[#1A1F26] p-1 rounded-lg border border-white/5">
                    {["dark", "light"].map(t => (
                      <button key={t} onClick={() => handleGlobalAspectChange({ theme: t as any })} className={`px-4 py-1.5 rounded-md text-[10px] font-bold uppercase transition-all ${settings.theme === t ? 'bg-[#252B35] text-white shadow-lg' : 'text-white/30 hover:text-white/50'}`}>{t}</button>
                    ))}
                  </div>
                </div>
                <CompactSlider label="% sombres" value={settings.darkPercent} min={0} max={100} suffix="%" onChange={(v: number) => handleGlobalAspectChange({ darkPercent: v })} />
                <CompactSlider label="% principal" value={settings.mainPercent} min={0} max={100} suffix="%" onChange={(v: number) => handleGlobalAspectChange({ mainPercent: v })} />
                <CompactSlider label="% accent" value={settings.accentPercent} min={0} max={100} suffix="%" onChange={(v: number) => handleGlobalAspectChange({ accentPercent: v })} />
              </div>
           </div>
        </PanelSection>

        {/* GROUPES DE HALOS */}
        <PanelSection title="GROUPES DE HALOS" id="groups" isOpen={openSections.groups} onToggle={() => toggleSection("groups")}>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <button onClick={() => {
              const totalVH = (document.body.scrollHeight / window.innerHeight) * 100;
              setHaloGroups(generatePageGroups(selectedSourceGroup.colors, settings, totalVH, []));
            }} className="py-2.5 bg-white/5 border border-white/10 rounded-lg text-[11px] font-bold">Générer page</button>
            <button onClick={addOneGroup} className="py-2.5 bg-white/5 border border-white/10 rounded-lg text-[11px] font-bold">+ Groupe</button>
            <button onClick={savePage} className="py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-[11px] font-bold shadow-lg transition-all">Enregistrer</button>
            <button onClick={saveGradientToProject} className="py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-[11px] font-bold tracking-wide transition-all">Sauvegarder JSON</button>
          </div>

          <div className="bg-white/[0.03] border border-white/5 rounded-xl p-3 mb-4 space-y-2">
             <span className="text-[10px] font-bold uppercase text-white/30 tracking-wider">Pages de gradients</span>
             <div className="grid grid-cols-2 gap-2">
               {savedGradients.map(p => (
                 <div key={p.id} onClick={() => applySavedPage(p)} className={`flex gap-1 items-center p-1.5 rounded-lg transition-all cursor-pointer ${activePageId === p.id ? 'bg-indigo-500/20 border border-indigo-500/40' : 'hover:bg-white/5 border border-transparent'}`}>
                   <input value={p.name} onClick={(e) => e.stopPropagation()} onChange={(e) => { const n = e.target.value; setSavedGradients(prev => prev.map(item => item.id === p.id ? { ...item, name: n } : item)); }} className="bg-black/40 border border-white/5 rounded-md px-1.5 py-1 flex-1 text-[10px] outline-none min-w-0" />
                   {activePageId === p.id && (
                     <button onClick={(e) => { e.stopPropagation(); updateActivePage(p.id); }} className="p-1 bg-indigo-500 hover:bg-indigo-600 rounded text-white transition-all flex items-center justify-center shrink-0" title="Enregistrer les modifications">
                       <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
                     </button>
                   )}
                   <button onClick={(e) => { e.stopPropagation(); setSavedGradients(prev => prev.filter(item => item.id !== p.id)); }} className="text-red-400 text-lg opacity-50 hover:opacity-100 shrink-0 px-1">×</button>
                 </div>
               ))}
             </div>
             {savedGradients.length === 0 && <span className="text-[10px] text-white/30 italic">Aucune page enregistrée</span>}
          </div>

          <div className="space-y-4">
            {haloGroups.map((g) => (
              <GroupCard 
                key={g.id} 
                group={g} 
                allGroups={haloGroups} 
                isSelected={selectedGroupId === g.id} 
                savedGradients={savedGradients} 
                onSelect={() => setSelectedGroupId(g.id)}
                onDelete={() => setHaloGroups(prev => prev.filter(item => item.id !== g.id))}
                onUpdate={(p: any) => setHaloGroups(prev => prev.map(item => item.id === g.id ? { ...item, ...p } : item))}
                onUpdateAllHalos={(p: any) => setHaloGroups(prev => prev.map(item => item.id === g.id ? { ...item, halos: item.halos.map(h => ({ ...h, ...p })) } : item))}
                onUpdateHalo={(id: number, p: any) => setHaloGroups(prev => prev.map(item => item.id === g.id ? { ...item, halos: item.halos.map(h => h.id === id ? { ...h, ...p } : h) } : item))}
                onMoveHalo={(haloId: number, targetGroupId: number) => moveHalo(haloId, g.id, targetGroupId)}
                onDuplicateHalo={(id: number) => {
                  const h = g.halos.find(item => item.id === id);
                  if (h) setHaloGroups(prev => prev.map(item => item.id === g.id ? { ...item, halos: [...item.halos, { ...h, id: Date.now() }] } : item));
                }}
                onDeleteHalo={(id: number) => setHaloGroups(prev => prev.map(item => item.id === g.id ? { ...item, halos: item.halos.filter(h => h.id !== id) } : item))}
                onAddHalo={() => {
                  const h = { ...g.halos[0], id: Date.now(), kind: "main" as HaloKind, x: 50, y: 50 };
                  setHaloGroups(prev => prev.map(item => item.id === g.id ? { ...item, halos: [...item.halos, h] } : item));
                }}
                onDuplicateGroup={() => {
                  const newG = { ...g, id: Date.now(), index: g.index + 0.5 };
                  setHaloGroups(prev => [...prev, newG].sort((a, b) => a.index - b.index));
                }}
                onRandomize={() => {
                  const newG = randomizeGroup(g, selectedSourceGroup.colors, settings);
                  setHaloGroups(prev => prev.map(item => item.id === g.id ? newG : item));
                }}
                onDragStart={() => setDraggedId(g.id)}
                onDragEnd={() => setDraggedId(null)}
                onDragEnter={() => {
                  if (draggedId === null || draggedId === g.id) return;
                  const newGroups = [...haloGroups];
                  const sourceIdx = newGroups.findIndex(item => item.id === draggedId);
                  const targetIdx = newGroups.findIndex(item => item.id === g.id);
                  if (sourceIdx === -1 || targetIdx === -1) return;
                  
                  const [movedItem] = newGroups.splice(sourceIdx, 1);
                  newGroups.splice(targetIdx, 0, movedItem);
                  setHaloGroups(newGroups.map((group, index) => ({ ...group, index })));
                }}
              />
            ))}
          </div>
        </PanelSection>

        {/* ANIMATION */}
        <PanelSection title="ANIMATION" id="animation" isOpen={openSections.animation} onToggle={() => toggleSection("animation")}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-white/70">Activer animation</span>
            <Toggle checked={settings.animationEnabled} onChange={(v) => updateSettings({ animationEnabled: v })} />
          </div>
          <div className="flex items-center justify-between mb-6">
             <span className="text-white/40 uppercase text-[10px] font-bold tracking-wider">Pré-réglage</span>
             <select value={settings.animationMode} onChange={(e) => updateSettings(animationPreset(e.target.value as AnimationMode))} className="bg-[#1A1F26] border border-white/5 rounded-lg px-3 py-2 text-[11px] font-bold outline-none">
                {["static", "atmospheric", "cinematic", "floating", "deep", "liquid", "aurora", "energy"].map(m => <option key={m} value={m}>{m.charAt(0).toUpperCase() + m.slice(1)}</option>)}
             </select>
          </div>
          <div className="space-y-1">
            <CompactSlider label="Intensité" value={settings.animationIntensity} min={0} max={2} step={0.01} onChange={(v: number) => updateSettings({ animationIntensity: v })} />
            <CompactSlider label="Vitesse" value={settings.animationSpeed} min={0.1} max={3} step={0.01} onChange={(v: number) => updateSettings({ animationSpeed: v })} />
            <CompactSlider label="Drift X" value={settings.animationDriftX} min={0} max={20} step={0.1} suffix="%" onChange={(v: number) => updateSettings({ animationDriftX: v })} />
            <CompactSlider label="Drift Y" value={settings.animationDriftY} min={0} max={20} step={0.1} suffix="vh" onChange={(v: number) => updateSettings({ animationDriftY: v })} />
            <CompactSlider label="Respiration" value={settings.animationBreathing} min={0} max={1} step={0.01} onChange={(v: number) => updateSettings({ animationBreathing: v })} />
            <CompactSlider label="Blur vivant" value={settings.animationBlur} min={0} max={1} step={0.01} onChange={(v: number) => updateSettings({ animationBlur: v })} />
            <CompactSlider label="Parallax" value={settings.animationParallax} min={0} max={1} step={0.01} onChange={(v: number) => updateSettings({ animationParallax: v })} />
          </div>
        </PanelSection>
      </div>

      {/* FOOTER */}
      <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
        <button onClick={resetAll} className="py-4 border border-white/10 rounded-xl hover:bg-white/5 text-[11px] font-bold opacity-50">Réinitialiser</button>
        <button onClick={() => alert("CSS copié !")} className="py-4 bg-indigo-500 text-white rounded-xl text-[11px] font-bold shadow-lg">Copier le CSS</button>
      </div>
    </aside>
  );
};

function GroupCard({ group, allGroups, isSelected, onSelect, onDelete, onUpdate, onUpdateAllHalos, onUpdateHalo, onMoveHalo, onDuplicateHalo, onDeleteHalo, onAddHalo, onDuplicateGroup, onRandomize, onDragStart, onDragEnd, onDragEnter }: any) {
  const [isGroupExpanded, setIsGroupExpanded] = useState(false);
  const [isAdvancedExpanded, setIsAdvancedExpanded] = useState(false);
  const [selectedHaloId, setSelectedHaloId] = useState<number | null>(null);
  const ref = group.halos[0] || { size: 50, blur: 100, stretch: 100, intensity: 1, opacity: 0.8, x: 50, y: 50 };
  const selectedHalo = group.halos.find((h: any) => h.id === selectedHaloId);

  return (
    <div 
      onDragEnter={onDragEnter}
      onDragOver={(e) => e.preventDefault()}
      className={`p-4 rounded-2xl border transition-all cursor-default ${isSelected ? 'bg-indigo-500/10 border-indigo-500/40 shadow-[0_0_20px_rgba(99,102,241,0.1)]' : 'bg-white/[0.03] border-white/5 hover:border-white/10'}`} 
      onClick={onSelect}
    >
      <div className="flex items-center justify-between mb-4 gap-2">
        <div className="flex items-center gap-2 flex-1">
          <div 
            draggable 
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            className="cursor-grab active:cursor-grabbing text-white/20 hover:text-white/40 p-1"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>
          </div>
          <input value={group.name} onClick={(e) => e.stopPropagation()} onChange={(e) => onUpdate({ name: e.target.value })} className="bg-transparent rounded px-1 py-0.5 flex-1 font-bold text-[11px] outline-none" />
        </div>
        <div className="flex items-center gap-1">
          <button onClick={(e) => { e.stopPropagation(); onRandomize(); }} className="px-2 py-1 bg-white/5 hover:bg-indigo-500/20 text-white/40 hover:text-indigo-400 rounded text-[9px] font-bold uppercase transition-all">Random</button>
          <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="text-red-400 opacity-40 hover:opacity-100 text-lg px-2">×</button>
        </div>
      </div>
      <div className="flex gap-1.5 items-center">
        <button onClick={(e) => { e.stopPropagation(); setIsGroupExpanded(!isGroupExpanded); }} className="px-2 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[10px] font-bold text-white/40 transition-all">{isGroupExpanded ? "▼" : "▶"}</button>
        <button onClick={(e) => { e.stopPropagation(); onUpdate({ enabled: !group.enabled }); }} className={`px-4 py-1.5 rounded-lg text-[9px] font-bold uppercase transition-all ${group.enabled ? 'bg-indigo-500 text-white shadow-[0_0_10px_rgba(99,102,241,0.3)]' : 'bg-white/10 text-white/30'}`}>ON</button>
        <button onClick={(e) => { e.stopPropagation(); onUpdate({ locked: !group.locked }); }} className={`px-4 py-1.5 rounded-lg text-[9px] font-bold uppercase transition-all ${group.locked ? 'bg-emerald-500 text-white' : 'bg-white/10 text-white/30'}`}>{group.locked ? 'LOCKED' : 'FREE'}</button>
        <button onClick={(e) => { e.stopPropagation(); onUpdate({ scale: 1, intensity: 1 }); onUpdateAllHalos({ size: 50, blur: 100, stretch: 100, intensity: 1, opacity: 0.8 }); }} className="px-4 py-1.5 bg-white/10 rounded-lg text-[9px] font-bold uppercase hover:bg-white/20 transition-all">RESET</button>
        <button onClick={(e) => { e.stopPropagation(); onAddHalo(); }} className="px-4 py-1.5 bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded-lg text-[10px] font-bold hover:bg-indigo-500/30 transition-all">+</button>
        <button onClick={(e) => { e.stopPropagation(); onDuplicateGroup(); }} className="px-3.5 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold hover:bg-white/10 transition-all">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        </button>
      </div>

      {isGroupExpanded && (
        <div className="pt-4">
          <div className="space-y-2 mb-4">
            <CompactSlider label="Échelle" value={group.scale} min={0.1} max={3} step={0.01} onChange={(v: number) => onUpdate({ scale: v })} />
            <CompactSlider label="Intensité" value={group.intensity} min={0} max={2} step={0.01} onChange={(v: number) => onUpdate({ intensity: v })} />
            <CompactSlider label="POS X" value={ref.x} min={0} max={100} suffix="%" onChange={(v: number) => onUpdateAllHalos({ x: v })} />
            <CompactSlider label="POS Y" value={ref.y} min={-400} max={800} suffix="vh" onChange={(v: number) => onUpdateAllHalos({ y: v })} />
          </div>
          
          <button onClick={(e) => { e.stopPropagation(); setIsAdvancedExpanded(!isAdvancedExpanded); }} className={`w-full py-1.5 bg-transparent border hover:bg-white/5 rounded-xl text-[10px] font-bold text-white/40 mb-4 transition-all ${isAdvancedExpanded ? 'border-indigo-500/50 text-indigo-400' : 'border-white/20'}`}>{isAdvancedExpanded ? "Réduire les réglages" : "Agrandir les réglages"}</button>
          
          {isAdvancedExpanded && (
            <div className="space-y-2 mb-4 border-b border-white/5 pb-4">
              <CompactSlider label="Taille" value={ref.size} min={5} max={150} suffix="vh" onChange={(v: number) => onUpdateAllHalos({ size: v })} />
              <CompactSlider label="Flou" value={ref.blur} min={0} max={300} suffix="px" onChange={(v: number) => onUpdateAllHalos({ blur: v })} />
              <CompactSlider label="Étirement" value={ref.stretch} min={10} max={400} suffix="%" onChange={(v: number) => onUpdateAllHalos({ stretch: v })} />
              <CompactSlider label="Opacité" value={ref.opacity} min={0} max={1} step={0.01} onChange={(v: number) => onUpdateAllHalos({ opacity: v })} />
            </div>
          )}

          <div className="flex gap-2.5 flex-wrap mb-4">
            {group.halos.map((h: any) => (
              <div key={h.id} className="relative group">
                <button 
                  onClick={(e) => { e.stopPropagation(); onUpdateHalo(h.id, { enabled: h.enabled === false }); }}
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all p-1 bg-black/60 rounded-full text-[8px] z-10 ${h.enabled === false ? 'text-red-400' : 'text-emerald-400'}`}
                >
                  {h.enabled === false ? '●' : '○'}
                </button>
                <button onClick={(e) => { e.stopPropagation(); setSelectedHaloId(selectedHaloId === h.id ? null : h.id); }}
                  className={`w-6 h-6 rounded-full border-2 transition-all ${selectedHaloId === h.id ? 'border-white scale-110 shadow-[0_0_10px_white]' : 'border-white/20'} ${h.enabled === false ? 'opacity-20 grayscale' : 'opacity-100'}`} 
                  style={{ backgroundColor: h.color }} 
                />
              </div>
            ))}
          </div>

        </div>
      )}
      {isGroupExpanded && selectedHalo && (
        <div className="mt-4 bg-[#1A1F26] rounded-2xl p-5 space-y-5 border border-white/10" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full border border-white/20" style={{ backgroundColor: selectedHalo.color }} />
              <span className="font-bold text-[13px]">Halo #{selectedHalo.id.toString().slice(-4)}</span>
            </div>
            <div className="flex gap-2 items-center">
              <select 
                onChange={(e) => {
                  const targetId = Number(e.target.value);
                  if (targetId) onMoveHalo(selectedHalo.id, targetId);
                }}
                className="bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-[10px] font-bold outline-none text-indigo-400 hover:bg-indigo-500/10 transition-all cursor-pointer"
                value=""
              >
                <option value="" disabled>▼ Transférer</option>
                {allGroups.filter((ag: any) => ag.id !== group.id).map((ag: any) => (
                  <option key={ag.id} value={ag.id}>{ag.name || `Groupe ${ag.index}`}</option>
                ))}
              </select>
              <button onClick={() => onDuplicateHalo(selectedHalo.id)} className="p-2 bg-white/5 rounded-lg text-lg">❐</button>
              <button onClick={() => onDeleteHalo(selectedHalo.id)} className="p-2 bg-red-500/10 text-red-400 rounded-lg text-lg">×</button>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-[10px]">
              <span className="opacity-40 uppercase font-bold tracking-widest">Gradient</span>
              <select value={selectedHalo.gradientType} onChange={(e) => onUpdateHalo(selectedHalo.id, { gradientType: e.target.value as GradientType })} className="bg-black/40 border border-white/5 rounded-lg px-2 py-1.5 outline-none font-bold">
                <option value="radial">radial</option>
                <option value="linear">linear</option>
                <option value="conic">conic</option>
              </select>
            </div>
            <div className="flex justify-between items-center text-[10px]">
              <span className="opacity-40 uppercase font-bold tracking-widest">Type</span>
              <select value={selectedHalo.kind} onChange={(e) => onUpdateHalo(selectedHalo.id, { kind: e.target.value as HaloKind })} className="bg-black/40 border border-white/5 rounded-lg px-2 py-1.5 outline-none font-bold">
                <option value="dark">sombre/clair</option>
                <option value="main">principal</option>
                <option value="accent">accent</option>
              </select>
            </div>
            
            <div className="space-y-1">
              <CompactSlider label="POS X" value={selectedHalo.x} min={0} max={100} suffix="%" onChange={(v: number) => onUpdateHalo(selectedHalo.id, { x: v })} />
              <CompactSlider label="POS Y" value={selectedHalo.y} min={-400} max={800} suffix="vh" onChange={(v: number) => onUpdateHalo(selectedHalo.id, { y: v })} />
              <CompactSlider label="Taille" value={selectedHalo.size} min={5} max={150} suffix="vh" onChange={(v: number) => onUpdateHalo(selectedHalo.id, { size: v })} />
              <CompactSlider label="Flou" value={selectedHalo.blur} min={0} max={300} suffix="px" onChange={(v: number) => onUpdateHalo(selectedHalo.id, { blur: v })} />
              <CompactSlider label="Étirement" value={selectedHalo.stretch} min={10} max={400} suffix="%" onChange={(v: number) => onUpdateHalo(selectedHalo.id, { stretch: v })} />
              <CompactSlider label="Intensité" value={selectedHalo.intensity} min={0} max={2} step={0.01} onChange={(v: number) => onUpdateHalo(selectedHalo.id, { intensity: v })} />
              <CompactSlider label="Opacité" value={selectedHalo.opacity} min={0} max={1} step={0.01} onChange={(v: number) => onUpdateHalo(selectedHalo.id, { opacity: v })} />
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Couleur</span>
              <div className="flex gap-2">
                <div className="h-8 w-8 rounded-lg relative overflow-hidden border border-white/10 shrink-0 shadow-lg">
                  <div className="absolute inset-0" style={{ backgroundColor: selectedHalo.color }} />
                  <input type="color" value={selectedHalo.color} onChange={(e) => onUpdateHalo(selectedHalo.id, { color: e.target.value })} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                </div>
                <input value={selectedHalo.color} onChange={(e) => onUpdateHalo(selectedHalo.id, { color: e.target.value })} className="bg-black/40 border border-white/5 rounded-lg px-3 py-1.5 outline-none font-mono text-[11px] flex-1 text-white/80" placeholder="#XXXXXX" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CompactSlider({ label, value, min, max, step = 1, suffix = "", onChange }: any) {
  return (
    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
      <span className="w-16 text-[9px] text-white/40 truncate uppercase font-bold tracking-tighter">{label}</span>
      <div className="bg-black/40 px-1 py-1 rounded min-w-[40px] text-center text-[10px] border border-white/5 text-white/90 font-medium">
        {typeof value === 'number' ? (suffix === '%' ? Math.round(value) : value.toFixed(step < 1 ? 2 : 0)) : value}{suffix}
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="flex-1 appearance-none bg-white/10 h-[2px] rounded-full accent-indigo-400" />
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean, onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!checked)} className={`relative w-12 h-6 rounded-full transition-all border ${checked ? 'bg-indigo-500 border-indigo-400' : 'bg-white/10 border-white/5'}`}><div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-all ${checked ? 'translate-x-6' : 'translate-x-0'}`} /></button>
  );
}

function PanelSection({ title, isOpen, onToggle, children }: any) {
  return (
    <div className="border-b border-white/5 last:border-0">
      <button onClick={onToggle} className="flex w-full items-center justify-between py-4 text-[11px] font-bold tracking-widest text-white/60 hover:text-white transition-all uppercase">{title} <span>{isOpen ? "−" : "+"}</span></button>
      {isOpen && <div className="pb-6">{children}</div>}
    </div>
  );
}
