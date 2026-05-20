import { useState } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { m } from 'motion/react';
import bgImage from '../background.webp';

export const Hero = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Mon diagnostic', href: '#diagnostic' },
    { name: 'Témoignages', href: '#temoignages' },
    { name: 'La méthode', href: '#methode' },
    { name: 'Les offres', href: '#offres' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Blog', href: '/blog' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const id = href.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
        window.history.replaceState(null, '', window.location.pathname);
      }
    }
  };

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <img 
          src={bgImage} 
          alt="Atmospheric Background" 
          className="w-full h-full object-cover"
          draggable="false"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-x-0 bottom-0 h-[60vh] bg-gradient-to-b from-transparent via-[#0B0F19]/50 to-[#0B0F19] pointer-events-none" />
      </div>

      {/* Navigation */}
      <nav id="navbar" className="relative z-50 px-6 py-12 md:px-12 flex justify-between items-center max-w-7xl mx-auto">
        {/* Integrated Logo */}
        <div className="relative flex items-center">
          <div className="relative group flex items-center justify-center">
            {/* GPU Accelerated Glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[300px] h-[100px] md:w-[400px] md:h-[120px] gpu-glow rounded-[100%] bg-white/20 blur-[40px]" />
            </div>
            
            {/* Centered Integrated Text */}
            <svg className="h-[80px] md:h-[120px] w-auto text-white relative z-10 -ml-2 -my-8 md:-my-12 pointer-events-none" viewBox="0 0 1120 760" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Scrollfree wordmark">
              <defs>
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

              <g strokeLinecap="round" fill="none">
                <path
                  d="M 290 380 A 220 220 0 0 1 730 380"
                  stroke="url(#topArc)"
                  strokeWidth="9.5"
                />

                <path
                  d="M 730 380 A 220 220 0 0 1 290 380"
                  stroke="url(#bottomArc)"
                  strokeWidth="9.5"
                />
              </g>

              <g transform="translate(0 300)">
                <g fill="#f8f8f8" opacity="0.98" fontFamily="Helvetica Neue, Helvetica, Arial, sans-serif" fontWeight="500" fontSize="64" letterSpacing="0">
                  <text x="47"  y="101">S</text>
                  <text x="143" y="101">C</text>
                  <text x="239" y="101">R</text>
                  <text x="335" y="101">O</text>
                  <text x="437" y="101">L</text>
                  <text x="533" y="101">L</text>
                  <text x="628" y="101">F</text>
                  <text x="722" y="101">R</text>
                </g>

                <g stroke="#f8f8f8" strokeWidth="6.5" strokeLinecap="round" opacity="0.98">
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
              onClick={(e) => scrollToSection(e, link.href)}
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
          <m.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-24 left-0 w-full bg-[#0B0F19] border-b border-white/10 px-6 py-8 flex flex-col gap-6 md:hidden z-50 text-center"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-lg font-medium opacity-60 hover:opacity-100 transition-opacity"
                onClick={(e) => scrollToSection(e, link.href)}
              >
                {link.name}
              </a>
            ))}
          </m.div>
        )}
      </nav>

      {/* Hero Section */}
      <main id="hero" className="relative flex flex-col justify-center px-6 md:px-12 pt-20 pb-32 max-w-7xl mx-auto min-h-[calc(100vh-120px)]">
        <div className="max-w-3xl relative z-10">
          {/* Main Headline */}
          <m.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-[65px] font-medium leading-[1.1] md:leading-[1.1] mb-8 tracking-tight text-white"
          >
            <span className="block">Reprends le contrôle</span>
            <span className="block">sur les écrans</span>
          </m.h1>

          {/* Sub Headline */}
          <m.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-[19.4px] text-white/90 mb-12 max-w-2xl leading-[1.6] font-normal tracking-wide"
          >
            Scrollfree t'aide à reprendre le contrôle<br className="hidden sm:block" />
            sur les écrans en <span className="font-bold text-white">21 jours chrono</span> avec<br className="hidden sm:block" />
            la méthode personnalisée Origine.
          </m.p>

          {/* Call to Actions */}
          <m.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 md:gap-5"
          >
            <a 
              href="#offres" 
              onClick={(e) => scrollToSection(e, '#offres')}
              className="glass-cta-primary group flex items-center justify-center text-center no-underline"
            >
              Reprendre le contrôle
            </a>

            <a href="/simulateur.html" className="glass-cta group flex items-center justify-center text-center no-underline">
              Mon diagnostic
            </a>
          </m.div>
        </div>
      </main>
    </div>
  );
};
