import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, BookOpen, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext';

function StarRating({ rating, size = 'sm' }) {
  const sz = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(star => (
        <Star
          key={star}
          className={`${sz} ${star <= Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : star - 0.5 <= rating ? 'text-yellow-400 fill-yellow-200' : 'text-gray-300 fill-gray-100'}`}
        />
      ))}
    </div>
  );
}

const categoryColors = {
  'Poetry': 'bg-purple-100 text-purple-700',
  'Prose': 'bg-blue-100 text-blue-700',
  'Philosophy': 'bg-gray-100 text-gray-700',
  'Literary Criticism': 'bg-amber-100 text-amber-700',
  'Audiobooks': 'bg-green-100 text-green-700',
};

export default function BookCard({ book, view = 'grid' }) {
  const { addToCart, toggleWishlist, wishlist } = useApp();
  const isWishlisted = wishlist.some(b => b.id === book.id);

  if (view === 'list') {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 flex gap-4 p-4">
        <Link to={`/product/${book.id}`} className="flex-shrink-0">
          <div className={`w-20 h-28 rounded-lg bg-gradient-to-br ${book.gradient} flex items-center justify-center shadow-sm`}>
            <BookOpen className="w-8 h-8 text-white/70" />
          </div>
        </Link>
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className={`badge text-xs ${categoryColors[book.category] || 'bg-gray-100 text-gray-700'} mb-1`}>
                  {book.category}
                </span>
                <Link to={`/product/${book.id}`}>
                  <h3 className="font-semibold text-gray-900 hover:text-purple-800 transition-colors text-sm sm:text-base leading-snug" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {book.title}
                  </h3>
                </Link>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{book.author}</p>
              </div>
              <button
                onClick={() => toggleWishlist(book)}
                className={`p-2 rounded-lg transition-colors flex-shrink-0 ${isWishlisted ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'}`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500' : ''}`} />
              </button>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <StarRating rating={book.rating} />
              <span className="text-xs text-gray-500">({book.reviewCount})</span>
            </div>
            <p className="text-xs text-gray-500 mt-1.5 line-clamp-2 hidden sm:block">{book.description}</p>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-purple-800">{book.price.toFixed(2)} lei</span>
              {book.originalPrice && (
                <span className="text-sm text-gray-400 line-through">{book.originalPrice.toFixed(2)} lei</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${book.stock > 5 ? 'bg-green-100 text-green-700' : book.stock > 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                {book.stock > 5 ? 'În stoc' : book.stock > 0 ? `Ultimele ${book.stock}` : 'Indisponibil'}
              </span>
              <button
                onClick={() => addToCart(book)}
                disabled={book.stock === 0}
                className="flex items-center gap-1.5 bg-gradient-to-r from-purple-800 to-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                Adaugă
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="book-card bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col">
      {/* Cover */}
      <div className="relative">
        <Link to={`/product/${book.id}`}>
          <div className={`h-52 bg-gradient-to-br ${book.gradient} flex items-center justify-center relative overflow-hidden`}>
            <BookOpen className="w-16 h-16 text-white/40" />
            {/* Decorative lines */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-4 right-4 h-0.5 bg-white rounded"></div>
              <div className="absolute top-8 left-4 right-8 h-0.5 bg-white rounded"></div>
              <div className="absolute bottom-8 left-4 right-4 h-0.5 bg-white rounded"></div>
            </div>
            {book.originalPrice && (
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                -{Math.round((1 - book.price / book.originalPrice) * 100)}%
              </div>
            )}
            {book.bestseller && (
              <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                Bestseller
              </div>
            )}
          </div>
        </Link>

        {/* Quick actions overlay */}
        <div className="book-overlay absolute inset-0 bg-black/40 flex items-center justify-center gap-3">
          <Link
            to={`/product/${book.id}`}
            className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-gray-900 hover:bg-purple-100 transition-colors shadow-lg"
            title="Vezi detalii"
          >
            <Eye className="w-4 h-4" />
          </Link>
          <button
            onClick={() => addToCart(book)}
            className="w-9 h-9 bg-purple-700 rounded-full flex items-center justify-center text-white hover:bg-purple-800 transition-colors shadow-lg"
            title="Adaugă în coș"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggleWishlist(book)}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors shadow-lg ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white text-gray-900 hover:bg-red-50'}`}
            title="Lista de dorințe"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="mb-2">
          <span className={`badge text-xs ${categoryColors[book.category] || 'bg-gray-100 text-gray-700'}`}>
            {book.category}
          </span>
        </div>
        <Link to={`/product/${book.id}`} className="flex-1">
          <h3 className="font-semibold text-gray-900 hover:text-purple-800 transition-colors text-sm leading-snug line-clamp-2 mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
            {book.title}
          </h3>
        </Link>
        <p className="text-xs text-gray-500 mb-2">{book.author}</p>

        <div className="flex items-center gap-1.5 mb-3">
          <StarRating rating={book.rating} />
          <span className="text-xs text-gray-500">({book.reviewCount})</span>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-base font-bold text-purple-800">{book.price.toFixed(2)} lei</span>
            {book.originalPrice && (
              <span className="text-xs text-gray-400 line-through ml-1">{book.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${book.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
            {book.stock > 0 ? 'În stoc' : 'Epuizat'}
          </span>
        </div>

        <button
          onClick={() => addToCart(book)}
          disabled={book.stock === 0}
          className="mt-3 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-800 to-blue-700 text-white py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed group-hover:shadow-md"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          Adaugă în Coș
        </button>
      </div>
    </div>
  );
}

export { StarRating };
