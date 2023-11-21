import { Link } from 'react-router-dom';

import { CATEGORIES } from './config';

export function HomePage() {
  return (
    <div>
      {CATEGORIES.map(({ path, label }) => (
        <article key={path}>
          <h2>{label}</h2>
          <Link to={path}>View</Link>
        </article>
      ))}
    </div>
  );
}
