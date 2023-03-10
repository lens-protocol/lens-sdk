import { useActiveProfile } from '@lens-protocol/react-web';
import { NavLink } from 'react-router-dom';

import { CATEGORIES } from '../../config';
import { LoginButton } from '../auth/LoginButton';

export function Header() {
  const { data: profile } = useActiveProfile();

  return (
    <header>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '1600px',
          margin: 'auto',
          padding: '1rem',
        }}
      >
        <span>
          <strong>🌿 Lens SDK</strong>
        </span>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          {profile && <strong>{profile.handle}</strong>}

          <LoginButton />
        </div>
      </div>

      <nav>
        {CATEGORIES.map(({ path, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) => (isActive ? 'current' : undefined)}
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
