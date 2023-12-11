import {
  AnyPublication,
  Comment,
  Post,
  PublicationMetadata,
  PublicationStats,
} from '@lens-protocol/react-web';
import { ReactNode } from 'react';

import { ProfilePicture } from '../../profiles/components/ProfilePicture';

function MetadataSwitch({ metadata }: { metadata: PublicationMetadata }) {
  switch (metadata.__typename) {
    case 'ArticleMetadataV3':
    case 'TextOnlyMetadataV3':
    case 'ImageMetadataV3':
      return <p>{metadata.content}</p>;

    default:
      return <p>{metadata.__typename} not supported in this example</p>;
  }
}

function PublicationTickers({ stats }: { stats: PublicationStats }) {
  return (
    <p
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '2rem',
        justifyContent: 'space-between',
      }}
    >
      <span>
        Collects:&nbsp;<strong>{stats.collects}</strong>
      </span>
      <span>
        Mirrors:&nbsp;<strong>{stats.mirrors}</strong>
      </span>
      <span>
        Reactions:&nbsp;<strong>{stats.upvotes - stats.downvotes}</strong>
      </span>
      <span>
        Comments:&nbsp;<strong>{stats.comments}</strong>
      </span>
    </p>
  );
}

function PublicationBody({ publication }: { publication: Post | Comment }) {
  return (
    <div>
      <MetadataSwitch metadata={publication.metadata} />
      <hr />
      <PublicationTickers stats={publication.stats} />
    </div>
  );
}

function PublicationSwitch({ publication }: { publication: AnyPublication }) {
  switch (publication.__typename) {
    case 'Post':
    case 'Comment':
      return <PublicationBody publication={publication} />;
    default:
      return null;
  }
}

type PublicationCardProps = {
  publication: AnyPublication;
  children?: ReactNode;
};

export function PublicationCard({ publication, children }: PublicationCardProps) {
  return (
    <article>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          gap: '2rem',
        }}
      >
        <ProfilePicture picture={publication.by.metadata?.picture ?? null} />
        <p>
          {publication.__typename} by{' '}
          {publication.by.metadata?.displayName ??
            publication.by.handle?.fullHandle ??
            publication.by.id}
        </p>
      </div>
      <PublicationSwitch publication={publication} />
      {children}
    </article>
  );
}
