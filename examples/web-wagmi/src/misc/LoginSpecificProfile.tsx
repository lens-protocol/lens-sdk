import {
  ProfileOwnedByMe,
  useProfilesOwnedBy,
  useWalletLogin,
  useWalletLogout,
  WalletData,
} from '@lens-protocol/react-web';
import { useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

import { LoginButton, WhenLoggedInWithProfile, WhenLoggedOut } from '../components/auth';

function UnauthenticatedContent() {
  const [handle, setHandle] = useState('');

  return (
    <>
      <h2>Login to a Specific Profile</h2>

      <p>Handle</p>

      <input
        placeholder="@me"
        onChange={(e) => {
          setHandle(e.target.value);
        }}
        value={handle}
        style={{ display: 'block' }}
      />

      <LoginButton handle={handle} />
    </>
  );
}

function AuthenticatedContent({
  wallet,
  profile,
}: {
  wallet: WalletData;
  profile: ProfileOwnedByMe;
}) {
  const { data: profiles } = useProfilesOwnedBy({ address: wallet.address });
  const [handle, setHandle] = useState<string>();

  const { execute: login } = useWalletLogin();
  const { execute: logout } = useWalletLogout();

  const { isConnected } = useAccount();
  const { disconnectAsync } = useDisconnect();

  const { connectAsync } = useConnect({
    connector: new InjectedConnector(),
  });

  const onLoginClick = async () => {
    await logout();

    if (isConnected) {
      await disconnectAsync();
    }

    const { connector } = await connectAsync();

    if (connector instanceof InjectedConnector) {
      const signer = await connector.getSigner();
      await login(signer, handle);
    }
  };

  return (
    <>
      <h2>Login to a Specific Profile</h2>

      <p>
        You are already logged into a profile; Pick a different one below to log into a different
        one after logging out.
      </p>

      <select
        onChange={(e) => {
          setHandle(e.target.value);
        }}
        value={handle || profile.handle}
      >
        {profiles?.map((p) => {
          return (
            <option key={p.handle} value={p.handle}>
              {p.handle}
            </option>
          );
        })}
      </select>

      <button onClick={onLoginClick}>
        <strong>Log in</strong>
      </button>
    </>
  );
}

export function LoginSpecificProfile() {
  return (
    <>
      <WhenLoggedInWithProfile>
        {({ wallet, profile }) => <AuthenticatedContent profile={profile} wallet={wallet} />}
      </WhenLoggedInWithProfile>

      <WhenLoggedOut>
        <UnauthenticatedContent />
      </WhenLoggedOut>
    </>
  );
}
