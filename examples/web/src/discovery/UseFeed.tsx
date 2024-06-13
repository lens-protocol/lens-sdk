import { useFeed } from '@lens-protocol/react-web';

import { RequireProfileSession } from '../components/auth';
import { PublicationCard } from '../components/cards';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

function Feed() {
  const { data, hasMore, observeRef } = useInfiniteScroll(
    useFeed({
      suspense: true,
    }),
  );

  return (
    <div>
      <h1>
        <code>useFeed</code>
      </h1>

      {data?.length === 0 && <p>No items</p>}

      {data?.map((item, i) => (
        <PublicationCard key={`${item.root.id}-${i}`} publication={item.root} />
      ))}

      {hasMore && <p ref={observeRef}>Loading more...</p>}
    </div>
  );
}

export function UseFeed() {
  return (
    <RequireProfileSession message="Log in to view this example.">
      {() => <Feed />}
    </RequireProfileSession>
  );
}
