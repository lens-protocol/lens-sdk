import { useLogin } from '@lens-protocol/react-web';
import { useAccount, useConnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

function ClaimHandleOptions({ address }: { address: string }) {
  const { execute: login, loading: isLoginPending } = useLogin();

  const start = async () => {
    const result = await login({ address });

    if (result.isSuccess()) {
      console.log(result.value);
    } else {
      console.log(result.error);
    }
  };

  return (
    <div>
      <button type="button" onClick={start} disabled={isLoginPending}>
        Login
      </button>
    </div>
  );
}

export function UseClaimHandle() {
  const { address, isConnected, isConnecting } = useAccount();

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  return (
    <div>
      <h1>
        <code>useClaimHandle</code>
      </h1>
      <div>
        {!isConnected && (
          <button disabled={isConnecting} onClick={() => connect()}>
            Connect first
          </button>
        )}

        {address && (
          <div>
            <p>{`Using wallet ${address}`}</p>
            <ClaimHandleOptions address={address} />
          </div>
        )}
      </div>
    </div>
  );
}
