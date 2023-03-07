import { useComments, usePublication } from '@lens-protocol/react';

import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { PublicationCard } from './components/PublicationCard';

type CommentsProps = {
  commentsOf: string;
};

function Comments({ commentsOf }: CommentsProps) {
  const {
    data: comments,
    error,
    loading,
    hasMore,
    observeRef,
  } = useInfiniteScroll(useComments({ commentsOf }));

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      {comments.map((comment) => (
        <PublicationCard key={comment.id} publication={comment} />
      ))}
      {hasMore && <p ref={observeRef}>Loading more...</p>}
    </div>
  );
}

export function UsePublication() {
  const { data: publication, error, loading } = usePublication({ publicationId: '0x1b-0x0118' });

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h1>
        <code>usePublication</code>
      </h1>
      <PublicationCard publication={publication} />
      <h3>Comments</h3>

      <Comments commentsOf={publication.id} />
    </div>
  );
}
