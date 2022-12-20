import { useWalletLogin, useWalletLogout } from '@lens-protocol/react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

import { useIsLoggedIn } from './auth';

export function AuthButton() {
  const login = useWalletLogin();
  const logout = useWalletLogout();
  const isLoggedIn = useIsLoggedIn();

  const { isDisconnected } = useAccount();
  const { connectAsync } = useConnect({
    connector: new InjectedConnector(),
  });
  const onLoginClick = async () => {
    if (isDisconnected) {
      const { connector } = await connectAsync();

      if (connector instanceof InjectedConnector) {
        const signer = await connector.getSigner();
        login(signer);
      }
    }
  };

  const { disconnect } = useDisconnect();
  const onLogoutClick = () => {
    logout();
    disconnect();
  };

  return (
    <>
      {!isLoggedIn && (
        <button onClick={onLoginClick}>
          <strong>Log in</strong>
        </button>
      )}

      {isLoggedIn && (
        <button onClick={onLogoutClick}>
          <strong>Log out</strong>
        </button>
      )}
    </>
  );
}
