import { useAuthenticatedUser } from '@lens-protocol/react';
import { useAccount } from 'wagmi';
import { LoginOptions } from './LoginOptions';
import { MyAccount } from './MyAccount';
import { WalletOptions } from './WalletOptions';

export function App() {
  const { isConnected, address } = useAccount();
  const { data, loading } = useAuthenticatedUser();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (data) {
    return <MyAccount address={data.address} />;
  }

  if (!isConnected) {
    return <WalletOptions />;
  }

  return <LoginOptions address={address!} />;
}
