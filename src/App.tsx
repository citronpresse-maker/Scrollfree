import React, { Suspense, lazy } from 'react';
import { LazyMotion, domAnimation } from 'motion/react';
import { GradientBackground } from './components/gradient/GradientBackground';
import homeGradient from '../public/gradients/home.gradient.json';

// Composants synchrones (Above the fold)
import { Hero } from './sections/Hero';

// Composants asynchrones (Below the fold)
const PsychologicalLoop = lazy(() => import('./sections/PsychologicalLoop').then(m => ({ default: m.PsychologicalLoop })));
const Stats = lazy(() => import('./sections/Stats').then(m => ({ default: m.Stats })));
const DiagnosticFeatures = lazy(() => import('./sections/DiagnosticFeatures').then(m => ({ default: m.DiagnosticFeatures })));
const Testimonials = lazy(() => import('./sections/Testimonials').then(m => ({ default: m.Testimonials })));
const Method = lazy(() => import('./sections/Method').then(m => ({ default: m.Method })));
const SuccessFeatures = lazy(() => import('./sections/SuccessFeatures').then(m => ({ default: m.SuccessFeatures })));
const Pricing = lazy(() => import('./sections/Pricing').then(m => ({ default: m.Pricing })));
const FAQ = lazy(() => import('./sections/FAQ').then(m => ({ default: m.FAQ })));
const ContactForm = lazy(() => import('./sections/ContactForm').then(m => ({ default: m.ContactForm })));
const WaitlistModal = lazy(() => import('./sections/WaitlistModal').then(m => ({ default: m.WaitlistModal })));
const Footer = lazy(() => import('./sections/Footer').then(m => ({ default: m.Footer })));

// Loading Fallback Component (with height to prevent CLS)
const SectionPlaceholder = ({ height = '100vh', subtle = false }: { height?: string, subtle?: boolean }) => (
  <div style={{ minHeight: height }} className="w-full flex items-center justify-center">
    {!subtle && <div className="w-8 h-8 rounded-full border-2 border-orange-500 border-t-transparent animate-spin opacity-20" />}
  </div>
);

export default function App() {
  const [showContact, setShowContact] = React.useState(false);
  const [waitlistState, setWaitlistState] = React.useState<{isOpen: boolean, pack?: string}>({
    isOpen: false
  });

  return (
    <LazyMotion features={domAnimation} strict>
      <div className="relative w-full min-h-full">
        {/* Gradients Background - Rendered immediately but GPU accelerated */}
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

          <Hero />

          <main>
            <Suspense fallback={<SectionPlaceholder height="100vh" />}>
              <PsychologicalLoop />
            </Suspense>
            
            <Suspense fallback={<SectionPlaceholder height="60vh" />}>
              <Stats />
            </Suspense>
            
            <Suspense fallback={<SectionPlaceholder height="100vh" />}>
              <DiagnosticFeatures />
            </Suspense>
            
            <Suspense fallback={<SectionPlaceholder height="80vh" />}>
              <Testimonials />
            </Suspense>
            
            <Suspense fallback={<SectionPlaceholder height="100vh" />}>
              <Method />
            </Suspense>
            
            <Suspense fallback={<SectionPlaceholder height="80vh" />}>
              <SuccessFeatures />
            </Suspense>
            
            <Suspense fallback={<SectionPlaceholder height="100vh" />}>
              <Pricing onWaitlistClick={(pack) => setWaitlistState({ isOpen: true, pack })} />
            </Suspense>

            <Suspense fallback={<SectionPlaceholder height="80vh" />}>
              <FAQ />
            </Suspense>
          </main>
          
          <Suspense fallback={<SectionPlaceholder height="20vh" subtle />}>
            <Footer onContactClick={() => setShowContact(true)} />
          </Suspense>

          <Suspense fallback={null}>
            <ContactForm isOpen={showContact} onClose={() => setShowContact(false)} />
          </Suspense>

          <Suspense fallback={null}>
            <WaitlistModal 
              isOpen={waitlistState.isOpen} 
              onClose={() => setWaitlistState({ isOpen: false })} 
              packName={waitlistState.pack}
            />
          </Suspense>
        </div>
      </div>
    </LazyMotion>
  );
}
