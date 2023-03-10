import {
  CommentFragment,
  MirrorFragment,
  PostFragment,
  PendingPostFragment,
  CollectState,
  isMirrorPublication,
  ContentPublicationFragment,
  AnyCriterion,
  DecryptionCriteriaType,
} from '@lens-protocol/react';
import { ReactNode } from 'react';

import { ProfilePicture } from '../../profiles/components/ProfilePicture';
import { formatAmount } from '../../utils';

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
  publication: ContentPublicationFragment;
};

function Content({ publication }: ContentProps) {
  if (publication.hidden) {
    return <p>This publication has been hidden</p>;
  }

  if (publication.isGated) {
    if (publication.decryptionCriteria === null) {
      return (
        <p>
          <i>Encrypted content, it's currently not possible to determine the decryption criteria</i>
        </p>
      );
    }

    return (
      <p>
        <i>
          To decrypt this publication you need to:&nbsp;
          <b>{formatDecryptionCriterion(publication.decryptionCriteria)}</b>
        </i>
      </p>
    );
  }

  return <p>{publication.metadata.content}</p>;
}

type PublicationCardProps = {
  publication: PostFragment | CommentFragment | MirrorFragment | PendingPostFragment;
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

  return (
    <article>
      <ProfilePicture picture={publication.profile.picture} />
      <p>{publication.profile.name ?? `@${publication.profile.handle}`}</p>
      <p>
        <Content
          publication={isMirrorPublication(publication) ? publication.mirrorOf : publication}
        />
      </p>
    </article>
  );
}

type CollectablePublicationCardProps = {
  publication: PostFragment | CommentFragment;
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
