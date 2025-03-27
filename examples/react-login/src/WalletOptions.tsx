import { useConnect } from 'wagmi';

export function WalletOptions() {
  const { connectors, connect } = useConnect();

  return (
    <>
      <p>Connect your wallet to log in to Lens</p>

      {connectors.map((connector) => (
        <button
          key={connector.uid}
          type='button'
          onClick={() => connect({ connector })}
          style={{ margin: '0.5rem' }}
        >
          {connector.name}
        </button>
      ))}
    </>
  );
}
