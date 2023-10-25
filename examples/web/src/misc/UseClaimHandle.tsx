import {
  ReservedClaimable,
  SessionType,
  useCanClaimHandle,
  useClaimHandle,
  useLogin,
  useSession,
} from '@lens-protocol/react-web';
import toast from 'react-hot-toast';
import { useAccount, useConnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';

function ClaimHandleOptions() {
  const { data, loading, error } = useCanClaimHandle();
  const { execute: claim, loading: claiming } = useClaimHandle();

  const claimReserved = async (reserved: ReservedClaimable) => {
    const result = await claim({
      reserved,
    });

    // check for failure scenarios
    if (result.isFailure()) {
      toast.error(result.error.message);
      return;
    }

    const profile = result.value.id;

    toast.success(`Profile ID: ${profile}`);
  };

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <>
      {data.reserved.length > 0 && (
        <fieldset>
          <legend>Reserved handles</legend>
          {data.reserved.map((handle) => (
            <button
              key={handle.id}
              name="id"
              value={handle.id}
              onClick={() => claimReserved(handle)}
              disabled={claiming}
            >
              {handle.withHandle}
            </button>
          ))}
        </fieldset>
      )}

      {data.canMintProfileWithFreeTextHandle && (
        <form>
          <fieldset>
            <legend>Free text handle</legend>
            <input type="text" />
            <button>Submit</button>
          </fieldset>
        </form>
      )}
    </>
  );
}

export function UseClaimHandle() {
  const { data: session } = useSession();
  const { execute: login, loading: isLoginPending } = useLogin();
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

        {address && !session?.authenticated && (
          <button type="button" onClick={() => login({ address })} disabled={isLoginPending}>
            Login with wallet only
          </button>
        )}

        {session?.type === SessionType.JustWallet && <ClaimHandleOptions />}
      </div>
    </div>
  );
}
