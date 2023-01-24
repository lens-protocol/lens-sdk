import {
  CommentFragment,
  isPostPublication,
  PostFragment,
  ProfileFragment,
  useCollect,
  useFeed,
} from '@lens-protocol/react';

import { UnauthenticatedFallback } from '../components/UnauthenticatedFallback';
import { WhenLoggedInWithProfile } from '../components/auth/auth';
import { Loading } from '../components/loading/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { CollectablePublicationCard } from './components/PublicationCard';

type CollectButtonProps = {
  publication: PostFragment | CommentFragment;
};

function CollectButton({ publication }: CollectButtonProps) {
  const { collect, error, isPending } = useCollect({ publication });

  const isCollected = publication.hasOptimisticCollectedByMe || publication.hasCollectedByMe;

  return (
    <button onClick={collect}>
      {error ? 'Error' : isPending ? 'Collecting' : isCollected ? 'Collected' : 'Collect'}
    </button>
  );
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
  } = useInfiniteScroll(useFeed({ profileId: activeProfile.id }));

  if (loading) return <div>Loading...</div>;

  return (
    <>
      {publications?.length === 0 && <p>No items</p>}

      {loading && <Loading />}

      {publications
        .filter((i) => isPostPublication(i.root))
        .map((item, i) => (
          <CollectablePublicationCard
            key={`${item.root.id}-${i}`}
            publication={item.root}
            collectButton={<CollectButton publication={item.root} />}
          />
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
