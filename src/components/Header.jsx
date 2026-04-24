import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, Heart, User, BookOpen, ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { books } from '../data/books';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { cartCount, wishlist } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location]);

  useEffect(() => {
    if (searchValue.length > 1) {
      const results = books.filter(b =>
        b.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        b.author.toLowerCase().includes(searchValue.toLowerCase())
      ).slice(0, 5);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchValue]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
        setSearchValue('');
        setSearchResults([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { to: '/', label: 'Acasă' },
    { to: '/collections', label: 'Colecții' },
    { to: '/about', label: 'Despre Noi' },
    { to: '/contact', label: 'Contact' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/collections?search=${encodeURIComponent(searchValue.trim())}`);
      setSearchOpen(false);
      setSearchValue('');
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white shadow-lg border-b border-gray-100'
        : 'bg-white/95 backdrop-blur-md shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-purple-800 to-blue-700 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <BookOpen className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="text-sm lg:text-base font-bold text-gray-900 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                Prince's Multimedia
              </div>
              <div className="text-xs text-purple-700 font-medium tracking-wide">Editură Literară</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.to)
                    ? 'text-purple-800 bg-purple-50 font-semibold'
                    : 'text-gray-600 hover:text-purple-800 hover:bg-purple-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search */}
            <div ref={searchRef} className="relative">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-lg text-gray-600 hover:text-purple-800 hover:bg-purple-50 transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              {searchOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                  <form onSubmit={handleSearchSubmit} className="p-3 border-b border-gray-100">
                    <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
                      <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <input
                        autoFocus
                        type="text"
                        value={searchValue}
                        onChange={e => setSearchValue(e.target.value)}
                        placeholder="Caută cărți, autori..."
                        className="flex-1 bg-transparent outline-none text-sm text-gray-900 placeholder-gray-400"
                      />
                      {searchValue && (
                        <button type="button" onClick={() => setSearchValue('')}>
                          <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                        </button>
                      )}
                    </div>
                  </form>
                  {searchResults.length > 0 && (
                    <div className="max-h-64 overflow-y-auto">
                      {searchResults.map(book => (
                        <Link
                          key={book.id}
                          to={`/product/${book.id}`}
                          onClick={() => { setSearchOpen(false); setSearchValue(''); }}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-purple-50 transition-colors"
                        >
                          <div className={`w-10 h-14 rounded-md bg-gradient-to-br ${book.gradient} flex-shrink-0 flex items-center justify-center`}>
                            <BookOpen className="w-4 h-4 text-white/80" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-gray-900 truncate">{book.title}</div>
                            <div className="text-xs text-gray-500">{book.author}</div>
                            <div className="text-xs font-semibold text-purple-700 mt-0.5">{book.price.toFixed(2)} lei</div>
                          </div>
                        </Link>
                      ))}
                      <Link
                        to={`/collections?search=${encodeURIComponent(searchValue)}`}
                        onClick={() => { setSearchOpen(false); setSearchValue(''); }}
                        className="block px-4 py-3 text-center text-sm text-purple-700 font-medium hover:bg-purple-50 border-t border-gray-100"
                      >
                        Vezi toate rezultatele
                      </Link>
                    </div>
                  )}
                  {searchValue.length > 1 && searchResults.length === 0 && (
                    <div className="px-4 py-6 text-center text-sm text-gray-500">
                      Niciun rezultat pentru "{searchValue}"
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Wishlist */}
            <Link
              to="/collections"
              className="relative p-2 rounded-lg text-gray-600 hover:text-purple-800 hover:bg-purple-50 transition-colors hidden sm:block"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* User */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="p-2 rounded-lg text-gray-600 hover:text-purple-800 hover:bg-purple-50 transition-colors flex items-center gap-1"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
                <ChevronDown className="w-3 h-3" />
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50">
                  {[
                    { label: 'Contul Meu', to: '#' },
                    { label: 'Comenzile Mele', to: '#' },
                    { label: 'Lista de Dorințe', to: '#' },
                    { label: 'Setări', to: '#' },
                  ].map(item => (
                    <Link
                      key={item.label}
                      to={item.to}
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-800 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <Link
                      to="#"
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Deconectare
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative flex items-center gap-2 bg-gradient-to-r from-purple-800 to-blue-700 text-white px-3 sm:px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity shadow-md"
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Coș</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 bg-yellow-400 text-gray-900 text-xs rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? 'text-purple-800 bg-purple-50 font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-gray-100 pt-3 mt-3 flex items-center gap-3">
              <Link to="/cart" className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                <ShoppingCart className="w-4 h-4" /> Coș ({cartCount})
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
