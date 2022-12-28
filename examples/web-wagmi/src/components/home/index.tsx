import { Link } from 'react-router-dom';

const examples = [
  {
    label: 'Feed',
    path: '/feed',
  },
  {
    label: 'Profiles to Follow',
    path: '/profiles-to-follow',
  },
  {
    label: 'Explore Profiles',
    path: '/explore-profiles',
  },
  {
    label: 'Explore Publications',
    path: '/explore/publications',
  },
];

export function Home() {
  return (
    <div
      style={{
        display: 'grid',
        gap: '2rem',
        gridTemplateColumns: 'repeat(2, 1fr)',
        width: '100%',
        margin: '0 auto',
      }}
    >
      {examples.map(({ path, label }) => (
        <article key={path} style={{ aspectRatio: 1.5 }}>
          <Link to={path}>
            <button>{label}</button>
          </Link>
        </article>
      ))}
    </div>
  );
}
