import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ChevronRight, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Breadcrumb from '../components/Breadcrumb';

const STEPS = [
  { id: 1, label: 'Facturare' },
  { id: 2, label: 'Livrare' },
  { id: 3, label: 'Plată' },
];

const shippingMethods = [
  { id: 'standard', label: 'Livrare Standard',    desc: '3–5 zile lucrătoare',   price: 15 },
  { id: 'express',  label: 'Livrare Express',      desc: '1–2 zile lucrătoare',   price: 25 },
  { id: 'pickup',   label: 'Ridicare din Magazin', desc: 'Iași — Fără cost',       price: 0  },
];

const paymentMethods = [
  { id: 'card',     label: 'Card de Credit / Debit', desc: 'Visa, Mastercard, Maestro' },
  { id: 'transfer', label: 'Transfer Bancar',         desc: 'Procesare în 1–2 zile bancare' },
  { id: 'paypal',   label: 'PayPal',                  desc: 'Plată rapidă și sigură' },
  { id: 'ramburs',  label: 'Ramburs',                 desc: 'Plată la primirea coletului' },
];

function Progress({ current }) {
  return (
    <div className="flex items-center gap-0 mb-10">
      {STEPS.map((step, i) => (
        <div key={step.id} className={`flex items-center ${i < STEPS.length - 1 ? 'flex-1' : ''}`}>
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className={`w-7 h-7 flex items-center justify-center text-xs font-ui font-semibold
                             border-2 transition-colors
                             ${step.id < current  ? 'border-burgundy bg-burgundy text-white'
                             : step.id === current ? 'border-burgundy bg-white text-burgundy'
                                                   : 'border-gray-200 text-charcoal-lighter'}`}>
              {step.id < current ? <Check className="w-3.5 h-3.5" /> : step.id}
            </div>
            <span className={`hidden sm:block text-xs font-ui uppercase tracking-wide
                              ${step.id === current ? 'text-burgundy font-semibold'
                              : step.id < current  ? 'text-charcoal-light'
                                                   : 'text-charcoal-lighter'}`}>
              {step.label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`flex-1 h-px mx-3 ${step.id < current ? 'bg-burgundy' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function Field({ label, required, error, children }) {
  return (
    <div>
      <label className="field-label">{label}{required && ' *'}</label>
      {children}
      {error && <p className="text-xs font-sans text-burgundy mt-1">{error}</p>}
    </div>
  );
}

function AddressForm({ data, setData, errors, showSameAs, sameAs, setSameAs }) {
  const set = (k, v) => setData(d => ({ ...d, [k]: v }));
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field label="Prenume" required error={errors?.firstName}>
        <input className={`field ${errors?.firstName ? 'border-burgundy' : ''}`}
               value={data.firstName || ''} onChange={e => set('firstName', e.target.value)} />
      </Field>
      <Field label="Nume de Familie" required error={errors?.lastName}>
        <input className={`field ${errors?.lastName ? 'border-burgundy' : ''}`}
               value={data.lastName || ''} onChange={e => set('lastName', e.target.value)} />
      </Field>
      <Field label="Adresă de Email" required error={errors?.email}>
        <input type="email" className={`field sm:col-span-2 ${errors?.email ? 'border-burgundy' : ''}`}
               value={data.email || ''} onChange={e => set('email', e.target.value)} />
      </Field>
      <Field label="Număr de Telefon" required error={errors?.phone}>
        <input className={`field ${errors?.phone ? 'border-burgundy' : ''}`}
               value={data.phone || ''} onChange={e => set('phone', e.target.value)}
               placeholder="+40 7XX XXX XXX" />
      </Field>
      <div className="sm:col-span-2">
        <Field label="Adresă Stradală" required error={errors?.address}>
          <input className={`field ${errors?.address ? 'border-burgundy' : ''}`}
                 value={data.address || ''} onChange={e => set('address', e.target.value)}
                 placeholder="Stradă, număr, apartament" />
        </Field>
      </div>
      <Field label="Oraș" required error={errors?.city}>
        <input className={`field ${errors?.city ? 'border-burgundy' : ''}`}
               value={data.city || ''} onChange={e => set('city', e.target.value)} />
      </Field>
      <Field label="Județ" required error={errors?.county}>
        <select className={`field ${errors?.county ? 'border-burgundy' : ''}`}
                value={data.county || ''} onChange={e => set('county', e.target.value)}>
          <option value="">Selectează județul</option>
          {['Alba','Arad','Argeș','Bacău','Bihor','Brașov','București','Cluj',
            'Constanța','Dolj','Galați','Iași','Ilfov','Mureș','Prahova',
            'Sibiu','Suceava','Timiș'].map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </Field>
      <Field label="Cod Poștal">
        <input className="field" value={data.zip || ''} onChange={e => set('zip', e.target.value)} />
      </Field>
      {showSameAs && (
        <div className="sm:col-span-2 mt-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={sameAs} onChange={e => setSameAs(e.target.checked)}
                   className="w-4 h-4 border-gray-300 text-burgundy focus:ring-burgundy accent-burgundy" />
            <span className="text-sm font-sans text-charcoal">
              Adresa de livrare este aceeași cu adresa de facturare
            </span>
          </label>
        </div>
      )}
    </div>
  );
}

export default function Checkout() {
  const { cart, cartTotal, discountAmount, shippingCost, clearCart } = useApp();
  const [step, setStep]               = useState(1);
  const [billing,  setBilling]        = useState({});
  const [shipping, setShipping]       = useState({});
  const [sameAs,   setSameAs]         = useState(true);
  const [shipMethod, setShipMethod]   = useState('standard');
  const [payMethod,  setPayMethod]    = useState('card');
  const [card,     setCard]           = useState({ number: '', expiry: '', cvv: '', name: '' });
  const [terms,    setTerms]          = useState(false);
  const [billingErr, setBillingErr]   = useState({});
  const [errors,   setErrors]         = useState({});
  const [loading,  setLoading]        = useState(false);
  const [done,     setDone]           = useState(false);

  const selShip  = shippingMethods.find(m => m.id === shipMethod);
  const shipCost = selShip?.price ?? shippingCost;
  const total    = cartTotal - discountAmount + shipCost;
  const orderNum = `EP-${Date.now().toString().slice(-6)}`;

  const validateBilling = () => {
    const e = {};
    ['firstName','lastName','phone','address','city','county'].forEach(k => {
      if (!billing[k]) e[k] = 'Câmp obligatoriu';
    });
    if (!billing.email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Email valid obligatoriu';
    return e;
  };

  const nextStep = () => {
    if (step === 1) {
      const err = validateBilling();
      if (Object.keys(err).length) { setBillingErr(err); return; }
      setBillingErr({});
    }
    setStep(s => s + 1);
    setErrors({});
  };

  const placeOrder = () => {
    if (!terms) { setErrors({ terms: 'Trebuie să accepți termenii și condițiile.' }); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); clearCart(); }, 1800);
  };

  if (cart.items.length === 0 && !done) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <p className="font-sans text-sm text-charcoal-light mb-4">Coșul tău este gol.</p>
        <Link to="/collections" className="btn-primary">Răsfoiește Colecția</Link>
      </div>
    </div>
  );

  if (done) return (
    <div className="fade-in min-h-screen bg-white flex items-center justify-center px-4">
      <div className="bg-white border border-gray-200 max-w-lg w-full p-10 text-center shadow-classic-md">
        <CheckCircle className="w-14 h-14 text-forest-800 mx-auto mb-5" />
        <h1 className="font-display text-h2 text-charcoal mb-2">Comandă Confirmată</h1>
        <div className="h-0.5 bg-burgundy w-12 mx-auto mb-5" />
        <p className="font-sans text-sm text-charcoal-light mb-2">
          Referință comandă: <strong className="text-burgundy font-mono">#{orderNum}</strong>
        </p>
        <p className="font-sans text-sm text-charcoal-light mb-8 leading-reading">
          Mulțumim pentru comandă. O confirmare a fost trimisă la adresa ta de email.
          Cărțile vor fi expediate în 1–2 zile lucrătoare.
        </p>
        <div className="flex gap-3 justify-center">
          <Link to="/" className="btn-primary px-6">Înapoi Acasă</Link>
          <Link to="/collections" className="btn-secondary px-6">Continuă Navigarea</Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fade-in min-h-screen bg-white">
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumb items={[{ label: 'Coș', to: '/cart' }, { label: 'Finalizare Comandă' }]} />
          <h1 className="font-display text-h1 text-charcoal mt-4">Finalizare Comandă</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Progress current={step} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Panoul principal */}
          <div className="lg:col-span-2 space-y-6">

            {step === 1 && (
              <div className="bg-white border border-gray-200">
                <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
                  <h2 className="font-display text-xl text-charcoal">Adresă de Facturare</h2>
                </div>
                <div className="p-6">
                  <AddressForm data={billing} setData={setBilling} errors={billingErr}
                               showSameAs sameAs={sameAs} setSameAs={setSameAs} />
                  {!sameAs && (
                    <div className="mt-8 pt-6 border-t border-gray-100">
                      <h3 className="font-display text-lg text-charcoal mb-5">Adresă de Livrare</h3>
                      <AddressForm data={shipping} setData={setShipping} errors={{}} showSameAs={false} />
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white border border-gray-200">
                <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
                  <h2 className="font-display text-xl text-charcoal">Metodă de Livrare</h2>
                </div>
                <div className="p-6 space-y-3">
                  {shippingMethods.map(m => (
                    <label key={m.id}
                           className={`flex items-center gap-4 p-4 border-2 cursor-pointer
                                       transition-colors duration-200
                                       ${shipMethod === m.id
                                         ? 'border-burgundy bg-burgundy-50'
                                         : 'border-gray-200 hover:border-gray-300'}`}>
                      <input type="radio" value={m.id} checked={shipMethod === m.id}
                             onChange={e => setShipMethod(e.target.value)}
                             className="w-4 h-4 text-burgundy focus:ring-burgundy accent-burgundy" />
                      <div className="flex-1">
                        <p className="font-ui text-sm font-semibold text-charcoal uppercase tracking-wide">
                          {m.label}
                        </p>
                        <p className="font-sans text-xs text-charcoal-light">{m.desc}</p>
                      </div>
                      <span className={`font-serif text-base font-semibold ${m.price === 0 ? 'text-forest-800' : 'text-charcoal'}`}>
                        {m.price === 0 ? 'Gratuit' : `${m.price} lei`}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white border border-gray-200">
                <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
                  <h2 className="font-display text-xl text-charcoal">Metodă de Plată</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {paymentMethods.map(m => (
                      <label key={m.id}
                             className={`flex items-start gap-3 p-4 border-2 cursor-pointer
                                         transition-colors duration-200
                                         ${payMethod === m.id
                                           ? 'border-burgundy bg-burgundy-50'
                                           : 'border-gray-200 hover:border-gray-300'}`}>
                        <input type="radio" value={m.id} checked={payMethod === m.id}
                               onChange={e => setPayMethod(e.target.value)}
                               className="w-4 h-4 mt-0.5 text-burgundy focus:ring-burgundy accent-burgundy" />
                        <div>
                          <p className="font-ui text-sm font-semibold text-charcoal">{m.label}</p>
                          <p className="font-sans text-xs text-charcoal-light">{m.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>

                  {payMethod === 'card' && (
                    <div className="bg-gray-50 border border-gray-200 p-5 space-y-4">
                      <h3 className="font-ui text-xs font-semibold uppercase tracking-wide text-charcoal mb-4">
                        Detalii Card
                      </h3>
                      <Field label="Număr Card *">
                        <input className="field font-mono" placeholder="1234 5678 9012 3456"
                               value={card.number}
                               onChange={e => setCard(c => ({ ...c, number: e.target.value.replace(/\D/g,'').slice(0,16).replace(/(\d{4})/g,'$1 ').trim() }))}
                               maxLength={19} />
                      </Field>
                      <Field label="Titular Card *">
                        <input className="field uppercase"
                               value={card.name}
                               onChange={e => setCard(c => ({ ...c, name: e.target.value.toUpperCase() }))}
                               placeholder="NUME PRENUME" />
                      </Field>
                      <div className="grid grid-cols-2 gap-4">
                        <Field label="Valabilitate *">
                          <input className="field font-mono" placeholder="LL/AA" maxLength={5}
                                 value={card.expiry}
                                 onChange={e => {
                                   let v = e.target.value.replace(/\D/g,'');
                                   if (v.length >= 2) v = v.slice(0,2)+'/'+v.slice(2,4);
                                   setCard(c => ({ ...c, expiry: v }));
                                 }} />
                        </Field>
                        <Field label="CVV *">
                          <input type="password" className="field font-mono" placeholder="•••"
                                 maxLength={3} value={card.cvv}
                                 onChange={e => setCard(c => ({ ...c, cvv: e.target.value.replace(/\D/g,'').slice(0,3) }))} />
                        </Field>
                      </div>
                    </div>
                  )}

                  <div className="mt-5">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" checked={terms} onChange={e => { setTerms(e.target.checked); setErrors({}); }}
                             className="w-4 h-4 mt-0.5 border-gray-300 text-burgundy focus:ring-burgundy accent-burgundy" />
                      <span className="text-sm font-sans text-charcoal-light leading-reading">
                        Am citit și sunt de acord cu{' '}
                        <Link to="#" className="text-burgundy hover:underline">Termenii și Condițiile</Link>
                        {' '}și{' '}
                        <Link to="#" className="text-burgundy hover:underline">Politica de Confidențialitate</Link>.
                      </span>
                    </label>
                    {errors.terms && (
                      <p className="flex items-center gap-1 text-xs font-sans text-burgundy mt-1 ml-7">
                        <AlertCircle className="w-3 h-3" /> {errors.terms}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Navigare */}
            <div className="flex items-center justify-between">
              {step > 1
                ? <button onClick={() => setStep(s => s - 1)} className="btn-secondary px-5 py-2.5 text-sm">← Înapoi</button>
                : <Link to="/cart" className="btn-secondary px-5 py-2.5 text-sm">← Înapoi la Coș</Link>
              }
              {step < 3
                ? <button onClick={nextStep} className="btn-primary flex items-center gap-2 px-6 py-2.5">
                    Continuă <ChevronRight className="w-4 h-4" />
                  </button>
                : <button onClick={placeOrder} disabled={loading}
                          className="btn-primary flex items-center gap-2 px-6 py-2.5 disabled:opacity-60">
                    <Lock className="w-4 h-4" />
                    {loading ? 'Se procesează…' : 'Plasează Comanda'}
                  </button>
              }
            </div>
          </div>

          {/* Rezumat comandă */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 sticky top-24">
              <div className="bg-gray-50 border-b border-gray-200 px-5 py-4">
                <h3 className="font-display text-lg text-charcoal">Rezumatul Comenzii</h3>
              </div>
              <div className="p-5 max-h-64 overflow-y-auto space-y-3 border-b border-gray-100 scrollbar-thin">
                {cart.items.map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-8 h-11 flex-shrink-0 flex items-center justify-center
                                    text-white/20 text-xs font-serif"
                         style={{ backgroundColor: item.coverColor || '#6B4C4C' }}>❧</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-serif text-charcoal truncate">{item.title}</p>
                      <p className="text-xs font-sans text-charcoal-lighter">×{item.quantity}</p>
                    </div>
                    <span className="text-xs font-ui font-semibold text-charcoal flex-shrink-0">
                      {(item.price * item.quantity).toFixed(2)} lei
                    </span>
                  </div>
                ))}
              </div>
              <div className="p-5 space-y-2 border-b border-gray-100 text-sm font-sans">
                <div className="flex justify-between">
                  <span className="text-charcoal-light">Subtotal</span>
                  <span>{cartTotal.toFixed(2)} lei</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-forest-800">
                    <span>Reducere</span>
                    <span>−{discountAmount.toFixed(2)} lei</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-charcoal-light">Livrare</span>
                  <span className={shipCost === 0 ? 'text-forest-800' : ''}>
                    {shipCost === 0 ? 'Gratuită' : `${shipCost} lei`}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-baseline">
                  <span className="font-ui text-xs font-semibold uppercase tracking-wide">Total</span>
                  <span className="font-display text-2xl text-burgundy">{total.toFixed(2)} lei</span>
                </div>
                <p className="text-xs font-sans text-charcoal-lighter mt-4 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-forest-800" />
                  Securizat prin criptare SSL 256-bit
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
