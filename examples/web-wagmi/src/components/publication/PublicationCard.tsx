import { CommentFragment, MirrorFragment, PostFragment } from '@lens-protocol/react';
import { Link } from 'react-router-dom';

import { ProfilePicture } from '../profile/ProfilePicture';

type PublicationProps = {
  publication: PostFragment | CommentFragment | MirrorFragment;
};

export function PublicationCard({ publication }: PublicationProps) {
  return (
    <article>
      <Link to={`/profile/handle/${publication.profile.handle}`}>
        <ProfilePicture picture={publication.profile.picture} />
      </Link>
      <p>{publication.profile.name ?? `@${publication.profile.handle}`}</p>
      <p>{publication.metadata.content}</p>
    </article>
  );
}
