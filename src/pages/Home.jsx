import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { books, testimonials } from '../data/books';
import BookCard, { StarRow } from '../components/BookCard';
import { useApp } from '../context/AppContext';

function Divider() {
  return (
    <div className="flex items-center gap-4 my-4">
      <div className="flex-1 h-px bg-gray-200" />
      <span className="text-burgundy-300 text-xs">◆</span>
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  );
}

function SectionHeader({ eyebrow, title, centered = false }) {
  return (
    <div className={`mb-10 ${centered ? 'text-center' : ''}`}>
      {eyebrow && (
        <p className="text-xs font-ui font-semibold text-burgundy uppercase tracking-wide mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-h2 text-charcoal">{title}</h2>
      <div className={`mt-3 ${centered ? 'flex justify-center' : ''}`}>
        <div className="h-0.5 bg-burgundy w-12" />
      </div>
    </div>
  );
}

/* ── Hero ────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 text-center">

        <p className="text-xs font-ui font-semibold text-burgundy uppercase tracking-widest mb-8">
          Est. 1999 · Iași, România
        </p>

        <div className="flex items-center justify-center gap-6 mb-8">
          <div className="h-px bg-gray-200 w-20" />
          <span className="text-burgundy-300 font-serif text-xl">❧</span>
          <div className="h-px bg-gray-200 w-20" />
        </div>

        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-charcoal
                       leading-tight mb-4">
          Editura Princeps
        </h1>

        <p className="font-serif-italic text-2xl sm:text-3xl text-charcoal-light mb-2">
          Comorile Patrimoniului Literar Român
        </p>

        <div className="flex items-center justify-center gap-6 mt-6 mb-10">
          <div className="h-px bg-gray-200 w-20" />
          <span className="text-burgundy-300 font-serif text-xl">❧</span>
          <div className="h-px bg-gray-200 w-20" />
        </div>

        <p className="text-base font-sans text-charcoal-light max-w-xl mx-auto leading-reading mb-10">
          O distinsă editură română care selectează cele mai valoroase opere de poezie,
          proză, filozofie și critică literară din 1999.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/collections" className="btn-primary px-8 py-3.5">
            Explorează Colecția
          </Link>
          <Link to="/about" className="btn-ghost text-base">
            Povestea Noastră →
          </Link>
        </div>

        <div className="flex items-center justify-center gap-4 mt-16">
          <div className="h-px bg-gray-100 w-24" />
          <span className="text-charcoal-lighter font-ui text-xs uppercase tracking-widest">
            25 de ani de excelență literară
          </span>
          <div className="h-px bg-gray-100 w-24" />
        </div>
      </div>
    </section>
  );
}

/* ── Colecții în Evidență ─────────────────────────────────────────── */
function FeaturedCollections() {
  const colData = [
    {
      title:    'Poezia Română',
      subtitle: 'Voci ale Unei Națiuni',
      desc:     'De la Eminescu până în zilele noastre — versurile esențiale ale literaturii române, selectate pentru cititorul avizat.',
      link:     '/collections?category=Poezie',
      count:    14,
      color:    '#6B4C4C',
    },
    {
      title:    'Filozofie și Gândire',
      subtitle: 'Moștenire Intelectuală Română',
      desc:     'Operele filozofice fundamentale care au modelat viața intelectuală românească, în ediții de referință.',
      link:     '/collections?category=Filozofie',
      count:    4,
      color:    '#2C3E50',
    },
    {
      title:    'Critică Literară',
      subtitle: 'Erudiție și Analiză',
      desc:     'Studii critice și eseuri semnate de cei mai importanți cercetători literari români — lectură esențială pentru orice student serios.',
      link:     '/collections?category=Critică Literară',
      count:    6,
      color:    '#8B6F47',
    },
  ];

  return (
    <section className="section bg-gray-50 border-b border-gray-100">
      <div className="container">
        <SectionHeader eyebrow="Selectate cu Grijă" title="Colecțiile Noastre" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {colData.map(col => (
            <div
              key={col.title}
              className="bg-white border border-gray-200 hover:border-burgundy
                         transition-colors duration-300 p-7 flex flex-col
                         relative overflow-hidden group hover:shadow-classic-md"
            >
              <div className="w-10 h-1 mb-4 transition-all duration-300 group-hover:w-full"
                   style={{ backgroundColor: col.color }} />

              <p className="text-xs font-ui text-burgundy uppercase tracking-wide mb-1">
                {col.subtitle}
              </p>
              <h3 className="font-display text-xl text-charcoal mb-3">{col.title}</h3>
              <p className="text-sm font-sans text-charcoal-light leading-reading flex-1">
                {col.desc}
              </p>
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                <span className="text-xs font-ui text-charcoal-lighter uppercase tracking-wide">
                  {col.count} titluri
                </span>
                <Link to={col.link} className="btn-ghost text-sm">
                  Răsfoi →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Apariții Recente ────────────────────────────────────────────── */
function LatestReleases() {
  const latest = books.slice(0, 8);
  return (
    <section className="section bg-white border-b border-gray-100">
      <div className="container">
        <div className="flex items-end justify-between mb-10">
          <SectionHeader eyebrow="Publicate Recent" title="Apariții Recente" />
          <Link to="/collections" className="btn-ghost hidden sm:flex">
            Vezi toate titlurile →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {latest.map(book => <BookCard key={book.id} book={book} />)}
        </div>
        <div className="text-center mt-10">
          <Link to="/collections" className="btn-primary px-8">
            Vezi Catalogul Complet
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Bestselleri ─────────────────────────────────────────────────── */
function Bestsellers() {
  const best = books.filter(b => b.bestseller);
  const { addToCart } = useApp();

  return (
    <section className="section bg-gray-50 border-b border-gray-100">
      <div className="container">
        <SectionHeader eyebrow="Cele Mai Căutate" title="Bestselleri" />

        <div className="max-w-3xl">
          {best.map((book, i) => (
            <div
              key={book.id}
              className="flex items-center gap-6 py-5 border-b border-gray-100
                         last:border-0 hover:bg-white transition-colors duration-200 px-4 -mx-4 rounded"
            >
              <div className="w-8 flex-shrink-0 text-center">
                <span className="font-display text-2xl text-burgundy-200">{i + 1}</span>
              </div>

              <Link to={`/product/${book.id}`} className="flex-shrink-0">
                <div className="w-14 h-20 flex items-center
                                justify-center text-white/20 text-2xl font-serif"
                     style={{ backgroundColor: book.coverColor }}>
                  ❧
                </div>
              </Link>

              <div className="flex-1 min-w-0">
                <Link to={`/product/${book.id}`}>
                  <h3 className="font-serif text-base text-charcoal hover:text-burgundy
                                 transition-colors leading-snug">
                    {book.title}
                  </h3>
                </Link>
                <p className="text-xs font-ui text-charcoal-lighter uppercase tracking-wide mt-0.5">
                  {book.author}
                </p>
                <StarRow rating={book.rating} />
              </div>

              <div className="flex-shrink-0 text-right">
                <p className="font-serif text-lg text-burgundy font-semibold mb-2">
                  {book.price.toFixed(2)} lei
                </p>
                <button
                  onClick={() => addToCart(book)}
                  className="flex items-center gap-1.5 text-xs font-ui font-semibold
                             text-burgundy border border-burgundy px-3 py-1.5
                             hover:bg-burgundy hover:text-white transition-colors"
                >
                  <ShoppingCart className="w-3 h-3" />
                  Adaugă
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Statistici ──────────────────────────────────────────────────── */
function Statistics() {
  const stats = [
    { value: '500+',    label: 'Titluri Publicate',     sub: 'Toate categoriile' },
    { value: '10.000+', label: 'Cititori Serviți',      sub: 'În România și diaspora' },
    { value: '25+',     label: 'Ani de Excelență',      sub: 'Fondată în 1999' },
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

/* ── Mărturii ────────────────────────────────────────────────────── */
function Testimonials() {
  return (
    <section className="section bg-white border-b border-gray-100">
      <div className="container">
        <SectionHeader eyebrow="Voci Cititori" title="Ce Spun Cititorii Noștri" centered />

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

/* ── Buletin informativ ──────────────────────────────────────────── */
function Newsletter() {
  const [email, setEmail] = useState('');
  const [done, setDone]   = useState(false);
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
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="h-px bg-gray-200 w-16" />
            <span className="text-burgundy-300 font-serif text-xl">❧</span>
            <div className="h-px bg-gray-200 w-16" />
          </div>
          <h2 className="font-display text-h2 text-charcoal mb-3">Abonează-te la Buletinul Nostru</h2>
          <p className="font-sans text-sm text-charcoal-light leading-reading mb-8">
            Primești noutăți despre apariții, note literare și oferte exclusive de la
            Editura Princeps — livrate cu grijă în căsuța ta poștală.
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
          {error && (
            <p className="text-burgundy text-xs font-sans mt-2">{error}</p>
          )}
          <p className="text-xs font-sans text-charcoal-lighter mt-4">
            Intimitatea ta este respectată. Te poți dezabona oricând.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── Pagina ──────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <div className="fade-in">
      <Hero />
      <FeaturedCollections />
      <LatestReleases />
      <Bestsellers />
      <Statistics />
      <Testimonials />
      <Newsletter />
    </div>
  );
}
