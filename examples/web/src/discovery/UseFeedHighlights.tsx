import { ProfileId, useFeedHighlights } from '@lens-protocol/react-web';

import { RequireProfileSession } from '../components/auth';
import { PublicationCard } from '../components/cards';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

function UseFeedHighlightsInner({ profileId }: { profileId: ProfileId }) {
  const { data, error, loading, hasMore, beforeCount, observeRef, prev } = useInfiniteScroll(
    useFeedHighlights({
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

      {data?.map((item) => (
        <PublicationCard key={`${item.id}`} publication={item} />
      ))}

      {hasMore && <p ref={observeRef}>Loading more...</p>}
    </div>
  );
}

export function UseFeedHighlights() {
  return (
    <div>
      <h1>
        <code>useFeedHighlights</code>
      </h1>

      <RequireProfileSession message="Log in to view this example.">
        {({ profile }) => <UseFeedHighlightsInner profileId={profile.id} />}
      </RequireProfileSession>
    </div>
  );
}
