import { m, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Send, CheckCircle2, X } from 'lucide-react';

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactForm = ({ isOpen, onClose }: ContactFormProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '5badcfa8-14cf-4b7f-9516-52faaacc9e7e',
          name: formData.name,
          email: formData.email,
          subject: `[Contact Web] ${formData.subject}`,
          message: formData.message,
          from_name: 'Contact Scrollfree'
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        setError("Une erreur est survenue lors de l'envoi. Veuillez réessayer.");
      }
    } catch (err) {
      setError("Erreur de connexion. Vérifiez votre réseau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
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
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-2xl z-[101] outline-none"
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
              
              <div className="relative z-10 mb-8">
                <h2 className="text-3xl font-medium tracking-tight text-white mb-3">
                  Une <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F4D3A1] to-[#D4A373]">Question</span> ?
                </h2>
                <p className="text-white/50 text-sm">
                  Besoin d'un renseignement ? Notre équipe vous répond sous 24h.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <m.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="relative z-10 flex flex-col gap-5"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-[12px] uppercase tracking-widest font-bold text-white/40 ml-1">Nom complet</label>
                        <input
                          required
                          type="text"
                          id="name"
                          placeholder="Jean Dupont"
                          value={formData.name}
                          onChange={handleChange}
                          className="bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#D4A373]/50 focus:border-[#D4A373]/50 transition-all"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-[12px] uppercase tracking-widest font-bold text-white/40 ml-1">Email</label>
                        <input
                          required
                          type="email"
                          id="email"
                          placeholder="jean@exemple.fr"
                          value={formData.email}
                          onChange={handleChange}
                          className="bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#D4A373]/50 focus:border-[#D4A373]/50 transition-all"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="subject" className="text-[12px] uppercase tracking-widest font-bold text-white/40 ml-1">Sujet</label>
                      <input
                        required
                        type="text"
                        id="subject"
                        placeholder="Comment puis-je vous aider ?"
                        value={formData.subject}
                        onChange={handleChange}
                        className="bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#D4A373]/50 focus:border-[#D4A373]/50 transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="message" className="text-[12px] uppercase tracking-widest font-bold text-white/40 ml-1">Message</label>
                      <textarea
                        required
                        id="message"
                        rows={4}
                        placeholder="Dites-nous en plus..."
                        value={formData.message}
                        onChange={handleChange}
                        className="bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#D4A373]/50 focus:border-[#D4A373]/50 transition-all resize-none"
                      />
                    </div>

                    {error && (
                      <p className="text-red-400 text-sm bg-red-400/10 py-3 px-4 rounded-xl border border-red-400/20">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`btn-profile-glow w-full mt-4 flex items-center justify-center gap-3 py-4 transition-all ${isSubmitting ? 'opacity-70 cursor-wait' : ''}`}
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-black/20 border-t-black animate-spin rounded-full" />
                      ) : (
                        <Send size={18} />
                      )}
                      {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                    </button>
                  </m.form>
                ) : (
                  <m.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative z-10 flex flex-col items-center text-center py-12"
                  >
                    <div className="w-20 h-20 bg-[#D4A373]/20 text-[#D4A373] rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-2xl font-medium text-white mb-3">Message envoyé !</h3>
                    <p className="text-white/50 mb-8 max-w-sm">
                      Merci {formData.name}, nous avons bien reçu votre demande. Notre équipe reviendra vers vous sous 24h.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-[#D4A373] hover:text-[#F4D3A1] font-medium transition-colors"
                    >
                      Envoyer un autre message
                    </button>
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
