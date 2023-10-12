import { profileId, useFeed } from '@lens-protocol/react-web';

import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { PublicationCard } from '../publications/components/PublicationCard';

export function UseFeed() {
  const { data, error, loading, hasMore, observeRef, prev } = useInfiniteScroll(
    useFeed({
      where: {
        for: profileId('0x04'),
      },
    }),
  );

  return (
    <>
      <h1>
        <code>useFeed</code>
      </h1>
      <div>
        {data?.length === 0 && <p>No items</p>}

        {loading && <Loading />}

        {error && <ErrorMessage error={error} />}

        <button disabled={loading} onClick={prev}>
          Fetch newer
        </button>

        {data?.map((item, i) => (
          <PublicationCard key={`${item.root.id}-${i}`} publication={item.root} />
        ))}

        {hasMore && <p ref={observeRef}>Loading more...</p>}
      </div>
    </>
  );
}
