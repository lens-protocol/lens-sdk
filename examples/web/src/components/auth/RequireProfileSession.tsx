import { ProfileSession, SessionType } from '@lens-protocol/react-web';
import { useState } from 'react';

import { LoginForm } from './LoginForm';
import { RequireConnectedWallet } from './RequireConnectedWallet';
import { WhenLoggedIn, LoggedInChildren } from './WhenLoggedIn';

export type RequireProfileSessionProps = {
  children: LoggedInChildren<ProfileSession>;
  message?: string;
};

export function RequireProfileSession({ children, message }: RequireProfileSessionProps) {
  const [showForm, setShowForm] = useState(false);
  return (
    <RequireConnectedWallet>
      {(address) => (
        <WhenLoggedIn
          with={SessionType.WithProfile}
          fallback={
            <>
              {message && <p>{message}</p>}
              {!showForm && <button onClick={() => setShowForm(true)}>Login as Profile</button>}
              {showForm && <LoginForm owner={address} />}
            </>
          }
        >
          {children}
        </WhenLoggedIn>
      )}
    </RequireConnectedWallet>
  );
}
