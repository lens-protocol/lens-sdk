import {
  AnyPublication,
  Comment,
  PrimaryPublication,
  PublicationMetadata,
} from '@lens-protocol/react-web';
import { ReactNode } from 'react';

import { ProfilePicture } from '../profiles/components/ProfilePicture';
import { formatProfileIdentifier } from '../utils/formatProfileIdentifier';

function MetadataSwitch({ metadata }: { metadata: PublicationMetadata }) {
  switch (metadata.__typename) {
    case 'ArticleMetadataV3':
    case 'TextOnlyMetadataV3':
      return <p>{metadata.content}</p>;

    case 'ImageMetadataV3':
      return <img src={metadata.asset.image.raw.uri} alt={metadata.asset.altTag ?? undefined} />;

    default:
      return <p>{metadata.__typename} not supported in this example</p>;
  }
}

function PublicationFacts({ publication }: { publication: PrimaryPublication }) {
  return (
    <>
      <p
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '2rem',
          justifyContent: 'space-between',
        }}
      >
        <span>
          Collects:&nbsp;<strong>{publication.stats.collects}</strong>
        </span>
        <span>
          Mirrors:&nbsp;<strong>{publication.stats.mirrors}</strong>
        </span>
        <span>
          Reactions:&nbsp;<strong>{publication.stats.upvotes - publication.stats.downvotes}</strong>
        </span>
        <span>
          Comments:&nbsp;<strong>{publication.stats.comments}</strong>
        </span>
      </p>
    </>
  );
}

function PublicationBody({ publication }: { publication: PrimaryPublication }) {
  return (
    <div>
      <MetadataSwitch metadata={publication.metadata} />
      <hr />
      <PublicationFacts publication={publication} />
    </div>
  );
}

function PublicationSwitch({ publication }: { publication: AnyPublication }) {
  switch (publication.__typename) {
    case 'Post':
    case 'Comment':
    case 'Quote':
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
    <article style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
          {publication.__typename} by {formatProfileIdentifier(publication.by)}
        </p>
      </div>
      <PublicationSwitch publication={publication} />
      {children}
    </article>
  );
}

type CommentCardProps = {
  comment: Comment;
  children?: ReactNode;
};

export function CommentCard({ comment }: CommentCardProps) {
  return (
    <section>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          gap: '2rem',
        }}
      >
        <ProfilePicture picture={comment.by.metadata?.picture ?? null} />
        <p>{formatProfileIdentifier(comment.by)}</p>
      </div>
      <MetadataSwitch metadata={comment.metadata} />
    </section>
  );
}
