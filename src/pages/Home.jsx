import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { books, featuredCollections, testimonials } from '../data/books';
import BookCard, { StarRow } from '../components/BookCard';
import { useApp } from '../context/AppContext';

/* ── Ornamental divider ──────────────────────────────────────────── */
function GoldDivider({ symbol = '◆' }) {
  return (
    <div className="flex items-center gap-3 my-2">
      <div className="flex-1 h-px bg-gold/40" />
      <span className="text-gold text-xs">{symbol}</span>
      <div className="flex-1 h-px bg-gold/40" />
    </div>
  );
}

function SectionHeader({ eyebrow, title, centered = false }) {
  return (
    <div className={`mb-10 ${centered ? 'text-center' : ''}`}>
      {eyebrow && (
        <p className="text-xs font-sans font-bold text-gold uppercase tracking-widest mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif text-h2 text-charcoal">{title}</h2>
      <div className={`mt-3 ${centered ? 'flex justify-center' : ''}`}>
        <div className="flex items-center gap-3">
          <div className="h-px bg-gold/60 w-12" />
          <span className="text-gold text-xs">◆</span>
          <div className="h-px bg-gold/60 w-12" />
        </div>
      </div>
    </div>
  );
}

/* ── Hero ────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="bg-cream border-b border-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 text-center">

        <p className="text-xs font-sans font-bold text-gold uppercase tracking-widest mb-8">
          Est. 1999 · Iași, România
        </p>

        {/* Ornamental rule */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px bg-gold/60 w-16" />
          <span className="text-gold font-serif text-lg">❧</span>
          <div className="h-px bg-gold/60 w-16" />
        </div>

        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl text-charcoal
                       leading-tight mb-4">
          Prince's Multimedia
        </h1>

        <p className="font-serif text-xl sm:text-2xl text-charcoal-light italic mb-2">
          Treasures of Romanian Literary Heritage
        </p>

        {/* Ornamental rule */}
        <div className="flex items-center justify-center gap-4 mt-6 mb-10">
          <div className="h-px bg-gold/60 w-16" />
          <span className="text-gold font-serif text-lg">❧</span>
          <div className="h-px bg-gold/60 w-16" />
        </div>

        <p className="text-base font-sans text-charcoal-light max-w-xl mx-auto leading-reading mb-10">
          A distinguished Romanian publishing house, curating the finest works of poetry,
          prose, philosophy, and literary criticism since 1999.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/collections" className="btn-primary px-8 py-3.5">
            Explore the Collection
          </Link>
          <Link to="/about" className="btn-ghost text-base">
            Our Story →
          </Link>
        </div>

        {/* Bottom ornament */}
        <div className="flex items-center justify-center gap-4 mt-16">
          <div className="h-px bg-paper-dark w-24" />
          <span className="text-charcoal-lighter font-sans text-xs uppercase tracking-widest">
            25 years of literary excellence
          </span>
          <div className="h-px bg-paper-dark w-24" />
        </div>
      </div>
    </section>
  );
}

