import {
  PublicationId,
  publicationId,
  useComments,
  usePublication,
} from '@lens-protocol/react-web';

import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { PublicationCard } from './components/PublicationCard';

type CommentsProps = {
  commentsOf: PublicationId;
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
  const {
    data: publication,
    error,
    loading,
  } = usePublication({ publicationId: publicationId('0x3e-0x15') });

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
