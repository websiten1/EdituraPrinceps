import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User, Package, Heart, Settings, ChevronDown, ChevronUp, ChevronRight, Edit2, Check, X, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { books } from '../data/books';
import Breadcrumb from '../components/Breadcrumb';
import BookCard from '../components/BookCard';

const mockOrders = [
  {
    id: 'PM-847291',
    date: '18 Apr 2026',
    status: 'Delivered',
    total: 84.00,
    items: [
      { title: 'Taina care mă apără', author: 'Grigore VIERU', price: 30.00, qty: 1, coverColor: '#5D4E60' },
      { title: 'Cuvinte potrivite',   author: 'Tudor ARGHEZI',  price: 30.00, qty: 1, coverColor: '#4A5568' },
      { title: 'Raze de lună',        author: 'Veronica MICLE', price: 24.00, qty: 1, coverColor: '#7D5E7D' },
    ],
  },
  {
    id: 'PM-614032',
    date: '3 Mar 2026',
    status: 'Delivered',
    total: 48.00,
    items: [
      { title: 'Lupta cu inerția', author: 'Nicolae LABIȘ',  price: 30.00, qty: 1, coverColor: '#2C3E50' },
      { title: 'Lumini și umbre',  author: 'Otilia CAZIMIR', price: 30.00, qty: 1, coverColor: '#8B6F47' },
    ],
  },
  {
    id: 'PM-501883',
    date: '12 Feb 2026',
    status: 'Processing',
    total: 42.00,
    items: [
      { title: 'Cezar Ivănescu, transmodernul', author: 'Theodor CODREANU', price: 42.00, qty: 1, coverColor: '#2C3E50' },
    ],
  },
];

const statusColors = {
  Delivered:  'bg-green-50 text-forest-800 border-green-200',
  Processing: 'bg-burgundy-50 text-burgundy border-burgundy-200',
  Shipped:    'bg-blue-50 text-blue-700 border-blue-200',
  Cancelled:  'bg-gray-100 text-charcoal-light border-gray-300',
};

