import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, ChevronDown, User } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { books } from '../data/books';

export default function Header() {
  const [scrolled, setScrolled]           = useState(false);
  const [mobileOpen, setMobileOpen]       = useState(false);
  const [searchOpen, setSearchOpen]       = useState(false);
  const [searchValue, setSearchValue]     = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [userMenuOpen, setUserMenuOpen]   = useState(false);
  const { cartCount } = useApp();
  const navigate      = useNavigate();
  const location      = useLocation();
  const searchRef     = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setSearchOpen(false); }, [location]);

  useEffect(() => {
    if (searchValue.length > 1) {
      setSearchResults(
        books.filter(b =>
          b.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          b.author.toLowerCase().includes(searchValue.toLowerCase())
        ).slice(0, 5)
      );
    } else {
      setSearchResults([]);
    }
  }, [searchValue]);

  useEffect(() => {
    const handler = e => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false); setSearchValue(''); setSearchResults([]);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/collections', label: 'Collections' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  const isActive = path =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const handleSearch = e => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/collections?search=${encodeURIComponent(searchValue.trim())}`);
      setSearchOpen(false); setSearchValue('');
    }
  };

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300
      ${scrolled ? 'shadow-classic-md' : 'border-b border-gray-200'}`}>

      {/* Top burgundy accent line */}
      <div className="h-0.5 bg-burgundy w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* ── Logo ─────────────────────────────────────── */}
          <Link to="/" className="flex flex-col leading-none group">
            <span className="font-display text-xl lg:text-2xl text-charcoal tracking-wide
                             group-hover:text-burgundy transition-colors duration-200">
              Prince's Multimedia
            </span>
            <span className="text-xs font-ui text-charcoal-lighter tracking-widest uppercase mt-0.5 hidden sm:block">
              Editură Literară · Est. 1999
            </span>
          </Link>

          {/* ── Desktop nav ──────────────────────────────── */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-ui text-sm uppercase tracking-wide transition-colors duration-200
                  ${isActive(link.to)
                    ? 'text-burgundy border-b-2 border-burgundy pb-0.5'
                    : 'text-charcoal-light hover:text-burgundy'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ── Actions ──────────────────────────────────── */}
          <div className="flex items-center gap-2">

            {/* Search */}
            <div ref={searchRef} className="relative">
              <button
                onClick={() => setSearchOpen(v => !v)}
                className="p-2 text-charcoal-light hover:text-burgundy transition-colors duration-200"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>

              {searchOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 shadow-classic-md z-50">
                  <form onSubmit={handleSearch} className="p-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <Search className="w-4 h-4 text-charcoal-lighter flex-shrink-0" />
                      <input
                        autoFocus
                        type="text"
                        value={searchValue}
                        onChange={e => setSearchValue(e.target.value)}
                        placeholder="Search titles, authors…"
                        className="flex-1 bg-transparent outline-none text-sm text-charcoal placeholder-charcoal-lighter font-sans"
                      />
                      {searchValue && (
                        <button type="button" onClick={() => setSearchValue('')}>
                          <X className="w-3.5 h-3.5 text-charcoal-lighter" />
                        </button>
                      )}
                    </div>
                  </form>

                  {searchResults.length > 0 && (
                    <div>
                      {searchResults.map(book => (
                        <Link
                          key={book.id}
                          to={`/product/${book.id}`}
                          onClick={() => { setSearchOpen(false); setSearchValue(''); }}
                          className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50
                                     border-b border-gray-100 last:border-0 transition-colors"
                        >
                          <div className="w-8 h-11 flex-shrink-0 flex items-center
                                          justify-center text-white/40 text-xs font-serif"
                               style={{ backgroundColor: book.coverColor }}>
                            ❧
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-serif text-charcoal leading-snug truncate">
                              {book.title}
                            </p>
                            <p className="text-xs text-charcoal-lighter font-sans mt-0.5">{book.author}</p>
                          </div>
                          <span className="text-xs font-ui text-burgundy font-semibold flex-shrink-0 ml-auto pt-0.5">
                            {book.price.toFixed(2)} lei
                          </span>
                        </Link>
                      ))}
                      <Link
                        to={`/collections?search=${encodeURIComponent(searchValue)}`}
                        onClick={() => { setSearchOpen(false); setSearchValue(''); }}
                        className="block px-4 py-2.5 text-xs font-ui text-burgundy font-semibold
                                   uppercase tracking-wide hover:bg-gray-50 text-center
                                   transition-colors border-t border-gray-100"
                      >
                        View all results →
                      </Link>
                    </div>
                  )}

                  {searchValue.length > 1 && searchResults.length === 0 && (
                    <p className="px-4 py-5 text-sm font-sans text-charcoal-light text-center italic">
                      No results for "{searchValue}"
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* User (desktop) */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setUserMenuOpen(v => !v)}
                className="flex items-center gap-1 p-2 text-charcoal-light hover:text-burgundy transition-colors"
              >
                <User className="w-4 h-4" />
                <ChevronDown className="w-3 h-3" />
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 shadow-classic-md z-50">
                  {[
                    { label: 'My Account', to: '/account' },
                    { label: 'My Orders', to: '/account/orders' },
                    { label: 'Wishlist', to: '/account/wishlist' },
                    { label: 'Settings', to: '/account/settings' },
                  ].map(item => (
                    <Link
                      key={item.label}
                      to={item.to}
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-2.5 text-sm font-sans text-charcoal
                                 hover:bg-gray-50 hover:text-burgundy transition-colors
                                 border-b border-gray-100 last:border-0"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <button
                    onClick={() => setUserMenuOpen(false)}
                    className="w-full text-left block px-4 py-2.5 text-sm font-sans text-burgundy
                               hover:bg-burgundy-50 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative flex items-center gap-2 px-4 py-2
                         bg-burgundy text-white text-sm font-ui font-semibold
                         uppercase tracking-wide
                         border border-burgundy
                         hover:bg-burgundy-800 transition-colors duration-200"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 bg-white text-burgundy text-xs font-bold
                                 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 text-charcoal-light hover:text-burgundy transition-colors"
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-classic-md">
          <nav className="max-w-7xl mx-auto px-4 py-3 space-y-0">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`block px-3 py-3 text-sm font-ui uppercase tracking-wide
                  transition-colors duration-200 border-b border-gray-100 last:border-0
                  ${isActive(link.to)
                    ? 'text-burgundy font-semibold'
                    : 'text-charcoal hover:text-burgundy'
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/account"
              className="block px-3 py-3 text-sm font-ui uppercase tracking-wide
                text-charcoal hover:text-burgundy transition-colors"
            >
              My Account
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
