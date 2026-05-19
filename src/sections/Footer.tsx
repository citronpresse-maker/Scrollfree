import { Brain, Instagram, Music2, Youtube } from 'lucide-react';

export const Footer = ({ onContactClick }: { onContactClick?: () => void }) => {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#0B0F19] pt-20 pb-10 mt-12 w-full">
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
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all"><Instagram size={18} /></a>
              <a href="#" aria-label="TikTok" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all"><Music2 size={18} /></a>
              <a href="#" aria-label="YouTube" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all"><Youtube size={18} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-6">Navigation</h4>
            <ul className="flex flex-col gap-4 text-sm text-white/50">
              <li><a href="#diagnostic" className="hover:text-white transition-colors">Mon diagnostic</a></li>
              <li><a href="#temoignages" className="hover:text-white transition-colors">Témoignages</a></li>
              <li><a href="#methode" className="hover:text-white transition-colors">La méthode</a></li>
              <li><a href="#offres" className="hover:text-white transition-colors">Les offres</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6">Ressources</h4>
            <ul className="flex flex-col gap-4 text-sm text-white/50">
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Guides gratuits</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Études scientifiques</a></li>
              <li><a href="#" className="hover:text-white transition-colors">À propos</a></li>
              <li>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    onContactClick?.();
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Nous contacter
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6">Légal</h4>
            <ul className="flex flex-col gap-4 text-sm text-white/50">
              <li><a href="/mentions-legales.html" className="hover:text-white transition-colors">Mentions légales</a></li>
              <li><a href="/cgv.html" className="hover:text-white transition-colors">Conditions générales</a></li>
              <li><a href="/confidentialite.html" className="hover:text-white transition-colors">Politique de confidentialité</a></li>
              <li><a href="/remboursement.html" className="hover:text-white transition-colors">Politique de remboursement</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] text-white/40">
          <p>© 2025 ScrollFree. Tous droits réservés.</p>
          <p className="flex items-center gap-1">Fabriqué avec <span className="text-orange-400">♥</span> pour t'aider à reprendre le contrôle.</p>
        </div>
      </div>
    </footer>
  );
};
