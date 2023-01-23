import { ReferencePolicyType } from '@lens-protocol/domain/use-cases/publications';

import { FieldPolicy, FieldReadFunction, TypePolicy } from './TypePolicy';
import { noCachedField } from './noCachedField';
import { Comment, Maybe, Mirror, Post, ReferenceModule, Wallet } from '../graphql';
import { ReferencePolicy } from '../graphql/ReferencePolicy';

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

const referencePolicy: FieldReadFunction<ReferencePolicy, Post | Comment> = (
  existing,
  { readField },
) => {
  if (existing) return existing;

  const module = readField('referenceModule');

  return resolveReferencePolicy(module ?? null);
};

const collectedBy: FieldPolicy<Maybe<Wallet>, Post | Comment> = {
  merge: (existing, incoming) => {
    // workaround: try to retain the information even if the publication is updated in
    // cache as part of another query that does not have the collectedBy field
    return existing ?? incoming;
  },
};

const hasOptimisticCollectedByMe: FieldReadFunction<boolean, Post | Comment | Mirror> = (
  existing: boolean | undefined,
) => {
  return existing ?? false;
};

const isOptimisticMirroredByMe: FieldReadFunction<boolean, Post | Comment | Mirror> = (
  existing: boolean | undefined,
) => {
  return existing ?? false;
};

export function createMirrorTypePolicy(): TypePolicy<Mirror> {
  return {
    fields: {
      hasCollectedByMe: noCachedField(),

      hasOptimisticCollectedByMe,
    },
  };
}

export function createMirrorablePublicationTypePolicy(): TypePolicy<Comment | Post> {
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
    },
  };
}
