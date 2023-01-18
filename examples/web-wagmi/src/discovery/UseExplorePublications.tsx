import {
  PublicationSortCriteria,
  PublicationTypes,
  useExplorePublications,
} from '@lens-protocol/react';

import { Loading } from '../components/loading/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { PublicationCard } from '../publications/components/PublicationCard';

export function UseExplorePublications() {
  const {
    data: publications,
    loading,
    hasMore,
    observeRef,
  } = useInfiniteScroll(
    useExplorePublications({
      sortCriteria: PublicationSortCriteria.TopCommented,
      publicationTypes: [PublicationTypes.Comment, PublicationTypes.Post],
    }),
  );

  if (loading) return <Loading />;

  return (
    <div>
      <h1>
        <code>Explore Publications</code>
      </h1>
      <div>
        {publications.map((publication) => (
          <PublicationCard key={publication.id} publication={publication} />
        ))}
        {hasMore && <p ref={observeRef}>Loading more...</p>}
      </div>
    </div>
  );
}
