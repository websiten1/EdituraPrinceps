import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, BookOpen, Tag, Truck, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Breadcrumb from '../components/Breadcrumb';

export default function Cart() {
  const {
    cart, cartTotal, cartCount, discountAmount, shippingCost, finalTotal,
    removeFromCart, updateQuantity, applyDiscount,
  } = useApp();
  const [discountInput, setDiscountInput] = useState('');
  const [discountError, setDiscountError] = useState('');

  const handleApplyDiscount = () => {
    if (!discountInput.trim()) return;
    const success = applyDiscount(discountInput.trim());
    if (!success) {
      setDiscountError('Cod invalid. Încearcă: PRINCE10, LITRO15 sau CARTE20');
    } else {
      setDiscountError('');
      setDiscountInput('');
    }
  };

  if (cartCount === 0) {
    return (
      <div className="page-transition min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white pt-24 pb-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumb items={[{ label: 'Coș de Cumpărături' }]} />
            <h1 className="text-3xl font-bold mt-4" style={{ fontFamily: 'Playfair Display, serif' }}>Coș de Cumpărături</h1>
          </div>
        </div>
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-12 h-12 text-gray-300" />
          </div>
          <h2 className="text-2xl font-bold text-gray-700 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
            Coșul tău este gol
          </h2>
          <p className="text-gray-500 mb-8">Explorează colecția noastră și adaugă câteva cărți în coș!</p>
          <Link to="/collections" className="btn-primary inline-flex items-center gap-2">
            <BookOpen className="w-4 h-4" /> Explorează Colecțiile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-transition min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white pt-24 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Coș de Cumpărături' }]} />
          <h1 className="text-3xl font-bold mt-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Coș de Cumpărături
            <span className="ml-3 text-lg font-normal text-blue-200">({cartCount} {cartCount === 1 ? 'produs' : 'produse'})</span>
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map(item => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col sm:flex-row gap-4 hover:shadow-md transition-shadow"
              >
                <Link to={`/product/${item.id}`}>
                  <div className={`w-20 h-28 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-md flex-shrink-0`}>
                    <BookOpen className="w-8 h-8 text-white/60" />
                  </div>
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link to={`/product/${item.id}`}>
                        <h3 className="font-semibold text-gray-900 hover:text-purple-800 transition-colors text-sm sm:text-base leading-snug" style={{ fontFamily: 'Playfair Display, serif' }}>
                          {item.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-500 mt-0.5">{item.author}</p>
                      <span className="inline-block mt-1 text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                        {item.category}
                      </span>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                      title="Elimină"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity */}
                    <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-10 text-center text-sm font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    {/* Price */}
                    <div className="text-right">
                      <div className="text-lg font-bold text-purple-800">
                        {(item.price * item.quantity).toFixed(2)} lei
                      </div>
                      {item.quantity > 1 && (
                        <div className="text-xs text-gray-400">{item.price.toFixed(2)} lei / buc</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue shopping */}
            <Link
              to="/collections"
              className="flex items-center gap-2 text-purple-700 font-medium text-sm hover:text-purple-900 transition-colors mt-2"
            >
              ← Continuă Cumpărăturile
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-5" style={{ fontFamily: 'Playfair Display, serif' }}>
                Sumar Comandă
              </h2>

              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({cartCount} produse)</span>
                  <span className="font-medium text-gray-900">{cartTotal.toFixed(2)} lei</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">Reducere ({cart.discountPercent}%)</span>
                    <span className="font-medium text-green-600">-{discountAmount.toFixed(2)} lei</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5" /> Livrare
                  </span>
                  <span className={`font-medium ${shippingCost === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                    {shippingCost === 0 ? 'Gratuită' : `${shippingCost.toFixed(2)} lei`}
                  </span>
                </div>
                {cartTotal < 100 && (
                  <div className="bg-blue-50 text-blue-700 text-xs p-2.5 rounded-lg">
                    Mai adaugă <strong>{(100 - cartTotal).toFixed(2)} lei</strong> pentru livrare gratuită!
                  </div>
                )}
              </div>

              {/* Discount Code */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <Tag className="w-3.5 h-3.5 inline mr-1" />
                  Cod de Reducere
                </label>
                {cart.discountCode ? (
                  <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-3 py-2.5">
                    <span className="flex-1 text-sm text-green-700 font-medium">
                      {cart.discountCode} — {cart.discountPercent}% aplicat
                    </span>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={discountInput}
                      onChange={e => { setDiscountInput(e.target.value.toUpperCase()); setDiscountError(''); }}
                      placeholder="PRINCE10"
                      className="input-field flex-1 text-sm py-2"
                    />
                    <button
                      onClick={handleApplyDiscount}
                      className="px-3 py-2 bg-purple-100 text-purple-800 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors whitespace-nowrap"
                    >
                      Aplică
                    </button>
                  </div>
                )}
                {discountError && <p className="text-red-500 text-xs mt-1">{discountError}</p>}
              </div>

              <div className="border-t border-gray-100 pt-4 mb-5">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-purple-800">{finalTotal.toFixed(2)} lei</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">Include TVA 9%</p>
              </div>

              <Link
                to="/checkout"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-800 to-blue-700 text-white py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-lg"
              >
                Finalizează Comanda <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Trust badges */}
              <div className="mt-4 space-y-2">
                {[
                  { icon: Shield, text: 'Plăți 100% securizate SSL' },
                  { icon: Truck, text: 'Livrare rapidă 3-5 zile' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-xs text-gray-500">
                    <Icon className="w-3.5 h-3.5 text-green-500" />
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
