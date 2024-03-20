import { useProfilesManaged } from '@lens-protocol/react-web';

import { RequireConnectedWallet } from '../components/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { ProfileCard } from '../profiles/components/ProfileCard';

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
  return (
    <div>
      <h1>
        <code>useProfilesManaged</code>
      </h1>

      <RequireConnectedWallet message="Connect your wallet to see profiles managed by you.">
        {(address) => <UseProfilesManagedInner address={address} />}
      </RequireConnectedWallet>
    </div>
  );
}
