import { useComments, usePublication } from '@lens-protocol/react';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { GenericError } from '../error/GenericError';
import { Loading } from '../loading/Loading';
import { PublicationCard } from './PublicationCard';

type PublicationLayoutProps = {
  publicationId: string;
};

function PublicationLayout({ publicationId }: PublicationLayoutProps) {
  const {
    data: publication,
    loading: publicationLoading,
    error: publicationError,
  } = usePublication({ publicationId });
  const {
    data: comments,
    loading: commentsLoading,
    error: commentsError,
  } = useComments({ commentsOf: publicationId });

  const loading = useMemo(
    () => publicationLoading || commentsLoading,
    [publicationLoading, commentsLoading],
  );
  const error = useMemo(() => publicationError || commentsError, [publicationError, commentsError]);

  if (loading) return <Loading />;

  if (error || !publication || !comments) return <GenericError error={error} />;
  return (
    <div>
      <h1>Publication</h1>
      <PublicationCard publication={publication} />
      <h2>Comments</h2>
      {comments.items.map((comment) => (
        <PublicationCard key={comment.id} publication={comment} />
      ))}
    </div>
  );
}

export function Publication() {
  const { publicationId } = useParams();
  if (!publicationId) return <GenericError error={new Error('Page not found')} />;
  return <PublicationLayout publicationId={publicationId} />;
}
