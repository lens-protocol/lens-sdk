import { SessionType, WalletOnlySession, useLogin } from '@lens-protocol/react-web';

import { RequireConnectedWallet } from './RequireConnectedWallet';
import { LoggedInChildren, WhenLoggedIn } from './WhenLoggedIn';

export type RequireWalletSessionProps = {
  children: LoggedInChildren<WalletOnlySession>;
  message?: string;
};

export function RequireWalletSession({ children, message }: RequireWalletSessionProps) {
  const { execute: login, loading: isLoginPending } = useLogin();
  return (
    <RequireConnectedWallet>
      {(address) => (
        <>
          <WhenLoggedIn
            with={SessionType.JustWallet}
            fallback={
              <>
                {message && <p>{message}</p>}
                <button type="button" onClick={() => login({ address })} disabled={isLoginPending}>
                  Login as Wallet
                </button>
              </>
            }
          >
            {children}
          </WhenLoggedIn>
        </>
      )}
    </RequireConnectedWallet>
  );
}
