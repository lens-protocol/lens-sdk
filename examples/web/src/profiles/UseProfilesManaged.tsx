import { useProfilesManaged } from '@lens-protocol/react-web';
import { useAccount, useConnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

import { WhenLoggedIn, WhenLoggedOut } from '../components/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { ProfileCard } from './components/ProfileCard';

function UseProfilesManagedInner({ address }: { address: string }) {
  const {
    data: profiles,
    error,
    loading,
    hasMore,
    observeRef,
  } = useInfiniteScroll(
    useProfilesManaged({
      for: address,
    }),
  );

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <p>{`Using wallet ${address}`}</p>
      {profiles.map((p) => (
        <ProfileCard key={p.id} profile={p} />
      ))}

      {hasMore && <p ref={observeRef}>Loading more...</p>}
    </div>
  );
}

export function UseProfilesManaged() {
  const { address, isConnected, isConnecting } = useAccount();

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  return (
    <div>
      <h1>
        <code>useProfilesManaged</code>
      </h1>

      <WhenLoggedIn>
        {(session) => <UseProfilesManagedInner address={session.address} />}
      </WhenLoggedIn>
      <WhenLoggedOut>
        <div>
          {!isConnected && (
            <div>
              <p>Connect your wallet to see profiles managed by you.</p>
              <button disabled={isConnecting} onClick={() => connect()}>
                Connect
              </button>
            </div>
          )}

          {address && <UseProfilesManagedInner address={address} />}
        </div>
      </WhenLoggedOut>
    </div>
  );
}
