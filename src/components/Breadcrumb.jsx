import { Link } from 'react-router-dom';

export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 text-xs font-sans text-charcoal-light uppercase tracking-widest">
        <li>
          <Link to="/" className="hover:text-forest-800 transition-colors duration-200">
            Home
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="text-gold">›</span>
            {item.to ? (
              <Link to={item.to} className="hover:text-forest-800 transition-colors duration-200">
                {item.label}
              </Link>
            ) : (
              <span className="text-charcoal font-bold">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
