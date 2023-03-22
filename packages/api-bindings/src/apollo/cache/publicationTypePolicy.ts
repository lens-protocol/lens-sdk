import { ReferencePolicyType } from '@lens-protocol/domain/use-cases/publications';

import {
  CollectModuleFragment,
  CollectPolicy,
  Comment,
  Maybe,
  Post,
  ProfileFragment,
  PublicationStatsFragment,
  ReferenceModule,
  resolveCollectPolicy,
  ReferencePolicy,
  Wallet,
} from '../../graphql';
import { decryptionCriteria } from './decryptionCriteria';
import { FieldPolicy, FieldReadFunction, TypePolicy } from './utils/TypePolicy';
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

const referencePolicy: FieldReadFunction<ReferencePolicy, Comment | Post> = (
  existing,
  { readField },
) => {
  if (existing) return existing;

  const module = readField('referenceModule');

  return resolveReferencePolicy(module ?? null);
};

const collectedBy: FieldPolicy<Maybe<Wallet>, Comment | Post> = {
  merge: (existing, incoming) => {
    // workaround: try to retain the information even if the publication is updated in
    // cache as part of another query that does not have the collectedBy field
    return existing ?? incoming;
  },
};

const collectPolicy: FieldReadFunction<CollectPolicy, Comment | Post> = (
  existing,
  { readField },
) => {
  if (existing) return existing;

  const profile = readField('profile') as unknown as ProfileFragment;
  const collectModule = readField('collectModule') as CollectModuleFragment;
  const publicationStats = readField('stats') as unknown as PublicationStatsFragment;
  const collectNftAddress = readField('collectNftAddress') || null;

  return resolveCollectPolicy({ profile, collectModule, publicationStats, collectNftAddress });
};

const hasOptimisticCollectedByMe: FieldReadFunction<boolean, Comment | Post> = (
  existing: boolean | undefined,
) => {
  return existing ?? false;
};

const isOptimisticMirroredByMe: FieldReadFunction<boolean, Comment | Post> = (
  existing: boolean | undefined,
) => {
  return existing ?? false;
};

export function createContentPublicationTypePolicy(): TypePolicy<Comment | Post> {
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