/* ── Sidebar nav ─────────────────────────────────────────────────── */
function AccountNav({ current }) {
  const links = [
    { to: '/account',           icon: User,    label: 'Dashboard' },
    { to: '/account/orders',    icon: Package, label: 'My Orders' },
    { to: '/account/wishlist',  icon: Heart,   label: 'Wishlist' },
    { to: '/account/settings',  icon: Settings,label: 'Settings' },
  ];
  return (
    <aside className="w-full lg:w-56 flex-shrink-0">
      <div className="bg-white border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-burgundy text-white flex items-center justify-center font-ui font-bold text-sm">
              II
            </div>
            <div>
              <p className="font-ui font-semibold text-sm text-charcoal">Ioan Ionescu</p>
              <p className="text-xs font-sans text-charcoal-lighter">Member since 2023</p>
            </div>
          </div>
        </div>
        <nav>
          {links.map(link => {
            const Icon = link.icon;
            const active = current === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-3 px-5 py-3 text-sm font-ui transition-colors
                            border-b border-gray-100 last:border-0
                            ${active
                              ? 'bg-burgundy-50 text-burgundy font-semibold border-l-2 border-l-burgundy'
                              : 'text-charcoal hover:bg-gray-50 hover:text-burgundy'
                            }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

/* ── Dashboard ───────────────────────────────────────────────────── */
function Dashboard() {
  const { wishlist } = useApp();
  const stats = [
    { label: 'Total Orders', value: mockOrders.length },
    { label: 'Books Ordered', value: mockOrders.reduce((s, o) => s + o.items.reduce((ss, i) => ss + i.qty, 0), 0) },
    { label: 'In Wishlist', value: wishlist.length },
    { label: 'Total Spent', value: `${mockOrders.reduce((s, o) => s + o.total, 0).toFixed(0)} lei` },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-h2 text-charcoal mb-1">Welcome back, Ioan</h1>
        <p className="font-sans text-sm text-charcoal-light">Here's an overview of your account activity.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="bg-white border border-gray-200 p-5 text-center hover:shadow-classic transition-shadow">
            <div className="font-display text-3xl text-burgundy mb-1">{s.value}</div>
            <div className="text-xs font-ui text-charcoal-lighter uppercase tracking-wide">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="bg-white border border-gray-200">
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="font-display text-lg text-charcoal">Recent Orders</h2>
          <Link to="/account/orders" className="btn-ghost text-xs">View all →</Link>
        </div>
        <div className="divide-y divide-gray-100">
          {mockOrders.slice(0, 2).map(order => (
            <div key={order.id} className="flex items-center justify-between px-6 py-4 gap-4">
              <div>
                <p className="font-ui font-semibold text-sm text-charcoal">#{order.id}</p>
                <p className="text-xs font-sans text-charcoal-lighter mt-0.5">{order.date} · {order.items.length} item{order.items.length !== 1 ? 's' : ''}</p>
              </div>
              <span className={`text-xs font-ui font-semibold px-2.5 py-1 border uppercase tracking-wide ${statusColors[order.status]}`}>
                {order.status}
              </span>
              <span className="font-display text-lg text-burgundy ml-auto">{order.total.toFixed(2)} lei</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { to: '/collections',       label: 'Browse Catalogue',    desc: 'Discover new titles' },
          { to: '/account/wishlist',  label: 'View Wishlist',        desc: `${wishlist.length} saved titles` },
          { to: '/account/settings',  label: 'Account Settings',     desc: 'Update your profile' },
        ].map(item => (
          <Link key={item.to} to={item.to}
                className="bg-white border border-gray-200 p-5 hover:border-burgundy hover:shadow-classic
                           transition-all duration-200 group">
            <p className="font-ui font-semibold text-sm text-charcoal group-hover:text-burgundy transition-colors">
              {item.label}
            </p>
            <p className="text-xs font-sans text-charcoal-lighter mt-1">{item.desc}</p>
            <ChevronRight className="w-4 h-4 text-burgundy mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ── My Orders ───────────────────────────────────────────────────── */
function Orders() {
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [statusFilter, setStatusFilter]   = useState('All');
  const statuses = ['All', 'Delivered', 'Processing', 'Shipped', 'Cancelled'];

  const filtered = statusFilter === 'All' ? mockOrders : mockOrders.filter(o => o.status === statusFilter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-h2 text-charcoal mb-1">My Orders</h1>
        <p className="font-sans text-sm text-charcoal-light">{mockOrders.length} orders in your history</p>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2 flex-wrap">
        {statuses.map(s => (
          <button key={s} onClick={() => setStatusFilter(s)}
                  className={`text-xs font-ui font-semibold px-3 py-1.5 border uppercase tracking-wide transition-colors
                              ${statusFilter === s
                                ? 'bg-burgundy text-white border-burgundy'
                                : 'bg-white text-charcoal-light border-gray-200 hover:border-burgundy hover:text-burgundy'
                              }`}>
            {s}
          </button>
        ))}
      </div>

      {/* Orders list */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 border border-gray-200">
            <p className="font-display text-xl text-charcoal-light italic">No orders found</p>
          </div>
        ) : filtered.map(order => (
          <div key={order.id} className="bg-white border border-gray-200 overflow-hidden">
            <button
              onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
              className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-6 text-left">
                <div>
                  <p className="font-ui font-semibold text-sm text-charcoal">#{order.id}</p>
                  <p className="text-xs font-sans text-charcoal-lighter mt-0.5">{order.date}</p>
                </div>
                <span className={`text-xs font-ui font-semibold px-2.5 py-1 border uppercase tracking-wide ${statusColors[order.status]}`}>
                  {order.status}
                </span>
                <span className="text-xs font-sans text-charcoal-lighter hidden sm:block">
                  {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-display text-xl text-burgundy">{order.total.toFixed(2)} lei</span>
                {expandedOrder === order.id
                  ? <ChevronUp className="w-4 h-4 text-charcoal-lighter" />
                  : <ChevronDown className="w-4 h-4 text-charcoal-lighter" />
                }
              </div>
            </button>

            {expandedOrder === order.id && (
              <div className="border-t border-gray-100 bg-gray-50 p-5">
                <div className="space-y-3 mb-4">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-4 bg-white border border-gray-100 p-3">
                      <div className="w-10 h-14 flex items-center justify-center text-white/20 font-serif text-lg flex-shrink-0"
                           style={{ backgroundColor: item.coverColor }}>❧</div>
                      <div className="flex-1">
                        <p className="font-serif text-sm text-charcoal">{item.title}</p>
                        <p className="text-xs font-ui text-charcoal-lighter uppercase tracking-wide mt-0.5">{item.author}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-serif text-sm text-burgundy font-semibold">{item.price.toFixed(2)} lei</p>
                        <p className="text-xs font-sans text-charcoal-lighter">×{item.qty}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div className="flex gap-3">
                    <button className="text-xs font-ui text-burgundy hover:underline uppercase tracking-wide">
                      Track Order
                    </button>
                    <span className="text-gray-300">|</span>
                    <button className="text-xs font-ui text-charcoal-light hover:text-burgundy uppercase tracking-wide">
                      Request Return
                    </button>
                  </div>
                  <span className="font-ui font-semibold text-sm text-charcoal">
                    Total: <span className="text-burgundy">{order.total.toFixed(2)} lei</span>
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Wishlist ─────────────────────────────────────────────────────── */
function Wishlist() {
  const { wishlist, toggleWishlist, addToCart } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-h2 text-charcoal mb-1">My Wishlist</h1>
        <p className="font-sans text-sm text-charcoal-light">
          {wishlist.length} saved title{wishlist.length !== 1 ? 's' : ''}
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 border border-gray-200">
          <Heart className="w-10 h-10 text-gray-300 mx-auto mb-4" />
          <p className="font-display text-xl text-charcoal-light italic mb-3">Your wishlist is empty</p>
          <p className="text-sm font-sans text-charcoal-lighter mb-6">
            Browse the collection and save titles for later.
          </p>
          <Link to="/collections" className="btn-primary">Explore the Collection</Link>
        </div>
      ) : (
        <>
          <div className="flex justify-end">
            <button
              onClick={() => wishlist.forEach(b => addToCart(b))}
              className="btn-primary text-sm py-2.5"
            >
              Add All to Cart
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {wishlist.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ── Settings ─────────────────────────────────────────────────────── */
function AccountSettings() {
  const [personal, setPersonal]       = useState({ firstName: 'Ioan', lastName: 'Ionescu', email: 'radu.r.andrei@outlook.com', phone: '+40 7XX XXX XXX' });
  const [editPersonal, setEditPersonal] = useState(false);
  const [personalDraft, setPersonalDraft] = useState({ ...personal });

  const [address, setAddress]         = useState({ street: 'Str. Exemplu, Nr. 5', city: 'Iași', county: 'Iași', zip: '700001' });
  const [editAddress, setEditAddress] = useState(false);
  const [addressDraft, setAddressDraft] = useState({ ...address });

  const [pwForm, setPwForm]           = useState({ current: '', next: '', confirm: '' });
  const [showPw, setShowPw]           = useState({ current: false, next: false, confirm: false });
  const [pwMsg, setPwMsg]             = useState('');
  const [pwOk, setPwOk]               = useState(false);
  const [expandPw, setExpandPw]       = useState(false);

  const [prefs, setPrefs]             = useState({ newsletter: true, orderEmails: true, promoEmails: false });

  const savePersonal = () => {
    setPersonal({ ...personalDraft });
    setEditPersonal(false);
  };
  const saveAddress = () => {
    setAddress({ ...addressDraft });
    setEditAddress(false);
  };

  const handlePw = e => {
    e.preventDefault();
    if (!pwForm.current) { setPwMsg('Enter current password.'); setPwOk(false); return; }
    if (pwForm.next.length < 8) { setPwMsg('New password must be at least 8 characters.'); setPwOk(false); return; }
    if (pwForm.next !== pwForm.confirm) { setPwMsg('Passwords do not match.'); setPwOk(false); return; }
    setPwMsg('Password changed successfully.'); setPwOk(true);
    setPwForm({ current: '', next: '', confirm: '' });
    setTimeout(() => setExpandPw(false), 1500);
  };

  const Section = ({ title, editable, editing, onEdit, onSave, onCancel, children }) => (
    <div className="bg-white border border-gray-200">
      <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h2 className="font-display text-lg text-charcoal">{title}</h2>
        {editable && !editing && (
          <button onClick={onEdit} className="flex items-center gap-1.5 text-xs font-ui text-burgundy hover:underline uppercase tracking-wide">
            <Edit2 className="w-3 h-3" /> Edit
          </button>
        )}
        {editing && (
          <div className="flex items-center gap-3">
            <button onClick={onSave} className="flex items-center gap-1 text-xs font-ui text-forest-800 uppercase tracking-wide hover:underline">
              <Check className="w-3 h-3" /> Save
            </button>
            <button onClick={onCancel} className="flex items-center gap-1 text-xs font-ui text-charcoal-light uppercase tracking-wide hover:underline">
              <X className="w-3 h-3" /> Cancel
            </button>
          </div>
        )}
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-h2 text-charcoal mb-1">Account Settings</h1>
        <p className="font-sans text-sm text-charcoal-light">Manage your personal details and preferences</p>
      </div>

      {/* Personal Info */}
      <Section title="Personal Information" editable
               editing={editPersonal}
               onEdit={() => { setPersonalDraft({ ...personal }); setEditPersonal(true); }}
               onSave={savePersonal}
               onCancel={() => setEditPersonal(false)}>
        {editPersonal ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { key: 'firstName', label: 'First Name' },
              { key: 'lastName',  label: 'Last Name' },
              { key: 'email',     label: 'Email Address' },
              { key: 'phone',     label: 'Phone Number' },
            ].map(f => (
              <div key={f.key}>
                <label className="field-label">{f.label}</label>
                <input
                  type="text"
                  value={personalDraft[f.key]}
                  onChange={e => setPersonalDraft(d => ({ ...d, [f.key]: e.target.value }))}
                  className="field"
                />
              </div>
            ))}
          </div>
        ) : (
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'First Name', value: personal.firstName },
              { label: 'Last Name',  value: personal.lastName },
              { label: 'Email',      value: personal.email },
              { label: 'Phone',      value: personal.phone },
            ].map(item => (
              <div key={item.label}>
                <dt className="text-xs font-ui text-charcoal-lighter uppercase tracking-wide mb-0.5">{item.label}</dt>
                <dd className="text-sm font-sans text-charcoal">{item.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </Section>

      {/* Delivery Address */}
      <Section title="Delivery Address" editable
               editing={editAddress}
               onEdit={() => { setAddressDraft({ ...address }); setEditAddress(true); }}
               onSave={saveAddress}
               onCancel={() => setEditAddress(false)}>
        {editAddress ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="field-label">Street Address</label>
              <input type="text" value={addressDraft.street}
                     onChange={e => setAddressDraft(d => ({ ...d, street: e.target.value }))}
                     className="field" />
            </div>
            {[
              { key: 'city',   label: 'City' },
              { key: 'county', label: 'County' },
              { key: 'zip',    label: 'Postal Code' },
            ].map(f => (
              <div key={f.key}>
                <label className="field-label">{f.label}</label>
                <input type="text" value={addressDraft[f.key]}
                       onChange={e => setAddressDraft(d => ({ ...d, [f.key]: e.target.value }))}
                       className="field" />
              </div>
            ))}
          </div>
        ) : (
          <div>
            <p className="text-sm font-sans text-charcoal">{address.street}</p>
            <p className="text-sm font-sans text-charcoal">{address.city}, {address.county} {address.zip}</p>
            <p className="text-sm font-sans text-charcoal">România</p>
          </div>
        )}
      </Section>

      {/* Change Password */}
      <div className="bg-white border border-gray-200">
        <button
          onClick={() => setExpandPw(v => !v)}
          className="w-full bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
        >
          <h2 className="font-display text-lg text-charcoal">Change Password</h2>
          {expandPw ? <ChevronUp className="w-4 h-4 text-charcoal-lighter" /> : <ChevronDown className="w-4 h-4 text-charcoal-lighter" />}
        </button>

        {expandPw && (
          <form onSubmit={handlePw} className="px-6 py-5 space-y-4">
            {[
              { key: 'current', label: 'Current Password' },
              { key: 'next',    label: 'New Password' },
              { key: 'confirm', label: 'Confirm New Password' },
            ].map(f => (
              <div key={f.key}>
                <label className="field-label">{f.label}</label>
                <div className="relative">
                  <input
                    type={showPw[f.key] ? 'text' : 'password'}
                    value={pwForm[f.key]}
                    onChange={e => setPwForm(p => ({ ...p, [f.key]: e.target.value }))}
                    className="field pr-10"
                  />
                  <button type="button"
                          onClick={() => setShowPw(p => ({ ...p, [f.key]: !p[f.key] }))}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-lighter hover:text-charcoal">
                    {showPw[f.key] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            ))}
            {pwMsg && (
              <p className={`text-xs font-sans ${pwOk ? 'text-forest-800' : 'text-burgundy'}`}>{pwMsg}</p>
            )}
            <button type="submit" className="btn-primary text-sm py-2.5">
              Update Password
            </button>
          </form>
        )}
      </div>

      {/* Email Preferences */}
      <div className="bg-white border border-gray-200">
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
          <h2 className="font-display text-lg text-charcoal">Email Preferences</h2>
        </div>
        <div className="px-6 py-5 space-y-4">
          {[
            { key: 'newsletter',   label: 'Newsletter & literary notes',    desc: 'Monthly literary updates and new title announcements' },
            { key: 'orderEmails',  label: 'Order confirmations',            desc: 'Receive emails for order status updates' },
            { key: 'promoEmails',  label: 'Promotions & offers',            desc: 'Occasional discount codes and special offers' },
          ].map(pref => (
            <div key={pref.key} className="flex items-start justify-between gap-6">
              <div>
                <p className="text-sm font-ui font-semibold text-charcoal">{pref.label}</p>
                <p className="text-xs font-sans text-charcoal-lighter mt-0.5">{pref.desc}</p>
              </div>
              <button
                onClick={() => setPrefs(p => ({ ...p, [pref.key]: !p[pref.key] }))}
                className={`relative flex-shrink-0 w-11 h-6 rounded-full transition-colors duration-200
                            ${prefs[pref.key] ? 'bg-burgundy' : 'bg-gray-200'}`}
                role="switch"
                aria-checked={prefs[pref.key]}
              >
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200
                                  ${prefs[pref.key] ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Danger zone */}
      <div className="bg-white border border-burgundy-200">
        <div className="bg-burgundy-50 border-b border-burgundy-200 px-6 py-4">
          <h2 className="font-display text-lg text-burgundy">Danger Zone</h2>
        </div>
        <div className="px-6 py-5">
          <p className="text-sm font-sans text-charcoal-light mb-4">
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>
          <button className="text-sm font-ui font-semibold text-burgundy border-2 border-burgundy px-4 py-2
                             hover:bg-burgundy hover:text-white transition-colors uppercase tracking-wide">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Page shell ───────────────────────────────────────────────────── */
export default function Account() {
  const location = useLocation();
  const path = location.pathname;

  const subLabel = path === '/account/orders'   ? 'My Orders'
                 : path === '/account/wishlist'  ? 'Wishlist'
                 : path === '/account/settings'  ? 'Settings'
                 : 'Dashboard';

  const breadcrumbs = [{ label: 'Account', to: '/account' }];
  if (path !== '/account') breadcrumbs.push({ label: subLabel });

  return (
    <div className="fade-in min-h-screen bg-white">
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={breadcrumbs} />
          <h1 className="font-display text-h1 text-charcoal mt-4">My Account</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <AccountNav current={path} />
          <div className="flex-1 min-w-0">
            {path === '/account'           && <Dashboard />}
            {path === '/account/orders'    && <Orders />}
            {path === '/account/wishlist'  && <Wishlist />}
            {path === '/account/settings'  && <AccountSettings />}
          </div>
        </div>
      </div>
    </div>
  );
}
