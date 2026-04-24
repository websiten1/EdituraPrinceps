import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, ChevronDown, User } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { books } from '../data/books';

export default function Header() {
  const [scrolled, setScrolled]         = useState(false);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [searchOpen, setSearchOpen]     = useState(false);
  const [searchValue, setSearchValue]   = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { cartCount }   = useApp();
  const navigate        = useNavigate();
  const location        = useLocation();
  const searchRef       = useRef(null);

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
    <header className={`sticky top-0 z-50 transition-shadow duration-300
      bg-cream border-b border-paper
      ${scrolled ? 'shadow-classic' : ''}`}>

      {/* Top thin gold line */}
      <div className="h-0.5 bg-gold w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* ── Logo ─────────────────────────────────────── */}
          <Link to="/" className="flex flex-col leading-none group">
            <span className="font-serif text-xl lg:text-2xl text-forest-800 tracking-wide
                             group-hover:text-forest-900 transition-colors duration-200">
              Prince's Multimedia
            </span>
            <span className="text-xs font-sans text-gold tracking-widest uppercase mt-0.5 hidden sm:block">
              Editură Literară
            </span>
          </Link>

          {/* ── Desktop nav ──────────────────────────────── */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-sans text-sm uppercase tracking-widest transition-colors duration-200
                  ${isActive(link.to)
                    ? 'text-forest-800 border-b-2 border-gold pb-0.5'
                    : 'text-charcoal hover:text-forest-800'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ── Actions ──────────────────────────────────── */}
          <div className="flex items-center gap-3">

            {/* Search */}
            <div ref={searchRef} className="relative">
              <button
                onClick={() => setSearchOpen(v => !v)}
                className="p-2 text-charcoal hover:text-forest-800 transition-colors duration-200"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>

              {searchOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-cream border border-paper shadow-classic-md z-50">
                  <form onSubmit={handleSearch} className="p-3 border-b border-paper">
                    <div className="flex items-center gap-2">
                      <Search className="w-4 h-4 text-charcoal-light flex-shrink-0" />
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
                          <X className="w-3.5 h-3.5 text-charcoal-light" />
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
                          className="flex items-start gap-3 px-4 py-3 hover:bg-cream-dark
                                     border-b border-paper last:border-0 transition-colors"
                        >
                          <div className="w-8 h-11 bg-forest-800 flex-shrink-0 flex items-center
                                          justify-center text-cream text-xs font-serif">
                            ❧
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-serif text-charcoal leading-snug truncate">
                              {book.title}
                            </p>
                            <p className="text-xs text-charcoal-light font-sans mt-0.5">{book.author}</p>
                          </div>
                          <span className="text-xs font-sans text-burgundy-700 font-bold flex-shrink-0 ml-auto pt-0.5">
                            {book.price.toFixed(2)} lei
                          </span>
                        </Link>
                      ))}
                      <Link
                        to={`/collections?search=${encodeURIComponent(searchValue)}`}
                        onClick={() => { setSearchOpen(false); setSearchValue(''); }}
                        className="block px-4 py-2.5 text-xs font-sans text-forest-800 font-bold
                                   uppercase tracking-widest hover:bg-cream-dark text-center
                                   transition-colors border-t border-paper"
                      >
                        View all results
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
                className="flex items-center gap-1 p-2 text-charcoal hover:text-forest-800 transition-colors"
              >
                <User className="w-4 h-4" />
                <ChevronDown className="w-3 h-3" />
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-1 w-44 bg-cream border border-paper shadow-classic z-50">
                  {['My Account', 'My Orders', 'Wishlist', 'Settings'].map(item => (
                    <Link
                      key={item}
                      to="#"
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-2.5 text-sm font-sans text-charcoal
                                 hover:bg-cream-dark hover:text-forest-800 transition-colors
                                 border-b border-paper last:border-0"
                    >
                      {item}
                    </Link>
                  ))}
                  <Link
                    to="#"
                    onClick={() => setUserMenuOpen(false)}
                    className="block px-4 py-2.5 text-sm font-sans text-burgundy-700
                               hover:bg-burgundy-50 transition-colors"
                  >
                    Sign Out
                  </Link>
                </div>
              )}
            </div>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative flex items-center gap-2 px-4 py-2
                         bg-forest-800 text-cream text-sm font-sans font-bold
                         uppercase tracking-widest
                         border border-forest-800
                         hover:bg-forest-900 transition-colors duration-200"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 bg-gold text-forest-900 text-xs font-bold
                                 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 text-charcoal hover:text-forest-800 transition-colors"
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
        <div className="lg:hidden bg-cream border-t border-paper shadow-classic-md">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`block px-4 py-3 text-sm font-sans uppercase tracking-widest
                  transition-colors duration-200 border-b border-paper last:border-0
                  ${isActive(link.to)
                    ? 'text-forest-800 font-bold'
                    : 'text-charcoal hover:text-forest-800'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* Bottom gold line */}
      <div className="h-px bg-gold/30 w-full" />
    </header>
  );
}
