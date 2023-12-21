import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAccount, useConnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

import { LoginForm } from './components/auth';

export function LogInPage() {
  const navigate = useNavigate();
  const { address, isConnecting, isDisconnected } = useAccount();

  const { connect } = useConnect({
    connector: new InjectedConnector(),
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <div>
      {isDisconnected && (
        <button disabled={isConnecting} onClick={() => connect()}>
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
