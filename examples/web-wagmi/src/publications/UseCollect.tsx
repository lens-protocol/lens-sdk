import {
  CollectState,
  Comment,
  isPostPublication,
  Post,
  ProfileOwnedByMe,
  useFeed,
} from '@lens-protocol/react-web';

import { UnauthenticatedFallback } from '../components/UnauthenticatedFallback';
import { WhenLoggedInWithProfile } from '../components/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { useCollectWithSelfFundedFallback } from '../hooks/useCollectWithSelfFundedFallback';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { PublicationCard } from './components/PublicationCard';

type CollectButtonProps = {
  collector: ProfileOwnedByMe;
  publication: Post | Comment;
};

function CollectButton({ collector, publication }: CollectButtonProps) {
  const {
    execute: collect,
    error,
    isPending,
  } = useCollectWithSelfFundedFallback({ collector, publication });
  const isCollected = publication.hasCollectedByMe;

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
          <button onClick={collect} disabled={isCollected || isPending}>
            {error
              ? 'Error'
              : isPending
              ? 'Collecting...'
              : isCollected
              ? `You've already collected`
              : 'Collect'}
          </button>
          {error && <ErrorMessage error={error} />}
          <p>Total collets: {publication.stats.totalAmountOfCollects}</p>
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
          <PublicationCard key={`${item.root.id}-${i}`} publication={item.root}>
            <CollectButton collector={activeProfile} publication={item.root} />
            {item.root.collectPolicy.state === CollectState.COLLECT_LIMIT_REACHED && (
              <p>
                {item.root.stats.totalAmountOfCollects}/{item.root.collectPolicy.collectLimit}{' '}
                collected
              </p>
            )}
            {item.root.collectPolicy.state === CollectState.COLLECT_TIME_EXPIRED && (
              <p>Collectable until: {item.root.collectPolicy.endTimestamp}</p>
            )}
          </PublicationCard>
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
