import { ReferencePolicyType } from '@lens-protocol/domain/use-cases/publications';

import {
  CollectModuleFragment,
  CollectPolicy,
  Comment,
  Maybe,
  Mirror,
  Post,
  ProfileFragment,
  PublicationStatsFragment,
  ReferenceModule,
  resolveCollectPolicy,
  Wallet,
} from '../graphql';
import { ReferencePolicy } from '../graphql/ReferencePolicy';
import { FieldPolicy, FieldReadFunction, TypePolicy } from './TypePolicy';
import { noCachedField } from './noCachedField';

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

const collectPolicy = <T extends Post | Mirror | Comment>(
  existing: CollectPolicy | undefined,
  { readField }: { readField: (field: keyof T) => Readonly<unknown> | undefined },
) => {
  if (existing) return existing;

  const profile = readField('profile') as ProfileFragment;
  const collectModule = readField('collectModule') as CollectModuleFragment;
  const publicationStats = readField('stats') as PublicationStatsFragment;

  return resolveCollectPolicy({ profile, collectModule, publicationStats });
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
    },
  };
}
