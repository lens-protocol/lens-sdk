import { useNavigate } from 'react-router-dom';
import { useAccount, useConnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

import { LoginForm } from './components/auth';

export function LogInPage() {
  const navigate = useNavigate();
  const { address, isConnecting, isDisconnected } = useAccount();

  const { connect } = useConnect();

  return (
    <div>
      {isDisconnected && (
        <button disabled={isConnecting} onClick={() => connect({ connector: injected() })}>
          Connect first
        </button>
      )}

      {address && (
        <div>
          <p>{`Using wallet ${address}`}</p>
          <LoginForm owner={address} onSuccess={() => navigate('/')} />
        </div>
      )}
    </div>
  );
}
