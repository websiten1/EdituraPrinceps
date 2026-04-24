import { useState } from 'react';
import { CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import { faqs } from '../data/books';

function ContactForm() {
  const [form, setForm]         = useState({ name: '', email: '', phone: '', subject: '', message: '', captcha: '' });
  const [errors, setErrors]     = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]   = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required.';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'A valid email address is required.';
    if (form.phone && !form.phone.match(/^[0-9+\s\-(). ]{7,15}$/)) e.phone = 'Please enter a valid phone number.';
    if (!form.subject) e.subject = 'Please select a subject.';
    if (form.message.trim().length < 20) e.message = 'Message must be at least 20 characters.';
    if (parseInt(form.captcha) !== 8) e.captcha = 'Incorrect answer. Please try again.';
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
      <h3 className="font-display text-h3 text-charcoal mb-2">Message Received</h3>
      <p className="text-sm font-sans text-charcoal-light leading-reading max-w-xs mx-auto mb-6">
        Thank you for writing to us. We will reply within one business day.
      </p>
      <button onClick={() => { setSubmitted(false); setForm({ name:'', email:'', phone:'', subject:'', message:'', captcha:'' }); }}
              className="btn-secondary">
        Send Another Message
      </button>
    </div>
  );

  return (
    <div className="bg-white border border-gray-200 p-6 sm:p-8">
      <h2 className="font-display text-h3 text-charcoal mb-1">Send Us a Message</h2>
      <div className="h-0.5 bg-burgundy w-12 mb-6" />

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field name="name" label="Full Name" required error={errors.name}>
            <input type="text" value={form.name}
                   onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                   className={`field ${errors.name ? 'border-burgundy' : ''}`}
                   placeholder="Ioan Ionescu" />
          </Field>
          <Field name="email" label="Email Address" required error={errors.email}>
            <input type="email" value={form.email}
                   onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                   className={`field ${errors.email ? 'border-burgundy' : ''}`}
                   placeholder="email@example.com" />
          </Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field name="phone" label="Phone (optional)" error={errors.phone}>
            <input type="tel" value={form.phone}
                   onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                   className={`field ${errors.phone ? 'border-burgundy' : ''}`}
                   placeholder="+40 7XX XXX XXX" />
          </Field>
          <Field name="subject" label="Subject" required error={errors.subject}>
            <select value={form.subject}
                    onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    className={`field ${errors.subject ? 'border-burgundy' : ''}`}>
              <option value="">Select a subject</option>
              <option value="general">General Enquiry</option>
              <option value="order">Order Issue</option>
              <option value="partnership">Partnership Proposal</option>
              <option value="press">Press & Media</option>
              <option value="other">Other</option>
            </select>
          </Field>
        </div>
        <Field name="message" label="Message" required error={errors.message}>
          <textarea rows={5} value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className={`field resize-none ${errors.message ? 'border-burgundy' : ''}`}
                    placeholder="Please describe your enquiry in detail…" />
          <p className="text-xs font-sans text-charcoal-lighter mt-1">{form.message.length} chars (min 20)</p>
        </Field>
        <Field name="captcha" label="Verification: What is 3 + 5?" required error={errors.captcha}>
          <input type="number" value={form.captcha}
                 onChange={e => setForm(f => ({ ...f, captcha: e.target.value }))}
                 className={`field w-28 ${errors.captcha ? 'border-burgundy' : ''}`}
                 placeholder="Answer" />
        </Field>
        <button type="submit" disabled={loading}
                className="btn-primary w-full py-3.5 disabled:opacity-60">
          {loading ? 'Sending…' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}

function ContactInfo() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-display text-h3 text-charcoal mb-1">Contact Information</h2>
        <div className="h-0.5 bg-burgundy w-12 mb-5" />
      </div>

      {[
        {
          heading: 'Address',
          lines: ['Str. Literaturii, Nr. 12', 'Iași, 700XXX', 'România'],
          action: { label: 'View on Google Maps →', href: 'https://maps.google.com' },
        },
        {
          heading: 'Telephone',
          lines: ['+40 232 XXX XXX (Office)', '+40 7XX XXX XXX (Mobile)'],
          action: { label: 'Call us →', href: 'tel:+40232XXXXXX' },
        },
        {
          heading: 'Electronic Mail',
          lines: ['contact@edituraprinceps.ro', 'comenzi@edituraprinceps.ro'],
          action: { label: 'Send email →', href: 'mailto:contact@edituraprinceps.ro' },
        },
        {
          heading: 'Office Hours',
          lines: ['Monday – Friday: 9:00 – 18:00', 'Saturday: 10:00 – 14:00', 'Sunday: Closed'],
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

      {/* Map placeholder */}
      <div className="bg-gray-100 h-44 border border-gray-200 flex items-center justify-center relative overflow-hidden">
        <div className="text-center">
          <p className="font-ui text-xs text-charcoal-lighter uppercase tracking-wide mb-1">Location</p>
          <p className="font-serif text-lg text-charcoal-light italic">Iași, România</p>
          <a href="https://maps.google.com" target="_blank" rel="noreferrer"
             className="text-xs font-ui text-burgundy hover:underline uppercase tracking-wide mt-1 block">
            Open Google Maps →
          </a>
        </div>
      </div>

      {/* Social */}
      <div className="bg-white border border-gray-200 p-5">
        <h3 className="font-ui text-xs font-semibold uppercase tracking-wide text-burgundy mb-3 pb-2 border-b border-gray-100">
          Follow Us
        </h3>
        <div className="space-y-2">
          {[
            { label: 'Follow us on Facebook', href: '#' },
            { label: 'Follow us on Instagram', href: '#' },
            { label: 'Connect on LinkedIn', href: '#' },
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
          Frequently Asked Questions
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
          <h1 className="font-display text-h1 text-charcoal mt-4 mb-1">Contact Us</h1>
          <div className="h-0.5 bg-burgundy w-12 mt-3 mb-3" />
          <p className="font-sans text-sm text-charcoal-light max-w-xl leading-reading">
            We welcome your enquiries and correspondence. Our editorial team is here
            to assist readers, authors, and partners.
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
