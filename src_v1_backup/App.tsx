/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChevronRight, Menu, X, Clock, Users, Calendar, AlertTriangle, Smartphone, Moon, TrendingUp, Sparkles, Zap, Lock, Target, Star, Quote, Power, ShieldCheck, User, PenBox, PlayCircle, FileText, Infinity, Check, Instagram, Music2, Youtube, Play, FileEdit, LineChart, Bell, Frown, RefreshCw, Activity, HeartCrack, Tornado, Brain } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import bgImage from './background.webp';
import fondBackground from './Fondcards.png';
import vortexImage from './vortex.webp';
import CustomBrain from './components/CustomBrain';
import { GradientBackground } from './components/gradient/GradientBackground';
import homeGradient from '../public/gradients/home.gradient.json';

const GradientIcon = ({ paths, size = 40, eyes = false, strokeWidth = "2" }: { paths: string[], size?: number, eyes?: boolean, strokeWidth?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="url(#peach-grad)" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className="">
    {paths.map((d, i) => (
      d.startsWith('circle:') ? (
        <circle key={i} cx={d.split(':')[1]} cy={d.split(':')[2]} r={d.split(':')[3]} />
      ) : (
        <path key={i} d={d} />
      )
    ))}
    {eyes && (
      <>
        <circle cx="9" cy="9" r="1" fill="url(#peach-grad)" stroke="none" />
        <circle cx="15" cy="9" r="1" fill="url(#peach-grad)" stroke="none" />
      </>
    )}
  </svg>
);

const diagnosticFeatures = [
  { icon: <User size={24} />, title: "Découvre ton profil de scroll", desc: "Le diagnostic révèle le type de mécanisme comportemental qui influence ton rapport aux réseaux." },
  { icon: <Activity size={24} />, title: "Mesure ton niveau d’emprise", desc: "Vois l’impact réel de ton scroll sur ton attention, ton temps et tes habitudes." },
  { icon: <Brain size={24} />, title: "Observe tes schémas invisibles", desc: "Comprends les comportements qui influencent automatiquement ta manière de scroller." }
];

const testimonials = [
  {
    text: "Ma fille de 14 ans a été hospitalisée 3 semaines pour dépression sévère. Les médecins ont été clairs : l'usage nocturne des réseaux avait déclenché un épisode psychiatrique. Personne ne nous avait dit que c'était possible. Personne.",
    name: "Isabelle, 44 ans",
    role: "Mère de famille, Bordeaux",
    avatar: "https://i.pravatar.cc/150?u=isabelle",
    tag: "PARENT"
  },
  {
    text: "J'ai raté mon bac parce que je passais mes nuits sur TikTok au lieu de dormir. C'est quand j'ai compris le mécanisme que j'ai pu m'en sortir. J'ai eu mon bac l'année d'après.",
    name: "Mathis, 18 ans",
    role: "Lycéen, Lyon",
    avatar: "https://i.pravatar.cc/150?u=mathis",
    tag: "BAC RATÉ → RATTRAPÉ"
  },
  {
    text: "Les apps de contrôle du temps d'écran : ça tient 3 jours. Elles mettent un pansement sur une hémorragie. Comprendre pourquoi mon cerveau cherchait cette dopamine — ça, ça a tout changé.",
    name: "Laurent, 27 ans",
    role: "Développeur, Paris",
    avatar: "https://i.pravatar.cc/150?u=laurent",
    tag: "4H → 35MIN/JOUR"
  }
];

const modules = [
  { moduleNum: "MODULE 1", title: "Comprendre", desc: "Comprends ton cerveau, le fonctionnement de ton attention et pourquoi ton usage te contrôle.", duration: "Durée : 5 jours", icon: <Brain size={28} /> },
  { moduleNum: "MODULE 2", title: "Désactiver", desc: "Désactive les déclencheurs, réduis ton usage problématique et crée de l'espace mental.", duration: "Durée : 5 jours", icon: <Power size={28} /> },
  { moduleNum: "MODULE 3", title: "Reprogrammer", desc: "Reprogramme ton environnement et ton cerveau pour soutenir ta concentration et tes objectifs.", duration: "Durée : 5 jours", icon: <Target size={28} /> },
  { moduleNum: "MODULE 4", title: "Tenir", desc: "Renforce ta discipline, surmonte les obstacles et construis des habitudes durables qui te font avancer chaque jour.", duration: "Durée : 5 jours", icon: <Star size={28} /> },
  { moduleNum: "MODULE 5", tag: "PARENT", title: "Accompagner avec impact", desc: "Des outils et repères pour accompagner ton enfant avec bienveillance et efficacité.", duration: "Durée : 4 jours", icon: <Users size={28} /> },
];

const successFeatures = [
  { icon: <Calendar size={28} />, title: "Plan d'action jour par jour", desc: "Un parcours structuré et progressif pour passer à l'action chaque jour." },
  { icon: <Users size={28} />, title: "Communauté privée d'entraide", desc: "Échange, partage et soutien avec des personnes qui vivent la même chose que toi." },
  { icon: <FileEdit size={28} />, title: "Des exercices pratiques", desc: "Des actions concrètes, simples et efficaces pour appliquer la méthode dans ta vie réelle." },
  { icon: <FileText size={28} />, title: "Des fiches ressources", desc: "Des guides et outils téléchargeables pour aller plus loin à tout moment." },
  { icon: <LineChart size={28} />, title: "Suivi de progression", desc: "Suis tes avancées, célèbre tes victoires et reste motivé sur le long terme." },
  { icon: <Infinity size={28} />, title: "Accès à vie et mise à jour", desc: "Accède à vie à tous les contenus et profite des mises à jour et nouveautés." },
];

const BrainEffectGraph = () => (
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
      <motion.path
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        d="M10,98 C150,97 250,90 320,40 S390,0 398,0 L398,98 L10,98 Z"
        fill="url(#graphGradient)"
      />

      {/* The Curve */}
      <motion.path
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
      <motion.path
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
        <motion.circle
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

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Mon diagnostic', href: '#' },
    { name: 'Témoignages', href: '#' },
    { name: 'La méthode', href: '#' },
    { name: 'Les offres', href: '#' },
  ];

  const stats = [
    {
      icon: <Users size={32} strokeWidth={1.5} className="mt-1" />,
      value: "73%",
      text: "des gens qui essaient de réduire leur usage seuls rechutent dans les 3 premiers mois.",
      source: "Journal of Behavioral Addictions\nAPA Digital Health Report 2024",
      hasGraph: false
    },
    {
      icon: <Brain size={32} className="mt-1" strokeWidth={1.5} />,
      value: "21j",
      text: "suffisent pour recâbler les circuits dopaminergiques et retrouver un rapport sain à l'écran.",
      source: "Neuroplasticité comportementale\nEuropean Journal of Social Psychology, 2010",
      hasGraph: false
    },
    {
      icon: <Activity size={32} strokeWidth={1.5} className="mt-1" />,
      value: "×2,14",
      text: "Un usage problématique rend 2,14 fois plus susceptible de souffrir d'anxiété chronique. Corrélation confirmée sur 33 650 étudiants.",
      source: "J. Behavioral Addictions -\nMéta-analyse, 2020",
      hasGraph: false
    },
    {
      icon: <HeartCrack size={32} strokeWidth={1.5} className="mt-1" />,
      value: "×2,15",
      text: "Chaque notification déclenche une réponse au stress, augmentant le niveau de cortisol basal.",
      source: "Impact des notifications sur le stress\nÉtudes scientifiques peer-reviewed",
      hasGraph: true
    },
    {
      icon: <Moon size={32} strokeWidth={1.5} className="mt-1" />,
      value: "×2,60",
      text: "La lumière bleue et la stimulation dopaminergique retardent l'endormissement en moyenne de 1h30.",
      source: "BMC Psychiatry - Sohn et al.,\nKing's College London, 2019",
      hasGraph: true
    },
    {
      icon: <Frown size={32} strokeWidth={1.5} className="mt-1" />,
      value: "×3,17",
      text: "Les ados avec un usage problématique sont 3,17 fois plus susceptibles de souffrir de dépression.",
      source: "BMC Psychiatry -\nKing's College London, 2019",
      hasGraph: true
    }
  ];

  return (
    <div className="relative w-full min-h-full">
      <GradientBackground 
        groups={homeGradient.haloGroups as any} 
        settings={homeGradient.settings as any} 
        pageVh={800} 
      />
      <div className="relative z-0 w-full h-full text-white font-sans overflow-x-hidden selection:bg-white/20">
      <svg width="0" height="0" className="absolute pointer-events-none appearance-none" aria-hidden="true">
        <defs>
          <linearGradient id="peach-grad" x1="0" y1="24" x2="24" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#ffcda5" />
          </linearGradient>
          <linearGradient id="peach-icon-gradient" x1="0" y1="24" x2="24" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#ffcda5" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Hero Wrapper with Background */}
      <div className="relative min-h-screen">
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <img 
            src={bgImage} 
            alt="Atmospheric Background" 
            className="w-full h-full object-cover"
            draggable="false"
          />
          <div className="absolute inset-x-0 bottom-0 h-[60vh] bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505] pointer-events-none" />
        </div>

        {/* Navigation */}
      <nav id="navbar" className="relative z-50 px-6 py-12 md:px-12 flex justify-between items-center max-w-7xl mx-auto">
        {/* Integrated Logo */}
        <div className="relative flex items-center">
          <div className="relative group flex items-center justify-center">
            {/* Centered Integrated Text */}
            <svg className="h-[80px] md:h-[120px] w-auto text-white relative z-10 -ml-2 -my-8 md:-my-12 pointer-events-none" viewBox="0 0 1120 760" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Scrollfree wordmark">
              <defs>
                <filter id="wordGlow" x="-30%" y="-120%" width="160%" height="340%" colorInterpolationFilters="sRGB">
                  <feGaussianBlur stdDeviation="1.2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <filter id="arcGlow" x="-220%" y="-220%" width="540%" height="540%" colorInterpolationFilters="sRGB">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="glow1">
                    <animate attributeName="stdDeviation" values="6;10;6" dur="3.6s" repeatCount="indefinite"/>
                  </feGaussianBlur>

                  <feGaussianBlur in="SourceGraphic" stdDeviation="26" result="glow2">
                    <animate attributeName="stdDeviation" values="26;44;26" dur="3.6s" repeatCount="indefinite"/>
                  </feGaussianBlur>

                  <feComponentTransfer in="glow2" result="boostedGlow">
                    <feFuncA type="gamma" amplitude="1.8" exponent="0.82" offset="0"/>
                  </feComponentTransfer>

                  <feMerge>
                    <feMergeNode in="boostedGlow"/>
                    <feMergeNode in="glow1"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>

                <linearGradient id="topArc" gradientUnits="userSpaceOnUse" x1="290" y1="380" x2="730" y2="380">
                  <stop offset="0%" stopColor="#fff" stopOpacity="0"/>
                  <stop offset="14%" stopColor="#fff" stopOpacity=".18"/>
                  <stop offset="36%" stopColor="#fff" stopOpacity=".92"/>
                  <stop offset="52%" stopColor="#fff" stopOpacity="1"/>
                  <stop offset="74%" stopColor="#fff" stopOpacity=".72"/>
                  <stop offset="100%" stopColor="#fff" stopOpacity="0"/>
                </linearGradient>

                <linearGradient id="bottomArc" gradientUnits="userSpaceOnUse" x1="730" y1="380" x2="290" y2="380">
                  <stop offset="0%" stopColor="#fff" stopOpacity="0"/>
                  <stop offset="14%" stopColor="#fff" stopOpacity=".2"/>
                  <stop offset="36%" stopColor="#fff" stopOpacity=".96"/>
                  <stop offset="52%" stopColor="#fff" stopOpacity="1"/>
                  <stop offset="74%" stopColor="#fff" stopOpacity=".7"/>
                  <stop offset="100%" stopColor="#fff" stopOpacity="0"/>
                </linearGradient>
              </defs>

              <g filter="url(#arcGlow)" strokeLinecap="round" fill="none">
                <animate attributeName="opacity" values=".9;1;.9" dur="3.6s" repeatCount="indefinite"/>

                <path
                  d="M 290 380 A 220 220 0 0 1 730 380"
                  stroke="url(#topArc)"
                  strokeWidth="8.0"
                />

                <path
                  d="M 730 380 A 220 220 0 0 1 290 380"
                  stroke="url(#bottomArc)"
                  strokeWidth="8.0"
                />
              </g>

              <g transform="translate(0 300)">
                <g filter="url(#wordGlow)" fill="#f8f8f8" opacity="0.98" fontFamily="Helvetica Neue, Helvetica, Arial, sans-serif" fontWeight="300" fontSize="58" letterSpacing="0">
                  <text x="47"  y="101">S</text>
                  <text x="143" y="101">C</text>
                  <text x="239" y="101">R</text>
                  <text x="335" y="101">O</text>
                  <text x="437" y="101">L</text>
                  <text x="533" y="101">L</text>
                  <text x="628" y="101">F</text>
                  <text x="722" y="101">R</text>
                </g>

                <g filter="url(#wordGlow)" stroke="#f8f8f8" strokeWidth="5.2" strokeLinecap="round" opacity="0.98">
                  <line x1="817" y1="61" x2="847" y2="61"/>
                  <line x1="817" y1="79" x2="847" y2="79"/>
                  <line x1="817" y1="97" x2="847" y2="97"/>

                  <line x1="899" y1="61" x2="929" y2="61"/>
                  <line x1="899" y1="79" x2="929" y2="79"/>
                  <line x1="899" y1="97" x2="929" y2="97"/>
                </g>
              </g>
            </svg>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex gap-12 text-[16px] leading-[24px]">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[17px] leading-[31px] m-0 p-0 text-white hover:text-white/80 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Nav Toggle */}
        <button 
          className="md:hidden text-white" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-24 left-0 w-full bg-black/95 backdrop-blur-md border-b border-white/10 px-6 py-8 flex flex-col gap-6 md:hidden z-50 text-center"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-lg font-medium opacity-60 hover:opacity-100 transition-opacity"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <main id="hero" className="relative flex flex-col justify-center px-6 md:px-12 pt-20 pb-32 max-w-7xl mx-auto min-h-[calc(100vh-120px)]">
        <div className="max-w-3xl relative z-10">
          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-[65px] font-medium leading-[1.1] md:leading-[1.1] mb-8 tracking-tight text-white"
          >
            <span className="block">Reprends le contrôle</span>
            <span className="block">sur les écrans</span>
          </motion.h1>

          {/* Sub Headline */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-[19.4px] text-white/90 mb-12 max-w-2xl leading-[1.6] font-normal tracking-wide"
          >
            Scrollfree t'aide à reprendre le contrôle<br className="hidden sm:block" />
            sur les écrans en <span className="font-bold text-white">21 jours</span> avec<br className="hidden sm:block" />
            la méthode personnalisée Origine.
          </motion.p>

          {/* Call to Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 md:gap-5"
          >
            <button className="glass-cta-primary group flex items-center justify-center gap-3">
              Reprendre le contrôle
              <ChevronRight size={20} strokeWidth={2} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button 
              className="glass-cta group flex items-center justify-center gap-3"
              style={{ paddingLeft: '30px', paddingTop: '15px' }}
            >
              Mon diagnostic
              <ChevronRight size={20} strokeWidth={2} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </main>
      </div>

      <div className="bg-[#050505]">
      {/* Psychological Loop and Brain Effects */}
      <section className="relative z-10 px-6 py-24 md:px-12 max-w-5xl mx-auto w-full flex flex-col items-center">
        
        {/* La Boucle Psychologique */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative flex flex-col items-center text-center overflow-visible w-full"
        >
          <div className="relative z-10 w-full mb-10 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-white mb-6 max-w-4xl mx-auto uppercase"
            >
               LA BOUCLE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffcda5] to-[#f97316]">PSYCHOLOGIQUE</span>
            </motion.h2>
            <p className="text-white/60 text-[14px] md:text-base max-w-md mx-auto">
              Un cycle invisible qui alimente le scrolling compulsif et nous garde piégés.
            </p>
          </div>

          <div className="relative w-full max-w-[650px] aspect-square mx-auto mt-4 mb-20 hidden sm:block">
            {/* Background elements */}
            
            {/* Center Swirl - Improved Vortex matching image design */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 flex items-center justify-center overflow-visible z-10 pointer-events-none">
               <motion.div
                 animate={{ rotate: 360 }}
                 transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                 className="relative w-full h-full flex items-center justify-center opacity-100"
               >
                 <img src={vortexImage} alt="Vortex" className="w-[105%] h-[105%] max-w-none object-contain pointer-events-none drop-shadow-[0_0_20px_rgba(249,115,22,0.3)]" />
               </motion.div>
                
               {/* Background Glow */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-white/5 blur-[100px] pointer-events-none" />
            </div>

            {/* Connecting Arrows (Individual Paths with Gradients) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0" viewBox="0 0 500 500">
               <defs>
                 <linearGradient id="grad-v1" x1="0%" y1="100%" x2="100%" y2="0%">
                   <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
                   <stop offset="100%" stopColor="#ffffff" stopOpacity="0.5" />
                 </linearGradient>
                 <marker id="head-v1" viewBox="0 0 10 10" refX="0" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                   <path d="M 0 0 L 10 5 L 0 10 z" fill="#ffffff" fillOpacity="0.5"/>
                 </marker>

                 <linearGradient id="grad-v2" x1="0%" y1="0%" x2="100%" y2="100%">
                   <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
                   <stop offset="100%" stopColor="#ffffff" stopOpacity="0.5" />
                 </linearGradient>
                 <marker id="head-v2" viewBox="0 0 10 10" refX="0" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                   <path d="M 0 0 L 10 5 L 0 10 z" fill="#ffffff" fillOpacity="0.5"/>
                 </marker>

                 <linearGradient id="grad-v3" x1="100%" y1="0%" x2="0%" y2="100%">
                   <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
                   <stop offset="100%" stopColor="#ffffff" stopOpacity="0.5" />
                 </linearGradient>
                 <marker id="head-v3" viewBox="0 0 10 10" refX="0" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                   <path d="M 0 0 L 10 5 L 0 10 z" fill="#ffffff" fillOpacity="0.5"/>
                 </marker>

                 <linearGradient id="grad-v4" x1="100%" y1="0%" x2="0%" y2="0%">
                   <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
                   <stop offset="100%" stopColor="#ffffff" stopOpacity="0.5" />
                 </linearGradient>
                 <marker id="head-v4" viewBox="0 0 10 10" refX="0" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                   <path d="M 0 0 L 10 5 L 0 10 z" fill="#ffffff" fillOpacity="0.5"/>
                 </marker>

                 <linearGradient id="grad-v5" x1="0%" y1="100%" x2="0%" y2="0%">
                   <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
                   <stop offset="100%" stopColor="#ffffff" stopOpacity="0.5" />
                 </linearGradient>
                 <marker id="head-v5" viewBox="0 0 10 10" refX="0" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                   <path d="M 0 0 L 10 5 L 0 10 z" fill="#ffffff" fillOpacity="0.5"/>
                 </marker>
               </defs>
               <style>
                 {`
                   @keyframes pulseGlow {
                     0%, 100% { filter: drop-shadow(0 0 2px rgba(255,160,100,0)); opacity: 0.3; }
                     50% { filter: drop-shadow(0 0 15px rgba(255,160,100,1)); opacity: 1; }
                   }
                   .arrow-path { 
                     animation: pulseGlow 5s ease-in-out infinite;
                     transition: all 0.3s ease; 
                   }
                 `}
               </style>
               {/* Répétition -> Déclencheur */}
               <path d="M 121 173 A 150 150 0 0 1 201 108" fill="none" stroke="url(#grad-v5)" strokeWidth="3" markerEnd="url(#head-v1)" className="arrow-path" style={{animationDelay: '4s'}} />
               {/* Déclencheur -> Scroll */}
               <path d="M 284 104 A 150 150 0 0 1 370 160" fill="none" stroke="url(#grad-v1)" strokeWidth="3" markerEnd="url(#head-v2)" className="arrow-path" style={{animationDelay: '0s'}} />
               {/* Scroll -> Dopamine */}
               <path d="M 399 237 A 150 150 0 0 1 373 336" fill="none" stroke="url(#grad-v2)" strokeWidth="3" markerEnd="url(#head-v3)" className="arrow-path" style={{animationDelay: '1s'}} />
               {/* Dopamine -> Chute */}
               <path d="M 309 388 A 150 150 0 0 1 206 393" fill="none" stroke="url(#grad-v3)" strokeWidth="3" markerEnd="url(#head-v4)" className="arrow-path" style={{animationDelay: '2s'}} />
               {/* Chute -> Répétition */}
               <path d="M 137 348 A 150 150 0 0 1 100 253" fill="none" stroke="url(#grad-v4)" strokeWidth="3" markerEnd="url(#head-v5)" className="arrow-path" style={{animationDelay: '3s'}} />
            </svg>

            {/* Loop Items positioned between arrows */}
            {/* Déclencheur */}
            <div className="absolute z-30 flex items-center justify-center" style={{ left: "50%", top: "20%", transform: "translate(-50%, -50%)" }}>
               <div className="relative flex items-center justify-center w-16 h-16">
                 <div className="z-10 bg-[#050505] rounded-full text-transparent border border-transparent flex items-center justify-center">
                   <GradientIcon paths={["M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9", "M10.3 21a1.94 1.94 0 0 0 3.4 0"]} size={48} strokeWidth="2.5" />
                 </div>
                 <div className="absolute bottom-full mb-6 left-1/2 -translate-x-1/2 bg-[#050505]/80 backdrop-blur-xl py-3.5 px-6 rounded-2xl border border-white/5 w-max flex flex-col items-center text-center shadow-[0_0_20px_rgba(0,0,0,0.6)]">
                    <h4 className="text-white text-[13px] md:text-[15px] font-bold uppercase tracking-widest mb-1.5">Déclencheur</h4>
                    <p className="text-[#a0a0a0] text-[11px] md:text-[13px] leading-tight font-light">Un signal te pousse à agir.</p>
                 </div>
               </div>
            </div>

            {/* Scroll */}
            <div className="absolute z-30 flex items-center justify-center" style={{ left: "78.4%", top: "40.6%", transform: "translate(-50%, -50%)" }}>
               <div className="relative flex items-center justify-center w-16 h-16">
                 <div className="z-10 bg-[#050505] rounded-full text-transparent border border-transparent flex items-center justify-center">
                   <GradientIcon paths={["M6 6L18 18", "M18 6L6 18"]} size={56} strokeWidth="2.5" />
                 </div>
                 <div className="absolute left-full ml-6 top-1/2 -translate-y-1/2 bg-[#050505]/80 backdrop-blur-xl py-3.5 px-6 rounded-2xl border border-white/5 w-max flex flex-col items-start text-left shadow-[0_0_20px_rgba(0,0,0,0.6)]">
                    <h4 className="text-white text-[13px] md:text-[15px] font-bold uppercase tracking-widest mb-1.5">Scroll</h4>
                    <p className="text-[#a0a0a0] text-[11px] md:text-[13px] leading-tight font-light">Recherche effrénée de stimuli.</p>
                 </div>
               </div>
            </div>

            {/* Dopamine */}
            <div className="absolute z-30 flex items-center justify-center" style={{ left: "67.6%", top: "74.2%", transform: "translate(-50%, -50%)" }}>
               <div className="relative flex items-center justify-center w-16 h-16">
                 <div className="z-10 bg-[#050505] rounded-full border border-transparent flex items-center justify-center -ml-1.5 -mt-1.5">
                   <CustomBrain size={60} />
                 </div>
                 <div className="absolute left-full ml-6 top-1/2 -translate-y-1/2 bg-[#050505]/80 backdrop-blur-xl py-3.5 px-6 rounded-2xl border border-white/5 w-max flex flex-col items-start text-left shadow-[0_0_20px_rgba(0,0,0,0.6)]">
                    <h4 className="text-white text-[13px] md:text-[15px] font-bold uppercase tracking-widest mb-1.5">Dopamine</h4>
                    <p className="text-[#a0a0a0] text-[11px] md:text-[13px] leading-tight font-light">Plaisir éphémère et addictif.</p>
                 </div>
               </div>
            </div>

            {/* Chute */}
            <div className="absolute z-30 flex items-center justify-center" style={{ left: "32.4%", top: "74.2%", transform: "translate(-50%, -50%)" }}>
               <div className="relative flex items-center justify-center w-16 h-16">
                 <div className="z-10 bg-[#050505] rounded-full text-transparent border border-transparent flex items-center justify-center">
                   <GradientIcon paths={["circle:12:12:10", "M16 16s-1.5-2-4-2-4 2-4 2"]} size={48} strokeWidth="2.5" eyes={true} />
                 </div>
                 <div className="absolute right-full mr-6 top-1/2 -translate-y-1/2 bg-[#050505]/80 backdrop-blur-xl py-3.5 px-6 rounded-2xl border border-white/5 w-max flex flex-col items-start text-left shadow-[0_0_20px_rgba(0,0,0,0.6)]">
                    <h4 className="text-white text-[13px] md:text-[15px] font-bold uppercase tracking-widest mb-1.5">Chute</h4>
                    <p className="text-[#a0a0a0] text-[11px] md:text-[13px] leading-tight font-light">Culpabilité et vide émotionnel.</p>
                 </div>
               </div>
            </div>

            {/* Répétition */}
            <div className="absolute z-30 flex items-center justify-center" style={{ left: "21.6%", top: "40.6%", transform: "translate(-50%, -50%)" }}>
               <div className="relative flex items-center justify-center w-16 h-16">
                 <div className="z-10 bg-[#050505] text-transparent rounded-full border border-transparent flex items-center justify-center">
                   <GradientIcon paths={["M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", "M3 3v5h5"]} size={48} strokeWidth="2.5" />
                 </div>
                 <div className="absolute right-full mr-6 top-1/2 -translate-y-1/2 bg-[#050505]/80 backdrop-blur-xl py-3.5 px-6 rounded-2xl border border-white/5 w-max flex flex-col items-start text-left shadow-[0_0_20px_rgba(0,0,0,0.6)]">
                    <h4 className="text-white text-[13px] md:text-[15px] font-bold uppercase tracking-widest mb-1.5">Répétition</h4>
                    <p className="text-[#a0a0a0] text-[11px] md:text-[13px] leading-tight font-light">Ancrage profond du mécanisme.</p>
                 </div>
               </div>
            </div>
          </div>

             {/* Mobile Fallback Layout for the Loop */}
          <div className="sm:hidden w-full flex flex-col space-y-6 mt-8 mb-4">
             <div className="flex flex-col items-center text-center">
                <div className="mb-2">
                   <GradientIcon paths={["M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9", "M10.3 21a1.94 1.94 0 0 0 3.4 0"]} size={40} strokeWidth="2.5" />
                </div>
                <h4 className="text-white text-[10px] font-semibold uppercase tracking-wider mb-1">Déclencheur</h4>
                <p className="text-white/50 text-[9px] leading-snug max-w-[200px]">Un déclencheur te pousse à ouvrir ton téléphone.</p>
             </div>
             
             <div className="flex justify-center my-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/20 animate-bounce">
                   <path d="M12 5v14M19 12l-7 7-7-7"/>
                </svg>
             </div>

             <div className="flex flex-col items-center text-center">
                <div className="text-white mb-2 w-[48px] h-[48px] flex items-center justify-center">
                   <svg width="48" height="48" viewBox="0 0 250 250" xmlns="http://www.w3.org/2000/svg" className="">
                     <defs>
                       <linearGradient id="peach-g-mobile" x1="40" y1="210" x2="210" y2="40" gradientUnits="userSpaceOnUse">
                         <stop offset="0%" stopColor="#ffffff" />
                         <stop offset="100%" stopColor="#ffcda5" />
                       </linearGradient>
                     </defs>
                     <g>
                       <rect x="38" y="96" width="174" height="58" rx="29" fill="url(#peach-g-mobile)" transform="rotate(45 125 125)" />
                       <rect x="38" y="96" width="174" height="58" rx="29" fill="url(#peach-g-mobile)" transform="rotate(-45 125 125)" />
                     </g>
                   </svg>
                </div>
                <h4 className="text-white text-[10px] font-semibold uppercase tracking-wider mb-1">Scroll</h4>
                <p className="text-white/50 text-[9px] leading-snug max-w-[200px]">Tu scrolles à la recherche de quelque chose.</p>
             </div>

             <div className="flex justify-center my-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/20 animate-bounce">
                   <path d="M12 5v14M19 12l-7 7-7-7"/>
                </svg>
             </div>

             <div className="flex flex-col items-center text-center">
                <div className="mb-2">
                   <CustomBrain size={52} />
                </div>
                <h4 className="text-white text-[10px] font-semibold uppercase tracking-wider mb-1">Dopamine</h4>
                <p className="text-white/50 text-[9px] leading-snug max-w-[200px]">Une récompense rapide te procure du plaisir.</p>
             </div>

             <div className="flex justify-center my-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/20 animate-bounce">
                   <path d="M12 5v14M19 12l-7 7-7-7"/>
                </svg>
             </div>

             <div className="flex flex-col items-center text-center">
                <div className="mb-2">
                   <GradientIcon paths={["circle:12:12:10", "M16 16s-1.5-2-4-2-4 2-4 2"]} size={42} strokeWidth="2.5" eyes={true} />
                </div>
                <h4 className="text-white text-[10px] font-semibold uppercase tracking-wider mb-1">Chute</h4>
                <p className="text-white/50 text-[9px] leading-snug max-w-[200px]">Culpabilité, honte ou vide intérieur s'installent.</p>
             </div>

             <div className="flex justify-center my-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/20 animate-bounce">
                   <path d="M12 5v14M19 12l-7 7-7-7"/>
                </svg>
             </div>

             <div className="flex flex-col items-center text-center">
                <div className="mb-2">
                   <GradientIcon paths={["M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", "M3 3v5h5"]} size={40} strokeWidth="2.5" />
                </div>
                <h4 className="text-white text-[10px] font-semibold uppercase tracking-wider mb-1">Répétition</h4>
                <p className="text-white/50 text-[9px] leading-snug max-w-[200px]">Le cycle recommence, plus fort qu'avant.</p>
             </div>
          </div>
        </motion.div>


      </section>

      {/* Invisible Cost Section */}

      <section className="relative px-6 py-24 md:px-12 md:py-32 max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white mb-6 max-w-4xl mx-auto"
          >
            Le Coût <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffcda5] to-[#f97316]">Invisible</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/70 text-[17px] max-w-2xl mx-auto"
          >
            Les chiffres qui montrent pourquoi reprendre le contrôle de ton attention change tout.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] rounded-[32px] p-7 lg:p-8 flex flex-col items-start hover:border-white/40 hover:-translate-y-2 hover:shadow-[0_16px_40px_0_rgba(0,0,0,0.6)] transition-all duration-500 overflow-hidden group bg-white/[0.02] backdrop-blur-md"
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500 pointer-events-none" />

              {/* Subtle top edge highlight for glass effect */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />
              {/* Subtle internal glare on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full w-full">
                <div className="flex items-center gap-4 mb-5">
                  <div className="text-white shrink-0 [&_svg]:!w-8 [&_svg]:!h-8 [&_svg]:!stroke-1">
                    {stat.icon}
                  </div>
                  <span 
                    className="text-4xl lg:text-[48px] font-light tracking-tight text-white"
                    style={{ textShadow: '0 0 15px rgba(255,255,255,0.4), 0 0 30px rgba(255,255,255,0.2)' }}
                  >
                    {stat.value}
                  </span>
                </div>
                <p className="text-white text-[14px] lg:text-[15px] font-normal leading-[1.6] mb-8 flex-grow">
                  {stat.text}
                </p>
                {stat.hasGraph && (
                  <div className="mb-6 w-full opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    <BrainEffectGraph />
                  </div>
                )}
                <p className="text-[#a0a0a0] text-[10px] whitespace-pre-line leading-[1.5] mt-auto uppercase tracking-widest">
                  {stat.source}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

        {/* Diagnostic Section */}
        <section className="relative z-10 px-6 pt-64 pb-32 md:py-40 md:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white mb-6 max-w-4xl mx-auto"
          >
            Tu ne scrolles pas pour les <br className="hidden md:block"/>
            raisons que tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffcda5] to-[#f97316]">crois.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[17px] text-white/70 max-w-2xl mb-16 md:mb-12 leading-relaxed"
          >
            Le temps d'écran n'est que la partie visible.<br/>
            Ce diagnostic révèle ton profil de scroll, ton niveau d'emprise et les schémas comportementaux qui influencent ton rapport au téléphone.
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative px-8 py-4 bg-gradient-to-r from-white to-[#ffcda5] rounded-full font-bold text-[#1a1a24] text-lg hover:shadow-[0_0_40px_8px_rgba(255,205,165,0.4)] transition-all duration-300 flex items-center justify-center gap-3 w-full sm:w-auto"
          >
            <Sparkles size={20} className="mr-2 text-[#1a1a24]" />
            Découvrir mon profil de scroll
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform text-[#1a1a24]" />
          </motion.button>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-6 mt-6 text-sm text-white mb-20"
          >
            <div className="flex items-center gap-2"><Clock size={16} className="text-white" /> 1 minute</div>
            <div className="flex items-center gap-2"><Zap size={16} className="text-white" /> Résultat immédiat</div>
            <div className="flex items-center gap-2"><User size={16} className="text-white" /> Gratuit</div> 
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {diagnosticFeatures.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] rounded-[40px] p-10 min-h-[320px] flex flex-col items-center justify-center text-center hover:border-white/30 hover:-translate-y-2 transition-all duration-500 group overflow-hidden bg-white/[0.02] backdrop-blur-md"
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500 pointer-events-none" />
                <div className="relative z-10 flex flex-col items-center justify-center h-full">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform duration-500 shrink-0">
                    {feature.icon}
                  </div>
                  <h3 className="text-white text-lg font-medium mb-4">{feature.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-2 max-w-[280px] mx-auto">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="relative z-10 px-6 py-24 md:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="uppercase tracking-widest text-[11px] text-white/50 mb-4"
          >
            Ce qu'ils disent
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white mb-6 max-w-4xl mx-auto"
          >
            Ils ont repris le <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffcda5] to-[#f97316]">Contrôle</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] rounded-[32px] p-8 flex flex-col hover:border-white/30 hover:-translate-y-2 transition-all duration-500 group overflow-hidden bg-white/[0.02] backdrop-blur-md"
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500 pointer-events-none" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex gap-1.5">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={16} className="fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                    <Quote size={40} className="text-white/10 -mt-2" />
                  </div>
                  
                  <p className="text-white/80 text-[15px] leading-relaxed mb-8 flex-grow">
                    {testimonial.text}
                  </p>
                  
                  <div className="flex items-center gap-4 mb-8">
                    <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover border border-white/20" />
                    <div>
                      <h4 className="text-white font-medium text-sm">{testimonial.name}</h4>
                      <p className="text-white/50 text-xs mt-1">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <div className="inline-flex items-center justify-center w-full py-2.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-[11px] font-medium tracking-wide">
                    <Sparkles size={12} className="mr-2 opacity-50" />
                    {testimonial.tag}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Method Section */}
        <section className="relative z-10 px-6 py-24 md:px-12 max-w-7xl mx-auto flex flex-col flex-wrap text-center items-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white mb-6 max-w-4xl"
          >
            Tu n'as pas besoin de plus de volonté. <br className="hidden md:block"/>
            Tu as besoin de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffcda5] to-[#f97316]">la bonne méthode.</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-white/70 max-w-3xl mb-16 leading-relaxed"
          >
            Un programme complet en 5 modules, dont 1 module parent (pack famille) pour t'aider à reprendre le contrôle de ton attention et construire une vie alignée, plus claire et pleine de sens.
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 text-left w-full">
            {modules.map((mod, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] rounded-[32px] p-6 flex flex-col hover:border-white/30 hover:-translate-y-2 transition-all duration-500 group overflow-hidden bg-white/[0.02] backdrop-blur-md"
              >
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-500">
                    {mod.icon}
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] uppercase tracking-widest text-white/50 font-semibold">{mod.moduleNum}</span>
                    {mod.tag && (
                      <span className="text-[10px] uppercase tracking-widest text-orange-400 font-bold">{mod.tag}</span>
                    )}
                  </div>
                  
                  <h3 className="text-white text-xl font-medium mb-3">{mod.title}</h3>
                  <p className="text-white/60 text-[13px] leading-relaxed mb-6 flex-grow">{mod.desc}</p>
                  
                  <div className="flex items-center gap-2 text-white/40 text-xs font-medium mt-auto pt-4 border-t border-white/10">
                    <Clock size={14} />
                    {mod.duration}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Success Features Section */}
        <section className="relative z-10 px-6 py-24 md:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white mb-6 max-w-4xl"
          >
            Tout ce qu'il te faut <br className="hidden md:block"/>
            pour <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffcda5] to-[#f97316]">réussir</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-white/70 max-w-3xl mb-16 leading-relaxed"
          >
            Un accompagnement complet, étape par étape, <br className="hidden md:block"/>
            pour des résultats durables.
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left w-full mb-6">
            {successFeatures.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] rounded-[32px] p-8 flex flex-col hover:border-white/30 hover:-translate-y-2 transition-all duration-500 group overflow-hidden bg-white/[0.02] backdrop-blur-md"
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500 pointer-events-none" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-500">
                    {feat.icon}
                  </div>
                  
                  <h3 className="text-white text-xl font-medium mb-3">{feat.title}</h3>
                  <p className="text-white/60 text-[14px] leading-relaxed flex-grow">{feat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section id="offers" className="relative z-10 px-6 py-24 md:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white mb-6 max-w-4xl"
          >
            Choisis ton <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffcda5] to-[#f97316]">accès</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-white/70 max-w-3xl mb-16 leading-relaxed"
          >
            Prix de lancement — <span className="font-semibold text-purple-400">-40% pour les premiers</span> en échange de témoignages.
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left w-full max-w-5xl mb-8">
            {/* Solo Pack */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] rounded-[32px] p-10 flex flex-col hover:border-white/20 transition-all duration-500 overflow-hidden bg-white/[0.02] backdrop-blur-md"
              >
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <User size={120} />
                </div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-[10px] uppercase tracking-wider font-semibold w-fit mb-6">
                    Ados • Jeunes Adultes
                  </div>
                  
                  <h3 className="text-white text-3xl font-medium mb-2 uppercase tracking-tight">Pack Solo</h3>
                  <p className="text-white/60 text-[14px] leading-relaxed mb-6">Reprends le contrôle de ton attention.<br/>Accès immédiat, à ton rythme.</p>
                  
                  <div className="mb-8 flex items-baseline gap-2">
                    <span className="text-6xl font-medium text-white tracking-tighter">28€</span>
                    <div className="flex flex-col text-sm text-white/40">
                      <span>au lieu de <span className="line-through">47€</span></span>
                    </div>
                  </div>
                  
                  <ul className="flex flex-col gap-4 mb-8 text-[15px] text-white/70 flex-grow">
                    <li className="flex items-start gap-3"><ChevronRight size={18} className="text-white mt-0.5 shrink-0" /><span>Comprendre pourquoi tu n'arrives pas à t'arrêter</span></li>
                    <li className="flex items-start gap-3"><ChevronRight size={18} className="text-white mt-0.5 shrink-0" /><span>Briser les boucles de scroll</span></li>
                    <li className="flex items-start gap-3"><ChevronRight size={18} className="text-white mt-0.5 shrink-0" /><span>Exercices adaptés à TON profil</span></li>
                  </ul>
                  
                  <div className="h-[1px] w-full bg-white/10 mb-8" />
                  
                  <ul className="flex flex-col gap-4 mb-8 text-[15px] font-medium text-white/90">
                    <li className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-white/10 text-white flex items-center justify-center shrink-0"><Check size={14} /></div><span>+ 4 modules guidés</span></li>
                    <li className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-white/10 text-white flex items-center justify-center shrink-0"><Check size={14} /></div><span>+ Communauté privée d'entraide</span></li>
                    <li className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-white/10 text-white flex items-center justify-center shrink-0"><Check size={14} /></div><span>+ Accès à vie</span></li>
                  </ul>
                  
                  <button className="glass-cta w-full">
                    S'inscrire (Pack Solo)
                  </button>
                </div>
            </motion.div>

            {/* Family Pack */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative shadow-[0_8px_32px_0_rgba(255,255,255,0.05)] rounded-[32px] p-10 flex flex-col hover:-translate-y-2 transition-all duration-500 overflow-hidden bg-white/[0.03] backdrop-blur-md"
              >
                <div className="absolute inset-0 border-2 border-white/20 rounded-[32px] pointer-events-none" />
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Users size={150} />
                </div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-[10px] uppercase tracking-wider font-bold w-fit mb-6">
                    <Sparkles size={12} /> Le plus choisi • Parents + Ados
                  </div>
                  
                  <h3 className="text-white text-3xl font-medium mb-2 uppercase tracking-tight">Pack Famille</h3>
                  <p className="text-white/60 text-[14px] leading-relaxed mb-6">Aide ton ado — sans conflit.<br/>Pour une approche systémique.</p>
                  
                  <div className="mb-8 flex items-baseline gap-2">
                    <span className="text-6xl font-medium text-white tracking-tighter">47€</span>
                    <div className="flex flex-col text-sm text-white/40">
                      <span>au lieu de <span className="line-through">79€</span></span>
                    </div>
                  </div>
                  
                  <ul className="flex flex-col gap-4 mb-8 text-[15px] text-white/70 flex-grow">
                    <li className="flex items-start gap-3"><ChevronRight size={18} className="text-white mt-0.5 shrink-0" /><span>Comprendre ton ado</span></li>
                    <li className="flex items-start gap-3"><ChevronRight size={18} className="text-white mt-0.5 shrink-0" /><span>Savoir quoi dire (sans aggraver)</span></li>
                    <li className="flex items-start gap-3"><ChevronRight size={18} className="text-white mt-0.5 shrink-0" /><span>Poser un cadre qui fonctionne</span></li>
                  </ul>
                  
                  <div className="h-[1px] w-full bg-white/10 mb-8" />
                  
                  <ul className="flex flex-col gap-4 mb-8 text-[15px] font-medium text-white/90">
                    <li className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-purple-500/50 text-white flex items-center justify-center shrink-0"><Check size={14} strokeWidth={3} /></div><span>+ Tout le Pack Solo</span></li>
                    <li className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-purple-500/50 text-white flex items-center justify-center shrink-0"><Check size={14} strokeWidth={3} /></div><span>+ Module parents guidé</span></li>
                    <li className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-purple-500/50 text-white flex items-center justify-center shrink-0"><Check size={14} strokeWidth={3} /></div><span>+ Communauté privée d'entraide</span></li>
                    <li className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-purple-500/50 text-white flex items-center justify-center shrink-0"><Check size={14} strokeWidth={3} /></div><span>+ Espace parents dédié</span></li>
                  </ul>
                  
                  <button className="glass-cta w-full">
                    S'inscrire (Pack Famille)
                  </button>
                </div>
            </motion.div>
          </div>

          {/* Guarantee */}
          <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative w-full max-w-5xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] rounded-[32px] p-8 flex flex-col md:flex-row items-center gap-8 text-left overflow-hidden mt-8 bg-white/[0.02] backdrop-blur-md"
              >
                <div className="absolute inset-0 bg-black/40 pointer-events-none" />
                
                <div className="relative z-10 flex items-center justify-center w-20 h-20 shrink-0">
                  <div className="absolute inset-0 bg-white/20 rounded-3xl rotate-12 opacity-80 blur-md"></div>
                  <div className="relative bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center border border-white/20 shadow-xl">
                    <ShieldCheck size={32} className="text-white" />
                  </div>
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-white text-xl font-medium mb-2">Satisfait ou remboursé — 30 jours</h3>
                  <p className="text-white/70 text-[14px] leading-relaxed">Si tu suis le programme et que tu ne constates aucun changement<br className="hidden md:block"/>dans les 30 jours, <span className="text-white font-medium">on te rembourse intégralement</span>. Sans question, sans délai.</p>
                </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 border-t border-white/10 bg-[#050505]/80 backdrop-blur-lg pt-20 pb-10 mt-12 w-full">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              <div className="col-span-1 md:col-span-1">
                <div className="flex items-center gap-3 font-semibold text-xl tracking-widest text-white mb-6">
                  <Brain size={24} className="text-white" />
                  ScrollFree
                </div>
                <p className="text-white/50 text-sm leading-relaxed mb-6">
                  Reprends le contrôle.<br/>Reprends ta vie.
                </p>
                <div className="flex items-center gap-4 text-white/50">
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all"><Instagram size={18} /></a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all"><Music2 size={18} /></a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all"><Youtube size={18} /></a>
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-medium mb-6">Navigation</h4>
                <ul className="flex flex-col gap-4 text-sm text-white/50">
                  <li><a href="#" className="hover:text-white transition-colors">Mon diagnostic</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Témoignages</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">La méthode</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Les offres</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-medium mb-6">Ressources</h4>
                <ul className="flex flex-col gap-4 text-sm text-white/50">
                  <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Guides gratuits</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Études scientifiques</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">À propos</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Nous contacter</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-medium mb-6">Légal</h4>
                <ul className="flex flex-col gap-4 text-sm text-white/50">
                  <li><a href="#" className="hover:text-white transition-colors">Mentions légales</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Conditions générales</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Politique de remboursement</a></li>
                </ul>
              </div>
            </div>
            
            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] text-white/40">
              <p>© 2025 ScrollFree. Tous droits réservés.</p>
              <p className="flex items-center gap-1">Fabriqué avec <span className="text-orange-400">♥</span> pour t'aider à reprendre le contrôle.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
    </div>
  );
}
