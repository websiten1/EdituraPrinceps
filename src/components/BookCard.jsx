import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

const categoryColors = {
  'Poetry':            'border-forest-800 text-forest-800',
  'Prose':             'border-burgundy-700 text-burgundy-700',
  'Philosophy':        'border-charcoal text-charcoal',
  'Literary Criticism':'border-gold text-gold',
  'Audiobooks':        'border-forest-600 text-forest-600',
};

function StarRow({ rating }) {
  return (
    <span className="text-gold text-sm tracking-tighter font-sans" aria-label={`${rating} out of 5`}>
      {'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}
    </span>
  );
}

/* ── Grid card ─────────────────────────────────────────────────────── */
function GridCard({ book }) {
  const { addToCart, toggleWishlist, wishlist } = useApp();
  const isWishlisted = wishlist.some(b => b.id === book.id);
  const colorClass = categoryColors[book.category] || 'border-charcoal text-charcoal';

  return (
    <article className="bg-cream border border-paper flex flex-col
                        transition-shadow duration-300 hover:shadow-classic-md group">

      {/* Cover */}
      <Link to={`/product/${book.id}`} className="block relative overflow-hidden">
        <div className="h-52 bg-forest-800 relative flex flex-col items-center
                        justify-center text-cream/30 select-none">
          {/* Classic spine lines */}
          <div className="absolute inset-0 flex flex-col justify-between px-6 py-5 pointer-events-none">
            <div className="h-px bg-cream/15" />
            <div className="text-center">
              <p className="font-serif text-sm text-cream/50 italic leading-snug px-2 line-clamp-3">
                {book.title}
              </p>
              <p className="font-sans text-xs text-cream/30 mt-2 uppercase tracking-widest">
                {book.author.split(' ').pop()}
              </p>
            </div>
            <div className="h-px bg-cream/15" />
          </div>
          <span className="font-serif text-5xl text-cream/10 absolute top-4 right-4">❧</span>

          {book.originalPrice && (
            <span className="absolute top-2 left-2 bg-burgundy-700 text-cream
                             text-xs font-sans font-bold px-2 py-0.5 uppercase tracking-wider">
              Sale
            </span>
          )}
          {book.bestseller && (
            <span className="absolute top-2 right-2 bg-gold text-forest-900
                             text-xs font-sans font-bold px-2 py-0.5 uppercase tracking-wider">
              Bestseller
            </span>
          )}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-forest-900/60 opacity-0 group-hover:opacity-100
                        transition-opacity duration-300 flex items-center justify-center gap-3">
          <span className="text-cream text-sm font-sans font-bold uppercase tracking-widest
                           border border-cream px-4 py-2 hover:bg-cream hover:text-forest-800
                           transition-colors duration-200">
            View Details
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 border-t border-paper">
        <div className="mb-2">
          <span className={`badge-classic bg-transparent ${colorClass} text-xs`}>
            {book.category}
          </span>
        </div>

        <Link to={`/product/${book.id}`} className="flex-1">
          <h3 className="font-serif text-base text-charcoal leading-snug mb-1
                         group-hover:text-forest-800 transition-colors duration-200
                         line-clamp-2">
            {book.title}
          </h3>
        </Link>
        <p className="text-xs font-sans text-charcoal-light uppercase tracking-wider mb-2">
          {book.author}
        </p>

        <div className="flex items-center gap-2 mb-3">
          <StarRow rating={book.rating} />
          <span className="text-xs text-charcoal-lighter font-sans">({book.reviewCount})</span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-paper">
          <div>
            <span className="font-serif text-lg text-burgundy-700 font-semibold">
              {book.price.toFixed(2)} lei
            </span>
            {book.originalPrice && (
              <span className="text-xs text-charcoal-lighter line-through ml-1.5 font-sans">
                {book.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <span className={`text-xs font-sans ${book.stock > 0 ? 'text-forest-700' : 'text-charcoal-lighter'}`}>
            {book.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        <div className="flex gap-2 mt-3">
          <button
            onClick={() => addToCart(book)}
            disabled={book.stock === 0}
            className="flex-1 flex items-center justify-center gap-2
                       bg-forest-800 text-cream text-xs font-sans font-bold
                       uppercase tracking-widest py-2.5 border border-forest-800
                       hover:bg-forest-900 transition-colors duration-200
                       disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Add to Cart
          </button>
          <button
            onClick={() => toggleWishlist(book)}
            className={`p-2.5 border transition-colors duration-200
              ${isWishlisted
                ? 'border-burgundy-700 bg-burgundy-50 text-burgundy-700'
                : 'border-paper text-charcoal-lighter hover:border-burgundy-700 hover:text-burgundy-700'
              }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-burgundy-700' : ''}`} />
          </button>
        </div>
      </div>
    </article>
  );
}

/* ── List card ─────────────────────────────────────────────────────── */
function ListCard({ book }) {
  const { addToCart, toggleWishlist, wishlist } = useApp();
  const isWishlisted = wishlist.some(b => b.id === book.id);
  const colorClass = categoryColors[book.category] || 'border-charcoal text-charcoal';

  return (
    <article className="bg-cream border border-paper flex gap-0
                        transition-shadow duration-300 hover:shadow-classic-md">
      <Link to={`/product/${book.id}`} className="flex-shrink-0">
        <div className="w-24 h-full min-h-[9rem] bg-forest-800
                        flex items-center justify-center text-cream/20">
          <span className="font-serif text-4xl">❧</span>
        </div>
      </Link>

      <div className="flex-1 p-4 flex flex-col justify-between border-l border-paper">
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className={`badge-classic bg-transparent ${colorClass} text-xs mb-2 inline-block`}>
                {book.category}
              </span>
              <Link to={`/product/${book.id}`}>
                <h3 className="font-serif text-lg text-charcoal hover:text-forest-800
                               transition-colors leading-snug">
                  {book.title}
                </h3>
              </Link>
              <p className="text-xs font-sans text-charcoal-light uppercase tracking-wider mt-1">
                {book.author}
              </p>
            </div>
            <button onClick={() => toggleWishlist(book)} className="flex-shrink-0 mt-1">
              <Heart className={`w-4 h-4 transition-colors ${
                isWishlisted ? 'text-burgundy-700 fill-burgundy-700' : 'text-charcoal-lighter hover:text-burgundy-700'
              }`} />
            </button>
          </div>
          <p className="text-sm font-sans text-charcoal-light mt-2 line-clamp-2">
            {book.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-paper">
          <div className="flex items-center gap-4">
            <span className="font-serif text-xl text-burgundy-700 font-semibold">
              {book.price.toFixed(2)} lei
            </span>
            <StarRow rating={book.rating} />
          </div>
          <button
            onClick={() => addToCart(book)}
            disabled={book.stock === 0}
            className="flex items-center gap-2 bg-forest-800 text-cream
                       text-xs font-sans font-bold uppercase tracking-widest
                       px-4 py-2 border border-forest-800
                       hover:bg-forest-900 transition-colors duration-200
                       disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Add to Cart
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
