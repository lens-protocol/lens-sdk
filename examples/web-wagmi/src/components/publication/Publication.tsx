import { useComments, usePublication } from '@lens-protocol/react';
import { useParams } from 'react-router-dom';

import { GenericError } from '../error/GenericError';
import { Loading } from '../loading/Loading';
import { PublicationCard } from './PublicationCard';

type PublicationLayoutProps = {
  publicationId: string;
};

function PublicationLayout({ publicationId }: PublicationLayoutProps) {
  const { data: publication, loading: publicationLoading } = usePublication({ publicationId });
  const { data: comments, loading: commentsLoading } = useComments({ commentsOf: publicationId });

  if (publicationLoading || commentsLoading) return <Loading />;
  return (
    <div>
      <h2>Publication</h2>
      <PublicationCard publication={publication} />
      <h3>Comments</h3>
      {comments.map((comment) => (
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
