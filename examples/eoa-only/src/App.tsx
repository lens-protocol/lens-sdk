import { useAuthenticatedUser } from '@lens-protocol/react';
import { ConnectButton } from './ConnectButton';
import { DisconnectButton } from './DisconnectButton';

export function App() {
  const { data } = useAuthenticatedUser({ suspense: true });

  if (data) {
    return (
      <>
        <p>
          Connected with {data.address} with {data.role} role.
        </p>
        <DisconnectButton />
      </>
    );
  }

  return <ConnectButton />;
}
