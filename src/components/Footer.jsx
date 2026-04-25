import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [email, setEmail]           = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = e => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  return (
    <footer className="bg-white border-t-2 border-burgundy">

      {/* ── Desktop: newsletter + coloane (ascuns pe mobil) ── */}
      <div className="hidden sm:block">

        {/* Bandă newsletter */}
        <div className="border-b border-gray-100 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8
                          flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex-1">
              <h3 className="font-display text-xl text-charcoal mb-1">
                Abonează-te la Buletinul Nostru
              </h3>
              <p className="text-sm font-sans text-charcoal-light">
                Titluri noi, note literare și oferte exclusive — livrate în căsuța ta poștală.
              </p>
            </div>
            {subscribed ? (
              <p className="text-sm font-sans text-burgundy italic font-medium">
                Mulțumim pentru abonare.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-0 w-full sm:w-auto">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Adresa ta de email"
                  required
                  className="px-4 py-2.5 bg-white border border-gray-200
                             text-sm font-sans text-charcoal placeholder-charcoal-lighter
                             focus:outline-none focus:border-burgundy w-full sm:w-64
                             border-r-0"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-burgundy text-white text-sm font-ui font-semibold
                             uppercase tracking-wide border border-burgundy
                             hover:bg-burgundy-800 transition-colors duration-200 whitespace-nowrap"
                >
                  Abonează-te
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Coloane principale */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12
                        grid grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Despre */}
          <div>
            <h4 className="font-display text-lg text-charcoal mb-1">Prince's Multimedia</h4>
            <div className="h-px bg-gray-200 w-full mb-4" />
            <p className="text-sm font-sans text-charcoal-light leading-reading mb-5">
              O distinsă editură română dedicată păstrării și celebrării patrimoniului literar
              al României din 1999.
            </p>
            <ul className="space-y-2">
              {[
                { label: 'Facebook', href: '#' },
                { label: 'Instagram', href: '#' },
                { label: 'LinkedIn', href: '#' },
              ].map(l => (
                <li key={l.label}>
                  <a href={l.href}
                     className="text-xs font-ui text-charcoal-light hover:text-burgundy
                                transition-colors duration-200 uppercase tracking-wide">
                    {l.label} →
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Colecții */}
          <div>
            <h4 className="font-display text-lg text-charcoal mb-1">Colecții</h4>
            <div className="h-px bg-gray-200 w-full mb-4" />
            <ul className="space-y-2">
              {[
                { label: 'Poezie',           to: '/collections?category=Poezie' },
                { label: 'Proză',            to: '/collections?category=Proză' },
                { label: 'Filozofie',        to: '/collections?category=Filozofie' },
                { label: 'Critică Literară', to: '/collections?category=Critică Literară' },
                { label: 'Audiobook-uri',    to: '/collections?category=Audiobook-uri' },
              ].map(l => (
                <li key={l.label}>
                  <Link to={l.to}
                        className="text-sm font-sans text-charcoal-light hover:text-burgundy
                                   transition-colors duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informații */}
          <div>
            <h4 className="font-display text-lg text-charcoal mb-1">Informații</h4>
            <div className="h-px bg-gray-200 w-full mb-4" />
            <ul className="space-y-2">
              {[
                { label: 'Întrebări Frecvente',           to: '/contact' },
                { label: 'Politica de Livrare',           to: '/contact' },
                { label: 'Returnări și Schimburi',        to: '/contact' },
                { label: 'Politica de Confidențialitate', to: '#' },
                { label: 'Termeni și Condiții',           to: '#' },
              ].map(l => (
                <li key={l.label}>
                  <Link to={l.to}
                        className="text-sm font-sans text-charcoal-light hover:text-burgundy
                                   transition-colors duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg text-charcoal mb-1">Contact</h4>
            <div className="h-px bg-gray-200 w-full mb-4" />
            <dl className="space-y-3">
              {[
                { label: 'Adresă',   value: 'Str. Literaturii 12, Iași, România' },
                { label: 'Telefon',  value: '+40 232 XXX XXX' },
                { label: 'Email',    value: 'contact@edituraprinceps.ro' },
                { label: 'Program',  value: 'Lun–Vin 9:00–18:00' },
              ].map(item => (
                <div key={item.label}>
                  <dt className="text-xs font-ui text-charcoal-lighter uppercase tracking-wide mb-0.5">
                    {item.label}
                  </dt>
                  <dd className="text-sm font-sans text-charcoal">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* ── Mobil: footer minimal (vizibil doar pe mobil) ── */}
      <div className="block sm:hidden px-6 pt-8 pb-4 text-center">
        <h4 className="font-display text-2xl text-charcoal mb-2">
          Prince's Multimedia
        </h4>
        <p className="text-xs font-sans text-charcoal-light leading-relaxed mb-5 max-w-[220px] mx-auto">
          Editură dedicată patrimoniului literar român din 1999.
        </p>
        <nav className="flex justify-center gap-6 mb-6">
          {[
            { label: 'Colecții', to: '/collections' },
            { label: 'Despre',   to: '/about' },
            { label: 'Contact',  to: '/contact' },
          ].map(l => (
            <Link key={l.label} to={l.to}
                  className="font-ui text-xs text-charcoal-light uppercase tracking-wide
                             hover:text-burgundy transition-colors duration-200">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* ── Bara de jos (toate dispozitivele) ── */}
      <div className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5
                        flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs font-sans text-charcoal-lighter text-center">
            © {new Date().getFullYear()} Prince's Multimedia. Toate drepturile rezervate.
          </p>
          <div className="hidden sm:flex items-center gap-6">
            {['Visa', 'Mastercard', 'PayPal', 'Transfer Bancar'].map(m => (
              <span key={m} className="text-xs font-ui text-charcoal-lighter uppercase tracking-wide">
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
