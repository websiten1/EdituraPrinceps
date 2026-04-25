import { useState } from 'react';
import { CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import { faqs } from '../data/books';

function ContactForm() {
  const [form, setForm]           = useState({ name: '', email: '', phone: '', subject: '', message: '', captcha: '' });
  const [errors, setErrors]       = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Numele complet este obligatoriu.';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'O adresă de email validă este obligatorie.';
    if (form.phone && !form.phone.match(/^[0-9+\s\-(). ]{7,15}$/)) e.phone = 'Introduceți un număr de telefon valid.';
    if (!form.subject) e.subject = 'Selectați un subiect.';
    if (form.message.trim().length < 20) e.message = 'Mesajul trebuie să aibă cel puțin 20 de caractere.';
    if (parseInt(form.captcha) !== 8) e.captcha = 'Răspuns incorect. Încearcă din nou.';
    return e;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const err = validate();
    if (Object.keys(err).length) { setErrors(err); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1400);
  };

  const Field = ({ name, label, required, error, children }) => (
    <div>
      <label className="field-label">{label}{required && ' *'}</label>
      {children}
      {error && <p className="text-xs font-sans text-burgundy mt-1">{error}</p>}
    </div>
  );

  if (submitted) return (
    <div className="bg-white border border-gray-200 p-10 text-center">
      <CheckCircle className="w-12 h-12 text-forest-800 mx-auto mb-4" />
      <h3 className="font-display text-h3 text-charcoal mb-2">Mesaj Primit</h3>
      <p className="text-sm font-sans text-charcoal-light leading-reading max-w-xs mx-auto mb-6">
        Vă mulțumim că ne-ați scris. Vom răspunde în cel mult o zi lucrătoare.
      </p>
      <button onClick={() => { setSubmitted(false); setForm({ name:'', email:'', phone:'', subject:'', message:'', captcha:'' }); }}
              className="btn-secondary">
        Trimite un Alt Mesaj
      </button>
    </div>
  );

  return (
    <div className="bg-white border border-gray-200 p-6 sm:p-8">
      <h2 className="font-display text-h3 text-charcoal mb-1">Trimite-ne un Mesaj</h2>
      <div className="h-0.5 bg-burgundy w-12 mb-6" />

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field name="name" label="Nume Complet" required error={errors.name}>
            <input type="text" value={form.name}
                   onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                   className={`field ${errors.name ? 'border-burgundy' : ''}`}
                   placeholder="Ioan Ionescu" />
          </Field>
          <Field name="email" label="Adresă de Email" required error={errors.email}>
            <input type="email" value={form.email}
                   onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                   className={`field ${errors.email ? 'border-burgundy' : ''}`}
                   placeholder="email@exemplu.ro" />
          </Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field name="phone" label="Telefon (opțional)" error={errors.phone}>
            <input type="tel" value={form.phone}
                   onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                   className={`field ${errors.phone ? 'border-burgundy' : ''}`}
                   placeholder="+40 7XX XXX XXX" />
          </Field>
          <Field name="subject" label="Subiect" required error={errors.subject}>
            <select value={form.subject}
                    onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    className={`field ${errors.subject ? 'border-burgundy' : ''}`}>
              <option value="">Selectează un subiect</option>
              <option value="general">Întrebare Generală</option>
              <option value="order">Problemă cu Comanda</option>
              <option value="partnership">Propunere de Parteneriat</option>
              <option value="press">Presă și Media</option>
              <option value="other">Altele</option>
            </select>
          </Field>
        </div>
        <Field name="message" label="Mesaj" required error={errors.message}>
          <textarea rows={5} value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className={`field resize-none ${errors.message ? 'border-burgundy' : ''}`}
                    placeholder="Descrieți în detaliu întrebarea dumneavoastră…" />
          <p className="text-xs font-sans text-charcoal-lighter mt-1">{form.message.length} caractere (min 20)</p>
        </Field>
        <Field name="captcha" label="Verificare: Cât face 3 + 5?" required error={errors.captcha}>
          <input type="number" value={form.captcha}
                 onChange={e => setForm(f => ({ ...f, captcha: e.target.value }))}
                 className={`field w-28 ${errors.captcha ? 'border-burgundy' : ''}`}
                 placeholder="Răspuns" />
        </Field>
        <button type="submit" disabled={loading}
                className="btn-primary w-full py-3.5 disabled:opacity-60">
          {loading ? 'Se trimite…' : 'Trimite Mesajul'}
        </button>
      </form>
    </div>
  );
}

