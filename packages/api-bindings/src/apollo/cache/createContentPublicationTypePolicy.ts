import { FieldFunctionOptions, FieldPolicy, FieldReadFunction, Reference } from '@apollo/client';
import { PublicationId } from '@lens-protocol/domain/entities';
import { ReferencePolicyType } from '@lens-protocol/domain/use-cases/publications';
import { EthereumAddress } from '@lens-protocol/shared-kernel';

import {
  CollectModule,
  PublicationStats,
  ReferenceModule,
  resolveCollectPolicy,
  ReferencePolicy,
  Wallet,
  CollectPolicy,
  ContentInsight,
  MetadataOutput,
  ContentInsightType,
} from '../../lens';
import { activeProfileIdentifierVar } from './activeProfileIdentifier';
import { decryptionCriteria } from './decryptionCriteria';
import {
  getAllPendingTransactions,
  isCollectTransactionFor,
  isMirrorTransactionFor,
} from './transactions';
import { ContentInsightMatcher } from './utils/ContentInsight';
import { extractUrls } from './utils/extractUrls';
import { firstMatch } from './utils/firstMatch';
import { noCachedField } from './utils/noCachedField';

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

  const profileIdentifier = activeProfileIdentifierVar();
  const publicationId = readField('id') as PublicationId;

  if (!profileIdentifier) return false;

  const isCollectTransactionForThisPublication = isCollectTransactionFor({
    publicationId,
    profileId: profileIdentifier.id,
  });

  const collectPendingTx = getAllPendingTransactions().find((transaction) => {
    return isCollectTransactionForThisPublication(transaction);
  });

  return collectPendingTx !== undefined;
};

const isMirroredByMe = (existing: boolean, { readField }: FieldFunctionOptions): boolean => {
  if (existing === true) return existing;

  const profileIdentifier = activeProfileIdentifierVar();
  const publicationId = readField('id') as PublicationId;
  const mirrors = readField('mirrors') as PublicationId[];

  if (!profileIdentifier) return existing;
  if (mirrors.length > 0) return true;

  const isMirrorTransactionForThisPublication = isMirrorTransactionFor({
    publicationId,
    profileId: profileIdentifier.id,
  });

  const mirrorPendingTxs = getAllPendingTransactions().filter((transaction) => {
    return isMirrorTransactionForThisPublication(transaction);
  });

  return mirrorPendingTxs.length > 0;
};

const stats: FieldReadFunction<PublicationStats> = (existing, { readField }) => {
  if (!existing) return existing;

  const profileIdentifier = activeProfileIdentifierVar();
  const publicationId = readField('id') as PublicationId;

  if (!profileIdentifier) return existing;

  // mirror
  const isMirrorTransactionForThisPublication = isMirrorTransactionFor({
    publicationId,
    profileId: profileIdentifier.id,
  });

  const mirrorPendingTxs = getAllPendingTransactions().filter((transaction) => {
    return isMirrorTransactionForThisPublication(transaction);
  });

  // collect
  const isCollectTransactionForThisPublication = isCollectTransactionFor({
    publicationId,
    profileId: profileIdentifier.id,
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

export function createContentPublicationTypePolicy(config: ContentPublicationTypePolicyConfig) {
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
      reaction: noCachedField(),
      referencePolicy,
      stats,
    },
  };
}
