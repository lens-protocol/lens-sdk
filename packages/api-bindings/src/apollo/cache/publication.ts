import {
  FieldFunctionOptions,
  FieldPolicy,
  FieldReadFunction,
  Reference,
  StoreObject,
} from '@apollo/client';
import { PublicationId } from '@lens-protocol/domain/entities';
import { ReferencePolicyType } from '@lens-protocol/domain/use-cases/publications';
import { EthereumAddress } from '@lens-protocol/shared-kernel';

import {
  AnyPublication,
  CollectModule,
  CollectPolicy,
  ContentInsight,
  ContentInsightType,
  MetadataOutput,
  PublicationQueryRequest,
  PublicationStats,
  ReferenceModule,
  ReferencePolicy,
  resolveCollectPolicy,
  Wallet,
} from '../../lens';
import { decryptionCriteria } from './decryptionCriteria';
import { SessionType, getSession } from './session';
import {
  getAllPendingTransactions,
  isCollectTransactionFor,
  isMirrorTransactionFor,
} from './transactions';
import { ContentInsightMatcher } from './utils/ContentInsight';
import { extractUrls } from './utils/extractUrls';
import { firstMatch } from './utils/firstMatch';
import { noCachedField } from './utils/noCachedField';
import { observedBy } from './utils/observedBy';

function resolveReferencePolicy(module: ReferenceModule | null): ReferencePolicy {
  if (module === null) {
    return {
      type: ReferencePolicyType.ANYONE,
    };
  }

  switch (module.__typename) {
    case 'DegreesOfSeparationReferenceModuleSettings':
      return {
        type: ReferencePolicyType.DEGREES_OF_SEPARATION,
        degreesOfSeparation: module.degreesOfSeparation,
      };
    case 'FollowOnlyReferenceModuleSettings':
      return {
        type: ReferencePolicyType.FOLLOWERS_ONLY,
      };
    case 'UnknownReferenceModuleSettings':
      return {
        type: ReferencePolicyType.UNKNOWN,
        contractAddress: module.contractAddress,
        data: module.referenceModuleReturnData,
      };
  }
}

const referencePolicy: FieldReadFunction<ReferencePolicy> = (existing, { readField }) => {
  if (existing) return existing;

  const module = readField('referenceModule') as ReferenceModule;

  return resolveReferencePolicy(module ?? null);
};

const collectedBy: FieldPolicy<Wallet> = {
  merge: (existing, incoming) => {
    // workaround: try to retain the information even if the publication is updated in
    // cache as part of another query that does not have the collectedBy field
    return existing ?? incoming;
  },
};

const collectPolicy = (
  existing: CollectPolicy | undefined,
  { readField }: FieldFunctionOptions,
): CollectPolicy => {
  if (existing) return existing;

  const profile = readField('profile') as Reference;
  const collectModule = readField('collectModule') as CollectModule;
  const isAuthorFollowedByMe = readField('isFollowedByMe', profile) as boolean;
  const publicationStats = readField('stats') as PublicationStats;
  const collectNftAddress = (readField('collectNftAddress') as EthereumAddress) || null;

  return resolveCollectPolicy({
    collectModule,
    isAuthorFollowedByMe,
    publicationStats,
    collectNftAddress,
  });
};

const hasCollectedByMe = (existing: boolean, { readField }: FieldFunctionOptions): boolean => {
  // if collected already then just return, it can't be undone
  if (existing === true) return existing;

  const session = getSession();

  if (!session || session.type !== SessionType.WithProfile) return false;

  const publicationId = readField('id') as PublicationId;

  const isCollectTransactionForThisPublication = isCollectTransactionFor({
    publicationId,
    profileId: session.profile.id,
  });

  const collectPendingTx = getAllPendingTransactions().find((transaction) => {
    return isCollectTransactionForThisPublication(transaction);
  });

  return collectPendingTx !== undefined;
};

