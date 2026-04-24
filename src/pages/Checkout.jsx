import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CreditCard, Truck, MapPin, Check, ChevronRight, BookOpen,
  Shield, Lock, AlertCircle, CheckCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import Breadcrumb from '../components/Breadcrumb';

const steps = [
  { id: 1, label: 'Adresă' },
  { id: 2, label: 'Livrare' },
  { id: 3, label: 'Plată' },
  { id: 4, label: 'Confirmare' },
];

const shippingMethods = [
  { id: 'standard', label: 'Livrare Standard', desc: '3-5 zile lucrătoare', price: 15, icon: Truck },
  { id: 'express', label: 'Livrare Express', desc: '1-2 zile lucrătoare', price: 25, icon: Truck },
  { id: 'pickup', label: 'Ridicare Personală', desc: 'Iași — gratuit', price: 0, icon: MapPin },
];

const paymentMethods = [
  { id: 'card', label: 'Card Bancar', desc: 'Visa, Mastercard, Maestro' },
  { id: 'paypal', label: 'PayPal', desc: 'Plată rapidă și securizată' },
  { id: 'transfer', label: 'Transfer Bancar', desc: 'Procesare în 1-2 zile bancare' },
  { id: 'ramburs', label: 'Ramburs la Livrare', desc: 'Plătești la primirea coletului' },
];

