import { Comment, Mirror, Post, Quote } from '@lens-protocol/react';

import { ProfilePicture } from '../../profiles/components/ProfilePicture';

type PublicationCardProps = {
  publication: Post | Comment | Mirror | Quote;
};

export function PublicationCard({ publication }: PublicationCardProps) {
  return (
    <article>
      <ProfilePicture picture={publication.by.metadata?.picture ?? null} />
      <p>{publication.id}</p>
      <p>
        {publication.__typename} by{' '}
        {publication.by.metadata?.displayName ?? publication.by.handle ?? publication.by.id}
      </p>
      {publication.__typename === 'Post' && 'content' in publication.metadata && (
        <p>{publication.metadata.content}</p>
      )}
    </article>
  );
}
