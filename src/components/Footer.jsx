import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [email, setEmail]           = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = e => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  return (
    <footer className="bg-white border-t-2 border-burgundy">

      {/* Newsletter strip */}
      <div className="border-b border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8
                        flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex-1">
            <h3 className="font-display text-xl text-charcoal mb-1">Subscribe to Our Newsletter</h3>
            <p className="text-sm font-sans text-charcoal-light">
              New titles, literary notes, and exclusive offers — delivered to your inbox.
            </p>
          </div>
          {subscribed ? (
            <p className="text-sm font-sans text-burgundy italic font-medium">Thank you for subscribing.</p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-0 w-full sm:w-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="px-4 py-2.5 bg-white border border-gray-200
                           text-sm font-sans text-charcoal placeholder-charcoal-lighter
                           focus:outline-none focus:border-burgundy w-full sm:w-64
                           border-r-0"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-burgundy text-white text-sm font-ui font-semibold
                           uppercase tracking-wide border border-burgundy
                           hover:bg-burgundy-800 transition-colors duration-200 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12
                      grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* About */}
        <div>
          <h4 className="font-display text-lg text-charcoal mb-1">Prince's Multimedia</h4>
          <div className="h-px bg-gray-200 w-full mb-4" />
          <p className="text-sm font-sans text-charcoal-light leading-reading mb-5">
            A distinguished Romanian publishing house dedicated to preserving and celebrating the
            literary heritage of Romania since 1999.
          </p>
          <ul className="space-y-2">
            {[
              { label: 'Facebook', href: '#' },
              { label: 'Instagram', href: '#' },
              { label: 'LinkedIn', href: '#' },
            ].map(l => (
              <li key={l.label}>
                <a href={l.href}
                   className="text-xs font-ui text-charcoal-light hover:text-burgundy
                              transition-colors duration-200 uppercase tracking-wide">
                  {l.label} →
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Collections */}
        <div>
          <h4 className="font-display text-lg text-charcoal mb-1">Collections</h4>
          <div className="h-px bg-gray-200 w-full mb-4" />
          <ul className="space-y-2">
            {[
              { label: 'Poetry', to: '/collections?category=Poetry' },
              { label: 'Prose', to: '/collections?category=Prose' },
              { label: 'Philosophy', to: '/collections?category=Philosophy' },
              { label: 'Literary Criticism', to: '/collections?category=Literary Criticism' },
              { label: 'Audiobooks', to: '/collections?category=Audiobooks' },
            ].map(l => (
              <li key={l.label}>
                <Link to={l.to}
                      className="text-sm font-sans text-charcoal-light hover:text-burgundy
                                 transition-colors duration-200">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Information */}
        <div>
          <h4 className="font-display text-lg text-charcoal mb-1">Information</h4>
          <div className="h-px bg-gray-200 w-full mb-4" />
          <ul className="space-y-2">
            {[
              { label: 'Frequently Asked Questions', to: '/contact' },
              { label: 'Shipping Policy', to: '/contact' },
              { label: 'Returns & Exchanges', to: '/contact' },
              { label: 'Privacy Policy', to: '#' },
              { label: 'Terms & Conditions', to: '#' },
            ].map(l => (
              <li key={l.label}>
                <Link to={l.to}
                      className="text-sm font-sans text-charcoal-light hover:text-burgundy
                                 transition-colors duration-200">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display text-lg text-charcoal mb-1">Contact</h4>
          <div className="h-px bg-gray-200 w-full mb-4" />
          <dl className="space-y-3">
            {[
              { label: 'Address', value: 'Str. Literaturii 12, Iași, România' },
              { label: 'Phone', value: '+40 232 XXX XXX' },
              { label: 'Email', value: 'contact@princesmultimedia.ro' },
              { label: 'Hours', value: 'Mon–Fri 9:00–18:00' },
            ].map(item => (
              <div key={item.label}>
                <dt className="text-xs font-ui text-charcoal-lighter uppercase tracking-wide mb-0.5">
                  {item.label}
                </dt>
                <dd className="text-sm font-sans text-charcoal">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5
                        flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs font-sans text-charcoal-lighter">
            © {new Date().getFullYear()} Prince's Multimedia. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Visa', 'Mastercard', 'PayPal', 'Bank Transfer'].map(m => (
              <span key={m} className="text-xs font-ui text-charcoal-lighter uppercase tracking-wide">
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
