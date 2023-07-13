import { useWalletLogin, useWalletLogout } from '@lens-protocol/react-web';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { wallet } from '../../domain/wallet';

import { WhenLoggedInWithProfile } from './WhenLoggedInWithProfile';
import { WhenLoggedOut } from './WhenLoggedOut';

export function LoginButton() {
  const { execute: login, error: loginError, isPending: isLoginPending } = useWalletLogin();
  const { execute: logout, isPending: isLogoutPending } = useWalletLogout();

  const onLoginClick = async () => {
    await login(wallet);
  };

  const onLogoutClick = async () => {
    await logout();
  };

  useEffect(() => {
    if (loginError) toast.error(loginError.message);
  }, [loginError]);

  return (
    <>
      <WhenLoggedInWithProfile>
        {() => (
          <button onClick={onLogoutClick} disabled={isLogoutPending}>
            <strong>Log out</strong>
          </button>
        )}
      </WhenLoggedInWithProfile>

      <WhenLoggedOut>
        <button onClick={onLoginClick} disabled={isLoginPending}>
          <strong>Log in</strong>
        </button>
      </WhenLoggedOut>
    </>
  );
}
