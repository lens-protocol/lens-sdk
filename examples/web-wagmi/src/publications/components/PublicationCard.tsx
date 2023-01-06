import { CommentFragment, MirrorFragment, PostFragment } from '@lens-protocol/react';

import { ProfilePicture } from '../../profiles/components/ProfilePicture';

type PublicationProps = {
  publication: PostFragment | CommentFragment | MirrorFragment;
};

export function PublicationCard({ publication }: PublicationProps) {
  return (
    <article>
      <ProfilePicture picture={publication.profile.picture} />
      <p>{publication.profile.name ?? `@${publication.profile.handle}`}</p>
      <p>{publication.metadata.content}</p>
    </article>
  );
}
