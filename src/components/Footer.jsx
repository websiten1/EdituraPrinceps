import { Link } from 'react-router-dom';
import { BookOpen, Mail, Phone, MapPin, CreditCard, Truck, Shield } from 'lucide-react';
import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from './SocialIcons';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const footerLinks = {
    produse: [
      { label: 'Poezie', to: '/collections?category=Poetry' },
      { label: 'Proză', to: '/collections?category=Prose' },
      { label: 'Filozofie', to: '/collections?category=Philosophy' },
      { label: 'Critică Literară', to: '/collections?category=Literary Criticism' },
      { label: 'Audiobooks', to: '/collections?category=Audiobooks' },
    ],
    suport: [
      { label: 'Întrebări frecvente', to: '/contact' },
      { label: 'Info livrare', to: '/contact' },
      { label: 'Returnări', to: '/contact' },
      { label: 'Urmărire comandă', to: '/contact' },
      { label: 'Contactează-ne', to: '/contact' },
    ],
    legal: [
      { label: 'Politică de confidențialitate', to: '#' },
      { label: 'Termeni și condiții', to: '#' },
      { label: 'Politică cookies', to: '#' },
      { label: 'GDPR', to: '#' },
    ],
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-white font-bold text-sm" style={{ fontFamily: 'Playfair Display, serif' }}>Prince's Multimedia</div>
                <div className="text-purple-400 text-xs">Editură Literară</div>
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Editură fondată cu pasiune pentru literatura română. Aducem în casele voastre capodoperele literaturii române clasice și contemporane.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span>Str. Literaturii 12, Iași, România</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Phone className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span>+40 232 XXX XXX</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Mail className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span>contact@princesmultimedia.ro</span>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-5">
              {[
                { icon: FacebookIcon, href: '#' },
                { icon: InstagramIcon, href: '#' },
                { icon: LinkedinIcon, href: '#' },
                { icon: YoutubeIcon, href: '#' },
              ].map(({ icon: Icon, href }) => (
                <a
                  key={href + Icon.name}
                  href={href}
                  className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-purple-700 hover:text-white transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Colecții</h3>
            <ul className="space-y-2.5">
              {footerLinks.produse.map(link => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Suport</h3>
            <ul className="space-y-2.5">
              {footerLinks.suport.map(link => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="text-white font-semibold mt-8 mb-5 text-sm uppercase tracking-wider">Legal</h3>
            <ul className="space-y-2.5">
              {footerLinks.legal.map(link => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Newsletter</h3>
            <p className="text-sm text-gray-400 mb-4">
              Abonează-te pentru a primi știri despre noile apariții și oferte speciale.
            </p>
            {subscribed ? (
              <div className="bg-purple-900/50 border border-purple-700 rounded-xl p-4 text-sm text-purple-300">
                Mulțumim! Te-ai abonat cu succes la newsletter.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Adresa ta de email"
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-purple-700 to-blue-700 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity"
                >
                  Abonează-te
                </button>
              </form>
            )}

            {/* Trust badges */}
            <div className="mt-6 space-y-2">
              {[
                { icon: Shield, text: 'Plăți Securizate SSL' },
                { icon: Truck, text: 'Livrare Rapidă 3-5 Zile' },
                { icon: CreditCard, text: 'Returnare în 14 Zile' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-xs text-gray-500">
                  <Icon className="w-3.5 h-3.5 text-purple-400" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500 text-center sm:text-left">
              © {new Date().getFullYear()} Prince's Multimedia. Toate drepturile rezervate.
            </p>
            <div className="flex items-center gap-3">
              {['Visa', 'MC', 'PayPal', 'BT'].map(method => (
                <span
                  key={method}
                  className="px-2.5 py-1 bg-gray-800 rounded text-xs text-gray-400 font-medium border border-gray-700"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
