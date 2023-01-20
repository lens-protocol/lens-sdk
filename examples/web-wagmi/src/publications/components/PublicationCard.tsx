import {
  CommentFragment,
  MirrorFragment,
  PostFragment,
  PendingPostFragment,
} from '@lens-protocol/react';

import { ProfilePicture } from '../../profiles/components/ProfilePicture';

type PublicationCardProps = {
  publication: PostFragment | CommentFragment | MirrorFragment | PendingPostFragment;
};

export function PublicationCard({ publication }: PublicationCardProps) {
  if (publication.__typename === 'PendingPost') {
    return (
      <article>
        <ProfilePicture picture={publication.profile.picture} />
        <p>{publication.profile.name ?? `@${publication.profile.handle}`}</p>
        <p>{publication.content}</p>
      </article>
    );
  }

  return (
    <article>
      <ProfilePicture picture={publication.profile.picture} />
      <p>{publication.profile.name ?? `@${publication.profile.handle}`}</p>
      <p>
        {publication.hidden ? 'This publication has been hidden' : publication.metadata.content}
      </p>
    </article>
  );
}
