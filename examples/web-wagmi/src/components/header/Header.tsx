import { useActiveProfile } from '@lens-protocol/react';
import { NavLink } from 'react-router-dom';

import { CATEGORIES } from '../../config';
import { LoginButton } from '../auth/LoginButton';

export function Header() {
  const { data: profile } = useActiveProfile();

  return (
    <header>
      <h1>Lens SDK 🌿</h1>

      <p>
        Examples of each hook used demonstrating a possible integration with&nbsp;
        <a href="https://wagmi.sh/">wagmi</a>.
      </p>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          width: 'auto',
        }}
      >
        {profile && <strong>{profile.handle}</strong>}

        <LoginButton />
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
