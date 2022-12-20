import { useActiveProfile } from '@lens-protocol/react';
import { Link } from 'react-router-dom';

import { LoginButton } from '../auth/LoginButton';

export function Header() {
  const { profile } = useActiveProfile();

  return (
    <div
      style={{
        backgroundColor: '#eeee',
        color: '#242424',
        padding: '1.5rem',
        position: 'sticky',
        top: 0,
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <span style={{ fontWeight: 'bold' }}>@lens-protocol/react - wagmi</span>
        </Link>

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
    </div>
  );
}
