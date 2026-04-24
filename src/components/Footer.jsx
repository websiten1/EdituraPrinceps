import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [email, setEmail]         = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = e => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  const cols = {
    about: {
      heading: "Prince's Multimedia",
      body: "A distinguished Romanian publishing house dedicated to preserving and celebrating the literary heritage of Romania since 1999.",
      links: [
        { label: 'Follow us on Facebook', href: '#' },
        { label: 'Follow us on Instagram', href: '#' },
        { label: 'Follow us on LinkedIn', href: '#' },
      ],
    },
    collections: {
      heading: 'Collections',
      links: [
        { label: 'Poetry', to: '/collections?category=Poetry' },
        { label: 'Prose', to: '/collections?category=Prose' },
        { label: 'Philosophy', to: '/collections?category=Philosophy' },
        { label: 'Literary Criticism', to: '/collections?category=Literary Criticism' },
        { label: 'Audiobooks', to: '/collections?category=Audiobooks' },
      ],
    },
    information: {
      heading: 'Information',
      links: [
        { label: 'Frequently Asked Questions', to: '/contact' },
        { label: 'Shipping Policy', to: '/contact' },
        { label: 'Returns & Exchanges', to: '/contact' },
        { label: 'Privacy Policy', to: '#' },
        { label: 'Terms & Conditions', to: '#' },
      ],
    },
    contact: {
      heading: 'Contact',
      items: [
        { label: 'Address', value: 'Str. Literaturii 12, Iași, România' },
        { label: 'Phone', value: '+40 232 XXX XXX' },
        { label: 'Email', value: 'contact@princesmultimedia.ro' },
        { label: 'Hours', value: 'Mon–Fri 9:00–18:00' },
      ],
    },
  };

  return (
    <footer className="bg-forest-800 text-cream">

      {/* Top gold line */}
      <div className="h-px bg-gold/60" />

      {/* Newsletter strip */}
      <div className="border-b border-forest-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8
                        flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex-1">
            <h3 className="font-serif text-h4 text-cream mb-1">Subscribe to Our Newsletter</h3>
            <p className="text-sm font-sans text-cream/70">
              New titles, literary notes, and exclusive offers — delivered to your inbox.
            </p>
          </div>
          {subscribed ? (
            <p className="text-sm font-sans text-gold italic">Thank you for subscribing.</p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-0 w-full sm:w-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="px-4 py-2.5 bg-forest-900 border border-forest-700
                           text-sm font-sans text-cream placeholder-cream/40
                           focus:outline-none focus:border-gold w-full sm:w-64"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-burgundy-700 text-cream text-sm font-sans font-bold
                           uppercase tracking-widest border border-burgundy-700
                           hover:bg-burgundy-800 transition-colors duration-200 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14
                      grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* About */}
        <div>
          <h4 className="font-serif text-base text-gold mb-4 pb-2 border-b border-forest-700">
            {cols.about.heading}
          </h4>
          <p className="text-sm font-sans text-cream/70 leading-reading mb-5">
            {cols.about.body}
          </p>
          <ul className="space-y-2">
            {cols.about.links.map(l => (
              <li key={l.label}>
                <a href={l.href}
                   className="text-xs font-sans text-cream/60 hover:text-gold
                              transition-colors duration-200 uppercase tracking-widest">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Collections */}
        <div>
          <h4 className="font-serif text-base text-gold mb-4 pb-2 border-b border-forest-700">
            {cols.collections.heading}
          </h4>
          <ul className="space-y-2">
            {cols.collections.links.map(l => (
              <li key={l.label}>
                <Link to={l.to}
                      className="text-sm font-sans text-cream/70 hover:text-cream
                                 transition-colors duration-200">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Information */}
        <div>
          <h4 className="font-serif text-base text-gold mb-4 pb-2 border-b border-forest-700">
            {cols.information.heading}
          </h4>
          <ul className="space-y-2">
            {cols.information.links.map(l => (
              <li key={l.label}>
                <Link to={l.to}
                      className="text-sm font-sans text-cream/70 hover:text-cream
                                 transition-colors duration-200">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-serif text-base text-gold mb-4 pb-2 border-b border-forest-700">
            {cols.contact.heading}
          </h4>
          <dl className="space-y-3">
            {cols.contact.items.map(item => (
              <div key={item.label}>
                <dt className="text-xs font-sans text-gold/70 uppercase tracking-widest mb-0.5">
                  {item.label}
                </dt>
                <dd className="text-sm font-sans text-cream/80">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-forest-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5
                        flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs font-sans text-cream/50">
            © {new Date().getFullYear()} Prince's Multimedia. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Visa', 'Mastercard', 'PayPal', 'Bank Transfer'].map(m => (
              <span key={m} className="text-xs font-sans text-cream/40 uppercase tracking-widest">
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
