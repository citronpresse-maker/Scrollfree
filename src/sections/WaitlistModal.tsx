import { m, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Sparkles, CheckCircle2, X } from 'lucide-react';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  packName?: string;
}

export const WaitlistModal = ({ isOpen, onClose, packName }: WaitlistModalProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch('https://scrollfree-notion.kevinbaboux.workers.dev/register-systemeio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          first_name: firstName,
          tag: packName ? `WAITLIST_${packName.toUpperCase()}` : 'WAITLIST'
        })
      });

      if (response.ok) {
        localStorage.setItem('sf_user_email', email);
        localStorage.setItem('sf_user_name', firstName);
        setIsSubmitted(true);
      } else {
        setError("Une erreur est survenue. Veuillez réessayer.");
      }
    } catch (err) {
      setError("Erreur de connexion.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] cursor-pointer"
          />

          {/* Modal Content */}
          <m.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg z-[101] outline-none"
          >
            <div className="relative bg-[#0A0A0A] border border-white/10 rounded-[40px] p-8 md:p-12 overflow-hidden shadow-2xl">
              {/* Close Button */}
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all z-20"
              >
                <X size={20} />
              </button>

              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-[#D4A373]/10 blur-[80px] rounded-full pointer-events-none" />
              
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <m.div
                    key="form-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="relative z-10 mb-8">
                      <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-white mb-4">
                        Rejoindre la <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F4D3A1] to-[#D4A373]">liste d'attente</span> exclusive
                      </h2>
                      <p className="text-white/50 text-[15px] leading-relaxed">
                        Entrez votre e-mail pour sécuriser votre priorité sur la prochaine session et débloquer immédiatement votre diagnostic de scroll.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-4">
                      <div className="flex flex-col gap-3">
                        <input
                          required
                          type="text"
                          placeholder="Ton prénom"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#D4A373]/50 focus:border-[#D4A373]/50 transition-all"
                        />
                        <input
                          required
                          type="email"
                          placeholder="Ton adresse email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#D4A373]/50 focus:border-[#D4A373]/50 transition-all"
                        />
                      </div>

                      {error && (
                        <p className="text-red-400 text-sm bg-red-400/10 py-2 px-4 rounded-xl border border-red-400/20">
                          {error}
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`btn-profile-glow w-full mt-2 flex items-center justify-center gap-3 py-4 text-[11px] font-semibold uppercase tracking-wider ${isSubmitting ? 'opacity-70 cursor-wait' : ''}`}
                      >
                        {isSubmitting ? 'Envoi en cours...' : 'Valider & Lancer le simulateur'}
                      </button>
                    </form>
                  </m.div>
                ) : (
                  <m.div
                    key="success-content"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative z-10 flex flex-col items-center text-center py-8"
                  >
                    <div className="w-20 h-20 bg-[#D4A373]/20 text-[#D4A373] rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-2xl font-medium text-white mb-3">Priorité confirmée !</h3>
                    <p className="text-white/50 mb-8 max-w-sm">
                      Merci {firstName}, vous êtes maintenant sur la liste d'attente. Vous recevrez un email dès que les inscriptions rouvriront.
                    </p>
                    <a
                      href="/simulateur.html"
                      className="btn-profile-glow w-full flex items-center justify-center gap-3 py-4"
                    >
                      Accéder au simulateur
                    </a>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
};
