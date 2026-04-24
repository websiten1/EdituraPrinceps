import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Breadcrumb from '../components/Breadcrumb';

export default function Cart() {
  const {
    cart, cartTotal, cartCount, discountAmount, shippingCost, finalTotal,
    removeFromCart, updateQuantity, applyDiscount,
  } = useApp();
  const [discountInput, setDiscountInput] = useState('');
  const [discountMsg,   setDiscountMsg]   = useState('');
  const [discountOk,    setDiscountOk]    = useState(false);

  const handleDiscount = () => {
    if (!discountInput.trim()) return;
    const ok = applyDiscount(discountInput.trim());
    if (ok) {
      setDiscountMsg(`Code applied: ${cart.discountPercent}% discount.`);
      setDiscountOk(true);
    } else {
      setDiscountMsg('Invalid code. Try: PRINCE10, LITRO15, CARTE20');
      setDiscountOk(false);
    }
  };

  if (cartCount === 0) return (
    <div className="fade-in min-h-screen bg-cream">
      <div className="bg-cream-dark border-b border-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumb items={[{ label: 'Shopping Cart' }]} />
          <h1 className="font-serif text-h1 text-charcoal mt-4">Shopping Cart</h1>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <p className="font-serif text-4xl text-charcoal-lighter mb-2">❧</p>
        <h2 className="font-serif text-h2 text-charcoal-light italic mb-4">Your cart is empty</h2>
        <p className="text-sm font-sans text-charcoal-lighter mb-8">
          Browse our collection and add titles to your cart to begin.
        </p>
        <Link to="/collections" className="btn-primary px-8">
          Explore the Collection
        </Link>
      </div>
    </div>
  );

  return (
    <div className="fade-in min-h-screen bg-cream">
      <div className="bg-cream-dark border-b border-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumb items={[{ label: 'Shopping Cart' }]} />
          <h1 className="font-serif text-h1 text-charcoal mt-4">
            Shopping Cart
            <span className="font-sans text-base font-normal text-charcoal-light ml-3">
              ({cartCount} {cartCount === 1 ? 'item' : 'items'})
            </span>
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Cart table ── */}
          <div className="lg:col-span-2">
            <div className="bg-cream border border-paper">

              {/* Table header */}
              <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3 bg-cream-dark
                              border-b border-paper text-xs font-sans font-bold uppercase tracking-widest
                              text-charcoal-light">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-right">Price</div>
                <div className="col-span-2 text-center">Qty</div>
                <div className="col-span-2 text-right">Subtotal</div>
              </div>

              {/* Rows */}
              {cart.items.map(item => (
                <div key={item.id}
                     className="grid grid-cols-12 gap-4 px-6 py-5 border-b border-paper
                                last:border-0 items-center">
                  {/* Product */}
                  <div className="col-span-12 sm:col-span-6 flex items-start gap-4">
                    <Link to={`/product/${item.id}`} className="flex-shrink-0">
                      <div className="w-12 h-16 bg-forest-800 flex items-center justify-center
                                      text-cream/20 font-serif text-xl">
                        ❧
                      </div>
                    </Link>
                    <div className="min-w-0">
                      <Link to={`/product/${item.id}`}>
                        <h3 className="font-serif text-base text-charcoal hover:text-forest-800
                                       transition-colors leading-snug">
                          {item.title}
                        </h3>
                      </Link>
                      <p className="text-xs font-sans text-charcoal-light uppercase tracking-wider mt-0.5">
                        {item.author}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="flex items-center gap-1 mt-2 text-xs font-sans text-burgundy-700
                                   hover:underline uppercase tracking-wider"
                      >
                        <Trash2 className="w-3 h-3" /> Remove
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-span-4 sm:col-span-2 text-right">
                    <span className="text-sm font-sans text-charcoal">{item.price.toFixed(2)} lei</span>
                  </div>

                  {/* Qty */}
                  <div className="col-span-4 sm:col-span-2 flex items-center justify-center">
                    <div className="flex items-center border border-paper">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center text-charcoal-light
                                         hover:text-charcoal hover:bg-cream-dark transition-colors border-r border-paper">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-sans font-bold text-charcoal">
                        {item.quantity}
                      </span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center text-charcoal-light
                                         hover:text-charcoal hover:bg-cream-dark transition-colors border-l border-paper">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="col-span-4 sm:col-span-2 text-right">
                    <span className="font-serif text-base text-burgundy-700 font-semibold">
                      {(item.price * item.quantity).toFixed(2)} lei
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5">
              <Link to="/collections" className="btn-ghost text-sm">
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* ── Summary ── */}
          <div className="lg:col-span-1">
            <div className="bg-cream border border-paper sticky top-24">
              <div className="bg-cream-dark border-b border-paper px-6 py-4">
                <h2 className="font-serif text-h4 text-charcoal">Order Summary</h2>
              </div>

              <div className="px-6 py-5 space-y-3">
                <div className="flex justify-between text-sm font-sans">
                  <span className="text-charcoal-light">Subtotal ({cartCount} items)</span>
                  <span className="text-charcoal font-medium">{cartTotal.toFixed(2)} lei</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-sm font-sans">
                    <span className="text-forest-700">Discount ({cart.discountPercent}%)</span>
                    <span className="text-forest-700 font-medium">−{discountAmount.toFixed(2)} lei</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-sans">
                  <span className="text-charcoal-light">Shipping</span>
                  <span className={shippingCost === 0 ? 'text-forest-700 font-medium' : 'text-charcoal'}>
                    {shippingCost === 0 ? 'Free' : `${shippingCost.toFixed(2)} lei`}
                  </span>
                </div>
                {cartTotal < 100 && (
                  <p className="text-xs font-sans text-charcoal-light bg-cream-dark border border-paper p-2.5 italic">
                    Add {(100 - cartTotal).toFixed(2)} lei more for free shipping.
                  </p>
                )}
              </div>

              {/* Discount */}
              <div className="px-6 pb-5 border-t border-paper pt-4">
                <label className="field-label">Discount Code</label>
                {cart.discountCode ? (
                  <p className="text-xs font-sans text-forest-700 font-bold uppercase tracking-wider">
                    ✓ {cart.discountCode} applied
                  </p>
                ) : (
                  <div className="flex gap-0">
                    <input
                      type="text" value={discountInput}
                      onChange={e => { setDiscountInput(e.target.value.toUpperCase()); setDiscountMsg(''); }}
                      placeholder="PRINCE10"
                      className="field flex-1 text-sm py-2"
                    />
                    <button onClick={handleDiscount}
                            className="px-3 py-2 bg-charcoal text-cream text-xs font-sans font-bold
                                       uppercase tracking-widest border border-charcoal
                                       hover:bg-forest-800 transition-colors whitespace-nowrap">
                      Apply
                    </button>
                  </div>
                )}
                {discountMsg && (
                  <p className={`text-xs font-sans mt-1 ${discountOk ? 'text-forest-700' : 'text-burgundy-700'}`}>
                    {discountMsg}
                  </p>
                )}
              </div>

              {/* Total */}
              <div className="px-6 py-4 border-t border-paper bg-cream-dark">
                <div className="flex justify-between items-baseline">
                  <span className="font-sans text-sm font-bold uppercase tracking-widest text-charcoal">Total</span>
                  <span className="font-serif text-3xl text-burgundy-700">{finalTotal.toFixed(2)} lei</span>
                </div>
                <p className="text-xs font-sans text-charcoal-lighter mt-1">Includes 9% VAT</p>
              </div>

              <div className="px-6 py-5">
                <Link to="/checkout"
                      className="btn-primary w-full py-3.5 text-center block text-sm">
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4 inline ml-1" />
                </Link>
                <p className="text-xs font-sans text-charcoal-lighter text-center mt-3">
                  Secure SSL encrypted checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
