import { useState } from 'react';
import { Link } from 'react-router-dom';
import { books, testimonials } from '../data/books';
import { LandscapeCard } from '../components/BookCard';

/* ── Helpers ─────────────────────────────────────────────────────────── */
function OrnamentLine() {
  return (
    <div className="flex items-center justify-center gap-4">
      <div className="h-px bg-gray-200 w-16 sm:w-24" />
      <span className="text-burgundy font-serif text-xl select-none leading-none">❧</span>
      <div className="h-px bg-gray-200 w-16 sm:w-24" />
    </div>
  );
}

function SectionHeader({ eyebrow, title, subtitle, centered = false }) {
  return (
    <div className={centered ? 'text-center' : ''}>
      {eyebrow && (
        <p className="text-xs font-ui font-semibold text-burgundy uppercase tracking-widest mb-2">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-h2 text-charcoal leading-tight">{title}</h2>
      {subtitle && (
        <p className="text-sm font-sans text-charcoal-light mt-1.5">{subtitle}</p>
      )}
      <div className={`mt-3 ${centered ? 'flex justify-center' : ''}`}>
        <div className="h-0.5 bg-burgundy w-12" />
      </div>
    </div>
  );
}

function BookGrid({ items }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
      {items.map(book => <LandscapeCard key={book.id} book={book} />)}
    </div>
  );
}

/* ── 1. Hero ─────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="bg-white border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 md:py-36 text-center">

        <p className="font-ui text-xs text-burgundy uppercase tracking-widest font-semibold mb-7">
          Est. 1999 · Iași, România
        </p>

        <OrnamentLine />

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-charcoal
                       leading-none tracking-tight mt-8 mb-5">
          Prince's Multimedia
        </h1>

        <p className="font-serif text-xl sm:text-2xl text-charcoal-light italic mb-7">
          Colecția Patrimoniului Literar Român
        </p>

        <OrnamentLine />

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <Link to="/collections" className="btn-primary px-8 py-3.5 w-full sm:w-auto text-center">
            Explorează Colecția
          </Link>
          <Link to="/about"
                className="font-ui text-sm text-burgundy uppercase tracking-wide font-semibold
                           border-b border-transparent hover:border-burgundy transition-colors
                           w-full sm:w-auto text-center py-2">
            Povestea Noastră →
          </Link>
        </div>

        <p className="font-ui text-xs text-charcoal-lighter uppercase tracking-widest mt-14">
          25 de ani de excelență literară
        </p>
      </div>
    </section>
  );
}

/* ── 2. Banner Colecție Specială ──────────────────────────────────────── */
function PromoBanner() {
  return (
    <section className="border-b border-gray-100" style={{ backgroundColor: '#FAF6F0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-8 items-center">

          {/* Text */}
          <div className="sm:col-span-3">
            <p className="font-ui text-xs text-burgundy uppercase tracking-widest font-semibold mb-3">
              Colecția Specială · 2024
            </p>
            <h2 className="font-display text-3xl sm:text-4xl text-charcoal leading-tight mb-3">
              Patrimoniul Literar Român
            </h2>
            <div className="h-0.5 bg-burgundy w-10 mb-4" />
            <p className="font-serif text-base sm:text-lg text-charcoal-light leading-reading italic mb-6">
              Titluri reprezentative care au definit literatura română din ultimul secol —
              ediții de referință cu prezentări erudite.
            </p>
            <Link to="/collections" className="btn-primary px-6 py-2.5 inline-flex">
              Descoperă mai mult
            </Link>
          </div>

          {/* Mini coperte decorative */}
          <div className="hidden sm:grid sm:col-span-2 grid-cols-3 gap-2">
            {books.slice(0, 3).map(b => (
              <Link key={b.id} to={`/product/${b.id}`} className="group block">
                <div className="aspect-[3/4] relative overflow-hidden flex items-center justify-center"
                     style={{ backgroundColor: b.coverColor }}>
                  <span className="font-serif text-white/10 text-3xl">❧</span>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
                  <div className="absolute inset-x-2 top-2 border-t border-white/10 pointer-events-none" />
                  <div className="absolute inset-x-2 bottom-2 border-b border-white/10 pointer-events-none" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 3. Apariții Recente ──────────────────────────────────────────────── */
function LatestReleases() {
  const latest = books.slice(0, 8);
  return (
    <section className="section bg-white border-b border-gray-100">
      <div className="container">
        <div className="flex items-end justify-between mb-8 gap-4">
          <SectionHeader
            eyebrow="Publicate Recent"
            title="Apariții Recente"
            subtitle="Noile titluri din colecția noastră"
          />
          <Link to="/collections" className="btn-ghost hidden sm:flex shrink-0">
            Vezi toate →
          </Link>
        </div>
        <BookGrid items={latest} />
        <div className="mt-8 text-center sm:hidden">
          <Link to="/collections" className="btn-ghost text-sm">
            Vezi toate titlurile →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── 4. Colecția Clasicilor (banner + cărți) ──────────────────────────── */
function FeaturedCategory() {
  const prozaBooks = books.filter(b => b.category === 'Proză');
  const display = prozaBooks.length >= 4 ? prozaBooks.slice(0, 8) : books.slice(8, 16);

  return (
    <section className="border-b border-gray-100">
      {/* Banner întunecat */}
      <div className="bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="max-w-2xl">
            <p className="font-ui text-xs text-burgundy-300 uppercase tracking-widest font-semibold mb-3">
              Colecția Lunii
            </p>
            <h2 className="font-display text-3xl sm:text-4xl text-white leading-tight mb-3">
              Colecția Clasicilor Români
            </h2>
            <div className="h-0.5 bg-burgundy w-10 mb-4" />
            <p className="font-serif text-base text-white/50 leading-reading italic mb-6">
              Opere fundamentale ale prozei românești — de la romanele interbelice
              până la capodoperele contemporane.
            </p>
            <Link to="/collections?category=Proză"
                  className="inline-flex items-center gap-2
                             border border-white/30 text-white text-xs font-ui font-semibold
                             uppercase tracking-wide px-5 py-2.5
                             hover:bg-white hover:text-charcoal transition-colors duration-200">
              Răsfoiește Proza →
            </Link>
          </div>
        </div>
      </div>

      {/* Grila de cărți */}
      <div className="bg-gray-50 py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BookGrid items={display} />
        </div>
      </div>
    </section>
  );
}

/* ── 5. Bestselleri ───────────────────────────────────────────────────── */
function Bestsellers() {
  const best = books.filter(b => b.bestseller);
  const rest  = books.filter(b => !b.bestseller);
  const display = [...best, ...rest].slice(0, 8);

  return (
    <section className="section bg-white border-b border-gray-100">
      <div className="container">
        <div className="flex items-end justify-between mb-8 gap-4">
          <SectionHeader
            eyebrow="Cele Mai Căutate"
            title="Bestselleri Săptămânii"
          />
          <Link to="/collections" className="btn-ghost hidden sm:flex shrink-0">
            Vezi toate →
          </Link>
        </div>
        <BookGrid items={display} />
      </div>
    </section>
  );
}

/* ── 6. Cărți în Promoție ────────────────────────────────────────────── */
function PromoCollection() {
  const promo = books.filter(b => b.originalPrice);
  if (!promo.length) return null;

  return (
    <section className="section border-b border-gray-100" style={{ backgroundColor: '#FAF6F0' }}>
      <div className="container">
        <div className="flex items-end justify-between mb-8 gap-4">
          <SectionHeader
            eyebrow="Oferte Limitate"
            title="Cărți în Promoție"
            subtitle="Reduceri la titluri selectate"
          />
          <Link to="/collections" className="btn-ghost hidden sm:flex shrink-0">
            Toate ofertele →
          </Link>
        </div>
        <BookGrid items={promo.slice(0, 8)} />
      </div>
    </section>
  );
}

/* ── 7. Statistici ───────────────────────────────────────────────────── */
function Statistics() {
  const stats = [
    { value: '500+',    label: 'Titluri Publicate',  sub: 'Toate categoriile' },
    { value: '10.000+', label: 'Cititori Serviți',   sub: 'În România și diaspora' },
    { value: '25+',     label: 'Ani de Excelență',   sub: 'Fondată în 1999' },
  ];

  return (
    <section className="bg-charcoal border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-0">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`text-center py-10 px-8
                ${i < stats.length - 1 ? 'border-b sm:border-b-0 sm:border-r border-gray-700' : ''}`}
            >
              <div className="text-5xl font-display text-white mb-2">{s.value}</div>
              <div className="h-0.5 bg-burgundy w-10 mx-auto my-3" />
              <div className="text-sm font-ui font-semibold text-white/80 uppercase tracking-wide mb-1">
                {s.label}
              </div>
              <div className="text-sm font-sans text-white/40 italic">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 8. Mărturii ─────────────────────────────────────────────────────── */
function Testimonials() {
  return (
    <section className="section bg-white border-b border-gray-100">
      <div className="container">
        <div className="mb-10">
          <SectionHeader eyebrow="Voci Cititori" title="Ce Spun Cititorii Noștri" centered />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(t => (
            <div
              key={t.id}
              className="bg-gray-50 border border-gray-200 p-7
                         hover:shadow-classic transition-shadow duration-300"
            >
              <div className="text-burgundy-200 font-display text-5xl leading-none mb-4">"</div>
              <p className="font-quote text-sm text-charcoal leading-reading mb-6 italic">
                {t.text}
              </p>
              <div className="h-px bg-gray-200 mb-4" />
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-burgundy text-white flex items-center justify-center
                                text-xs font-ui font-semibold flex-shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-ui font-semibold text-sm text-charcoal uppercase tracking-wide">
                    {t.name}
                  </p>
                  <p className="font-sans text-xs text-charcoal-lighter mt-0.5">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 9. Newsletter ───────────────────────────────────────────────────── */
function Newsletter() {
  const [email, setEmail] = useState('');
  const [done,  setDone]  = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Introduceți o adresă de email validă.');
      return;
    }
    setDone(true); setError('');
  };

  return (
    <section className="section bg-gray-50 border-b border-gray-100">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <OrnamentLine />
          <h2 className="font-display text-h2 text-charcoal mt-6 mb-3">
            Abonează-te la Buletinul Nostru
          </h2>
          <p className="font-sans text-sm text-charcoal-light leading-reading mb-8">
            Primești noutăți despre apariții, note literare și oferte exclusive de la
            Prince's Multimedia — livrate cu grijă în căsuța ta poștală.
          </p>
          {done ? (
            <p className="font-quote text-burgundy text-lg italic">
              Mulțumim. Așteptăm cu plăcere corespondența dumneavoastră.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(''); }}
                placeholder="Adresa ta de email"
                className={`flex-1 px-4 py-3 bg-white border text-sm font-sans
                            text-charcoal placeholder-charcoal-lighter
                            focus:outline-none focus:border-burgundy transition-colors
                            border-r-0
                            ${error ? 'border-burgundy' : 'border-gray-200'}`}
              />
              <button
                type="submit"
                className="px-6 py-3 bg-burgundy text-white text-sm font-ui font-semibold
                           uppercase tracking-wide border border-burgundy
                           hover:bg-burgundy-800 transition-colors duration-200 whitespace-nowrap"
              >
                Abonează-te
              </button>
            </form>
          )}
          {error && <p className="text-burgundy text-xs font-sans mt-2">{error}</p>}
          <p className="text-xs font-sans text-charcoal-lighter mt-4">
            Intimitatea ta este respectată. Te poți dezabona oricând.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── Pagina ──────────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <div className="fade-in">
      <Hero />
      <PromoBanner />
      <LatestReleases />
      <FeaturedCategory />
      <Bestsellers />
      <PromoCollection />
      <Statistics />
      <Testimonials />
      <Newsletter />
    </div>
  );
}
