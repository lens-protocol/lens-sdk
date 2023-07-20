import { useWalletLogin } from '@lens-protocol/react-web';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

import { LogoutButton } from './LogoutButton';
import { WhenLoggedInWithProfile } from './WhenLoggedInWithProfile';
import { WhenLoggedOut } from './WhenLoggedOut';

export function LoginButton({ handle }: { handle?: string }) {
  const { execute: login, error: loginError, isPending: isLoginPending } = useWalletLogin();

  const { isConnected } = useAccount();
  const { disconnectAsync } = useDisconnect();

  const { connectAsync } = useConnect({
    connector: new InjectedConnector(),
  });

  const onLoginClick = async () => {
    if (isConnected) {
      await disconnectAsync();
    }

    const { connector } = await connectAsync();

    if (connector instanceof InjectedConnector) {
      const walletClient = await connector.getWalletClient();

      const result = await login({
        address: walletClient.account.address,
        handle,
      });

      if (result.isSuccess()) {
        toast.success(
          result.value
            ? `Welcome ${result.value.handle}`
            : `Welcome ${walletClient.account.address}`,
        );
      }
    }
  };

  useEffect(() => {
    if (loginError) toast.error(loginError.message);
  }, [loginError]);

  return (
    <>
      <WhenLoggedInWithProfile>
        <LogoutButton />
      </WhenLoggedInWithProfile>

      <WhenLoggedOut>
        <button onClick={onLoginClick} disabled={isLoginPending}>
          <strong>Log in</strong>
        </button>
      </WhenLoggedOut>
    </>
  );
}