function ContactInfo() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-display text-h3 text-charcoal mb-1">Informații de Contact</h2>
        <div className="h-0.5 bg-burgundy w-12 mb-5" />
      </div>

      {[
        {
          heading: 'Adresă',
          lines: ['Strada Păcurari nr. 4', 'Iași, Cod Poștal: 700511', 'România'],
          action: { label: 'Vezi pe Google Maps →', href: 'https://maps.google.com/?q=Iași+Strada+Păcurari+4+700511+România' },
        },
        {
          heading: 'Telefon',
          lines: ['0332/409829', '0332/409830 (Fax)', '0745404435 – Director: Filomena Corbu'],
          action: { label: 'Sună-ne →', href: 'tel:0332409829' },
        },
        {
          heading: 'Poștă Electronică',
          lines: ['princepsmultimedia@gmail.com'],
          action: { label: 'Trimite email →', href: 'mailto:princepsmultimedia@gmail.com' },
        },
        {
          heading: 'Website',
          lines: ['www.princepsmultimedia.ro'],
          action: { label: 'Deschide site-ul →', href: 'http://www.princepsmultimedia.ro' },
        },
      ].map(card => (
        <div key={card.heading} className="bg-white border border-gray-200 p-5">
          <h3 className="font-ui text-xs font-semibold uppercase tracking-wide text-burgundy mb-3 pb-2
                         border-b border-gray-100">
            {card.heading}
          </h3>
          {card.lines.map(line => (
            <p key={line} className="text-sm font-sans text-charcoal">{line}</p>
          ))}
          {card.action && (
            <a href={card.action.href}
               target={card.action.href.startsWith('http') ? '_blank' : undefined}
               rel="noreferrer"
               className="inline-block mt-2 text-xs font-ui text-burgundy hover:underline uppercase tracking-wide">
              {card.action.label}
            </a>
          )}
        </div>
      ))}

      {/* Placeholder hartă */}
      <div className="bg-gray-100 h-44 border border-gray-200 flex items-center justify-center relative overflow-hidden">
        <div className="text-center">
          <p className="font-ui text-xs text-charcoal-lighter uppercase tracking-wide mb-1">Locație</p>
          <p className="font-serif text-lg text-charcoal-light italic">Strada Păcurari nr. 4, Iași</p>
          <a href="https://maps.google.com/?q=Iași+Strada+Păcurari+4+700511+România" target="_blank" rel="noreferrer"
             className="text-xs font-ui text-burgundy hover:underline uppercase tracking-wide mt-1 block">
            Deschide Google Maps →
          </a>
        </div>
      </div>

      {/* Rețele sociale */}
      <div className="bg-white border border-gray-200 p-5">
        <h3 className="font-ui text-xs font-semibold uppercase tracking-wide text-burgundy mb-3 pb-2 border-b border-gray-100">
          Urmărește-ne
        </h3>
        <div className="space-y-2">
          {[
            { label: 'Urmărește-ne pe Facebook', href: '#' },
            { label: 'Urmărește-ne pe Instagram', href: '#' },
            { label: 'Conectează-te pe LinkedIn', href: '#' },
          ].map(s => (
            <a key={s.label} href={s.href}
               className="block text-sm font-ui text-burgundy hover:underline uppercase tracking-wide">
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section className="bg-gray-50 border-t border-gray-100 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-h2 text-charcoal text-center mb-3">
          Întrebări Frecvente
        </h2>
        <div className="h-0.5 bg-burgundy w-12 mx-auto mb-10" />

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white border border-gray-200 overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left
                           hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="font-serif text-base text-charcoal pr-4">{faq.question}</span>
                {open === i
                  ? <ChevronUp className="w-4 h-4 text-burgundy flex-shrink-0" />
                  : <ChevronDown className="w-4 h-4 text-charcoal-lighter flex-shrink-0" />
                }
              </button>
              {open === i && (
                <div className="px-6 pb-5 pt-1 text-sm font-sans text-charcoal-light
                                leading-reading border-t border-gray-100">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Contact() {
  return (
    <div className="fade-in min-h-screen bg-white">
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Breadcrumb items={[{ label: 'Contact' }]} />
          <h1 className="font-display text-h1 text-charcoal mt-4 mb-1">Contactează-ne</h1>
          <div className="h-0.5 bg-burgundy w-12 mt-3 mb-3" />
          <p className="font-sans text-sm text-charcoal-light max-w-xl leading-reading">
            Suntem bucuroși să primim întrebările și corespondența dumneavoastră. Echipa noastră
            editorială este disponibilă să asiste cititorii, autorii și partenerii.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
          <div className="lg:col-span-2">
            <ContactInfo />
          </div>
        </div>
      </div>

      <FAQ />
    </div>
  );
}
