import { CommentFragment, MirrorFragment, PostFragment } from '@lens-protocol/react';
import { Link } from 'react-router-dom';

import { ProfilePicture } from '../profile/ProfilePicture';

type PublicationProps = {
  publication: PostFragment | CommentFragment | MirrorFragment;
};

export function PublicationCard({ publication }: PublicationProps) {
  return (
    <div>
      <Link to={`/profile/handle/${publication.profile.handle}`}>
        <ProfilePicture picture={publication.profile.picture} />
      </Link>
      <h2>{publication.profile.name ?? `@${publication.profile.handle}`}</h2>
      <p>{publication.metadata.content}</p>
    </div>
  );
}
