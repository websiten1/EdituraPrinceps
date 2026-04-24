import { createContext, useContext, useReducer, useState, useCallback } from 'react';

const AppContext = createContext(null);

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === action.payload.id
              ? { ...i, quantity: i.quantity + (action.payload.quantity || 1) }
              : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }],
      };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) };
    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        return { ...state, items: state.items.filter(i => i.id !== action.payload.id) };
      }
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i
        ),
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'APPLY_DISCOUNT':
      return { ...state, discountCode: action.payload.code, discountPercent: action.payload.percent };
    case 'REMOVE_DISCOUNT':
      return { ...state, discountCode: null, discountPercent: 0 };
    default:
      return state;
  }
};

const initialCartState = {
  items: [],
  discountCode: null,
  discountPercent: 0,
};

export function AppProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, initialCartState);
  const [wishlist, setWishlist] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  const addToCart = useCallback((book, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { ...book, quantity } });
    addToast(`"${book.title}" a fost adăugat în coș!`, 'success');
  }, []);

  const removeFromCart = useCallback((id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const applyDiscount = useCallback((code) => {
    const codes = { 'PRINCE10': 10, 'LITRO15': 15, 'CARTE20': 20 };
    if (codes[code.toUpperCase()]) {
      dispatch({ type: 'APPLY_DISCOUNT', payload: { code: code.toUpperCase(), percent: codes[code.toUpperCase()] } });
      addToast(`Cod de reducere aplicat: ${codes[code.toUpperCase()]}% reducere!`, 'success');
      return true;
    }
    addToast('Cod de reducere invalid.', 'error');
    return false;
  }, []);

  const toggleWishlist = useCallback((book) => {
    setWishlist(prev => {
      const exists = prev.find(b => b.id === book.id);
      if (exists) {
        addToast(`"${book.title}" eliminat din lista de dorințe.`, 'info');
        return prev.filter(b => b.id !== book.id);
      }
      addToast(`"${book.title}" adăugat în lista de dorințe!`, 'success');
      return [...prev, book];
    });
  }, []);

  const addToRecentlyViewed = useCallback((book) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(b => b.id !== book.id);
      return [book, ...filtered].slice(0, 6);
    });
  }, []);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const cartTotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  const discountAmount = cartTotal * (cart.discountPercent / 100);
  const shippingCost = cartTotal >= 100 ? 0 : 15;
  const finalTotal = cartTotal - discountAmount + shippingCost;

  return (
    <AppContext.Provider value={{
      cart,
      cartTotal,
      cartCount,
      discountAmount,
      shippingCost,
      finalTotal,
      wishlist,
      toasts,
      searchQuery,
      recentlyViewed,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      applyDiscount,
      toggleWishlist,
      addToRecentlyViewed,
      addToast,
      removeToast,
      setSearchQuery,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
