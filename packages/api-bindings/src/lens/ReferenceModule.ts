import { ProfileId } from '@lens-protocol/domain/entities';
import { ReferencePolicyType } from '@lens-protocol/domain/use-cases/publications';
import { Data, EvmAddress } from '@lens-protocol/shared-kernel';

import { AnyPublication, PrimaryPublication } from './publication';

export type ReferenceModule = NonNullable<PrimaryPublication['referenceModule']>;

export type FollowersOnlyReferencePolicy = {
  type: ReferencePolicyType.FOLLOWERS_ONLY;
};

export type DegreesOfSeparationReferencePolicy = {
  type: ReferencePolicyType.DEGREES_OF_SEPARATION;
  /**
   * If true, only profile within the specified degrees of separation can comment.
   */
  commentsRestricted: boolean;
  /**
   * If true, only profile within the specified degrees of separation can mirror.
   */
  mirrorsRestricted: boolean;
  /**
   * The number of degrees of separation from the reference profile.
   */
  degreesOfSeparation: number;
  /**
   * If true, only profile within the specified degrees of separation can quote.
   */
  quotesRestricted: boolean;
  /**
   * The profile ID to use as reference for the degrees of separation.
   */
  sourceProfileId?: ProfileId;
};

export type NoReferencePolicy = {
  type: ReferencePolicyType.NO_ONE;
};

export type AnyoneReferencePolicy = {
  type: ReferencePolicyType.ANYONE;
};

export type UnknownReferencePolicy = {
  type: ReferencePolicyType.UNKNOWN;
  contractAddress: EvmAddress;
  chainId: number;
  initializeCalldata: Data;
  initializeResultData?: Data;
  signlessApproved: boolean;
  sponsoredApproved: boolean;
  verified: boolean;
};

export type ReferencePolicy =
  | FollowersOnlyReferencePolicy
  | DegreesOfSeparationReferencePolicy
  | NoReferencePolicy
  | AnyoneReferencePolicy
  | UnknownReferencePolicy;

/**
 * Resolve API {@link ReferenceModule} to more user friendly {@link ReferencePolicy}.
 *
 * @example
 * ```ts
 * const policy = resolveReferencePolicy(publication);
 *
 * switch (policy.type) {
 *   case ReferencePolicyType.ANYONE:
 *     // ...
 *   case ReferencePolicyType.DEGREES_OF_SEPARATION:
 *     // ...
 *   case ReferencePolicyType.FOLLOWERS_ONLY:
 *     // ...
 *   case ReferencePolicyType.NO_ONE:
 *     // ...
 *   case ReferencePolicyType.UNKNOWN:
 *     // ...
 * }
 * ```
 *
 * @param publication - The {@link AnyPublication} to resolve {@link ReferencePolicy} from
 * @returns {@link ReferencePolicy}
 */
export function resolveReferencePolicy(publication: AnyPublication): ReferencePolicy {
  const target = publication.__typename === 'Mirror' ? publication.mirrorOn : publication;

  if (target.momoka !== null || target.referenceModule === null) {
    return {
      type: ReferencePolicyType.ANYONE,
    };
  }

  switch (target.referenceModule?.__typename) {
    case 'DegreesOfSeparationReferenceModuleSettings':
    case 'LegacyDegreesOfSeparationReferenceModuleSettings':
      if (target.referenceModule.degreesOfSeparation === 0) {
        return {
          type: ReferencePolicyType.NO_ONE,
        };
      }
      return {
        type: ReferencePolicyType.DEGREES_OF_SEPARATION,
        degreesOfSeparation: target.referenceModule.degreesOfSeparation,
        commentsRestricted: target.referenceModule.commentsRestricted,
        mirrorsRestricted: target.referenceModule.mirrorsRestricted,
        quotesRestricted:
          target.referenceModule.__typename === 'DegreesOfSeparationReferenceModuleSettings'
            ? target.referenceModule.quotesRestricted
            : false,
        sourceProfileId:
          target.referenceModule.__typename === 'DegreesOfSeparationReferenceModuleSettings'
            ? target.referenceModule.sourceProfileId
            : publication.by.id,
      };

    case 'FollowOnlyReferenceModuleSettings':
    case 'LegacyFollowOnlyReferenceModuleSettings':
      return {
        type: ReferencePolicyType.FOLLOWERS_ONLY,
      };

    case 'UnknownReferenceModuleSettings':
      return {
        type: ReferencePolicyType.UNKNOWN,
        contractAddress: target.referenceModule.contract.address,
        chainId: target.referenceModule.contract.chainId,
        initializeCalldata: target.referenceModule.initializeCalldata as Data,
        initializeResultData: target.referenceModule.initializeResultData as Data,
        signlessApproved: target.referenceModule.signlessApproved,
        sponsoredApproved: target.referenceModule.sponsoredApproved,
        verified: target.referenceModule.verified,
      };
  }
}
