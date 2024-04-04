import { ReferenceModuleInput } from '@lens-protocol/api-bindings';
import {
  ReferencePolicyType,
  ReferencePolicyConfig,
} from '@lens-protocol/domain/use-cases/publications';

export function resolveReferenceModuleInput(
  config: ReferencePolicyConfig,
): ReferenceModuleInput | undefined {
  switch (config.type) {
    case ReferencePolicyType.FOLLOWERS_ONLY:
      return {
        followerOnlyReferenceModule: true,
      };

    case ReferencePolicyType.DEGREES_OF_SEPARATION:
      return {
        degreesOfSeparationReferenceModule: config.params,
      };

    case ReferencePolicyType.NO_ONE:
      return {
        degreesOfSeparationReferenceModule: {
          commentsRestricted: false,
          mirrorsRestricted: false,
          degreesOfSeparation: 0,
          quotesRestricted: false,
        },
      };

    case ReferencePolicyType.UNKNOWN:
      return {
        unknownReferenceModule: {
          address: config.address,
          data: config.data,
        },
      };
  }

  return undefined;
}
