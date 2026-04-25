import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Minus, Plus, Check, AlertCircle, ThumbsUp } from 'lucide-react';
import { books } from '../data/books';
import { useApp } from '../context/AppContext';
import Breadcrumb from '../components/Breadcrumb';
import BookCard, { StarRow } from '../components/BookCard';

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
              ? 'text-burgundy-400' : 'text-gray-200'
          } ${interactive ? 'cursor-pointer' : ''}`}
          onMouseEnter={() => interactive && setHover(s)}
          onMouseLeave={() => interactive && setHover(0)}
          onClick={() => interactive && onChange?.(s)}
        >★</span>
      ))}
    </span>
  );
}

function ReviewModal({ onClose, onSubmit }) {
  const [form, setForm]     = useState({ rating: 0, title: '', content: '', name: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.rating)             e.rating  = 'Selectează o evaluare.';
    if (!form.title.trim())       e.title   = 'Titlul este obligatoriu.';
    if (form.content.length < 20) e.content = 'Recenzia trebuie să aibă cel puțin 20 de caractere.';
    if (!form.name.trim())        e.name    = 'Numele este obligatoriu.';
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
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white border border-gray-200 shadow-classic-lg w-full max-w-lg
                      max-h-[90vh] overflow-y-auto">
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h3 className="font-display text-xl text-charcoal">Scrie o Recenzie</h3>
          <button onClick={onClose} className="text-charcoal-light hover:text-charcoal font-ui text-xs uppercase tracking-wide">
            Închide
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="field-label">Evaluarea ta *</label>
            <Stars value={form.rating} size="lg" interactive onChange={r => setForm(f => ({ ...f, rating: r }))} />
            {errors.rating && <p className="text-burgundy text-xs font-sans mt-1">{errors.rating}</p>}
          </div>
          {[
            { name: 'title',   label: 'Titlul Recenziei *',  type: 'input',    ph: 'Rezumă-ți impresiile' },
            { name: 'name',    label: 'Numele Tău *',        type: 'input',    ph: 'Prenume sau inițiale' },
            { name: 'content', label: 'Recenzia Ta *',       type: 'textarea', ph: 'Descrie experiența ta de lectură…' },
          ].map(field => (
            <div key={field.name}>
              <label className="field-label">{field.label}</label>
              {field.type === 'input' ? (
                <input
                  type="text" value={form[field.name]}
                  onChange={e => setForm(f => ({ ...f, [field.name]: e.target.value }))}
                  className={`field ${errors[field.name] ? 'border-burgundy' : ''}`}
                  placeholder={field.ph}
                />
              ) : (
                <textarea rows={4} value={form[field.name]}
                  onChange={e => setForm(f => ({ ...f, [field.name]: e.target.value }))}
                  className={`field resize-none ${errors[field.name] ? 'border-burgundy' : ''}`}
                  placeholder={field.ph}
                />
              )}
              {errors[field.name] && (
                <p className="text-burgundy text-xs font-sans mt-1">{errors[field.name]}</p>
              )}
            </div>
          ))}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">Anulează</button>
            <button type="submit" className="btn-primary flex-1">Trimite Recenzia</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const seedReviews = [
  { id: 1, author: 'Maria I.',     rating: 5, date: '15 Mar 2024', title: 'O capodoperă a literaturii române',
    content: 'Am citit această carte cu mare atenție și imens plăcere. Fiecare pagină dezvăluie noi straturi de semnificație și frumusețe. Recomand cu toată inima.',
    helpful: 12, verified: true },
  { id: 2, author: 'Alexandru P.', rating: 4, date: '3 Feb 2024',  title: 'Lectură esențială',
    content: 'Un volum frumos realizat, cu un aparat critic atent. Ediția este bine pregătită, iar textul impecabil redat.',
    helpful: 8,  verified: true },
  { id: 3, author: 'Elena G.',     rating: 5, date: '20 Ian 2024', title: 'Ediție desăvârșită',
    content: 'Editura Princeps Multimedia realizează constant ediții de cea mai înaltă calitate. Hârtia este fină, legătura solidă, prezentarea elegantă.',
    helpful: 5,  verified: false },
];

export default function ProductDetail() {
  const { id }      = useParams();
  const navigate    = useNavigate();
  const { addToCart, toggleWishlist, wishlist, addToRecentlyViewed, addToast } = useApp();
  const [quantity,  setQuantity]  = useState(1);
  const [expanded,  setExpanded]  = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [reviews,   setReviews]   = useState(seedReviews);
  const [copied,    setCopied]    = useState(false);

  const book    = books.find(b => b.id === parseInt(id));
  const related = books.filter(b => b.id !== book?.id && b.category === book?.category).slice(0, 4);
  const inWish  = wishlist.some(b => b.id === book?.id);

  useEffect(() => {
    if (book) { addToRecentlyViewed(book); }
    window.scrollTo(0, 0);
  }, [id]);

  if (!book) return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center">
        <p className="font-display text-3xl text-charcoal-light italic mb-4">Titlu negăsit</p>
        <button onClick={() => navigate('/collections')} className="btn-primary">
          Înapoi la Colecții
        </button>
      </div>
    </div>
  );

  const avg      = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  const dist     = [5, 4, 3, 2, 1].map(r => ({
    star: r,
    count: reviews.filter(x => x.rating === r).length,
    pct: Math.round(reviews.filter(x => x.rating === r).length / reviews.length * 100),
  }));
  const discount = book.originalPrice ? Math.round((1 - book.price / book.originalPrice) * 100) : null;

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    addToast('Link copiat în clipboard.', 'info');
  };

  const handleReview = form => {
    setReviews(prev => [{
      id: Date.now(), author: form.name,
      rating: form.rating,
      date: new Date().toLocaleDateString('ro-RO', { day: 'numeric', month: 'short', year: 'numeric' }),
      title: form.title, content: form.content, helpful: 0, verified: false,
    }, ...prev]);
    setShowModal(false);
    addToast('Recenzia ta a fost publicată.', 'success');
  };

  return (
    <div className="fade-in min-h-screen bg-white">

      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb items={[
            { label: 'Colecții', to: '/collections' },
            { label: book.category, to: `/collections?category=${book.category}` },
            { label: book.title },
          ]} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Bloc principal produs */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 bg-white border border-gray-200 p-6 sm:p-10">

          {/* STÂNGA: Copertă */}
          <div className="lg:col-span-2 flex flex-col items-center gap-5">
            <div className="w-52 h-72 relative flex flex-col items-center
                            justify-center text-white/20 shadow-classic-lg"
                 style={{ backgroundColor: book.coverColor }}>
              <div className="absolute inset-0 px-7 py-6 flex flex-col justify-between">
                <div className="h-px bg-white/20" />
                <div className="text-center">
                  <p className="font-serif text-sm text-white/70 italic leading-snug px-1">
                    {book.title}
                  </p>
                  <div className="h-px bg-white/20 mt-3 mx-4" />
                  <p className="font-ui text-xs text-white/40 mt-2 uppercase tracking-widest">
                    {book.author.split(' ').pop()}
                  </p>
                </div>
                <div className="h-px bg-white/20" />
              </div>
              <span className="font-serif text-7xl text-white/10 absolute">❧</span>
              {discount && (
                <span className="absolute top-2 left-2 bg-burgundy text-white
                                 text-xs font-ui font-semibold px-2 py-0.5">
                  -{discount}%
                </span>
              )}
            </div>

            {/* Miniaturi */}
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((_, i) => (
                <div key={i}
                     className="w-12 h-16 cursor-pointer border-2 transition-colors"
                     style={{
                       backgroundColor: book.coverColor,
                       borderColor: i === 0 ? '#8B3A3A' : 'transparent',
                       opacity: i === 0 ? 1 : 0.6,
                     }} />
              ))}
            </div>

            {/* Distribuie */}
            <div className="text-center">
              <p className="text-xs font-ui text-charcoal-lighter uppercase tracking-wide mb-2">
                Distribuie acest titlu
              </p>
              <div className="flex items-center justify-center gap-4 text-xs font-ui">
                <a href="#" className="text-burgundy hover:underline uppercase tracking-wide">Facebook</a>
                <span className="text-gray-300">|</span>
                <a href="#" className="text-burgundy hover:underline uppercase tracking-wide">Twitter</a>
                <span className="text-gray-300">|</span>
                <button onClick={handleCopy} className="text-burgundy hover:underline uppercase tracking-wide">
                  {copied ? 'Copiat!' : 'Copiază link'}
                </button>
              </div>
            </div>
          </div>

          {/* DREAPTA: Informații */}
          <div className="lg:col-span-3">

            <div className="flex items-center flex-wrap gap-2 mb-4">
              <Link to={`/collections?category=${book.category}`}
                    className="badge border-burgundy text-burgundy bg-transparent text-xs
                               hover:bg-burgundy hover:text-white transition-colors">
                {book.category}
              </Link>
              {book.bestseller && (
                <span className="badge border-gray-300 text-charcoal-light bg-transparent text-xs">
                  Bestseller
                </span>
              )}
            </div>

            <h1 className="font-display text-h1 text-charcoal leading-tight mb-2">{book.title}</h1>
            <p className="font-ui text-base text-charcoal-lighter uppercase tracking-wide mb-4">{book.author}</p>

            <div className="flex items-center gap-3 mb-6">
              <Stars value={book.rating} size="md" />
              <span className="font-sans text-sm text-charcoal-light">
                {book.rating} · {book.reviewCount} recenzii
              </span>
              <a href="#reviews" className="text-xs font-ui text-burgundy hover:underline uppercase tracking-wide">
                Citește recenziile
              </a>
            </div>

            <div className="flex items-baseline gap-3 py-4 border-t border-b border-gray-100 mb-6">
              <span className="font-display text-4xl text-burgundy">{book.price.toFixed(2)}</span>
              <span className="font-sans text-base text-charcoal-light">lei</span>
              {book.originalPrice && (
                <span className="font-sans text-lg text-charcoal-lighter line-through">
                  {book.originalPrice.toFixed(2)} lei
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 mb-5">
              {book.stock > 5 ? (
                <><Check className="w-4 h-4 text-forest-800" />
                  <span className="text-sm font-sans text-forest-800">În Stoc — expediat în 3–5 zile lucrătoare</span></>
              ) : book.stock > 0 ? (
                <><AlertCircle className="w-4 h-4 text-charcoal-light" />
                  <span className="text-sm font-sans text-charcoal-light">Doar {book.stock} exemplare rămase</span></>
              ) : (
                <><AlertCircle className="w-4 h-4 text-charcoal-lighter" />
                  <span className="text-sm font-sans text-charcoal-lighter">Momentan indisponibil</span></>
              )}
            </div>

            <div className="flex items-center gap-4 mb-5">
              <span className="text-xs font-ui font-semibold text-charcoal uppercase tracking-wide">Cantitate</span>
              <div className="flex items-center border border-gray-200">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}
                        className="w-9 h-9 flex items-center justify-center text-charcoal-light
                                   hover:text-charcoal hover:bg-gray-50 transition-colors border-r border-gray-200">
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-12 text-center text-sm font-ui font-semibold text-charcoal">{quantity}</span>
                <button onClick={() => setQuantity(q => Math.min(book.stock || 1, q + 1))}
                        className="w-9 h-9 flex items-center justify-center text-charcoal-light
                                   hover:text-charcoal hover:bg-gray-50 transition-colors border-l border-gray-200">
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className="text-sm font-sans text-charcoal-light">
                Total: <strong className="text-charcoal">{(book.price * quantity).toFixed(2)} lei</strong>
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <button
                onClick={() => addToCart(book, quantity)}
                disabled={book.stock === 0}
                className="flex-1 btn-primary py-3.5 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-4 h-4" />
                Adaugă în Coș
              </button>
              <button
                onClick={() => toggleWishlist(book)}
                className={`flex items-center justify-center gap-2 py-3.5 px-6 border-2 font-ui
                            font-semibold text-sm uppercase tracking-wide transition-colors duration-200
                            ${inWish
                              ? 'border-burgundy bg-burgundy-50 text-burgundy'
                              : 'border-gray-200 text-charcoal hover:border-burgundy hover:text-burgundy'
                            }`}
              >
                <Heart className={`w-4 h-4 ${inWish ? 'fill-burgundy' : ''}`} />
                {inWish ? 'În Lista de Dorințe' : 'Adaugă în Dorințe'}
              </button>
            </div>

            <Link to="/checkout" onClick={() => addToCart(book, quantity)}
                  className="block w-full text-center py-3 bg-charcoal text-white
                             font-ui font-semibold text-sm uppercase tracking-wide
                             border border-charcoal hover:bg-gray-800 transition-colors mb-6">
              Cumpără Acum
            </Link>

            <div className="border-t border-gray-100 pt-5">
              <h3 className="font-ui text-xs font-semibold uppercase tracking-wide text-charcoal mb-3">
                Date Bibliografice
              </h3>
              <table className="w-full text-sm">
                <tbody>
                  {[
                    { label: 'ISBN',               value: book.isbn },
                    { label: 'Data Publicării',    value: book.publicationDate },
                    { label: 'Pagini',             value: book.pages },
                    { label: 'Limbă',              value: book.language },
                    { label: 'Copertă',            value: book.binding },
                    { label: 'Categorie',          value: book.category },
                  ].map(row => (
                    <tr key={row.label} className="border-b border-gray-100 last:border-0">
                      <td className="py-2 pr-4 font-ui text-xs text-charcoal-lighter uppercase tracking-wide w-1/3">
                        {row.label}
                      </td>
                      <td className="py-2 font-sans text-sm text-charcoal">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Descriere */}
        <div className="bg-white border border-gray-200 border-t-0 px-6 sm:px-10 py-8">
          <h2 className="font-display text-xl text-charcoal mb-4">Despre Această Carte</h2>
          <div className={`font-sans text-sm text-charcoal leading-reading ${!expanded ? 'line-clamp-4' : ''}`}>
            <p className="mb-3">{book.description}</p>
            {book.longDescription && <p>{book.longDescription}</p>}
          </div>
          <button onClick={() => setExpanded(e => !e)} className="mt-3 btn-ghost text-sm">
            {expanded ? 'Citește mai puțin ↑' : 'Citește mai mult ↓'}
          </button>
        </div>

        {/* Autor */}
        <div className="bg-gray-50 border border-gray-200 border-t-0 px-6 sm:px-10 py-8">
          <h2 className="font-display text-xl text-charcoal mb-4">Despre Autor</h2>
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 bg-burgundy flex items-center justify-center
                            text-white font-display text-xl flex-shrink-0">
              {book.author.charAt(0)}
            </div>
            <div>
              <h3 className="font-serif text-h4 text-charcoal mb-1">{book.author}</h3>
              <p className="font-sans text-sm text-charcoal-light leading-reading mb-3">
                {book.author} este una dintre vocile distincte ale literaturii române.
                Opera sa a fost studiată și celebrată în România și în afara granițelor,
                contribuind semnificativ la patrimoniul cultural al poporului român.
              </p>
              <Link to={`/collections?search=${encodeURIComponent(book.author)}`}
                    className="btn-ghost text-sm">
                Vezi toate titlurile acestui autor →
              </Link>
            </div>
          </div>
        </div>

        {/* Recenzii */}
        <div id="reviews" className="bg-white border border-gray-200 border-t-0 px-6 sm:px-10 py-8">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-7">
            <h2 className="font-display text-xl text-charcoal">
              Recenzii Cititori <span className="text-charcoal-lighter font-sans text-base font-normal">({reviews.length})</span>
            </h2>
            <button onClick={() => setShowModal(true)} className="btn-ghost text-sm">
              Scrie o recenzie →
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 p-6 bg-gray-50 border border-gray-200 mb-7">
            <div className="text-center flex-shrink-0">
              <div className="font-display text-6xl text-charcoal">{avg.toFixed(1)}</div>
              <Stars value={avg} size="md" />
              <p className="text-xs font-sans text-charcoal-lighter mt-1">{reviews.length} recenzii</p>
            </div>
            <div className="flex-1 space-y-2">
              {dist.map(({ star, count, pct }) => (
                <div key={star} className="flex items-center gap-3">
                  <span className="text-xs font-sans text-charcoal-light w-4">{star}</span>
                  <span className="text-burgundy-400 text-xs">★</span>
                  <div className="flex-1 bg-gray-200 h-2">
                    <div className="h-full bg-burgundy transition-all duration-500" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-xs font-sans text-charcoal-lighter w-5">{count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {reviews.map(r => (
              <div key={r.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-burgundy flex items-center justify-center
                                    text-white text-sm font-ui font-semibold flex-shrink-0">
                      {r.author.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-ui font-semibold text-charcoal uppercase tracking-wide">
                          {r.author}
                        </span>
                        {r.verified && (
                          <span className="text-xs font-ui text-forest-800 border border-forest-800 px-1.5 py-0.5">
                            Verificat
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Stars value={r.rating} />
                        <span className="text-xs font-sans text-charcoal-lighter">{r.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <h4 className="font-serif text-base text-charcoal mb-1">{r.title}</h4>
                <p className="text-sm font-sans text-charcoal-light leading-reading mb-3">{r.content}</p>
                <button className="flex items-center gap-1.5 text-xs font-ui text-charcoal-lighter
                                   hover:text-burgundy transition-colors uppercase tracking-wide">
                  <ThumbsUp className="w-3 h-3" /> Util ({r.helpful})
                </button>
              </div>
            ))}
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="font-display text-xl text-charcoal mb-6 pb-3 border-b border-gray-200">
              Titluri Asemănătoare
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
