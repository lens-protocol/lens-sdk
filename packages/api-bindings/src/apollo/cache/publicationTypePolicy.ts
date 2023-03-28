import { FieldFunctionOptions, FieldPolicy, FieldReadFunction, Reference } from '@apollo/client';
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
} from '../../graphql';
import { decryptionCriteria } from './decryptionCriteria';
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

const hasOptimisticCollectedByMe: FieldReadFunction<boolean> = (existing) => {
  return existing ?? false;
};

const isOptimisticMirroredByMe: FieldReadFunction<boolean> = (existing) => {
  return existing ?? false;
};

export function createContentPublicationTypePolicy() {
  return {
    fields: {
      referencePolicy,
      mirrors: noCachedField(),
      reaction: noCachedField(),
      canComment: noCachedField(),
      canMirror: noCachedField(),
      hasCollectedByMe: noCachedField(),
      collectedBy,
      hasOptimisticCollectedByMe,
      isOptimisticMirroredByMe,
      collectPolicy,
      decryptionCriteria,
    },
  };
}
