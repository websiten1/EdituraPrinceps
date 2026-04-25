import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X, Grid3X3, List, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { books, categories } from '../data/books';
import BookCard, { LandscapeCard } from '../components/BookCard';
import Breadcrumb from '../components/Breadcrumb';

const sortOptions = [
  { value: 'newest',     label: 'Cel mai Nou' },
  { value: 'popular',    label: 'Cel mai Popular' },
  { value: 'price-asc',  label: 'Preț: De la mic la mare' },
  { value: 'price-desc', label: 'Preț: De la mare la mic' },
  { value: 'rating',     label: 'Cea mai bună Evaluare' },
];

const allAuthors = [...new Set(books.map(b => b.author))].sort();

/* ── Sidebar filtre ──────────────────────────────────────────────── */
function FilterSidebar({ filters, onChange, onClear, onClose, isMobile }) {
  const activeCount = [
    filters.category,
    filters.maxPrice < 50,
    filters.minRating > 0,
    filters.authors.length > 0,
  ].filter(Boolean).length;

  return (
    <div className="bg-white border border-gray-200">

      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gray-50">
        <h3 className="font-ui text-xs font-semibold uppercase tracking-wide text-charcoal">
          Rafinează Rezultatele {activeCount > 0 && <span className="text-burgundy">({activeCount})</span>}
        </h3>
        <div className="flex items-center gap-3">
          {activeCount > 0 && (
            <button onClick={onClear}
                    className="text-xs font-ui text-burgundy hover:underline uppercase tracking-wide">
              Șterge tot
            </button>
          )}
          {isMobile && (
            <button onClick={onClose} className="text-charcoal-light hover:text-charcoal">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="p-5 space-y-6">

        {/* Categorie */}
        <div>
          <h4 className="font-ui text-xs font-semibold uppercase tracking-wide text-burgundy mb-3 pb-2
                         border-b border-gray-200">
            Categorie
          </h4>
          <div className="space-y-2">
            {categories.filter(c => c !== 'Toate').map(cat => {
              const count = books.filter(b => b.category === cat).length;
              return (
                <label key={cat} className="flex items-center justify-between gap-2 cursor-pointer group">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.category === cat}
                      onChange={() => onChange('category', filters.category === cat ? '' : cat)}
                      className="w-3.5 h-3.5 border-gray-300 text-burgundy
                                 focus:ring-burgundy cursor-pointer accent-burgundy"
                    />
                    <span className="text-sm font-sans text-charcoal group-hover:text-burgundy
                                     transition-colors">
                      {cat}
                    </span>
                  </div>
                  <span className="text-xs text-charcoal-lighter font-sans">({count})</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Preț */}
        <div>
          <h4 className="font-ui text-xs font-semibold uppercase tracking-wide text-burgundy mb-3 pb-2
                         border-b border-gray-200">
            Interval de Preț
          </h4>
          <input
            type="range" min={0} max={50}
            value={filters.maxPrice}
            onChange={e => onChange('maxPrice', Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs font-sans text-charcoal-light mt-1">
            <span>0 lei</span>
            <span className="font-semibold text-burgundy font-ui">Până la {filters.maxPrice} lei</span>
          </div>
        </div>

        {/* Evaluare */}
        <div>
          <h4 className="font-ui text-xs font-semibold uppercase tracking-wide text-burgundy mb-3 pb-2
                         border-b border-gray-200">
            Evaluare Minimă
          </h4>
          <div className="space-y-2">
            {[4, 3, 2].map(r => (
              <label key={r} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio" checked={filters.minRating === r}
                  onChange={() => onChange('minRating', filters.minRating === r ? 0 : r)}
                  className="w-3.5 h-3.5 text-burgundy focus:ring-burgundy cursor-pointer accent-burgundy"
                />
                <span className="text-burgundy-400 text-sm tracking-tighter">
                  {'★'.repeat(r)}{'☆'.repeat(5 - r)}
                </span>
                <span className="text-xs font-sans text-charcoal-light">și peste</span>
              </label>
            ))}
          </div>
        </div>

        {/* Autor */}
        <div>
          <h4 className="font-ui text-xs font-semibold uppercase tracking-wide text-burgundy mb-3 pb-2
                         border-b border-gray-200">
            Autor
          </h4>
          <div className="space-y-2 max-h-44 overflow-y-auto scrollbar-thin">
            {allAuthors.slice(0, 15).map(author => (
              <label key={author} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox" checked={filters.authors.includes(author)}
                  onChange={() => {
                    const next = filters.authors.includes(author)
                      ? filters.authors.filter(a => a !== author)
                      : [...filters.authors, author];
                    onChange('authors', next);
                  }}
                  className="w-3.5 h-3.5 text-burgundy focus:ring-burgundy cursor-pointer flex-shrink-0 accent-burgundy"
                />
                <span className="text-xs font-sans text-charcoal group-hover:text-burgundy transition-colors">
                  {author}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Collections() {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    category:  searchParams.get('category') || '',
    maxPrice:  50,
    minRating: 0,
    authors:   [],
  });
  const [sort,         setSort]         = useState('newest');
  const [search,       setSearch]       = useState(searchParams.get('search') || '');
  const [view,         setView]         = useState('grid');
  const [page,         setPage]         = useState(1);
  const [mobileFilter, setMobileFilter] = useState(false);
  const perPage = 12;

  const updateFilter = (key, value) => {
    setFilters(f => ({ ...f, [key]: value }));
    setPage(1);
  };
  const clearFilters = () => {
    setFilters({ category: '', maxPrice: 50, minRating: 0, authors: [] });
    setPage(1);
  };

  const filtered = useMemo(() => {
    let r = [...books];
    if (search) {
      const q = search.toLowerCase();
      r = r.filter(b =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q)
      );
    }
    if (filters.category)        r = r.filter(b => b.category === filters.category);
    if (filters.maxPrice < 50)   r = r.filter(b => b.price <= filters.maxPrice);
    if (filters.minRating > 0)   r = r.filter(b => b.rating >= filters.minRating);
    if (filters.authors.length)  r = r.filter(b => filters.authors.includes(b.author));
    switch (sort) {
      case 'price-asc':  return r.sort((a, b) => a.price - b.price);
      case 'price-desc': return r.sort((a, b) => b.price - a.price);
      case 'rating':     return r.sort((a, b) => b.rating - a.rating);
      case 'popular':    return r.sort((a, b) => b.reviewCount - a.reviewCount);
      default:           return r;
    }
  }, [search, filters, sort]);

  useEffect(() => { setPage(1); }, [search, filters, sort]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paged      = filtered.slice((page - 1) * perPage, page * perPage);

  const activeFilters = [
    filters.category && { key: 'category', label: filters.category },
    filters.maxPrice < 50 && { key: 'maxPrice', label: `≤ ${filters.maxPrice} lei` },
    filters.minRating > 0 && { key: 'minRating', label: `${filters.minRating}★+` },
    ...filters.authors.map(a => ({ key: `a:${a}`, label: a })),
  ].filter(Boolean);

  const removeTag = key => {
    if (key === 'category') updateFilter('category', '');
    else if (key === 'maxPrice') updateFilter('maxPrice', 50);
    else if (key === 'minRating') updateFilter('minRating', 0);
    else updateFilter('authors', filters.authors.filter(a => `a:${a}` !== key));
  };

  return (
    <div className="fade-in min-h-screen bg-white">

      {/* Antet pagină */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumb items={[{ label: 'Colecții' }]} />
          <h1 className="font-display text-h1 text-charcoal mt-4 mb-1">
            Colecția Noastră Completă
          </h1>
          <div className="h-0.5 bg-burgundy w-12 mt-3 mb-3" />
          <p className="font-sans text-sm text-charcoal-light mt-3">
            {books.length} titluri din poezie, proză, filozofie și critică literară
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Căutare + controale */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-lighter" />
            <input
              type="text" value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Caută după titlu sau autor…"
              className="field pl-10 pr-10"
            />
            {search && (
              <button onClick={() => setSearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-lighter hover:text-charcoal">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <select value={sort} onChange={e => setSort(e.target.value)}
                  className="field w-auto text-sm font-ui">
            {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>

          {/* Vizualizare */}
          <div className="flex border border-gray-200 overflow-hidden">
            <button onClick={() => setView('grid')}
                    className={`p-2.5 transition-colors ${view === 'grid'
                      ? 'bg-burgundy text-white'
                      : 'text-charcoal-light hover:bg-gray-50'}`}>
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button onClick={() => setView('list')}
                    className={`p-2.5 border-l border-gray-200 transition-colors ${view === 'list'
                      ? 'bg-burgundy text-white'
                      : 'text-charcoal-light hover:bg-gray-50'}`}>
              <List className="w-4 h-4" />
            </button>
          </div>

          <button onClick={() => setMobileFilter(true)}
                  className="lg:hidden flex items-center gap-2 field text-sm font-ui font-semibold uppercase tracking-wide whitespace-nowrap">
            <SlidersHorizontal className="w-4 h-4" /> Filtre
          </button>
        </div>

        {/* Etichete filtre active */}
        {activeFilters.length > 0 && (
          <div className="flex items-center flex-wrap gap-2 mb-5">
            <span className="text-xs font-ui text-charcoal-lighter uppercase tracking-wide">Activ:</span>
            {activeFilters.map(f => (
              <button key={f.key} onClick={() => removeTag(f.key)}
                      className="flex items-center gap-1.5 text-xs font-ui font-semibold
                                 bg-burgundy-50 border border-burgundy text-burgundy
                                 px-2.5 py-1 hover:bg-burgundy hover:text-white transition-colors">
                {f.label} <X className="w-2.5 h-2.5" />
              </button>
            ))}
            <button onClick={clearFilters}
                    className="text-xs font-ui text-burgundy hover:underline uppercase tracking-wide">
              Șterge tot
            </button>
          </div>
        )}

        <div className="flex gap-8">

          {/* Sidebar desktop */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <FilterSidebar filters={filters} onChange={updateFilter}
                           onClear={clearFilters} isMobile={false} />
          </aside>

          {/* Sidebar mobil */}
          {mobileFilter && (
            <div className="lg:hidden fixed inset-0 z-50 flex">
              <div className="absolute inset-0 bg-black/40" onClick={() => setMobileFilter(false)} />
              <div className="relative ml-auto w-72 h-full overflow-y-auto">
                <FilterSidebar filters={filters} onChange={updateFilter}
                               onClear={clearFilters} onClose={() => setMobileFilter(false)} isMobile />
              </div>
            </div>
          )}

          {/* Rezultate */}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-ui text-charcoal-lighter uppercase tracking-wide mb-5">
              Se afișează <strong className="text-charcoal">{filtered.length}</strong> {filtered.length === 1 ? 'rezultat' : 'rezultate'}
              {search && <> pentru „<strong className="text-burgundy">{search}</strong>"</>}
            </p>

            {paged.length === 0 ? (
              <div className="text-center py-20 bg-gray-50 border border-gray-200">
                <p className="font-display text-2xl text-charcoal-light italic mb-3">Niciun titlu găsit</p>
                <p className="text-sm font-sans text-charcoal-lighter mb-6">
                  Încearcă să modifici criteriile de căutare sau filtrele.
                </p>
                <button onClick={clearFilters} className="btn-primary">
                  Șterge Toate Filtrele
                </button>
              </div>
            ) : (
              <>
                <div className={view === 'grid'
                  ? 'grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5'
                  : 'space-y-4'}>
                  {paged.map(book =>
                    view === 'grid'
                      ? <LandscapeCard key={book.id} book={book} />
                      : <BookCard key={book.id} book={book} view="list" />
                  )}
                </div>

                {/* Paginare */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-1 mt-10">
                    <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                            className="w-9 h-9 border border-gray-200 flex items-center justify-center
                                       text-charcoal-light hover:border-burgundy hover:text-burgundy
                                       disabled:opacity-30 transition-colors">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    {[...Array(totalPages)].map((_, i) => {
                      const p = i + 1;
                      if (p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                        return (
                          <button key={p} onClick={() => setPage(p)}
                                  className={`w-9 h-9 border text-sm font-ui font-semibold transition-colors
                                    ${page === p
                                      ? 'bg-burgundy border-burgundy text-white'
                                      : 'border-gray-200 text-charcoal hover:border-burgundy hover:text-burgundy'
                                    }`}>
                            {p}
                          </button>
                        );
                      if (Math.abs(p - page) === 2) return <span key={p} className="text-charcoal-lighter px-1">…</span>;
                      return null;
                    })}
                    <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                            className="w-9 h-9 border border-gray-200 flex items-center justify-center
                                       text-charcoal-light hover:border-burgundy hover:text-burgundy
                                       disabled:opacity-30 transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
