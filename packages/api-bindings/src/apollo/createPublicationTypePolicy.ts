import { ReadFieldFunction } from '@apollo/client/cache/core/types/common';
import { ReferencePolicy, ReferencePolicyType } from '@lens-protocol/domain/use-cases/publications';

import { Comment, Mirror, Post, ReferenceModule } from '../graphql';
import { TypePolicy } from './TypePolicy';

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
        params: {
          commentsRestricted: module.commentsRestricted,
          degreesOfSeparation: module.degreesOfSeparation,
          mirrorsRestricted: module.mirrorsRestricted,
        },
      };
    case 'FollowOnlyReferenceModuleSettings':
      return {
        type: ReferencePolicyType.FOLLOWERS_ONLY,
      };
    case 'UnknownReferenceModuleSettings':
      return {
        type: ReferencePolicyType.UNKNOWN,
        params: {
          contractAddress: module.contractAddress,
          data: module.referenceModuleReturnData as string,
        },
      };
  }
}

type R = Post | Comment | Mirror;

export function createPublicationTypePolicy(): TypePolicy<R> {
  return {
    fields: {
      // Typescript not happy here
      referencePolicy(
        existing: Readonly<R['referencePolicy']> | undefined,
        { readField }: { readField: ReadFieldFunction },
      ) {
        if (existing) return existing;

        const module = readField<ReferenceModule>('referenceModule');

        return resolveReferencePolicy(module ?? null);
      },

      mirrors: {
        // no arguments involved in caching of "mirrors" edge
        keyArgs: false,
      },

      reaction: {
        // no arguments involved in caching of "reaction" edge
        keyArgs: false,
      },

      canComment: {
        keyArgs: false,
      },

      canMirror: {
        keyArgs: false,
      },

      collectedBy: {
        merge: (existing, incoming) => {
          // workaround: try to retain the information even if the publication is updated in
          // cache as part of another query that does not have the collectedBy field
          return existing ?? incoming;
        },
      },

      hasCollectedByMe: {
        keyArgs: false,
      },

      hasOptimisticCollectedByMe(existing: boolean | undefined) {
        return existing ?? false;
      },

      isOptimisticMirroredByMe(existing: boolean | undefined) {
        return existing ?? false;
      },
    },
  };
}
