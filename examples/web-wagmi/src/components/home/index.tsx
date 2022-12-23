import { Link } from 'react-router-dom';

import { CATEGORIES } from '../../config';

export function Home() {
  return (
    <>
      <h1>Home</h1>

      <div
        style={{
          display: 'grid',
          gap: '2rem',
          gridTemplateColumns: 'repeat(2, 1fr)',
          width: '100%',
          margin: '0 auto',
        }}
      >
        {CATEGORIES.map(({ path, label }) => (
          <article key={path}>
            <h6>{label}</h6>
            <Link to={path}>
              <a>View</a>
            </Link>
          </article>
        ))}
      </div>
    </>
  );
}
