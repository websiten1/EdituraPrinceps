import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function WelcomeModal() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 120);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center px-5"
      style={{ backgroundColor: 'rgba(0,0,0,0.55)', animation: 'fadeInOverlay 300ms ease both' }}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="relative bg-white w-full max-w-[520px] p-10 text-center"
        style={{
          border: '2px solid #8B3A3A',
          borderRadius: 6,
          boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
          animation: 'fadeInModal 300ms ease both',
        }}
      >
        {/* Buton X */}
        <button
          onClick={() => setVisible(false)}
          aria-label="Închide"
          className="absolute top-4 right-4 text-burgundy hover:text-burgundy-800
                     transition-colors duration-150 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Ornament */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px bg-gray-200 w-12" />
          <span className="text-burgundy font-serif text-lg leading-none select-none">❧</span>
          <div className="h-px bg-gray-200 w-12" />
        </div>

        {/* Titlu */}
        <h2 className="font-display text-2xl sm:text-3xl text-charcoal leading-tight mb-5">
          Acesta este websitul tău DEMO
        </h2>

        {/* Mesaj */}
        <p className="font-sans text-base sm:text-lg text-charcoal-light mb-8 leading-relaxed">
          Pentru <span className="font-semibold text-charcoal">Editura Princeps Multimedia</span>
        </p>

        {/* Buton principal */}
        <button
          onClick={() => setVisible(false)}
          className="w-full btn-primary py-3.5 text-base mb-4 justify-center"
        >
          Vezi Websiteul
        </button>

        {/* Link secundar */}
        <button
          onClick={() => setVisible(false)}
          className="font-ui text-sm text-burgundy hover:underline transition-colors duration-150"
        >
          Sau continuă să explorezi →
        </button>
      </div>

      <style>{`
        @keyframes fadeInOverlay {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes fadeInModal {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
      `}</style>
    </div>
  );
}
