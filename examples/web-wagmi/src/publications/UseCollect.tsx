import {
  CollectState,
  Comment,
  isPostPublication,
  Post,
  ProfileOwnedByMe,
  supportsSelfFundedFallback,
  useCollect,
  useFeed,
  useSelfFundedFallback,
} from '@lens-protocol/react-web';
import { useState } from 'react';

import { UnauthenticatedFallback } from '../components/UnauthenticatedFallback';
import { WhenLoggedInWithProfile } from '../components/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { CollectablePublicationCard } from './components/PublicationCard';

type CollectButtonProps = {
  collector: ProfileOwnedByMe;
  publication: Post | Comment;
};

function CollectButton({ collector, publication }: CollectButtonProps) {
  const { execute: collect, error, isPending } = useCollect({ collector, publication });
  const {
    execute: selfFundedCollect,
    isPending: isSelfFundedCollectFallbackPending,
    error: selfFundedError,
  } = useSelfFundedFallback();
  const [hasRetriedWithSelfFunded, setHasRetriedWithSelfFunded] = useState(false);

  const isCollected = publication.hasCollectedByMe;

  const handleCollect = async () => {
    const attempt = await collect();
    if (attempt.isSuccess()) {
      return;
    }
    if (supportsSelfFundedFallback(attempt.error)) {
      const retry = window.confirm(
        'We cannot cover the transaction costs at this time. Do you want to retry with your own MATIC?',
      );

      setHasRetriedWithSelfFunded(true);

      if (retry) {
        await selfFundedCollect(attempt.error.fallback);
      }
    }
  };

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
        <>
          <button
            onClick={handleCollect}
            disabled={isCollected || isPending || isSelfFundedCollectFallbackPending}
          >
            {error
              ? 'Error'
              : isPending || isSelfFundedCollectFallbackPending
              ? 'Collecting...'
              : isCollected
              ? `You've already collected`
              : 'Collect'}
          </button>
          {error && !hasRetriedWithSelfFunded && <ErrorMessage error={error} />}
          {selfFundedError && hasRetriedWithSelfFunded && <ErrorMessage error={selfFundedError} />}
        </>
      );
  }
}

type FeedProps = {
  activeProfile: ProfileOwnedByMe;
};

function Feed({ activeProfile }: FeedProps) {
  const {
    data: publications,
    error,
    loading,
    hasMore,
    observeRef,
  } = useInfiniteScroll(useFeed({ profileId: activeProfile.id }));

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  if (publications.length === 0) return <p>No items</p>;

  return (
    <>
      {publications
        .filter((i) => isPostPublication(i.root))
        .map((item, i) => (
          <CollectablePublicationCard
            key={`${item.root.id}-${i}`}
            publication={item.root}
            collectButton={<CollectButton collector={activeProfile} publication={item.root} />}
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
