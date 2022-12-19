import { useWalletLogin } from '@lens-protocol/react';
import { Link } from 'react-router-dom';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

function truncateAddress(address: string, chars = 4) {
  return `${address.substring(0, chars + 2)}...${address.substring(42 - chars)}`;
}

export function Header() {
  const login = useWalletLogin();

  const { connect } = useConnect({
    connector: new InjectedConnector(),

    async onSuccess({ connector }) {
      if (connector instanceof InjectedConnector) {
        const signer = await connector.getSigner();
        login(signer);
      }
    },
  });

  const { disconnect } = useDisconnect();
  const { address } = useAccount();

  return (
    <div
      style={{
        backgroundColor: '#eeee',
        color: '#242424',
        padding: '1.5rem',
        position: 'sticky',
        top: 0,
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <span style={{ fontWeight: 'bold' }}>@lens-protocol/react - wagmi</span>
        </Link>
        {!address && <button onClick={() => connect()}>Connect Wallet</button>}
        {address && <button onClick={() => disconnect()}>{truncateAddress(address)}</button>}
      </div>
    </div>
  );
}
