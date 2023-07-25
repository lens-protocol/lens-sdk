import {
  Comment,
  Mirror,
  Post,
  PendingPost,
  CollectState,
  isMirrorPublication,
  ContentPublication,
  AnyCriterion,
  DecryptionCriteriaType,
  useEncryptedPublication,
} from '@lens-protocol/react-web';
import { ReactNode } from 'react';
import { useInView } from 'react-cool-inview';

import { ProfilePicture } from '../../profiles/components/ProfilePicture';
import { formatAmount } from '../../utils';
import { Media } from './Media';

function formatDecryptionCriterion(criterion: AnyCriterion): string {
  switch (criterion.type) {
    case DecryptionCriteriaType.NFT_OWNERSHIP:
      return `own NFT ${criterion.contractAddress}`;

    case DecryptionCriteriaType.ERC20_OWNERSHIP:
      return `have ERC20 ${formatAmount(criterion.amount)}`;

    case DecryptionCriteriaType.ADDRESS_OWNERSHIP:
      return `own address ${criterion.address}`;

    case DecryptionCriteriaType.PROFILE_OWNERSHIP:
      return `own profile: ${criterion.profileId}`;

    case DecryptionCriteriaType.FOLLOW_PROFILE:
      return `follow profile ${criterion.profileId}`;

    case DecryptionCriteriaType.COLLECT_PUBLICATION:
      return `have collected ${criterion.publicationId}`;

    case DecryptionCriteriaType.COLLECT_THIS_PUBLICATION:
      return `have collected this publication`;

    case DecryptionCriteriaType.OR:
      return criterion.or.map(formatDecryptionCriterion).join(', ');

    case DecryptionCriteriaType.AND:
      return criterion.and.map(formatDecryptionCriterion).join(', ');
  }
}

type ContentProps = {
  publication: ContentPublication;
};

function Content({ publication }: ContentProps) {
  const { decrypt, data, error, isPending } = useEncryptedPublication({
    publication,
  });

  const { observe } = useInView({
    threshold: 0.5,

    onEnter: ({ unobserve }) => {
      unobserve();
      void decrypt();
    },
  });

  if (isPending) {
    return <p>Decrypting...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (data.hidden) {
    return <p>This publication has been hidden</p>;
  }

  return (
    <div ref={observe}>
      <p>{data.metadata.content}</p>
      {data.decryptionCriteria && (
        <small>
          <i>
            To decrypt this publication you need to:&nbsp;
            <b>{formatDecryptionCriterion(data.decryptionCriteria)}</b>
          </i>
        </small>
      )}
    </div>
  );
}

type PublicationCardProps = {
  publication: Post | Comment | Mirror | PendingPost;
};

export function PublicationCard({ publication }: PublicationCardProps) {
  if (publication.__typename === 'PendingPost') {
    return (
      <article>
        <ProfilePicture picture={publication.profile.picture} />
        <p>{publication.profile.name ?? `@${publication.profile.handle}`}</p>
        <div>{publication.content}</div>
      </article>
    );
  }

  const contentPublication = isMirrorPublication(publication) ? publication.mirrorOf : publication;

  return (
    <article>
      <ProfilePicture picture={publication.profile.picture} />
      <p>{publication.profile.name ?? `@${publication.profile.handle}`}</p>

      <Content publication={contentPublication} />
      <Media publication={contentPublication} />
      <p>Publication type: {publication.__typename}</p>
    </article>
  );
}

type CollectablePublicationCardProps = {
  publication: Post | Comment;
  collectButton: ReactNode;
};

export function CollectablePublicationCard({
  publication,
  collectButton,
}: CollectablePublicationCardProps) {
  return (
    <article>
      <ProfilePicture picture={publication.profile.picture} />
      <p>{publication.profile.name ?? `@${publication.profile.handle}`}</p>
      <p>
        {publication.hidden ? 'This publication has been hidden' : publication.metadata.content}
      </p>
      {collectButton}
      {publication.collectPolicy.state === CollectState.COLLECT_LIMIT_REACHED && (
        <p>
          {publication.stats.totalAmountOfCollects}/{publication.collectPolicy.collectLimit}{' '}
          collected
        </p>
      )}
      {publication.collectPolicy.state === CollectState.COLLECT_TIME_EXPIRED && (
        <p>Collectable until: {publication.collectPolicy.endTimestamp}</p>
      )}
    </article>
  );
}
