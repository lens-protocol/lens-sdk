import { type EvmAddress, useAccount } from '@lens-protocol/react';
import { LogoutButton } from './LogoutButton';

export function MyAccount({ address }: { address: EvmAddress }) {
  const { data } = useAccount({ address, suspense: true });

  return (
    <div>
      <h1>Welcome, {data?.metadata?.name ?? data?.username?.value ?? data?.address}!</h1>

      <p>Created on: {data?.createdAt}</p>
      <p>Account Score: {data?.score}</p>

      <LogoutButton />
    </div>
  );
}
