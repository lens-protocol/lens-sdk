import { profileId, useFeedHighlights } from '@lens-protocol/react-web';

import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { PublicationCard } from '../publications/components/PublicationCard';

export function UseFeedHighlights() {
  const { data, error, loading, hasMore, observeRef, prev } = useInfiniteScroll(
    useFeedHighlights({
      where: {
        for: profileId('0x01'),
      },
    }),
  );

  return (
    <>
      <h1>
        <code>useFeedHighlights</code>
      </h1>
      <div>
        {data?.length === 0 && <p>No items</p>}

        {loading && <Loading />}

        {error && <ErrorMessage error={error} />}

        <button disabled={loading} onClick={prev}>
          Fetch newer
        </button>

        {data?.map((item) => (
          <PublicationCard key={`${item.id}`} publication={item} />
        ))}

        {hasMore && <p ref={observeRef}>Loading more...</p>}
      </div>
    </>
  );
}
