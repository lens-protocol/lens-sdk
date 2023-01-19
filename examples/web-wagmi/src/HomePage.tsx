import { Link } from 'react-router-dom';

import { CATEGORIES } from './config';

export function Home() {
  return (
    <>
      <h1>Home</h1>

      <div>
        {CATEGORIES.map(({ path, label }) => (
          <article key={path}>
            <h2>{label}</h2>
            <Link to={path}>View</Link>
          </article>
        ))}
      </div>
    </>
  );
}
