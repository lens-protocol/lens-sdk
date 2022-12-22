import { useCollectables } from '@lens-protocol/react';

import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { LoginButton } from '../auth/LoginButton';
import { WhenLoggedIn, WhenLoggedOut } from '../auth/auth';

type NotificationsInnerProps = {
  walletAddress: string;
};

function CollectablesInner({ walletAddress }: NotificationsInnerProps) {
  const {
    loading,
    data: publications,
    hasMore,
    observeRef,
  } = useInfiniteScroll(useCollectables({ walletAddress }));

  if (loading) return <div>Loading...</div>;

  if (publications.length === 0) {
    return <p>No notifcations</p>;
  }

  return (
    <div>
      {publications.map((publication) => (
        <div key={publication.id}>
          <p>{publication.id}</p>
        </div>
      ))}

      {hasMore && <p ref={observeRef}>Loading more...</p>}
    </div>
  );
}

export function Collectables() {
  return (
    <>
      <h2>Collectables</h2>
      <WhenLoggedIn>
        {({ walletAddress }) => <CollectablesInner walletAddress={walletAddress} />}
      </WhenLoggedIn>
      <WhenLoggedOut>
        <div>
          <p>You must be logged in to use this example.</p>
          <LoginButton />
        </div>
      </WhenLoggedOut>
    </>
  );
}
