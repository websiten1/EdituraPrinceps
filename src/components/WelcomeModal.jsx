import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

/* ── Conținut ecrane ──────────────────────────────────────────────────── */
function Ornament() {
  return (
    <div className="flex items-center justify-center gap-3 mb-6">
      <div className="h-px w-10 bg-gray-200" />
      <span className="text-burgundy font-serif text-lg leading-none select-none">❧</span>
      <div className="h-px w-10 bg-gray-200" />
    </div>
  );
}

const features = [
  'Catalogul complet cu 25+ titluri din literatura română clasică',
  'Sistem de filtrare și căutare avansat',
  'Pagini de detalii pentru fiecare carte',
  'Coș de cumpărături funcțional',
  'Pagini de contact și informații',
  'Design responsiv (mobil, tablet, desktop)',
  'Interfață elegantă și ușor de navigat',
];

const customizations = [
  'Conținut text și mesaje',
  'Design și culori',
  'Imagini și fotografii',
  'Funcționalități suplimentare',
  'Integrări cu sisteme de plată',
  'Expandare catalog de produse',
  'Și orice altceva pe care ți-l dorești!',
];

function Screen1() {
  return (
    <div className="text-center">
      <Ornament />
      <h2 className="font-display text-2xl sm:text-3xl text-charcoal leading-tight mb-3">
        Bine ai venit la DEMO
      </h2>
      <p className="font-serif text-xl text-burgundy italic mb-6">
        Editura Princeps Multimedia
      </p>
      <p className="font-sans text-sm sm:text-base text-charcoal-light leading-relaxed max-w-sm mx-auto">
        Acesta este un website DEMO — o prezentare completă și funcțională a platformei
        noastre de comerț electronic pentru cărți și audiobook-uri.
      </p>
    </div>
  );
}

