import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

const categoryColors = {
  'Poezie':          'border-burgundy-400 text-burgundy',
  'Proză':           'border-charcoal text-charcoal',
  'Filozofie':       'border-gray-400 text-charcoal-light',
  'Critică Literară':'border-burgundy-300 text-burgundy-700',
  'Audiobook-uri':   'border-forest-800 text-forest-800',
};

function StarRow({ rating }) {
  return (
    <span className="text-burgundy-400 text-sm tracking-tighter font-sans" aria-label={`${rating} din 5`}>
      {'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}
    </span>
  );
}

/* ── Card grilă ─────────────────────────────────────────────────────── */
function GridCard({ book }) {
  const { addToCart, toggleWishlist, wishlist } = useApp();
  const isWishlisted = wishlist.some(b => b.id === book.id);
  const colorClass = categoryColors[book.category] || 'border-gray-300 text-charcoal-light';

  return (
    <article className="bg-white border border-gray-200 flex flex-col
                        transition-shadow duration-300 hover:shadow-classic-md group">

      {/* Copertă */}
      <Link to={`/product/${book.id}`} className="block relative overflow-hidden">
        <div className="h-52 relative flex flex-col items-center
                        justify-center select-none"
             style={{ backgroundColor: book.coverColor }}>
          <div className="absolute inset-0 flex flex-col justify-between px-5 py-5 pointer-events-none">
            <div className="h-px bg-white/20" />
            <div className="text-center">
              <p className="font-serif text-sm text-white/70 italic leading-snug px-2 line-clamp-2">
                {book.title}
              </p>
              <p className="font-ui text-xs text-white/40 mt-2 uppercase tracking-widest">
                {book.author.split(' ').pop()}
              </p>
            </div>
            <div className="h-px bg-white/20" />
          </div>
          <span className="font-serif text-5xl text-white/10 absolute top-3 right-3">❧</span>

          {book.originalPrice && (
            <span className="absolute top-2 left-2 bg-burgundy text-white
                             text-xs font-ui font-semibold px-2 py-0.5 uppercase tracking-wide">
              Reducere
            </span>
          )}
          {book.bestseller && (
            <span className="absolute top-2 right-2 bg-white/90 text-burgundy
                             text-xs font-ui font-semibold px-2 py-0.5 uppercase tracking-wide">
              Bestseller
            </span>
          )}
        </div>

        {/* Suprapunere la hover */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100
                        transition-opacity duration-300 flex items-center justify-center gap-3">
          <span className="text-white text-sm font-ui font-semibold uppercase tracking-wide
                           border border-white px-4 py-2 hover:bg-white hover:text-burgundy
                           transition-colors duration-200">
            Vezi Detalii
          </span>
        </div>
      </Link>

      {/* Conținut */}
      <div className="p-4 flex flex-col flex-1 border-t border-gray-100">
        <div className="mb-2">
          <span className={`badge bg-transparent ${colorClass} text-xs`}>
            {book.category}
          </span>
        </div>

        <Link to={`/product/${book.id}`} className="flex-1">
          <h3 className="font-serif text-base text-charcoal leading-snug mb-1
                         group-hover:text-burgundy transition-colors duration-200
                         line-clamp-2">
            {book.title}
          </h3>
        </Link>
        <p className="text-xs font-ui text-charcoal-lighter uppercase tracking-wide mb-2">
          {book.author}
        </p>

        <div className="flex items-center gap-2 mb-3">
          <StarRow rating={book.rating} />
          <span className="text-xs text-charcoal-lighter font-sans">({book.reviewCount})</span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <div>
            <span className="font-serif text-lg text-burgundy font-semibold">
              {book.price.toFixed(2)} lei
            </span>
            {book.originalPrice && (
              <span className="text-xs text-charcoal-lighter line-through ml-1.5 font-sans">
                {book.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <span className={`text-xs font-ui ${book.stock > 0 ? 'text-forest-800' : 'text-charcoal-lighter'}`}>
            {book.stock > 0 ? 'În Stoc' : 'Epuizat'}
          </span>
        </div>

        <div className="flex gap-2 mt-3">
          <button
            onClick={() => addToCart(book)}
            disabled={book.stock === 0}
            className="flex-1 flex items-center justify-center gap-2
                       bg-burgundy text-white text-xs font-ui font-semibold
                       uppercase tracking-wide py-2.5 border border-burgundy
                       hover:bg-burgundy-800 transition-colors duration-200
                       disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Adaugă în Coș
          </button>
          <button
            onClick={() => toggleWishlist(book)}
            className={`p-2.5 border transition-colors duration-200
              ${isWishlisted
                ? 'border-burgundy bg-burgundy-50 text-burgundy'
                : 'border-gray-200 text-charcoal-lighter hover:border-burgundy hover:text-burgundy'
              }`}
            aria-label="Adaugă în lista de dorințe"
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-burgundy' : ''}`} />
          </button>
        </div>
      </div>
    </article>
  );
}

/* ── Card listă ─────────────────────────────────────────────────────── */
function ListCard({ book }) {
  const { addToCart, toggleWishlist, wishlist } = useApp();
  const isWishlisted = wishlist.some(b => b.id === book.id);
  const colorClass = categoryColors[book.category] || 'border-gray-300 text-charcoal-light';

  return (
    <article className="bg-white border border-gray-200 flex gap-0
                        transition-shadow duration-300 hover:shadow-classic-md">
      <Link to={`/product/${book.id}`} className="flex-shrink-0">
        <div className="w-24 h-full min-h-[9rem]
                        flex items-center justify-center text-white/20"
             style={{ backgroundColor: book.coverColor }}>
          <span className="font-serif text-4xl">❧</span>
        </div>
      </Link>

      <div className="flex-1 p-4 flex flex-col justify-between border-l border-gray-100">
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className={`badge bg-transparent ${colorClass} text-xs mb-2 inline-block`}>
                {book.category}
              </span>
              <Link to={`/product/${book.id}`}>
                <h3 className="font-serif text-lg text-charcoal hover:text-burgundy
                               transition-colors leading-snug">
                  {book.title}
                </h3>
              </Link>
              <p className="text-xs font-ui text-charcoal-lighter uppercase tracking-wide mt-1">
                {book.author}
              </p>
            </div>
            <button onClick={() => toggleWishlist(book)} className="flex-shrink-0 mt-1" aria-label="Lista de dorințe">
              <Heart className={`w-4 h-4 transition-colors ${
                isWishlisted ? 'text-burgundy fill-burgundy' : 'text-charcoal-lighter hover:text-burgundy'
              }`} />
            </button>
          </div>
          <p className="text-sm font-sans text-charcoal-light mt-2 line-clamp-2">
            {book.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <span className="font-serif text-xl text-burgundy font-semibold">
              {book.price.toFixed(2)} lei
            </span>
            <StarRow rating={book.rating} />
          </div>
          <button
            onClick={() => addToCart(book)}
            disabled={book.stock === 0}
            className="flex items-center gap-2 bg-burgundy text-white
                       text-xs font-ui font-semibold uppercase tracking-wide
                       px-4 py-2 border border-burgundy
                       hover:bg-burgundy-800 transition-colors duration-200
                       disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Adaugă în Coș
          </button>
        </div>
      </div>
    </article>
  );
}

export default function BookCard({ book, view = 'grid' }) {
  return view === 'list' ? <ListCard book={book} /> : <GridCard book={book} />;
}

export { StarRow };
