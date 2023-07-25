import { PendingPost, Post } from '@lens-protocol/react-web';

import { ProfilePicture } from '../../profiles/components/ProfilePicture';
import { PublicationCard } from './PublicationCard';

type PendingPostCardProps = {
  publication: PendingPost | Post;
};

export function PendingPostCard({ publication }: PendingPostCardProps) {
  if (publication.__typename === 'PendingPost') {
    return (
      <article>
        <ProfilePicture picture={publication.profile.picture} />
        <p>{publication.profile.name ?? `@${publication.profile.handle}`}</p>
        <div>{publication.content}</div>
      </article>
    );
  }

  return <PublicationCard publication={publication} />;
}
