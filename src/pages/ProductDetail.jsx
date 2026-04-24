import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Minus, Plus, Check, AlertCircle, ThumbsUp, ChevronRight } from 'lucide-react';
import { books } from '../data/books';
import { useApp } from '../context/AppContext';
import Breadcrumb from '../components/Breadcrumb';
import BookCard, { StarRow } from '../components/BookCard';

/* ── Stars (interactive or static) ──────────────────────────────── */
function Stars({ value, size = 'sm', interactive = false, onChange }) {
  const [hover, setHover] = useState(0);
  const sz = size === 'lg' ? 'text-2xl' : size === 'md' ? 'text-lg' : 'text-base';
  return (
    <span className={`tracking-tighter ${sz}`}>
      {[1, 2, 3, 4, 5].map(s => (
        <span
          key={s}
          className={`transition-colors ${
            s <= (interactive ? hover || value : Math.floor(value))
              ? 'text-gold' : 'text-paper-dark'
          } ${interactive ? 'cursor-pointer' : ''}`}
          onMouseEnter={() => interactive && setHover(s)}
          onMouseLeave={() => interactive && setHover(0)}
          onClick={() => interactive && onChange?.(s)}
        >★</span>
      ))}
    </span>
  );
}

/* ── Review modal ────────────────────────────────────────────────── */
function ReviewModal({ onClose, onSubmit }) {
  const [form, setForm]     = useState({ rating: 0, title: '', content: '', name: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.rating)              e.rating  = 'Please select a rating.';
    if (!form.title.trim())        e.title   = 'Title is required.';
    if (form.content.length < 20)  e.content = 'Review must be at least 20 characters.';
    if (!form.name.trim())         e.name    = 'Name is required.';
    return e;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const err = validate();
    if (Object.keys(err).length) { setErrors(err); return; }
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-charcoal/50" onClick={onClose} />
      <div className="relative bg-cream border border-paper shadow-classic-lg w-full max-w-lg
                      max-h-[90vh] overflow-y-auto">
        <div className="bg-cream-dark border-b border-paper px-6 py-4 flex items-center justify-between">
          <h3 className="font-serif text-h3 text-charcoal">Write a Review</h3>
          <button onClick={onClose} className="text-charcoal-light hover:text-charcoal font-sans text-xs uppercase tracking-widest">
            Close
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="field-label">Your Rating *</label>
            <Stars value={form.rating} size="lg" interactive onChange={r => setForm(f => ({ ...f, rating: r }))} />
            {errors.rating && <p className="text-burgundy-700 text-xs font-sans mt-1">{errors.rating}</p>}
          </div>
          {[
            { name: 'title',   label: 'Review Title *',  type: 'input',    ph: 'Summarise your thoughts' },
            { name: 'name',    label: 'Your Name *',     type: 'input',    ph: 'First name or initials' },
            { name: 'content', label: 'Your Review *',   type: 'textarea', ph: 'Share your reading experience…' },
          ].map(field => (
            <div key={field.name}>
              <label className="field-label">{field.label}</label>
              {field.type === 'input' ? (
                <input
                  type="text" value={form[field.name]}
                  onChange={e => setForm(f => ({ ...f, [field.name]: e.target.value }))}
                  className={`field ${errors[field.name] ? 'border-burgundy-600' : ''}`}
                  placeholder={field.ph}
                />
              ) : (
                <textarea rows={4} value={form[field.name]}
                  onChange={e => setForm(f => ({ ...f, [field.name]: e.target.value }))}
                  className={`field resize-none ${errors[field.name] ? 'border-burgundy-600' : ''}`}
                  placeholder={field.ph}
                />
              )}
              {errors[field.name] && (
                <p className="text-burgundy-700 text-xs font-sans mt-1">{errors[field.name]}</p>
              )}
            </div>
          ))}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">Cancel</button>
            <button type="submit" className="btn-primary flex-1">Submit Review</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const seedReviews = [
  { id: 1, author: 'Maria I.',     rating: 5, date: '15 Mar 2024', title: 'A masterpiece of Romanian literature',
    content: 'I read this with great concentration and immense pleasure. Every page reveals new layers of meaning and beauty. Highly recommended.',
    helpful: 12, verified: true },
  { id: 2, author: 'Alexandru P.', rating: 4, date: '3 Feb 2024',  title: 'Essential reading',
    content: 'A beautifully produced volume with a thoughtful critical apparatus. The edition is well-prepared and the text impeccably rendered.',
    helpful: 8,  verified: true },
  { id: 3, author: 'Elena G.',     rating: 5, date: '20 Jan 2024', title: 'Exquisite edition',
    content: 'Prince\'s Multimedia consistently produce editions of the highest quality. The paper is fine, the binding sturdy, the presentation elegant.',
    helpful: 5,  verified: false },
];

export default function ProductDetail() {
  const { id }        = useParams();
  const navigate      = useNavigate();
  const { addToCart, toggleWishlist, wishlist, addToRecentlyViewed, addToast } = useApp();
  const [quantity,    setQuantity]    = useState(1);
  const [expanded,    setExpanded]    = useState(false);
  const [showModal,   setShowModal]   = useState(false);
  const [reviews,     setReviews]     = useState(seedReviews);
  const [copied,      setCopied]      = useState(false);

  const book      = books.find(b => b.id === parseInt(id));
  const related   = books.filter(b => b.id !== book?.id && b.category === book?.category).slice(0, 4);
  const inWish    = wishlist.some(b => b.id === book?.id);

  useEffect(() => {
    if (book) { addToRecentlyViewed(book); }
    window.scrollTo(0, 0);
  }, [id]);

  if (!book) return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="text-center">
        <p className="font-serif text-3xl text-charcoal-light italic mb-4">Title not found</p>
        <button onClick={() => navigate('/collections')} className="btn-primary">
          Return to Collections
        </button>
      </div>
    </div>
  );

  const avg       = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  const dist      = [5, 4, 3, 2, 1].map(r => ({
    star: r,
    count: reviews.filter(x => x.rating === r).length,
    pct: Math.round(reviews.filter(x => x.rating === r).length / reviews.length * 100),
  }));
  const discount  = book.originalPrice ? Math.round((1 - book.price / book.originalPrice) * 100) : null;

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    addToast('Link copied to clipboard.', 'info');
  };

  const handleReview = form => {
    setReviews(prev => [{
      id: Date.now(), author: form.name,
      rating: form.rating,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      title: form.title, content: form.content, helpful: 0, verified: false,
    }, ...prev]);
    setShowModal(false);
    addToast('Your review has been published.', 'success');
  };

  return (
    <div className="fade-in min-h-screen bg-cream">

      {/* Breadcrumb strip */}
      <div className="bg-cream-dark border-b border-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb items={[
            { label: 'Collections', to: '/collections' },
            { label: book.category, to: `/collections?category=${book.category}` },
            { label: book.title },
          ]} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Main product block ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 bg-cream border border-paper p-6 sm:p-10">

          {/* LEFT: Cover */}
          <div className="lg:col-span-2 flex flex-col items-center gap-5">
            {/* Main cover */}
            <div className="w-52 h-72 bg-forest-800 relative flex flex-col items-center
                            justify-center text-cream/20 shadow-classic-lg">
              <div className="absolute inset-0 px-7 py-6 flex flex-col justify-between">
                <div className="h-px bg-cream/15" />
                <div className="text-center">
                  <p className="font-serif text-sm text-cream/60 italic leading-snug px-1">
                    {book.title}
                  </p>
                  <div className="h-px bg-cream/15 mt-3 mx-4" />
                  <p className="font-sans text-xs text-cream/30 mt-2 uppercase tracking-widest">
                    {book.author.split(' ').pop()}
                  </p>
                </div>
                <div className="h-px bg-cream/15" />
              </div>
              <span className="font-serif text-7xl text-cream/10 absolute">❧</span>
              {discount && (
                <span className="absolute top-2 left-2 bg-burgundy-700 text-cream
                                 text-xs font-sans font-bold px-2 py-0.5">
                  -{discount}%
                </span>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((_, i) => (
                <div key={i}
                     className={`w-12 h-16 bg-forest-800 cursor-pointer border-2 transition-colors
                       ${i === 0 ? 'border-gold' : 'border-transparent hover:border-forest-600'}`} />
              ))}
            </div>

            {/* Share */}
            <div className="text-center">
              <p className="text-xs font-sans text-charcoal-lighter uppercase tracking-widest mb-2">
                Share this title
              </p>
              <div className="flex items-center justify-center gap-4 text-xs font-sans">
                <a href="#" className="text-burgundy-700 hover:underline uppercase tracking-wider">Facebook</a>
                <span className="text-paper-dark">|</span>
                <a href="#" className="text-burgundy-700 hover:underline uppercase tracking-wider">Twitter</a>
                <span className="text-paper-dark">|</span>
                <button onClick={handleCopy} className="text-burgundy-700 hover:underline uppercase tracking-wider">
                  {copied ? 'Copied!' : 'Copy link'}
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Info */}
          <div className="lg:col-span-3">

            {/* Category + badges */}
            <div className="flex items-center flex-wrap gap-2 mb-4">
              <Link to={`/collections?category=${book.category}`}
                    className="badge-classic border-forest-800 text-forest-800 bg-transparent text-xs
                               hover:bg-forest-800 hover:text-cream transition-colors">
                {book.category}
              </Link>
              {book.bestseller && (
                <span className="badge-classic border-gold text-gold bg-transparent text-xs">
                  Bestseller
                </span>
              )}
            </div>

            <h1 className="font-serif text-h1 text-charcoal leading-tight mb-2">{book.title}</h1>
            <p className="font-sans text-base text-charcoal-light uppercase tracking-widest mb-4">{book.author}</p>

            {/* Rating row */}
            <div className="flex items-center gap-3 mb-6">
              <Stars value={book.rating} size="md" />
              <span className="font-sans text-sm text-charcoal-light">
                {book.rating} · {book.reviewCount} reviews
              </span>
              <a href="#reviews" className="text-xs font-sans text-burgundy-700 hover:underline uppercase tracking-wider">
                Read reviews
              </a>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 py-4 border-t border-b border-paper mb-6">
              <span className="font-serif text-4xl text-burgundy-700">{book.price.toFixed(2)}</span>
              <span className="font-sans text-base text-charcoal-light">lei</span>
              {book.originalPrice && (
                <span className="font-sans text-lg text-charcoal-lighter line-through">
                  {book.originalPrice.toFixed(2)} lei
                </span>
              )}
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2 mb-5">
              {book.stock > 5 ? (
                <><Check className="w-4 h-4 text-forest-700" />
                  <span className="text-sm font-sans text-forest-700">In Stock — ships in 3–5 business days</span></>
              ) : book.stock > 0 ? (
                <><AlertCircle className="w-4 h-4 text-gold" />
                  <span className="text-sm font-sans text-gold">Only {book.stock} copies remaining</span></>
              ) : (
                <><AlertCircle className="w-4 h-4 text-charcoal-lighter" />
                  <span className="text-sm font-sans text-charcoal-lighter">Currently out of stock</span></>
              )}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-5">
              <span className="text-xs font-sans font-bold text-charcoal uppercase tracking-widest">Quantity</span>
              <div className="flex items-center border border-paper">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}
                        className="w-9 h-9 flex items-center justify-center text-charcoal-light
                                   hover:text-charcoal hover:bg-cream-dark transition-colors border-r border-paper">
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-12 text-center text-sm font-sans font-bold text-charcoal">{quantity}</span>
                <button onClick={() => setQuantity(q => Math.min(book.stock || 1, q + 1))}
                        className="w-9 h-9 flex items-center justify-center text-charcoal-light
                                   hover:text-charcoal hover:bg-cream-dark transition-colors border-l border-paper">
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className="text-sm font-sans text-charcoal-light">
                Total: <strong className="text-charcoal">{(book.price * quantity).toFixed(2)} lei</strong>
              </span>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <button
                onClick={() => addToCart(book, quantity)}
                disabled={book.stock === 0}
                className="flex-1 btn-primary py-3.5 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
              <button
                onClick={() => toggleWishlist(book)}
                className={`flex items-center justify-center gap-2 py-3.5 px-6 border-2 font-sans
                            font-bold text-sm uppercase tracking-widest transition-colors duration-200
                            ${inWish
                              ? 'border-burgundy-700 bg-burgundy-50 text-burgundy-700'
                              : 'border-paper text-charcoal hover:border-burgundy-700 hover:text-burgundy-700'
                            }`}
              >
                <Heart className={`w-4 h-4 ${inWish ? 'fill-burgundy-700' : ''}`} />
                {inWish ? 'In Wishlist' : 'Add to Wishlist'}
              </button>
            </div>

            <Link to="/checkout" onClick={() => addToCart(book, quantity)}
                  className="block w-full text-center py-3 bg-charcoal text-cream
                             font-sans font-bold text-sm uppercase tracking-widest
                             border border-charcoal hover:bg-forest-950 transition-colors mb-6">
              Buy Now
            </Link>

            {/* Specifications */}
            <div className="border-t border-paper pt-5">
              <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-charcoal mb-3">
                Bibliographic Details
              </h3>
              <table className="w-full text-sm">
                <tbody>
                  {[
                    { label: 'ISBN',            value: book.isbn },
                    { label: 'Published',       value: book.publicationDate },
                    { label: 'Pages',           value: book.pages },
                    { label: 'Language',        value: book.language },
                    { label: 'Binding',         value: book.binding },
                    { label: 'Category',        value: book.category },
                  ].map(row => (
                    <tr key={row.label} className="border-b border-paper last:border-0">
                      <td className="py-2 pr-4 font-sans text-xs text-charcoal-light uppercase tracking-wider w-1/3">
                        {row.label}
                      </td>
                      <td className="py-2 font-sans text-sm text-charcoal font-medium">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-cream border border-paper border-t-0 px-6 sm:px-10 py-8">
          <h2 className="font-serif text-h3 text-charcoal mb-4">About This Book</h2>
          <div className={`font-sans text-sm text-charcoal leading-reading ${!expanded ? 'line-clamp-4' : ''}`}>
            <p className="mb-3">{book.description}</p>
            {book.longDescription && <p>{book.longDescription}</p>}
          </div>
          <button onClick={() => setExpanded(e => !e)}
                  className="mt-3 btn-ghost text-sm">
            {expanded ? 'Read less ↑' : 'Read more ↓'}
          </button>
        </div>

        {/* Author box */}
        <div className="bg-cream-dark border border-paper border-t-0 px-6 sm:px-10 py-8">
          <h2 className="font-serif text-h3 text-charcoal mb-4">About the Author</h2>
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 bg-forest-800 flex items-center justify-center
                            text-cream/30 font-serif text-2xl flex-shrink-0">
              {book.author.charAt(0)}
            </div>
            <div>
              <h3 className="font-serif text-h4 text-charcoal mb-1">{book.author}</h3>
              <p className="font-sans text-sm text-charcoal-light leading-reading mb-3">
                {book.author} is one of the distinguished voices of Romanian literature.
                Their work has been studied and celebrated across Romania and beyond,
                contributing significantly to the cultural heritage of the Romanian people.
              </p>
              <Link to={`/collections?search=${encodeURIComponent(book.author)}`}
                    className="btn-ghost text-sm">
                View all titles by this author →
              </Link>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div id="reviews" className="bg-cream border border-paper border-t-0 px-6 sm:px-10 py-8">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-7">
            <h2 className="font-serif text-h3 text-charcoal">
              Reader Reviews <span className="text-charcoal-lighter font-sans text-base">({reviews.length})</span>
            </h2>
            <button onClick={() => setShowModal(true)} className="btn-ghost text-sm">
              Write a review →
            </button>
          </div>

          {/* Rating summary */}
          <div className="flex flex-col sm:flex-row gap-8 p-6 bg-cream-dark border border-paper mb-7">
            <div className="text-center flex-shrink-0">
              <div className="font-serif text-6xl text-charcoal">{avg.toFixed(1)}</div>
              <Stars value={avg} size="md" />
              <p className="text-xs font-sans text-charcoal-light mt-1">
                {reviews.length} reviews
              </p>
            </div>
            <div className="flex-1 space-y-2">
              {dist.map(({ star, count, pct }) => (
                <div key={star} className="flex items-center gap-3">
                  <span className="text-xs font-sans text-charcoal-light w-4">{star}</span>
                  <span className="text-gold text-xs">★</span>
                  <div className="flex-1 bg-paper h-2">
                    <div className="h-full bg-gold transition-all duration-500" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-xs font-sans text-charcoal-light w-5">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Review list */}
          <div className="space-y-6">
            {reviews.map(r => (
              <div key={r.id} className="border-b border-paper last:border-0 pb-6 last:pb-0">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-forest-800 flex items-center justify-center
                                    text-cream text-sm font-serif flex-shrink-0">
                      {r.author.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-sans font-bold text-charcoal uppercase tracking-wider">
                          {r.author}
                        </span>
                        {r.verified && (
                          <span className="text-xs font-sans text-forest-700 border border-forest-700 px-1.5 py-0.5">
                            Verified
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Stars value={r.rating} />
                        <span className="text-xs font-sans text-charcoal-light">{r.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <h4 className="font-serif text-base text-charcoal mb-1">{r.title}</h4>
                <p className="text-sm font-sans text-charcoal-light leading-reading mb-3">{r.content}</p>
                <button className="flex items-center gap-1.5 text-xs font-sans text-charcoal-lighter
                                   hover:text-forest-800 transition-colors uppercase tracking-wider">
                  <ThumbsUp className="w-3 h-3" /> Helpful ({r.helpful})
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="font-serif text-h3 text-charcoal mb-6 pb-3 border-b border-paper">
              Related Titles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map(b => <BookCard key={b.id} book={b} />)}
            </div>
          </div>
        )}
      </div>

      {showModal && <ReviewModal onClose={() => setShowModal(false)} onSubmit={handleReview} />}
    </div>
  );
}
