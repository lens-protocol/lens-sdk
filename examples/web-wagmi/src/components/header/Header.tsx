import { useActiveProfile } from '@lens-protocol/react';
import { NavLink } from 'react-router-dom';

import { LoginButton } from '../auth/LoginButton';

const examples = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Feed',
    path: '/feed',
  },
  {
    label: 'Explore Profiles',
    path: '/explore-profiles',
  },
  {
    label: 'Profiles to Follow',
    path: '/profiles-to-follow',
  },
  {
    label: 'Unread Notification Count',
    path: '/unread-notification-count',
  },
  {
    label: 'Notifications',
    path: '/notifications',
  },
  {
    label: 'Search Publications',
    path: '/search/publications',
  },
  {
    label: 'Search Profiles',
    path: '/search/profiles',
  },
];

export function Header() {
  const { data: profile } = useActiveProfile();

  return (
    <header>
      <h1>Lens SDK</h1>

      <p>
        Example app that demonstrates a possible integration strategy with&nbsp;
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
        {examples.map(({ path, label }) => (
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