function Screen2() {
  return (
    <div className="text-center">
      <Ornament />
      <h2 className="font-display text-2xl sm:text-3xl text-charcoal leading-tight mb-6">
        Ce conține acest DEMO
      </h2>
      <ul className="text-left inline-block space-y-2.5">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="text-burgundy font-semibold text-sm mt-0.5 flex-shrink-0 font-ui">✓</span>
            <span className="font-sans text-sm text-charcoal leading-snug">{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Screen3() {
  return (
    <div className="text-center">
      <Ornament />
      <h2 className="font-display text-2xl sm:text-3xl text-charcoal leading-tight mb-4">
        Personalizare Completă
      </h2>
      <p className="font-sans text-sm sm:text-base text-charcoal-light leading-relaxed max-w-sm mx-auto mb-5">
        Orice element din acest website poate fi modificat, adaptat și personalizat
        conform necesităților tale:
      </p>
      <ul className="text-left inline-block space-y-2">
        {customizations.map((c, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="text-burgundy text-base mt-0.5 flex-shrink-0 leading-none">•</span>
            <span className="font-sans text-sm text-charcoal leading-snug">{c}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Screen4() {
  return (
    <div className="text-center">
      <Ornament />
      <h2 className="font-display text-2xl sm:text-3xl text-burgundy leading-tight mb-5">
        Gata de a Face Următorul Pas?
      </h2>
      <p className="font-sans text-sm sm:text-base text-charcoal-light leading-relaxed max-w-sm mx-auto mb-5">
        Acest website este doar începutul. Suntem gata să te ajutăm să-l transformi
        în platforma ta profesională de vânzări online.
      </p>
      <p className="font-serif text-lg text-burgundy italic max-w-xs mx-auto">
        Explorează-l acum și vei vedea exact ce poți face cu el.
      </p>
    </div>
  );
}

const SCREENS = [Screen1, Screen2, Screen3, Screen4];

/* ── Modal ───────────────────────────────────────────────────────────── */
export default function WelcomeModal() {
  const [open,       setOpen]       = useState(false);
  const [leaving,    setLeaving]    = useState(false);
  const [step,       setStep]       = useState(1);
  const [screenAnim, setScreenAnim] = useState('in');

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 150);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    setLeaving(true);
    setTimeout(() => setOpen(false), 280);
  };

  const navigate = (next) => {
    if (next < 1 || next > 4) return;
    setScreenAnim('out');
    setTimeout(() => {
      setStep(next);
      setScreenAnim('in');
    }, 170);
  };

  if (!open) return null;

  const ScreenComponent = SCREENS[step - 1];
  const isFirst = step === 1;
  const isLast  = step === 4;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center px-5 py-6 overflow-y-auto"
      style={{
        backgroundColor: 'rgba(0,0,0,0.58)',
        animation: leaving ? 'wmOverlayOut 280ms ease forwards' : 'wmOverlayIn 300ms ease both',
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="relative bg-white w-full max-w-[600px] my-auto px-8 sm:px-12 pt-12 pb-8"
        style={{
          border: '2px solid #8B3A3A',
          borderRadius: 6,
          boxShadow: '0 24px 72px rgba(0,0,0,0.22)',
          animation: leaving ? 'wmModalOut 280ms ease forwards' : 'wmModalIn 320ms ease both',
        }}
      >
        {/* X */}
        <button
          onClick={close}
          aria-label="Închide"
          className="absolute top-4 right-4 text-burgundy hover:text-burgundy-800
                     transition-colors duration-150 cursor-pointer p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Conținut ecran (animat la tranziție) */}
        <div
          style={{
            animation: screenAnim === 'out'
              ? 'wmScreenOut 170ms ease forwards'
              : 'wmScreenIn 220ms ease both',
          }}
        >
          <ScreenComponent />
        </div>

        {/* Contor pași + dots */}
        <div className="mt-8 mb-5 flex items-center justify-center gap-3">
          <div className="flex gap-1.5">
            {[1, 2, 3, 4].map(n => (
              <div
                key={n}
                className="rounded-full transition-all duration-300"
                style={{
                  width:  n === step ? 18 : 6,
                  height: 6,
                  backgroundColor: n === step ? '#8B3A3A' : '#E5E7EB',
                }}
              />
            ))}
          </div>
          <span className="font-ui text-xs text-charcoal-lighter uppercase tracking-widest">
            {step} / 4
          </span>
        </div>

        {/* Butoane */}
        <div className={`flex gap-3 ${isFirst ? 'justify-center' : 'justify-between'}`}>
          {!isFirst && (
            <button
              onClick={() => navigate(step - 1)}
              className="btn-secondary px-5 py-2.5 text-sm"
            >
              ← ÎNAPOI
            </button>
          )}

          {isLast ? (
            <button
              onClick={close}
              className="btn-primary flex-1 sm:flex-none px-10 py-3 text-sm justify-center"
            >
              FINALIZEAZĂ
            </button>
          ) : (
            <button
              onClick={() => navigate(step + 1)}
              className={`btn-primary py-2.5 text-sm justify-center
                          ${isFirst ? 'px-12' : 'flex-1 sm:flex-none px-8'}`}
            >
              URMĂTOR →
            </button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes wmOverlayIn  { from { opacity: 0; }                                         to { opacity: 1; } }
        @keyframes wmOverlayOut { from { opacity: 1; }                                         to { opacity: 0; } }
        @keyframes wmModalIn    { from { opacity: 0; transform: translateY(16px) scale(0.97);} to { opacity: 1; transform: none; } }
        @keyframes wmModalOut   { from { opacity: 1; transform: none; }                        to { opacity: 0; transform: translateY(8px) scale(0.98); } }
        @keyframes wmScreenIn   { from { opacity: 0; transform: translateX(10px); }            to { opacity: 1; transform: none; } }
        @keyframes wmScreenOut  { from { opacity: 1; transform: none; }                        to { opacity: 0; transform: translateX(-10px); } }
      `}</style>
    </div>
  );
}
