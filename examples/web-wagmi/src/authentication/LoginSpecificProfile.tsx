import { useState } from 'react';

import { LoginButton, WhenLoggedInWithProfile, WhenLoggedOut } from '../components/auth';
import { LogoutButton } from '../components/auth/LogoutButton';

function UnauthenticatedContent() {
  const [handle, setHandle] = useState('');

  return (
    <>
      <h2>Login to a Specific Profile</h2>

      <label>
        Full handle (without `@` suffix)
        <input
          placeholder="lensprotocol"
          onChange={(e) => {
            setHandle(e.target.value);
          }}
          value={handle}
          style={{ display: 'block' }}
        />
      </label>

      <LoginButton handle={handle} />
    </>
  );
}

export function LoginSpecificProfile() {
  return (
    <>
      <WhenLoggedInWithProfile>
        <div>
          <p>To use this example log out first.</p>
          <LogoutButton />
        </div>
      </WhenLoggedInWithProfile>

      <WhenLoggedOut>
        <UnauthenticatedContent />
      </WhenLoggedOut>
    </>
  );
}
