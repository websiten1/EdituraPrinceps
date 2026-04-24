import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, ChevronDown, ChevronUp, Send, CheckCircle } from 'lucide-react';
import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from '../components/SocialIcons';
import Breadcrumb from '../components/Breadcrumb';
import { faqs } from '../data/books';

function ContactForm() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', subject: '', message: '', captcha: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const captchaAnswer = 7;
  const captchaQuestion = '3 + 4 = ?';

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Numele este obligatoriu.';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Email invalid.';
    if (form.phone && !form.phone.match(/^[0-9+\s\-()]{7,15}$/)) e.phone = 'Număr de telefon invalid.';
    if (!form.subject) e.subject = 'Selectează un subiect.';
    if (form.message.trim().length < 20) e.message = 'Mesajul trebuie să aibă cel puțin 20 de caractere.';
    if (parseInt(form.captcha) !== captchaAnswer) e.captcha = 'Răspuns incorect. Încearcă din nou.';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const Field = ({ name, label, required, children, error }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
          Mesaj Trimis!
        </h3>
        <p className="text-gray-600 mb-6 max-w-sm mx-auto">
          Mulțumim pentru mesajul tău! Îți vom răspunde în cel mai scurt timp posibil, de obicei în 24 de ore.
        </p>
        <button
          onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '', captcha: '' }); }}
          className="btn-primary"
        >
          Trimite Alt Mesaj
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
        Trimite-ne un Mesaj
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field name="name" label="Nume Complet" required error={errors.name}>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className={`input-field ${errors.name ? 'border-red-400' : ''}`}
              placeholder="Ion Popescu"
            />
          </Field>
          <Field name="email" label="Adresă Email" required error={errors.email}>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              className={`input-field ${errors.email ? 'border-red-400' : ''}`}
              placeholder="ion@example.com"
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field name="phone" label="Telefon (opțional)" error={errors.phone}>
            <input
              type="tel"
              value={form.phone}
              onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
              className={`input-field ${errors.phone ? 'border-red-400' : ''}`}
              placeholder="+40 7XX XXX XXX"
            />
          </Field>
          <Field name="subject" label="Subiect" required error={errors.subject}>
            <select
              value={form.subject}
              onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
              className={`input-field ${errors.subject ? 'border-red-400' : ''}`}
            >
              <option value="">Selectează subiectul</option>
              <option value="general">Întrebare Generală</option>
              <option value="order">Problemă Comandă</option>
              <option value="partnership">Parteneriat</option>
              <option value="press">Presă & Media</option>
              <option value="other">Altele</option>
            </select>
          </Field>
        </div>

        <Field name="message" label="Mesaj" required error={errors.message}>
          <textarea
            rows={5}
            value={form.message}
            onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
            className={`input-field resize-none ${errors.message ? 'border-red-400' : ''}`}
            placeholder="Descrie în detaliu întrebarea sau solicitarea ta..."
          />
          <p className="text-xs text-gray-400 mt-1">{form.message.length} caractere (minim 20)</p>
        </Field>

        <Field name="captcha" label={`Verificare: ${captchaQuestion}`} required error={errors.captcha}>
          <input
            type="number"
            value={form.captcha}
            onChange={e => setForm(f => ({ ...f, captcha: e.target.value }))}
            className={`input-field w-32 ${errors.captcha ? 'border-red-400' : ''}`}
            placeholder="Răspuns"
          />
        </Field>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 btn-primary py-3.5 disabled:opacity-70"
        >
          {loading ? (
            <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Se trimite...</>
          ) : (
            <><Send className="w-4 h-4" /> Trimite Mesajul</>
          )}
        </button>
      </form>
    </div>
  );
}

function ContactInfo() {
  const cards = [
    {
      icon: MapPin,
      title: 'Adresă',
      lines: ['Str. Literaturii, Nr. 12', 'Iași, 700XXX, România'],
      action: { label: 'Vezi pe hartă', href: 'https://maps.google.com' },
      color: 'bg-purple-100 text-purple-700',
    },
    {
      icon: Phone,
      title: 'Telefon',
      lines: ['+40 232 XXX XXX', '+40 7XX XXX XXX (Mobil)'],
      action: { label: 'Sună acum', href: 'tel:+40232XXXXXX' },
      color: 'bg-blue-100 text-blue-700',
    },
    {
      icon: Mail,
      title: 'Email',
      lines: ['contact@princesmultimedia.ro', 'comenzi@princesmultimedia.ro'],
      action: { label: 'Trimite email', href: 'mailto:contact@princesmultimedia.ro' },
      color: 'bg-amber-100 text-amber-700',
    },
    {
      icon: Clock,
      title: 'Program',
      lines: ['Luni – Vineri: 09:00 – 18:00', 'Sâmbătă: 10:00 – 14:00'],
      color: 'bg-green-100 text-green-700',
    },
  ];

  return (
    <div className="space-y-4">
      {cards.map(card => (
        <div key={card.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4">
            <div className={`w-11 h-11 rounded-xl ${card.color} flex items-center justify-center flex-shrink-0`}>
              <card.icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-sm mb-1">{card.title}</h3>
              {card.lines.map((line, i) => (
                <p key={i} className="text-sm text-gray-600">{line}</p>
              ))}
              {card.action && (
                <a
                  href={card.action.href}
                  target={card.action.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="inline-block mt-2 text-xs text-purple-700 font-medium hover:underline"
                >
                  {card.action.label} →
                </a>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Social */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h3 className="font-semibold text-gray-900 text-sm mb-3">Urmărește-ne</h3>
        <div className="flex items-center gap-3">
          {[
            { icon: FacebookIcon, href: '#', bg: 'bg-blue-600', label: 'Facebook' },
            { icon: InstagramIcon, href: '#', bg: 'bg-gradient-to-br from-purple-600 to-pink-500', label: 'Instagram' },
            { icon: LinkedinIcon, href: '#', bg: 'bg-blue-700', label: 'LinkedIn' },
            { icon: YoutubeIcon, href: '#', bg: 'bg-red-600', label: 'YouTube' },
          ].map(({ icon: Icon, href, bg, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center text-white hover:opacity-80 transition-opacity shadow-sm`}
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>

      {/* Map placeholder */}
      <div className="bg-gray-200 rounded-2xl overflow-hidden h-48 flex items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400" />
        <div className="relative z-10 text-center">
          <MapPin className="w-8 h-8 text-gray-500 mx-auto mb-2" />
          <p className="text-sm text-gray-600 font-medium">Iași, România</p>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-purple-700 hover:underline mt-1 block"
          >
            Deschide Google Maps →
          </a>
        </div>
      </div>
    </div>
  );
}

function FAQSection() {
  const [open, setOpen] = useState(null);

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="section-title mb-3">Întrebări Frecvente</h2>
          <p className="text-gray-500">Găsește rapid răspunsul la întrebarea ta</p>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900 pr-4 text-sm sm:text-base">{faq.question}</span>
                {open === i
                  ? <ChevronUp className="w-5 h-5 text-purple-700 flex-shrink-0" />
                  : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                }
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100">
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
    <div className="page-transition min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Contact' }]} />
          <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
            Contactează-ne
          </h1>
          <p className="text-blue-200 text-lg max-w-xl">
            Suntem bucuroși să te ajutăm! Trimite-ne un mesaj și îți vom răspunde în cel mai scurt timp.
          </p>
        </div>
      </div>

      {/* Main */}
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

      <FAQSection />
    </div>
  );
}
