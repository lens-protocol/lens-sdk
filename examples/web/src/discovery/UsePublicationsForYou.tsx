import { usePublicationsForYou } from '@lens-protocol/react-web';

import { RequireProfileSession } from '../components/auth';
import { PublicationCard } from '../components/cards';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

function UsePublicationsForYouInner() {
  const { data, hasMore, observeRef } = useInfiniteScroll(
    usePublicationsForYou({
      suspense: true,
    }),
  );

  return (
    <div>
      <h1>
        <code>usePublicationsForYou</code>
      </h1>

      {data.length === 0 && <p>No items</p>}

      {data.map((item) => (
        <PublicationCard key={item.publication.id} publication={item.publication} />
      ))}

      {hasMore && <p ref={observeRef}>Loading more...</p>}
    </div>
  );
}

export function UsePublicationsForYou() {
  return (
    <RequireProfileSession message="Log in to view this example.">
      {() => <UsePublicationsForYouInner />}
    </RequireProfileSession>
  );
}
