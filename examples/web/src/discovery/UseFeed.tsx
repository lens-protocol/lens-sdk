import { ProfileId, useFeed } from '@lens-protocol/react-web';

import { RequireProfileSession } from '../components/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { PublicationCard } from '../publications/components/PublicationCard';

function UseFeedInner({ profileId }: { profileId: ProfileId }) {
  const { data, error, loading, hasMore, beforeCount, observeRef, prev } = useInfiniteScroll(
    useFeed({
      where: {
        for: profileId,
      },
    }),
  );

  return (
    <div>
      {data?.length === 0 && <p>No items</p>}

      {loading && <Loading />}

      {error && <ErrorMessage error={error} />}

      <button disabled={loading || beforeCount === 0} onClick={prev}>
        Fetch newer
      </button>

      {data?.map((item, i) => (
        <PublicationCard key={`${item.root.id}-${i}`} publication={item.root} />
      ))}

      {hasMore && <p ref={observeRef}>Loading more...</p>}
    </div>
  );
}

export function UseFeed() {
  return (
    <div>
      <h1>
        <code>useFeed</code>
      </h1>

      <RequireProfileSession message="Log in to view this example.">
        {({ profile }) => <UseFeedInner profileId={profile.id} />}
      </RequireProfileSession>
    </div>
  );
}
