import {
  PublicationSortCriteria,
  PublicationTypes,
  useExplorePublications,
} from '@lens-protocol/react';

import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { Loading } from '../loading/Loading';
import { LinkedPublicationCard } from './PublicationCard';

export function ExplorePublications() {
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
      <h2>Explore Publications</h2>
      <div>
        {publications.map((publication) => (
          <LinkedPublicationCard key={publication.id} publication={publication} />
        ))}
        {hasMore && <p ref={observeRef}>Loading more...</p>}
      </div>
    </div>
  );
}