/* ── Featured Collections ────────────────────────────────────────── */
function FeaturedCollections() {
  const colData = [
    {
      title:    'Romanian Poetry',
      subtitle: 'Voices of a Nation',
      desc:     'From Eminescu to the present day — the essential verse of Romanian literature, curated for the discerning reader.',
      link:     '/collections?category=Poetry',
      count:    14,
    },
    {
      title:    'Philosophy & Thought',
      subtitle: 'Romanian Intellectual Heritage',
      desc:     'The foundational philosophical works that shaped Romanian intellectual life, in authoritative editions.',
      link:     '/collections?category=Philosophy',
      count:    4,
    },
    {
      title:    'Literary Criticism',
      subtitle: 'Scholarship & Analysis',
      desc:     'Critical studies and essays by Romania\'s foremost literary scholars — essential reading for any serious student.',
      link:     '/collections?category=Literary Criticism',
      count:    6,
    },
  ];

  return (
    <section className="section bg-cream border-b border-paper">
      <div className="container">
        <SectionHeader eyebrow="Curated with Care" title="Our Collections" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {colData.map(col => (
            <div
              key={col.title}
              className="bg-cream border-2 border-paper hover:border-forest-800
                         transition-colors duration-300 p-7 flex flex-col
                         relative overflow-hidden group"
            >
              {/* Gold accent bottom bar */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold/40
                              group-hover:bg-gold transition-colors duration-300" />

              <p className="text-xs font-sans text-gold uppercase tracking-widest mb-1">
                {col.subtitle}
              </p>
              <h3 className="font-serif text-h3 text-charcoal mb-3">{col.title}</h3>
              <GoldDivider />
              <p className="text-sm font-sans text-charcoal-light leading-reading flex-1 mt-3">
                {col.desc}
              </p>
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-paper">
                <span className="text-xs font-sans text-charcoal-lighter uppercase tracking-widest">
                  {col.count} titles
                </span>
                <Link to={col.link} className="btn-ghost text-sm">
                  Browse →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Latest Releases ─────────────────────────────────────────────── */
function LatestReleases() {
  const latest = books.slice(0, 8);
  return (
    <section className="section bg-cream-dark border-b border-paper">
      <div className="container">
        <div className="flex items-end justify-between mb-10">
          <SectionHeader eyebrow="Recently Published" title="Latest Releases" />
          <Link to="/collections" className="btn-ghost hidden sm:flex">
            View all titles →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {latest.map(book => <BookCard key={book.id} book={book} />)}
        </div>
        <div className="text-center mt-10">
          <Link to="/collections" className="btn-primary px-8">
            View Complete Catalogue
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Bestsellers ─────────────────────────────────────────────────── */
function Bestsellers() {
  const best = books.filter(b => b.bestseller);
  const { addToCart } = useApp();

  return (
    <section className="section bg-cream border-b border-paper">
      <div className="container">
        <SectionHeader eyebrow="Most Sought After" title="Bestsellers" />

        <div className="max-w-3xl">
          {best.map((book, i) => (
            <div
              key={book.id}
              className="flex items-center gap-6 py-5 border-b border-paper
                         last:border-0 hover:bg-cream-dark transition-colors duration-200 px-4 -mx-4"
            >
              {/* Rank */}
              <div className="w-8 flex-shrink-0 text-center">
                <span className="font-serif text-2xl text-gold/50">{i + 1}</span>
              </div>

              {/* Mini cover */}
              <Link to={`/product/${book.id}`} className="flex-shrink-0">
                <div className="w-14 h-20 bg-forest-800 flex items-center
                                justify-center text-cream/20 text-2xl font-serif">
                  ❧
                </div>
              </Link>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <Link to={`/product/${book.id}`}>
                  <h3 className="font-serif text-base text-charcoal hover:text-forest-800
                                 transition-colors leading-snug">
                    {book.title}
                  </h3>
                </Link>
                <p className="text-xs font-sans text-charcoal-light uppercase tracking-wider mt-0.5">
                  {book.author}
                </p>
                <StarRow rating={book.rating} />
              </div>

              {/* Price + action */}
              <div className="flex-shrink-0 text-right">
                <p className="font-serif text-lg text-burgundy-700 font-semibold mb-2">
                  {book.price.toFixed(2)} lei
                </p>
                <button
                  onClick={() => addToCart(book)}
                  className="flex items-center gap-1.5 text-xs font-sans font-bold
                             text-forest-800 border border-forest-800 px-3 py-1.5
                             hover:bg-forest-800 hover:text-cream transition-colors"
                >
                  <ShoppingCart className="w-3 h-3" />
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Statistics ──────────────────────────────────────────────────── */
function Statistics() {
  const stats = [
    { value: '500+',    label: 'Published Titles',   sub: 'Across all categories' },
    { value: '10,000+', label: 'Readers Served',     sub: 'Across Romania & beyond' },
    { value: '25+',     label: 'Years of Excellence', sub: 'Established 1999' },
  ];

  return (
    <section className="bg-forest-800 border-b border-forest-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-0">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`text-center py-10 px-8
                ${i < stats.length - 1 ? 'border-b sm:border-b-0 sm:border-r border-forest-700' : ''}`}
            >
              <div className="text-5xl font-serif text-cream mb-2">{s.value}</div>
              <div className="h-px bg-gold/40 w-12 mx-auto my-3" />
              <div className="text-base font-sans font-bold text-cream/90 uppercase tracking-widest mb-1">
                {s.label}
              </div>
              <div className="text-sm font-sans text-cream/50 italic">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Testimonials ────────────────────────────────────────────────── */
function Testimonials() {
  return (
    <section className="section bg-cream-dark border-b border-paper">
      <div className="container">
        <SectionHeader eyebrow="Reader Voices" title="What Our Readers Say" centered />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(t => (
            <div
              key={t.id}
              className="bg-cream border border-paper p-7
                         hover:shadow-classic transition-shadow duration-300"
            >
              <div className="text-gold font-serif text-4xl leading-none mb-4 opacity-40">"</div>
              <p className="font-serif-italic text-base text-charcoal leading-reading mb-6">
                {t.text}
              </p>
              <GoldDivider symbol="◆" />
              <div className="mt-4">
                <p className="font-sans font-bold text-sm text-charcoal uppercase tracking-widest">
                  {t.name}
                </p>
                <p className="font-sans text-xs text-charcoal-light mt-0.5">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Newsletter ──────────────────────────────────────────────────── */
function Newsletter() {
  const [email, setEmail]   = useState('');
  const [done, setDone]     = useState(false);
  const [error, setError]   = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Please enter a valid email address.');
      return;
    }
    setDone(true); setError('');
  };

  return (
    <section className="section bg-forest-950 border-b border-forest-900">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px bg-gold/40 w-12" />
            <span className="text-gold font-serif text-lg">❧</span>
            <div className="h-px bg-gold/40 w-12" />
          </div>
          <h2 className="font-serif text-h2 text-cream mb-3">Subscribe to Our Newsletter</h2>
          <p className="font-sans text-sm text-cream/60 leading-reading mb-8">
            Receive news of new publications, literary notes, and exclusive offers from
            Prince's Multimedia — delivered with care to your inbox.
          </p>

          {done ? (
            <p className="font-serif-italic text-gold text-lg">
              Thank you. We look forward to corresponding with you.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(''); }}
                placeholder="Your email address"
                className={`flex-1 px-4 py-3 bg-forest-900 border text-sm font-sans
                            text-cream placeholder-cream/30
                            focus:outline-none focus:border-gold transition-colors
                            ${error ? 'border-burgundy-600' : 'border-forest-700'}`}
              />
              <button
                type="submit"
                className="px-6 py-3 bg-burgundy-700 text-cream text-sm font-sans font-bold
                           uppercase tracking-widest border border-burgundy-700
                           hover:bg-burgundy-800 transition-colors duration-200 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}
          {error && (
            <p className="text-burgundy-400 text-xs font-sans mt-2">{error}</p>
          )}
          <p className="text-xs font-sans text-cream/30 mt-4">
            Your privacy is respected. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── Page ────────────────────────────────────────────────────────── */
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
