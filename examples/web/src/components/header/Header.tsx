import { SessionType, useSession } from '@lens-protocol/react-web';
import { Suspense } from 'react';
import { NavLink } from 'react-router-dom';

import { CATEGORIES } from '../../config';
import { formatProfileIdentifier } from '../../utils/formatProfileIdentifier';
import { LoginButton, LogoutButton } from '../auth';

function AuthenticationBar() {
  const { data: session } = useSession({ suspense: true });

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
      }}
    >
      {session.authenticated && (
        <strong>
          {session.type === SessionType.WithProfile
            ? formatProfileIdentifier(session.profile)
            : session.address}
        </strong>
      )}

      {session.authenticated ? <LogoutButton /> : <LoginButton />}
    </div>
  );
}

export function Header() {
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
        <Suspense>
          <AuthenticationBar />
        </Suspense>
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
