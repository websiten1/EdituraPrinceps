import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart, Heart, Share2, Star, BookOpen, Package,
  ChevronLeft, ChevronRight, Minus, Plus, Check, AlertCircle,
  Copy, ThumbsUp, User, Calendar, Hash
} from 'lucide-react';
import { FacebookIcon, TwitterIcon } from '../components/SocialIcons';
import { books } from '../data/books';
import { useApp } from '../context/AppContext';
import Breadcrumb from '../components/Breadcrumb';
import BookCard from '../components/BookCard';

function StarRating({ rating, size = 'sm', interactive = false, onRate }) {
  const [hover, setHover] = useState(0);
  const sz = size === 'lg' ? 'w-6 h-6' : size === 'md' ? 'w-5 h-5' : 'w-4 h-4';

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(star => (
        <Star
          key={star}
          className={`${sz} transition-colors ${
            star <= (interactive ? (hover || rating) : Math.floor(rating))
              ? 'text-yellow-400 fill-yellow-400'
              : 'text-gray-300 fill-gray-100'
          } ${interactive ? 'cursor-pointer' : ''}`}
          onMouseEnter={() => interactive && setHover(star)}
          onMouseLeave={() => interactive && setHover(0)}
          onClick={() => interactive && onRate && onRate(star)}
        />
      ))}
    </div>
  );
}

const mockReviews = [
  {
    id: 1,
    author: 'Maria I.',
    rating: 5,
    date: '15 Mar 2024',
    title: 'O capodoperă a literaturii române',
    content: 'Am citit această carte cu sufletul la gură. Fiecare pagină este o descoperire, un univers nou. Recomand cu căldură tuturor iubitorilor de literatură!',
    helpful: 12,
    verified: true,
  },
  {
    id: 2,
    author: 'Alexandru P.',
    rating: 4,
    date: '3 Feb 2024',
    title: 'Lectură obligatorie',
    content: 'O carte care te face să gândești. Limbajul este curat și expresiv, ideile sunt profunde. Ușoară scădere pentru că aș fi vrut mai multe pagini!',
    helpful: 8,
    verified: true,
  },
  {
    id: 3,
    author: 'Elena G.',
    rating: 5,
    date: '20 Ian 2024',
    title: 'Fascinantă',
    content: 'Am descoperit această editură recent și sunt impresionată de calitatea edițiilor. Hârtie de calitate, design elegant, un produs premium.',
    helpful: 5,
    verified: false,
  },
];

function ReviewModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({ rating: 0, title: '', content: '', name: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.rating) e.rating = 'Selectează un rating.';
    if (!form.title.trim()) e.title = 'Titlul este obligatoriu.';
    if (form.content.length < 20) e.content = 'Recenzia trebuie să aibă cel puțin 20 de caractere.';
    if (!form.name.trim()) e.name = 'Numele este obligatoriu.';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold text-gray-900 mb-5" style={{ fontFamily: 'Playfair Display, serif' }}>
          Scrie o Recenzie
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rating *</label>
            <StarRating rating={form.rating} size="lg" interactive onRate={r => setForm(f => ({ ...f, rating: r }))} />
            {errors.rating && <p className="text-red-500 text-xs mt-1">{errors.rating}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Titlul recenziei *</label>
            <input
              type="text"
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              className="input-field"
              placeholder="Rezumă experiența ta"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Recenzie *</label>
            <textarea
              rows={4}
              value={form.content}
              onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
              className="input-field resize-none"
              placeholder="Spune-ne ce crezi despre această carte..."
            />
            {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}
            <p className="text-xs text-gray-400 mt-1">{form.content.length} caractere (minim 20)</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Numele tău *</label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className="input-field"
              placeholder="Prenume sau inițiale"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 btn-secondary">Anulează</button>
            <button type="submit" className="flex-1 btn-primary">Publică Recenzia</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlist, addToRecentlyViewed, addToast } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [expandDesc, setExpandDesc] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviews, setReviews] = useState(mockReviews);
  const [copied, setCopied] = useState(false);

  const book = books.find(b => b.id === parseInt(id));
  const related = books.filter(b => b.id !== book?.id && b.category === book?.category).slice(0, 4);
  const isWishlisted = wishlist.some(b => b.id === book?.id);

  useEffect(() => {
    if (book) addToRecentlyViewed(book);
    window.scrollTo(0, 0);
  }, [id]);

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
            Carte negăsită
          </h2>
          <p className="text-gray-500 mb-6">Cartea pe care o cauți nu există sau a fost eliminată.</p>
          <button onClick={() => navigate('/collections')} className="btn-primary">
            Înapoi la Colecții
          </button>
        </div>
      </div>
    );
  }

  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  const ratingDist = [5, 4, 3, 2, 1].map(r => ({
    star: r,
    count: reviews.filter(rev => rev.rating === r).length,
    percent: Math.round((reviews.filter(rev => rev.rating === r).length / reviews.length) * 100),
  }));

  const handleAddReview = (form) => {
    setReviews(prev => [{
      id: Date.now(),
      author: form.name,
      rating: form.rating,
      date: new Date().toLocaleDateString('ro-RO', { day: 'numeric', month: 'short', year: 'numeric' }),
      title: form.title,
      content: form.content,
      helpful: 0,
      verified: false,
    }, ...prev]);
    setShowReviewModal(false);
    addToast('Recenzia ta a fost publicată!', 'success');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    addToast('Link copiat în clipboard!', 'info');
  };

  const discountPercent = book.originalPrice
    ? Math.round((1 - book.price / book.originalPrice) * 100)
    : null;

  return (
    <div className="page-transition min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb items={[
            { label: 'Colecții', to: '/collections' },
            { label: book.category, to: `/collections?category=${book.category}` },
            { label: book.title },
          ]} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Product Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left: Cover */}
            <div className="p-8 lg:p-12 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 border-b lg:border-b-0 lg:border-r border-gray-100">
              <div className={`relative w-56 h-80 rounded-xl bg-gradient-to-br ${book.gradient} shadow-2xl flex items-center justify-center group cursor-zoom-in`}>
                <BookOpen className="w-24 h-24 text-white/40" />
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-6 left-6 right-6 h-0.5 bg-white rounded" />
                  <div className="absolute top-10 left-6 right-10 h-0.5 bg-white rounded" />
                  <div className="absolute top-14 left-6 right-8 h-0.5 bg-white rounded" />
                </div>
                {discountPercent && (
                  <div className="absolute -top-3 -right-3 w-14 h-14 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">-{discountPercent}%</span>
                  </div>
                )}
              </div>

              {/* Thumbnails placeholder */}
              <div className="flex items-center gap-2 mt-6">
                {[1, 2, 3].map(i => (
                  <div
                    key={i}
                    className={`w-12 h-16 rounded-lg bg-gradient-to-br ${book.gradient} opacity-${i === 1 ? '100' : i === 2 ? '70' : '40'} cursor-pointer border-2 ${i === 1 ? 'border-purple-500' : 'border-transparent'} shadow-sm`}
                  />
                ))}
              </div>

              {/* Social share */}
              <div className="flex items-center gap-2 mt-5">
                <span className="text-xs text-gray-500">Distribuie:</span>
                <a href="#" className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity">
                  <FacebookIcon className="w-3.5 h-3.5" />
                </a>
                <a href="#" className="w-7 h-7 bg-sky-500 rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity">
                  <TwitterIcon className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={handleCopyLink}
                  className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-300 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Right: Details */}
            <div className="p-8 lg:p-10">
              {/* Category & badges */}
              <div className="flex items-center flex-wrap gap-2 mb-4">
                <Link
                  to={`/collections?category=${book.category}`}
                  className="badge bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors text-xs"
                >
                  {book.category}
                </Link>
                {book.bestseller && (
                  <span className="badge bg-yellow-100 text-yellow-700 text-xs">Bestseller</span>
                )}
                {discountPercent && (
                  <span className="badge bg-red-100 text-red-600 text-xs">-{discountPercent}% Reducere</span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                {book.title}
              </h1>
              <p className="text-gray-600 font-medium text-lg mb-4">{book.author}</p>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <StarRating rating={book.rating} size="md" />
                <span className="text-sm font-semibold text-gray-700">{book.rating}</span>
                <span className="text-sm text-gray-500">({book.reviewCount} recenzii)</span>
                <a href="#reviews" className="text-sm text-purple-700 hover:underline">
                  Citește recenziile
                </a>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6 p-4 bg-gray-50 rounded-xl">
                <span className="text-4xl font-bold text-purple-800">{book.price.toFixed(2)}</span>
                <span className="text-lg text-gray-500 font-medium">lei</span>
                {book.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">{book.originalPrice.toFixed(2)} lei</span>
                )}
              </div>

              {/* Stock */}
              <div className="flex items-center gap-2 mb-6">
                {book.stock > 5 ? (
                  <><Check className="w-4 h-4 text-green-500" /><span className="text-sm text-green-700 font-medium">În stoc — livrare în 3-5 zile</span></>
                ) : book.stock > 0 ? (
                  <><AlertCircle className="w-4 h-4 text-yellow-500" /><span className="text-sm text-yellow-700 font-medium">Ultimele {book.stock} exemplare!</span></>
                ) : (
                  <><AlertCircle className="w-4 h-4 text-red-500" /><span className="text-sm text-red-600 font-medium">Momentan indisponibil</span></>
                )}
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-medium text-gray-700">Cantitate:</span>
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-semibold text-gray-900 text-sm">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => Math.min(book.stock, q + 1))}
                    disabled={quantity >= book.stock}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-40"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-500">Total: <strong className="text-purple-800">{(book.price * quantity).toFixed(2)} lei</strong></span>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <button
                  onClick={() => addToCart(book, quantity)}
                  disabled={book.stock === 0}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-800 to-blue-700 text-white py-3.5 px-6 rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Adaugă în Coș
                </button>
                <button
                  onClick={() => toggleWishlist(book)}
                  className={`flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-semibold border-2 transition-all ${
                    isWishlisted
                      ? 'bg-red-50 border-red-300 text-red-600'
                      : 'border-gray-200 text-gray-700 hover:border-red-300 hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                  {isWishlisted ? 'Salvat' : 'Salvează'}
                </button>
              </div>

              {/* Quick checkout */}
              <Link
                to="/checkout"
                onClick={() => addToCart(book, quantity)}
                className="block w-full text-center py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors mb-6"
              >
                Cumpără Acum
              </Link>

              {/* Specs */}
              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Specificații</h3>
                <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                  {[
                    { label: 'ISBN', value: book.isbn, icon: Hash },
                    { label: 'An apariție', value: book.publicationDate, icon: Calendar },
                    { label: 'Pagini', value: book.pages, icon: BookOpen },
                    { label: 'Limbă', value: book.language, icon: null },
                    { label: 'Copertă', value: book.binding, icon: Package },
                    { label: 'Categorie', value: book.category, icon: null },
                  ].map(spec => (
                    <div key={spec.label} className="flex items-center gap-2">
                      <span className="text-xs text-gray-400 font-medium w-24">{spec.label}:</span>
                      <span className="text-xs text-gray-700 font-semibold">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mt-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Despre această carte
          </h2>
          <div className={`text-gray-600 leading-relaxed text-sm sm:text-base ${!expandDesc ? 'line-clamp-4' : ''}`}>
            <p className="mb-3">{book.description}</p>
            {book.longDescription && <p>{book.longDescription}</p>}
          </div>
          <button
            onClick={() => setExpandDesc(e => !e)}
            className="mt-3 text-purple-700 text-sm font-medium hover:underline"
          >
            {expandDesc ? 'Citește mai puțin ↑' : 'Citește mai mult ↓'}
          </button>
        </div>

        {/* Author Info */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl border border-purple-100 p-8 mt-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Despre Autor
          </h2>
          <div className="flex items-start gap-4">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${book.gradient} flex items-center justify-center flex-shrink-0`}>
              <User className="w-8 h-8 text-white/70" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">{book.author}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                {book.author} este unul dintre reprezentanții de marcă ai literaturii române. Operele sale sunt studiate în școlile din România și republicate constant de edituri de prestigiu. Prin creația sa, a contribuit esențial la patrimoniul cultural românesc.
              </p>
              <Link
                to={`/collections?search=${encodeURIComponent(book.author)}`}
                className="inline-flex items-center gap-1.5 text-purple-700 text-sm font-medium hover:underline"
              >
                Vezi toate cărțile autorului <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div id="reviews" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mt-6">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
              Recenzii ({reviews.length})
            </h2>
            <button onClick={() => setShowReviewModal(true)} className="btn-primary text-sm px-4 py-2">
              Scrie o Recenzie
            </button>
          </div>

          {/* Rating Summary */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 p-6 bg-gray-50 rounded-xl mb-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-900">{avgRating.toFixed(1)}</div>
              <StarRating rating={avgRating} size="md" />
              <div className="text-sm text-gray-500 mt-1">{reviews.length} recenzii</div>
            </div>
            <div className="flex-1 space-y-2 w-full sm:w-auto">
              {ratingDist.map(({ star, count, percent }) => (
                <div key={star} className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 w-4">{star}</span>
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 flex-shrink-0" />
                  <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 w-8">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Individual Reviews */}
          <div className="space-y-5">
            {reviews.map(review => (
              <div key={review.id} className="border-b border-gray-100 last:border-0 pb-5 last:pb-0">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      {review.author.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-900">{review.author}</span>
                        {review.verified && (
                          <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-medium">
                            Cumpărare verificată
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <StarRating rating={review.rating} />
                        <span className="text-xs text-gray-400">{review.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <h4 className="text-sm font-semibold text-gray-900 mb-1">{review.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">{review.content}</p>
                <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-purple-700 transition-colors">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  Util ({review.helpful})
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Cărți Similare
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map(b => (
                <BookCard key={b.id} book={b} />
              ))}
            </div>
          </div>
        )}
      </div>

      {showReviewModal && (
        <ReviewModal onClose={() => setShowReviewModal(false)} onSubmit={handleAddReview} />
      )}
    </div>
  );
}
