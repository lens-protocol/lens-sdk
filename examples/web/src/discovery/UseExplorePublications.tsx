import { ExplorePublicationsOrderByType, useExplorePublications } from '@lens-protocol/react-web';

import { CollectCriteria } from '../components/CollectPolicy';
import { PublicationCard } from '../components/cards';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

export function UseExplorePublications() {
  const {
    data: publications,
    hasMore,
    observeRef,
  } = useInfiniteScroll(
    useExplorePublications({
      orderBy: ExplorePublicationsOrderByType.Latest,
      suspense: true,
    }),
  );

  return (
    <div>
      <h1>
        <code>useExplorePublications</code>
      </h1>
      <div>
        {publications.map((publication) => (
          <PublicationCard key={publication.id} publication={publication}>
            <CollectCriteria publication={publication} />
          </PublicationCard>
        ))}
        {hasMore && <p ref={observeRef}>Loading more...</p>}
      </div>
    </div>
  );
}
