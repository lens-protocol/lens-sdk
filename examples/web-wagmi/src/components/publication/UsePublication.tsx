import { useComments, usePublication } from '@lens-protocol/react';

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
      <h1>
        <code>usePublication</code>
      </h1>
      <PublicationCard publication={publication} />
      <h3>Comments</h3>
      {comments.map((comment) => (
        <PublicationCard key={comment.id} publication={comment} />
      ))}
    </div>
  );
}

export function Publication() {
  // TODO: use the useExplorePublications hook to get a list of publications to select an id from
  return <PublicationLayout publicationId="0x1b-0x0118" />;
}
