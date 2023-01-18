import { useWalletLogin, useWalletLogout, WalletType } from '@lens-protocol/react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

import { WhenLoggedInWithProfile, WhenLoggedOut } from './auth';

export function LoginButton() {
  const login = useWalletLogin();
  const logout = useWalletLogout();

  const { isDisconnected } = useAccount();
  const { connectAsync } = useConnect({
    connector: new InjectedConnector(),
  });
  const onLoginClick = async () => {
    if (isDisconnected) {
      const { connector } = await connectAsync();

      if (connector instanceof InjectedConnector) {
        const signer = await connector.getSigner();
        login(signer, WalletType.INJECTED);
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
      <WhenLoggedInWithProfile>
        {() => (
          <button onClick={onLogoutClick}>
            <strong>Log out</strong>
          </button>
        )}
      </WhenLoggedInWithProfile>

      <WhenLoggedOut>
        <button onClick={onLoginClick}>
          <strong>Log in</strong>
        </button>
      </WhenLoggedOut>
    </>
  );
}
