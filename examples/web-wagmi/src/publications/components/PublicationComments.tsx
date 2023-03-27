import { PublicationId, useComments } from '@lens-protocol/react-web';

import { ErrorMessage } from '../../components/error/ErrorMessage';
import { Loading } from '../../components/loading/Loading';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { PublicationCard } from './PublicationCard';

type PublicationCommentsProps = {
  publicationId: PublicationId;
};

export function PublicationComments({ publicationId }: PublicationCommentsProps) {
  const { data, error, loading, hasMore, observeRef } = useInfiniteScroll(
    useComments({ commentsOf: publicationId }),
  );

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  if (data.length === 0) return <p>No items</p>;

  return (
    <div>
      {data.map((item, i) => (
        <PublicationCard key={`${item.id}-${i}`} publication={item} />
      ))}

      {hasMore && <p ref={observeRef}>Loading more...</p>}
    </div>
  );
}
