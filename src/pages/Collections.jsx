import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X, Grid3X3, List, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { books, categories } from '../data/books';
import BookCard from '../components/BookCard';
import Breadcrumb from '../components/Breadcrumb';

const sortOptions = [
  { value: 'newest',     label: 'Newest First' },
  { value: 'popular',    label: 'Most Popular' },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating',     label: 'Highest Rated' },
];

const allAuthors = [...new Set(books.map(b => b.author))].sort();

/* ── Sidebar ─────────────────────────────────────────────────────── */
function FilterSidebar({ filters, onChange, onClear, onClose, isMobile }) {
  const activeCount = [
    filters.category,
    filters.maxPrice < 50,
    filters.minRating > 0,
    filters.authors.length > 0,
  ].filter(Boolean).length;

  return (
    <div className="bg-cream border border-paper">

      {/* Sidebar header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-paper bg-cream-dark">
        <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-charcoal">
          Refine Results {activeCount > 0 && <span className="text-burgundy-700">({activeCount})</span>}
        </h3>
        <div className="flex items-center gap-3">
          {activeCount > 0 && (
            <button onClick={onClear}
                    className="text-xs font-sans text-burgundy-700 hover:underline uppercase tracking-widest">
              Clear all
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

        {/* Category */}
        <div>
          <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-forest-800 mb-3 pb-2
                         border-b border-gold/40">
            Category
          </h4>
          <div className="space-y-2">
            {categories.filter(c => c !== 'All').map(cat => {
              const count = books.filter(b => b.category === cat).length;
              return (
                <label key={cat} className="flex items-center justify-between gap-2 cursor-pointer group">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.category === cat}
                      onChange={() => onChange('category', filters.category === cat ? '' : cat)}
                      className="w-3.5 h-3.5 border-paper-dark text-forest-800
                                 focus:ring-forest-800 cursor-pointer"
                    />
                    <span className="text-sm font-sans text-charcoal group-hover:text-forest-800
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

        {/* Price */}
        <div>
          <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-forest-800 mb-3 pb-2
                         border-b border-gold/40">
            Price Range
          </h4>
          <input
            type="range" min={0} max={50}
            value={filters.maxPrice}
            onChange={e => onChange('maxPrice', Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs font-sans text-charcoal-light mt-1">
            <span>0 lei</span>
            <span className="font-bold text-forest-800">Up to {filters.maxPrice} lei</span>
          </div>
        </div>

        {/* Rating */}
        <div>
          <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-forest-800 mb-3 pb-2
                         border-b border-gold/40">
            Minimum Rating
          </h4>
          <div className="space-y-2">
            {[4, 3, 2].map(r => (
              <label key={r} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio" checked={filters.minRating === r}
                  onChange={() => onChange('minRating', filters.minRating === r ? 0 : r)}
                  className="w-3.5 h-3.5 text-forest-800 focus:ring-forest-800 cursor-pointer"
                />
                <span className="text-gold text-sm tracking-tighter">
                  {'★'.repeat(r)}{'☆'.repeat(5 - r)}
                </span>
                <span className="text-xs font-sans text-charcoal-light">& above</span>
              </label>
            ))}
          </div>
        </div>

        {/* Authors */}
        <div>
          <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-forest-800 mb-3 pb-2
                         border-b border-gold/40">
            Author
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
                  className="w-3.5 h-3.5 text-forest-800 focus:ring-forest-800 cursor-pointer flex-shrink-0"
                />
                <span className="text-xs font-sans text-charcoal group-hover:text-forest-800 transition-colors">
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
    <div className="fade-in min-h-screen bg-cream">

      {/* Page header */}
      <div className="bg-cream-dark border-b border-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumb items={[{ label: 'Collections' }]} />
          <h1 className="font-serif text-h1 text-charcoal mt-4 mb-1">
            Our Complete Collection
          </h1>
          <div className="flex items-center gap-3 mt-3">
            <div className="h-px bg-gold/60 w-12" />
            <span className="text-gold text-xs">◆</span>
            <div className="h-px bg-gold/60 w-12" />
          </div>
          <p className="font-sans text-sm text-charcoal-light mt-3">
            {books.length} titles across poetry, prose, philosophy, and literary criticism
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Search + controls row */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-lighter" />
            <input
              type="text" value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by title or author…"
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
                  className="field w-auto text-sm">
            {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>

          {/* View toggle */}
          <div className="flex border border-paper overflow-hidden">
            <button onClick={() => setView('grid')}
                    className={`p-2.5 transition-colors ${view === 'grid'
                      ? 'bg-forest-800 text-cream'
                      : 'text-charcoal-light hover:bg-cream-dark'}`}>
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button onClick={() => setView('list')}
                    className={`p-2.5 border-l border-paper transition-colors ${view === 'list'
                      ? 'bg-forest-800 text-cream'
                      : 'text-charcoal-light hover:bg-cream-dark'}`}>
              <List className="w-4 h-4" />
            </button>
          </div>

          <button onClick={() => setMobileFilter(true)}
                  className="lg:hidden flex items-center gap-2 field text-sm font-sans font-bold uppercase tracking-widest whitespace-nowrap">
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>
        </div>

        {/* Active filter tags */}
        {activeFilters.length > 0 && (
          <div className="flex items-center flex-wrap gap-2 mb-5">
            <span className="text-xs font-sans text-charcoal-light uppercase tracking-widest">Active:</span>
            {activeFilters.map(f => (
              <button key={f.key} onClick={() => removeTag(f.key)}
                      className="flex items-center gap-1.5 text-xs font-sans font-bold
                                 bg-cream-dark border border-forest-800 text-forest-800
                                 px-2.5 py-1 hover:bg-forest-800 hover:text-cream transition-colors">
                {f.label} <X className="w-2.5 h-2.5" />
              </button>
            ))}
            <button onClick={clearFilters}
                    className="text-xs font-sans text-burgundy-700 hover:underline uppercase tracking-widest">
              Clear all
            </button>
          </div>
        )}

        <div className="flex gap-8">

          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <FilterSidebar filters={filters} onChange={updateFilter}
                           onClear={clearFilters} isMobile={false} />
          </aside>

          {/* Mobile sidebar */}
          {mobileFilter && (
            <div className="lg:hidden fixed inset-0 z-50 flex">
              <div className="absolute inset-0 bg-charcoal/40" onClick={() => setMobileFilter(false)} />
              <div className="relative ml-auto w-72 h-full overflow-y-auto">
                <FilterSidebar filters={filters} onChange={updateFilter}
                               onClear={clearFilters} onClose={() => setMobileFilter(false)} isMobile />
              </div>
            </div>
          )}

          {/* Results */}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-sans text-charcoal-light uppercase tracking-widest mb-5">
              Showing <strong className="text-charcoal">{filtered.length}</strong> result{filtered.length !== 1 ? 's' : ''}
              {search && <> for "<strong className="text-forest-800">{search}</strong>"</>}
            </p>

            {paged.length === 0 ? (
              <div className="text-center py-20 bg-cream border border-paper">
                <p className="font-serif text-2xl text-charcoal-light italic mb-3">No titles found</p>
                <p className="text-sm font-sans text-charcoal-lighter mb-6">
                  Try adjusting your search or filter criteria.
                </p>
                <button onClick={clearFilters} className="btn-primary">
                  Clear All Filters
                </button>
              </div>
            ) : (
              <>
                <div className={view === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5'
                  : 'space-y-4'}>
                  {paged.map(book => <BookCard key={book.id} book={book} view={view} />)}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-1 mt-10">
                    <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                            className="w-9 h-9 border border-paper flex items-center justify-center
                                       text-charcoal-light hover:border-forest-800 hover:text-forest-800
                                       disabled:opacity-30 transition-colors">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    {[...Array(totalPages)].map((_, i) => {
                      const p = i + 1;
                      if (p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                        return (
                          <button key={p} onClick={() => setPage(p)}
                                  className={`w-9 h-9 border text-sm font-sans font-bold transition-colors
                                    ${page === p
                                      ? 'bg-forest-800 border-forest-800 text-cream'
                                      : 'border-paper text-charcoal hover:border-forest-800 hover:text-forest-800'
                                    }`}>
                            {p}
                          </button>
                        );
                      if (Math.abs(p - page) === 2) return <span key={p} className="text-charcoal-lighter px-1">…</span>;
                      return null;
                    })}
                    <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                            className="w-9 h-9 border border-paper flex items-center justify-center
                                       text-charcoal-light hover:border-forest-800 hover:text-forest-800
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