function ProgressBar({ currentStep }) {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, i) => (
        <div key={step.id} className="flex items-center flex-1">
          <div className={`flex items-center gap-2 ${i > 0 ? 'flex-1' : ''}`}>
            {i > 0 && (
              <div className={`flex-1 h-0.5 ${step.id <= currentStep ? 'bg-purple-600' : 'bg-gray-200'}`} />
            )}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold transition-all ${
              step.id < currentStep
                ? 'bg-purple-600 text-white'
                : step.id === currentStep
                ? 'bg-purple-800 text-white ring-4 ring-purple-200'
                : 'bg-gray-100 text-gray-400'
            }`}>
              {step.id < currentStep ? <Check className="w-4 h-4" /> : step.id}
            </div>
          </div>
          <span className={`hidden sm:block ml-2 text-xs font-medium ${step.id === currentStep ? 'text-purple-800' : step.id < currentStep ? 'text-gray-600' : 'text-gray-400'}`}>
            {step.label}
          </span>
          {i < steps.length - 1 && i === 0 && (
            <div className={`flex-1 h-0.5 ml-2 ${2 <= currentStep ? 'bg-purple-600' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function AddressForm({ data, onChange, errors, sameAsBilling, setSameAsBilling, isBilling }) {
  const Field = ({ name, label, type = 'text', required, half, children }) => (
    <div className={half ? 'sm:col-span-1' : 'sm:col-span-2'}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children || (
        <input
          type={type}
          value={data[name] || ''}
          onChange={e => onChange(name, e.target.value)}
          className={`input-field ${errors[name] ? 'border-red-400' : ''}`}
        />
      )}
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field name="firstName" label="Prenume" required half />
      <Field name="lastName" label="Nume" required half />
      <Field name="email" label="Email" type="email" required>
        <input
          type="email"
          value={data.email || ''}
          onChange={e => onChange('email', e.target.value)}
          className={`input-field ${errors.email ? 'border-red-400' : ''}`}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </Field>
      <Field name="phone" label="Telefon" required half />
      <Field name="address" label="Adresă" required>
        <input
          type="text"
          value={data.address || ''}
          onChange={e => onChange('address', e.target.value)}
          className={`input-field ${errors.address ? 'border-red-400' : ''}`}
          placeholder="Str. Exemplu, Nr. 1, Ap. 2"
        />
        {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
      </Field>
      <Field name="city" label="Oraș" required half />
      <Field name="county" label="Județ" required half>
        <select
          value={data.county || ''}
          onChange={e => onChange('county', e.target.value)}
          className={`input-field ${errors.county ? 'border-red-400' : ''}`}
        >
          <option value="">Selectează județul</option>
          {['Alba', 'Arad', 'Argeș', 'Bacău', 'Bihor', 'Brașov', 'București', 'Cluj', 'Constanța', 'Dolj', 'Galați', 'Iași', 'Ilfov', 'Mureș', 'Prahova', 'Sibiu', 'Suceava', 'Timiș', 'Vrancea'].map(j => (
            <option key={j} value={j}>{j}</option>
          ))}
        </select>
        {errors.county && <p className="text-red-500 text-xs mt-1">{errors.county}</p>}
      </Field>
      <Field name="zip" label="Cod Poștal" half />

      {isBilling && (
        <div className="sm:col-span-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={sameAsBilling}
              onChange={e => setSameAsBilling(e.target.checked)}
              className="w-4 h-4 text-purple-700 rounded border-gray-300 focus:ring-purple-500"
            />
            <span className="text-sm text-gray-700">Adresa de livrare este aceeași cu adresa de facturare</span>
          </label>
        </div>
      )}
    </div>
  );
}

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, cartTotal, discountAmount, finalTotal, shippingCost, clearCart } = useApp();
  const [step, setStep] = useState(1);
  const [billing, setBilling] = useState({});
  const [shipping, setShipping] = useState({});
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [card, setCard] = useState({ number: '', expiry: '', cvv: '', name: '' });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const [billingErrors, setBillingErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);

  const selectedShipping = shippingMethods.find(m => m.id === shippingMethod);
  const shippingCostActual = selectedShipping?.price ?? shippingCost;
  const total = cartTotal - discountAmount + shippingCostActual;
  const orderNumber = `PM-${Date.now().toString().slice(-6)}`;

  const validateBilling = () => {
    const e = {};
    if (!billing.firstName) e.firstName = 'Câmp obligatoriu';
    if (!billing.lastName) e.lastName = 'Câmp obligatoriu';
    if (!billing.email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Email invalid';
    if (!billing.phone) e.phone = 'Câmp obligatoriu';
    if (!billing.address) e.address = 'Câmp obligatoriu';
    if (!billing.city) e.city = 'Câmp obligatoriu';
    if (!billing.county) e.county = 'Câmp obligatoriu';
    return e;
  };

  const handleNextStep = () => {
    if (step === 1) {
      const errs = validateBilling();
      if (Object.keys(errs).length) { setBillingErrors(errs); return; }
      setBillingErrors({});
    }
    if (step === 3 && !termsAccepted) {
      setErrors({ terms: 'Trebuie să accepți termenii și condițiile.' });
      return;
    }
    setStep(s => s + 1);
    setErrors({});
  };

  const handlePlaceOrder = () => {
    if (!termsAccepted) {
      setErrors({ terms: 'Trebuie să accepți termenii și condițiile.' });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOrderPlaced(true);
      clearCart();
    }, 2000);
  };

  if (cart.items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Coșul tău este gol.</p>
          <Link to="/collections" className="btn-primary">Explorează Colecțiile</Link>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="page-transition min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
            Comandă Plasată cu Succes!
          </h1>
          <p className="text-gray-600 mb-2">Numărul comenzii tale: <strong className="text-purple-800">#{orderNumber}</strong></p>
          <p className="text-gray-500 text-sm mb-6">
            Vei primi o confirmare pe email. Comanda ta va fi procesată în cel mai scurt timp.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/" className="btn-primary">Înapoi Acasă</Link>
            <Link to="/collections" className="btn-secondary">Continuă Cumpărăturile</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-transition min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white pt-24 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Coș', to: '/cart' },
            { label: 'Finalizare Comandă' },
          ]} />
          <h1 className="text-3xl font-bold mt-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Finalizare Comandă
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProgressBar currentStep={step} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">

            {/* Step 1: Address */}
            {step === 1 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                  <MapPin className="w-5 h-5 text-purple-700" /> Adresă de Facturare
                </h2>
                <AddressForm
                  data={billing}
                  onChange={(k, v) => { setBilling(b => ({ ...b, [k]: v })); setBillingErrors(e => ({ ...e, [k]: '' })); }}
                  errors={billingErrors}
                  sameAsBilling={sameAsBilling}
                  setSameAsBilling={setSameAsBilling}
                  isBilling
                />
                {!sameAsBilling && (
                  <div className="mt-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Adresă de Livrare</h3>
                    <AddressForm
                      data={shipping}
                      onChange={(k, v) => setShipping(s => ({ ...s, [k]: v }))}
                      errors={{}}
                      isBilling={false}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Shipping Method */}
            {step === 2 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                  <Truck className="w-5 h-5 text-purple-700" /> Metodă de Livrare
                </h2>
                <div className="space-y-3">
                  {shippingMethods.map(method => (
                    <label
                      key={method.id}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        shippingMethod === method.id
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        value={method.id}
                        checked={shippingMethod === method.id}
                        onChange={e => setShippingMethod(e.target.value)}
                        className="w-4 h-4 text-purple-700"
                      />
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${shippingMethod === method.id ? 'bg-purple-100' : 'bg-gray-100'}`}>
                        <method.icon className={`w-5 h-5 ${shippingMethod === method.id ? 'text-purple-700' : 'text-gray-500'}`} />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 text-sm">{method.label}</div>
                        <div className="text-xs text-gray-500">{method.desc}</div>
                      </div>
                      <div className={`font-bold ${method.price === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                        {method.price === 0 ? 'Gratuit' : `${method.price} lei`}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                  <CreditCard className="w-5 h-5 text-purple-700" /> Metodă de Plată
                </h2>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {paymentMethods.map(method => (
                    <label
                      key={method.id}
                      className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        paymentMethod === method.id
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={e => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-purple-700 mt-0.5"
                      />
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{method.label}</div>
                        <div className="text-xs text-gray-500">{method.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4 p-4 bg-gray-50 rounded-xl">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Număr Card *</label>
                      <input
                        type="text"
                        value={card.number}
                        onChange={e => setCard(c => ({ ...c, number: e.target.value.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})/g, '$1 ').trim() }))}
                        className="input-field font-mono"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Titular Card *</label>
                      <input
                        type="text"
                        value={card.name}
                        onChange={e => setCard(c => ({ ...c, name: e.target.value.toUpperCase() }))}
                        className="input-field uppercase"
                        placeholder="ION POPESCU"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Dată Expirare *</label>
                        <input
                          type="text"
                          value={card.expiry}
                          onChange={e => {
                            let v = e.target.value.replace(/\D/g, '');
                            if (v.length >= 2) v = v.slice(0, 2) + '/' + v.slice(2, 4);
                            setCard(c => ({ ...c, expiry: v }));
                          }}
                          className="input-field font-mono"
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CVV *</label>
                        <input
                          type="password"
                          value={card.cvv}
                          onChange={e => setCard(c => ({ ...c, cvv: e.target.value.replace(/\D/g, '').slice(0, 3) }))}
                          className="input-field font-mono"
                          placeholder="•••"
                          maxLength={3}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-5">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={e => { setTermsAccepted(e.target.checked); setErrors({}); }}
                      className="w-4 h-4 text-purple-700 rounded border-gray-300 mt-0.5"
                    />
                    <span className="text-sm text-gray-600">
                      Am citit și accept{' '}
                      <Link to="#" className="text-purple-700 hover:underline font-medium">Termenii și Condițiile</Link>
                      {' '}și{' '}
                      <Link to="#" className="text-purple-700 hover:underline font-medium">Politica de Confidențialitate</Link>.
                    </span>
                  </label>
                  {errors.terms && (
                    <p className="flex items-center gap-1 text-red-500 text-xs mt-1 ml-7">
                      <AlertCircle className="w-3 h-3" /> {errors.terms}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between">
              {step > 1 ? (
                <button onClick={() => setStep(s => s - 1)} className="btn-secondary px-5 py-2.5 text-sm">
                  ← Înapoi
                </button>
              ) : (
                <Link to="/cart" className="btn-secondary px-5 py-2.5 text-sm">
                  ← Coș
                </Link>
              )}
              {step < 3 ? (
                <button onClick={handleNextStep} className="btn-primary flex items-center gap-2 px-6 py-2.5">
                  Continuă <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="btn-primary flex items-center gap-2 px-6 py-2.5 disabled:opacity-70"
                >
                  {loading
                    ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Procesare...</>
                    : <><Lock className="w-4 h-4" /> Plasează Comanda</>
                  }
                </button>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                Sumar Comandă
              </h2>
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {cart.items.map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className={`w-10 h-14 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0`}>
                      <BookOpen className="w-4 h-4 text-white/60" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-900 truncate">{item.title}</p>
                      <p className="text-xs text-gray-400">{item.author}</p>
                      <p className="text-xs text-gray-500">×{item.quantity}</p>
                    </div>
                    <span className="text-xs font-bold text-gray-900 flex-shrink-0">
                      {(item.price * item.quantity).toFixed(2)} lei
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span>{cartTotal.toFixed(2)} lei</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">Reducere</span>
                    <span className="text-green-600">-{discountAmount.toFixed(2)} lei</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Livrare</span>
                  <span className={shippingCostActual === 0 ? 'text-green-600' : ''}>
                    {shippingCostActual === 0 ? 'Gratuită' : `${shippingCostActual} lei`}
                  </span>
                </div>
                <div className="border-t border-gray-100 pt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-purple-800">{total.toFixed(2)} lei</span>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                <Shield className="w-3.5 h-3.5 text-green-500" />
                Plată securizată SSL 256-bit
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
