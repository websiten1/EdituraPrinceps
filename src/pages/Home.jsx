import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Star, BookOpen, Users, Award, Play, ChevronLeft, ChevronRight,
  Mail, ShoppingCart, TrendingUp, Quote
} from 'lucide-react';
import { books, featuredCollections, testimonials } from '../data/books';
import BookCard, { StarRating } from '../components/BookCard';
import { useApp } from '../context/AppContext';

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #4A1272 0%, #1E40AF 45%, #1F2937 100%)',
        }}
      />
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/3 rounded-full blur-3xl" />
        {/* Floating book icons */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white/5"
            style={{
              top: `${10 + i * 15}%`,
              left: `${5 + i * 16}%`,
              fontSize: `${40 + i * 10}px`,
              animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
            }}
          >
            <BookOpen size={40 + i * 8} />
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-32">
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 px-4 py-2 rounded-full text-sm font-medium mb-8 backdrop-blur-sm">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          Editură de Prestigiu din 1999
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
          Descoperă{' '}
          <span className="relative">
            <span className="relative z-10 bg-gradient-to-r from-yellow-300 to-amber-300 bg-clip-text text-transparent">
              Comorile
            </span>
          </span>
          <br />
          Literaturii Române
        </h1>

        <p className="text-lg sm:text-xl text-blue-100/90 max-w-3xl mx-auto mb-10 leading-relaxed">
          Prince's Multimedia aduce în casele voastre cele mai valoroase opere ale literaturii române clasice și contemporane.
          Poezie, proză, filozofie — tot ce iubești, în ediții de colecție.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/collections"
            className="flex items-center gap-2 bg-white text-purple-900 px-8 py-4 rounded-2xl font-bold text-base hover:bg-blue-50 transition-all duration-300 shadow-2xl hover:scale-105 hover:shadow-white/20"
          >
            Explorează Colecțiile
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/about"
            className="flex items-center gap-2 bg-white/10 border border-white/30 text-white px-8 py-4 rounded-2xl font-semibold text-base hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
          >
            <Play className="w-4 h-4" />
            Despre Noi
          </Link>
        </div>

        {/* Stats preview */}
        <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
          {[
            { value: '500+', label: 'Titluri' },
            { value: '10K+', label: 'Clienți' },
            { value: '25+', label: 'Ani Experiență' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-xs sm:text-sm text-blue-200/80 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
        <ChevronRight className="w-6 h-6 rotate-90" />
      </div>
    </section>
  );
}

function FeaturedCollections() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent(c => (c - 1 + featuredCollections.length) % featuredCollections.length);
  const next = () => setCurrent(c => (c + 1) % featuredCollections.length);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-purple-700 font-semibold text-sm uppercase tracking-wider mb-2">Curate cu Grijă</p>
            <h2 className="section-title">Colecții Featured</h2>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={prev} className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:border-purple-700 hover:text-purple-700 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={next} className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:border-purple-700 hover:text-purple-700 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredCollections.map((col, i) => (
            <Link
              key={col.id}
              to={`/collections?category=${encodeURIComponent(col.title)}`}
              className={`relative overflow-hidden rounded-2xl h-52 group cursor-pointer transition-transform duration-300 hover:scale-105 ${i === current ? 'ring-4 ring-purple-400 ring-offset-2' : ''}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${col.gradient}`} />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                <div className="mb-1">
                  <span className="text-xs font-medium bg-white/20 px-2 py-0.5 rounded-full">
                    {col.count} cărți
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>{col.title}</h3>
                <p className="text-xs text-white/80 leading-relaxed line-clamp-2">{col.description}</p>
              </div>
              <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 mt-6">
          {featuredCollections.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-300 rounded-full ${i === current ? 'w-6 h-2 bg-purple-700' : 'w-2 h-2 bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function LatestReleases() {
  const featured = books.filter(b => b.featured).slice(0, 4);
  const latest = books.slice(0, 12);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-purple-700 font-semibold text-sm uppercase tracking-wider mb-2">Proaspăt Apărute</p>
            <h2 className="section-title">Noutăți Editoriale</h2>
          </div>
          <Link
            to="/collections"
            className="hidden sm:flex items-center gap-2 text-purple-800 font-semibold text-sm hover:gap-3 transition-all"
          >
            Vezi toate <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {latest.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/collections" className="btn-primary inline-flex items-center gap-2">
            Explorează toate cărțile <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function BestsellersSection() {
  const bestsellers = books.filter(b => b.bestseller);
  const { addToCart } = useApp();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-purple-700 font-semibold text-sm uppercase tracking-wider mb-2">Cele Mai Căutate</p>
          <h2 className="section-title mx-auto">Bestsellere</h2>
          <p className="section-subtitle mx-auto text-center">Titlurile care au cucerit inimile cititorilor noștri</p>
        </div>

        <div className="space-y-4 max-w-3xl mx-auto">
          {bestsellers.map((book, i) => (
            <div
              key={book.id}
              className="flex items-center gap-4 sm:gap-6 bg-gray-50 rounded-2xl p-4 hover:bg-purple-50 transition-colors group"
            >
              <div className="text-2xl sm:text-3xl font-bold text-gray-200 w-8 text-center flex-shrink-0">
                {i + 1}
              </div>
              <Link to={`/product/${book.id}`}>
                <div className={`w-14 h-20 rounded-lg bg-gradient-to-br ${book.gradient} flex items-center justify-center shadow-md flex-shrink-0`}>
                  <BookOpen className="w-6 h-6 text-white/60" />
                </div>
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/product/${book.id}`}>
                  <h3 className="font-semibold text-gray-900 group-hover:text-purple-800 transition-colors text-sm sm:text-base" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {book.title}
                  </h3>
                </Link>
                <p className="text-xs sm:text-sm text-gray-500">{book.author}</p>
                <div className="flex items-center gap-2 mt-1">
                  <StarRating rating={book.rating} />
                  <span className="text-xs text-gray-400">({book.reviewCount})</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <span className="text-base sm:text-lg font-bold text-purple-800">{book.price.toFixed(2)} lei</span>
                <button
                  onClick={() => addToCart(book)}
                  className="flex items-center gap-1 text-xs bg-purple-800 text-white px-3 py-1.5 rounded-lg hover:bg-purple-900 transition-colors"
                >
                  <ShoppingCart className="w-3 h-3" />
                  <span className="hidden sm:inline">Adaugă</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { icon: BookOpen, value: '500+', label: 'Titluri Publicate', desc: 'O bibliotecă vastă de literatură română', color: 'bg-purple-100 text-purple-700' },
    { icon: Users, value: '10,000+', label: 'Clienți Fericiți', desc: 'Cititori din toată România și diaspora', color: 'bg-blue-100 text-blue-700' },
    { icon: Award, value: '25+', label: 'Ani de Excelență', desc: 'O tradiție editorială de două decenii', color: 'bg-amber-100 text-amber-700' },
    { icon: TrendingUp, value: '50+', label: 'Autori Publicați', desc: 'Parteneri literari de elită', color: 'bg-green-100 text-green-700' },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
            De ce Prince's Multimedia?
          </h2>
          <p className="text-blue-200 max-w-xl mx-auto">Dedicați excelenței editoriale de peste două decenii</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(stat => (
            <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/15 transition-colors">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm font-semibold text-blue-100 mb-1">{stat.label}</div>
              <div className="text-xs text-blue-300">{stat.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Te rugăm introdu o adresă de email validă.');
      return;
    }
    setSubmitted(true);
    setError('');
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-700 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Mail className="w-8 h-8 text-white" />
        </div>
        <h2 className="section-title mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>Rămâi la Curent</h2>
        <p className="text-gray-500 mb-8 max-w-xl mx-auto">
          Abonează-te la newsletter-ul nostru și fii primul care află despre noutăți editoriale, oferte exclusive și evenimente literare.
        </p>

        {submitted ? (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-8">
            <div className="text-4xl mb-3">🎉</div>
            <h3 className="text-xl font-bold text-green-800 mb-2">Mulțumim!</h3>
            <p className="text-green-700">Te-ai abonat cu succes. Vei primi în curând noutăți despre cele mai recente apariții editoriale.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(''); }}
                placeholder="adresa@email.ro"
                className={`input-field ${error ? 'border-red-400 focus:ring-red-400' : ''}`}
              />
              {error && <p className="text-red-500 text-xs mt-1 text-left">{error}</p>}
            </div>
            <button type="submit" className="btn-primary whitespace-nowrap">
              Abonează-te
            </button>
          </form>
        )}
        <p className="text-xs text-gray-400 mt-4">
          Nu facem spam. Poți anula abonamentul oricând.{' '}
          <Link to="#" className="text-purple-700 hover:underline">Politică Confidențialitate</Link>
        </p>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-purple-700 font-semibold text-sm uppercase tracking-wider mb-2">Părerile Clienților</p>
          <h2 className="section-title">Ce Spun Cititorii Noștri</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(t => (
            <div key={t.id} className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < t.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}`}
                  />
                ))}
              </div>
              <Quote className="w-8 h-8 text-purple-200 mb-3" />
              <p className="text-gray-700 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-sm font-bold">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="page-transition">
      <HeroSection />
      <FeaturedCollections />
      <LatestReleases />
      <BestsellersSection />
      <StatsSection />
      <TestimonialsSection />
      <NewsletterSection />
    </div>
  );
}
