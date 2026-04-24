import { Link } from 'react-router-dom';

export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 text-xs font-ui text-charcoal-lighter uppercase tracking-wide">
        <li>
          <Link to="/" className="hover:text-burgundy transition-colors duration-200">
            Home
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="text-gray-300">›</span>
            {item.to ? (
              <Link to={item.to} className="hover:text-burgundy transition-colors duration-200">
                {item.label}
              </Link>
            ) : (
              <span className="text-charcoal font-semibold">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
