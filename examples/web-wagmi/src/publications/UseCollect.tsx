import {
  CollectState,
  CommentFragment,
  isPostPublication,
  PostFragment,
  ProfileFragment,
  useCollect,
  useFeed,
} from '@lens-protocol/react';

import { CollectablePublicationCard } from './components/PublicationCard';
import { UnauthenticatedFallback } from '../components/UnauthenticatedFallback';
import { WhenLoggedInWithProfile } from '../components/auth/auth';
import { Loading } from '../components/loading/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

type CollectButtonProps = {
  publication: PostFragment | CommentFragment;
};

function CollectButton({ publication }: CollectButtonProps) {
  const { collect, error, isPending } = useCollect({ publication });

  const isCollected = publication.hasOptimisticCollectedByMe || publication.hasCollectedByMe;

  switch (publication.collectPolicy.state) {
    case CollectState.COLLECT_TIME_EXPIRED:
      return <button disabled={true}>Collecting ended</button>;
    case CollectState.COLLECT_LIMIT_REACHED:
      return <button disabled={true}>Collect limit reached</button>;
    case CollectState.NOT_A_FOLLOWER:
      return <button disabled={true}>Only followers can collect</button>;
    case CollectState.CANNOT_BE_COLLECTED:
      return <button disabled={true}>Cannot be collected</button>;
    case CollectState.CAN_BE_COLLECTED:
      return (
        <button onClick={collect} disabled={isCollected || isPending}>
          {error
            ? 'Error'
            : isPending
            ? 'Collecting...'
            : isCollected
            ? `You've already collected`
            : 'Collect'}
        </button>
      );
  }
}

type UseCollectInnerProps = {
  activeProfile: ProfileFragment;
};

function Feed({ activeProfile }: UseCollectInnerProps) {
  const {
    data: publications,
    loading,
    hasMore,
    observeRef,
  } = useInfiniteScroll(useFeed({ profileId: activeProfile.id, observerId: activeProfile.id }));

  if (loading) return <div>Loading...</div>;

  return (
    <>
      {(publications?.length === 0 || !publications) && <p>No items</p>}

      {loading && <Loading />}

      {publications &&
        publications
          .filter((i) => isPostPublication(i.root))
          .map((item, i) => (
            <>
              <CollectablePublicationCard
                key={`${item.root.id}-${i}`}
                publication={item.root}
                collectButton={<CollectButton publication={item.root} />}
              />
            </>
          ))}

      {hasMore && <p ref={observeRef}>Loading more...</p>}
    </>
  );
}

export function UseCollect() {
  return (
    <div>
      <h1>
        <code>useCollect</code>
      </h1>
      <WhenLoggedInWithProfile>
        {({ profile }) => <Feed activeProfile={profile} />}
      </WhenLoggedInWithProfile>
      <UnauthenticatedFallback message="You must be logged in to collect a publication." />
    </div>
  );
}
