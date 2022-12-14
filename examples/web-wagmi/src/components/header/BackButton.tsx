import { useLocation, Link } from 'react-router-dom';

export function BackButton() {
  const location = useLocation();

  if (location.pathname === '/') return null;

  return (
    <Link to="/">
      <button style={{ position: 'absolute', left: 0 }}>Back</button>
    </Link>
  );
}
