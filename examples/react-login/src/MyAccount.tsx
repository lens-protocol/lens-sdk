import { type EvmAddress, useAccount, useLogout } from '@lens-protocol/react';

export function MyAccount({ address }: { address: EvmAddress }) {
  const { data, loading } = useAccount({ address });
  const { execute } = useLogout();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>My Account</h1>
      <p>Username: {data?.username?.value}</p>
      <p>Account: {address}</p>
      <button type='button' onClick={() => execute()}>
        Log out
      </button>
    </div>
  );
}
