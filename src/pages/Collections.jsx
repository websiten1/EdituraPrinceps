import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, Grid3X3, List, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { books, categories } from '../data/books';
import BookCard from '../components/BookCard';
import Breadcrumb from '../components/Breadcrumb';

const sortOptions = [
  { value: 'newest', label: 'Cele mai noi' },
  { value: 'popular', label: 'Populare' },
  { value: 'price-asc', label: 'Preț: Mic → Mare' },
  { value: 'price-desc', label: 'Preț: Mare → Mic' },
  { value: 'rating', label: 'Cele mai bine cotate' },
];

const authors = [...new Set(books.map(b => b.author))].sort();

function FilterSidebar({ filters, setFilters, onClose, isMobile }) {
  const handleCategoryChange = (cat) => {
    setFilters(f => ({ ...f, category: f.category === cat ? '' : cat }));
  };
  const handleRatingChange = (r) => {
    setFilters(f => ({ ...f, minRating: f.minRating === r ? 0 : r }));
  };
  const handleAuthorChange = (author) => {
    setFilters(f => ({
      ...f,
      authors: f.authors.includes(author)
        ? f.authors.filter(a => a !== author)
        : [...f.authors, author],
    }));
  };

  const activeCount = [
    filters.category,
    filters.minRating > 0,
    filters.authors.length > 0,
    filters.priceMin > 0 || filters.priceMax < 50,
  ].filter(Boolean).length;

  return (
    <div className={`${isMobile ? '' : 'sticky top-24'} bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <Filter className="w-4 h-4 text-purple-700" />
          Filtre
          {activeCount > 0 && (
            <span className="w-5 h-5 bg-purple-700 text-white rounded-full text-xs flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </h3>
        <div className="flex items-center gap-2">
          {activeCount > 0 && (
            <button
              onClick={() => setFilters({ category: '', priceMin: 0, priceMax: 50, minRating: 0, authors: [] })}
              className="text-xs text-purple-700 font-medium hover:underline"
            >
              Curăță
            </button>
          )}
          {isMobile && (
            <button onClick={onClose} className="p-1 text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Category */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Categorie</h4>
          <div className="space-y-1.5">
            {categories.filter(c => c !== 'All').map(cat => (
              <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.category === cat}
                  onChange={() => handleCategoryChange(cat)}
                  className="w-4 h-4 rounded border-gray-300 text-purple-700 focus:ring-purple-500 cursor-pointer"
                />
                <span className="text-sm text-gray-600 group-hover:text-purple-700 transition-colors flex-1">{cat}</span>
                <span className="text-xs text-gray-400">
                  ({books.filter(b => b.category === cat).length})
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Preț (lei)</h4>
          <div className="px-1">
            <input
              type="range"
              min={0}
              max={50}
              value={filters.priceMax}
              onChange={e => setFilters(f => ({ ...f, priceMax: Number(e.target.value) }))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0 lei</span>
              <span className="font-semibold text-purple-700">până la {filters.priceMax} lei</span>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Rating Minim</h4>
          <div className="space-y-1.5">
            {[4, 3, 2].map(r => (
              <label key={r} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="radio"
                  checked={filters.minRating === r}
                  onChange={() => handleRatingChange(r)}
                  className="w-4 h-4 text-purple-700 focus:ring-purple-500 cursor-pointer"
                />
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-sm ${i < r ? 'text-yellow-400' : 'text-gray-200'}`}>★</span>
                  ))}
                  <span className="text-xs text-gray-500 ml-1">& mai sus</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Authors */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Autor</h4>
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {authors.slice(0, 12).map(author => (
              <label key={author} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.authors.includes(author)}
                  onChange={() => handleAuthorChange(author)}
                  className="w-4 h-4 rounded border-gray-300 text-purple-700 focus:ring-purple-500 cursor-pointer flex-shrink-0"
                />
                <span className="text-xs text-gray-600 group-hover:text-purple-700 transition-colors">{author}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Collections() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    priceMin: 0,
    priceMax: 50,
    minRating: 0,
    authors: [],
  });
  const [sort, setSort] = useState('newest');
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [view, setView] = useState('grid');
  const [page, setPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const perPage = 12;

  useEffect(() => {
    const cat = searchParams.get('category');
    const q = searchParams.get('search');
    if (cat) setFilters(f => ({ ...f, category: cat }));
    if (q) setSearch(q);
  }, []);

  const filtered = useMemo(() => {
    let result = [...books];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(b =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q)
      );
    }
    if (filters.category) {
      result = result.filter(b => b.category === filters.category);
    }
    if (filters.priceMax < 50) {
      result = result.filter(b => b.price <= filters.priceMax);
    }
    if (filters.minRating > 0) {
      result = result.filter(b => b.rating >= filters.minRating);
    }
    if (filters.authors.length > 0) {
      result = result.filter(b => filters.authors.includes(b.author));
    }

    switch (sort) {
      case 'price-asc': return result.sort((a, b) => a.price - b.price);
      case 'price-desc': return result.sort((a, b) => b.price - a.price);
      case 'rating': return result.sort((a, b) => b.rating - a.rating);
      case 'popular': return result.sort((a, b) => b.reviewCount - a.reviewCount);
      default: return result;
    }
  }, [search, filters, sort]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const activeFilters = [
    filters.category && { key: 'category', label: filters.category },
    filters.priceMax < 50 && { key: 'priceMax', label: `Până la ${filters.priceMax} lei` },
    filters.minRating > 0 && { key: 'minRating', label: `${filters.minRating}★ & mai sus` },
    ...filters.authors.map(a => ({ key: `author-${a}`, label: a })),
  ].filter(Boolean);

  const removeFilter = (key) => {
    if (key === 'category') setFilters(f => ({ ...f, category: '' }));
    else if (key === 'priceMax') setFilters(f => ({ ...f, priceMax: 50 }));
    else if (key === 'minRating') setFilters(f => ({ ...f, minRating: 0 }));
    else if (key.startsWith('author-')) {
      const author = key.replace('author-', '');
      setFilters(f => ({ ...f, authors: f.authors.filter(a => a !== author) }));
    }
    setPage(1);
  };

  useEffect(() => { setPage(1); }, [filters, search, sort]);

  return (
    <div className="page-transition min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white pt-24 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Colecții' }]} />
          <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
            Catalogul Nostru
          </h1>
          <p className="text-blue-200">Descoperiți toată colecția Prince's Multimedia — {books.length} titluri excepționale</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Sort */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Caută după titlu, autor..."
              className="input-field pl-10"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="input-field w-auto text-sm"
            >
              {sortOptions.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            {/* View toggle */}
            <div className="flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setView('grid')}
                className={`p-2.5 transition-colors ${view === 'grid' ? 'bg-purple-700 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                title="Grid view"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setView('list')}
                className={`p-2.5 transition-colors ${view === 'list' ? 'bg-purple-700 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                title="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
            {/* Mobile filter button */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-3 py-2.5 rounded-lg text-sm font-medium"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filtre
            </button>
          </div>
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex items-center flex-wrap gap-2 mb-5">
            <span className="text-xs text-gray-500 font-medium">Filtre active:</span>
            {activeFilters.map(f => (
              <button
                key={f.key}
                onClick={() => removeFilter(f.key)}
                className="flex items-center gap-1.5 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium hover:bg-purple-200 transition-colors"
              >
                {f.label}
                <X className="w-3 h-3" />
              </button>
            ))}
            <button
              onClick={() => setFilters({ category: '', priceMin: 0, priceMax: 50, minRating: 0, authors: [] })}
              className="text-xs text-gray-500 hover:text-red-500 transition-colors underline"
            >
              Curăță toate
            </button>
          </div>
        )}

        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <FilterSidebar
              filters={filters}
              setFilters={(f) => { setFilters(f); setPage(1); }}
              isMobile={false}
            />
          </aside>

          {/* Mobile Filters Drawer */}
          {mobileFiltersOpen && (
            <div className="lg:hidden fixed inset-0 z-50 flex">
              <div className="absolute inset-0 bg-black/50" onClick={() => setMobileFiltersOpen(false)} />
              <div className="relative ml-auto w-80 bg-white h-full overflow-y-auto">
                <FilterSidebar
                  filters={filters}
                  setFilters={(f) => { setFilters(f); setPage(1); }}
                  onClose={() => setMobileFiltersOpen(false)}
                  isMobile={true}
                />
              </div>
            </div>
          )}

          {/* Books Grid */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">{filtered.length}</span> rezultate
                {search && <span> pentru "<strong>{search}</strong>"</span>}
              </p>
            </div>

            {paginated.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl">
                <BookOpen className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Niciun rezultat
                </h3>
                <p className="text-gray-500 text-sm mb-6">Încearcă să modifici filtrele sau termenul de căutare.</p>
                <button
                  onClick={() => { setFilters({ category: '', priceMin: 0, priceMax: 50, minRating: 0, authors: [] }); setSearch(''); }}
                  className="btn-primary"
                >
                  Resetează filtrele
                </button>
              </div>
            ) : (
              <>
                <div className={view === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5'
                  : 'space-y-3'
                }>
                  {paginated.map(book => (
                    <BookCard key={book.id} book={book} view={view} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-1 mt-10">
                    <button
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:border-purple-700 hover:text-purple-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    {[...Array(totalPages)].map((_, i) => {
                      const p = i + 1;
                      if (p === 1 || p === totalPages || Math.abs(p - page) <= 1) {
                        return (
                          <button
                            key={p}
                            onClick={() => setPage(p)}
                            className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                              page === p
                                ? 'bg-purple-800 text-white'
                                : 'border border-gray-200 text-gray-700 hover:border-purple-700 hover:text-purple-700'
                            }`}
                          >
                            {p}
                          </button>
                        );
                      }
                      if (Math.abs(p - page) === 2) {
                        return <span key={p} className="text-gray-400 px-1">…</span>;
                      }
                      return null;
                    })}
                    <button
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:border-purple-700 hover:text-purple-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
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
