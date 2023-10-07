import { Comment, Post, AnyPublication, PublicationMetadata } from '@lens-protocol/react';

import { ProfilePicture } from '../../profiles/components/ProfilePicture';

function MetadataSwitch({ metadata }: { metadata: PublicationMetadata }) {
  switch (metadata.__typename) {
    case 'ArticleMetadataV3':
    case 'TextOnlyMetadataV3':
      return <p>{metadata.content}</p>;

    default:
      return <p>{metadata.__typename} not supported yet</p>;
  }
}

function PublicationContent({ publication }: { publication: Post | Comment }) {
  return (
    <section>
      <MetadataSwitch metadata={publication.metadata} />
    </section>
  );
}

function PublicationSwitch({ publication }: { publication: AnyPublication }) {
  switch (publication.__typename) {
    case 'Post':
    case 'Comment':
      return <PublicationContent publication={publication} />;
    default:
      return null;
  }
}

type PublicationCardProps = {
  publication: AnyPublication;
};

export function PublicationCard({ publication }: PublicationCardProps) {
  return (
    <article>
      <ProfilePicture picture={publication.by.metadata?.picture ?? null} />
      <p>
        {publication.__typename} by{' '}
        {publication.by.metadata?.displayName ?? publication.by.handle ?? publication.by.id}
      </p>
      <PublicationSwitch publication={publication} />
    </article>
  );
}
