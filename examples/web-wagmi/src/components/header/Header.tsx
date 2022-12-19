import { useWalletLogin, useWalletLogout, useActiveProfile } from '@lens-protocol/react';
import { Link } from 'react-router-dom';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

export function Header() {
  const login = useWalletLogin();
  const logout = useWalletLogout();

  const { isConnected, isDisconnected } = useAccount();
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

  const { loading, profile } = useActiveProfile();

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

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          {profile && <strong>{profile.handle}</strong>}

          {isDisconnected && (
            <button onClick={onLoginClick}>
              <strong>Log in</strong>
            </button>
          )}
          {isConnected && loading && <p>Loading…</p>}
          {isConnected && (
            <button onClick={onLogoutClick}>
              <strong>Log out</strong>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