// TODO: Make sure the typing is correct and force to return the correct type without shallowing the `undefined` which means that the field is missing and breaks the cache
const isMirroredByMe = (
  existing: boolean | undefined,
  { readField }: FieldFunctionOptions,
): boolean => {
  if (existing === true) return existing;

  const session = getSession();

  const publicationId = readField('id') as PublicationId;
  const mirrors = readField('mirrors') as PublicationId[];

  if (!session || session.type !== SessionType.WithProfile) return false;

  if (mirrors.length > 0) return true;

  const isMirrorTransactionForThisPublication = isMirrorTransactionFor({
    publicationId,
    profileId: session.profile.id,
  });

  const mirrorPendingTxs = getAllPendingTransactions().filter((transaction) => {
    return isMirrorTransactionForThisPublication(transaction);
  });

  return mirrorPendingTxs.length > 0;
};

const stats: FieldReadFunction<PublicationStats> = (existing, { readField }) => {
  if (!existing) return existing;

  const session = getSession();

  const publicationId = readField('id') as PublicationId;

  if (!session || session.type !== SessionType.WithProfile) return existing;

  // mirror
  const isMirrorTransactionForThisPublication = isMirrorTransactionFor({
    publicationId,
    profileId: session.profile.id,
  });

  const mirrorPendingTxs = getAllPendingTransactions().filter((transaction) => {
    return isMirrorTransactionForThisPublication(transaction);
  });

  // collect
  const isCollectTransactionForThisPublication = isCollectTransactionFor({
    publicationId,
    profileId: session.profile.id,
  });

  const collectPendingTx = getAllPendingTransactions().filter((transaction) => {
    return isCollectTransactionForThisPublication(transaction);
  });

  return {
    ...existing,
    totalAmountOfMirrors: existing.totalAmountOfMirrors + mirrorPendingTxs.length,
    totalAmountOfCollects: existing.totalAmountOfCollects + collectPendingTx.length,
  };
};

/**
 * @deprecated use `hasCollectedByMe` instead
 */
const hasOptimisticCollectedByMe: FieldReadFunction<boolean> = (existing) => {
  return existing ?? false;
};

/**
 * @deprecated use `isMirroredByMe` instead
 */
const isOptimisticMirroredByMe: FieldReadFunction<boolean> = (existing) => {
  return existing ?? false;
};

export type ContentPublicationTypePolicyConfig = {
  /**
   * A list of ContentInsightMatcher used to extract insights from publication metadata content
   */
  contentMatchers: ContentInsightMatcher[];
};

const createContentInsightFieldPolicy: (
  arg: ContentPublicationTypePolicyConfig,
) => FieldReadFunction<ContentInsight> =
  ({ contentMatchers }) =>
  (_, { readField }) => {
    const metadata = readField('metadata') as MetadataOutput;

    if (metadata.content) {
      const urls = extractUrls(metadata.content);

      const match = firstMatch(urls, contentMatchers);

      if (match) {
        return match;
      }
    }

    return {
      type: ContentInsightType.UNDETERMINED,
    };
  };

const publicationTypename = 'Publication';

export function createPublicationTypePolicy() {
  return {
    keyFields: ({ id }: Readonly<StoreObject>) => `${publicationTypename}:${String(id)}`,
  } as const;
}

function createContentPublicationTypePolicy(config: ContentPublicationTypePolicyConfig) {
  return {
    fields: {
      canComment: noCachedField(),
      canDecrypt: noCachedField(),
      canMirror: noCachedField(),
      collectedBy,
      collectPolicy,
      contentInsight: createContentInsightFieldPolicy(config),
      decryptionCriteria,
      hasCollectedByMe,
      hasOptimisticCollectedByMe,
      isMirroredByMe,
      isOptimisticMirroredByMe,
      mirrors: noCachedField(),
      notInterested: noCachedField(),
      bookmarked: noCachedField(),
      reaction: noCachedField(),
      referencePolicy,
      stats,
      observedBy,
    },
  };
}

export const createCommentTypePolicy = createContentPublicationTypePolicy;

export const createPostTypePolicy = createContentPublicationTypePolicy;

export function createPublicationFieldPolicy(): FieldPolicy<
  AnyPublication,
  AnyPublication,
  Reference,
  FieldFunctionOptions<{ request: PublicationQueryRequest }>
> {
  return {
    read(_, { args, toReference }) {
      return toReference({
        __typename: publicationTypename,
        id: args?.request.publicationId,
      });
    },
  };
}
