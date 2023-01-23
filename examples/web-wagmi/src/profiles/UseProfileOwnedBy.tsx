import { EthereumAddress, useProfilesOwnedBy } from '@lens-protocol/react';

import { LoginButton } from '../components/auth/LoginButton';
import { WhenLoggedInWithProfile, WhenLoggedOut } from '../components/auth/auth';
import { Loading } from '../components/loading/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { ProfileCard } from './components/ProfileCard';

type UseProfilesOwnedByProps = {
  address: EthereumAddress;
};

function UseProfilesOwnedByActiveWallet({ address }: UseProfilesOwnedByProps) {
  const { data, loading, hasMore, observeRef } = useInfiniteScroll(useProfilesOwnedBy({ address }));

  if (loading) return <Loading />;

  if (data.length === 0) {
    return <p>No profiles found</p>;
  }
  return (
    <div>
      {data.map((profile) => (
        <ProfileCard key={profile.id} profile={profile} />
      ))}
      {hasMore && <p ref={observeRef}>Loading more...</p>}
    </div>
  );
}

export function UseProfilesOwnedBy() {
  return (
    <div>
      <h1>
        <code>useProfilesOwnedBy</code>
      </h1>

      <WhenLoggedInWithProfile>
        {({ wallet }) => <UseProfilesOwnedByActiveWallet address={wallet.address} />}
      </WhenLoggedInWithProfile>
      <WhenLoggedOut>
        <div>
          <p>You must be logged in to use this example.</p>
          <LoginButton />
        </div>
      </WhenLoggedOut>
    </div>
  );
}
