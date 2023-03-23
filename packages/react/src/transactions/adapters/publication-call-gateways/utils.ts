import { CollectModuleParams, ReferenceModuleParams } from '@lens-protocol/api-bindings';
import {
  ChargeCollectPolicyConfig,
  CollectPolicyType,
  ReferencePolicyType,
  CreatePostRequest,
  CreateCommentRequest,
} from '@lens-protocol/domain/use-cases/publications';

export function resolveCollectModuleFeeParams(collect: ChargeCollectPolicyConfig) {
  return {
    amount: {
      currency: collect.fee.asset.address,
      value: collect.fee.toSignificantDigits(),
    },
    followerOnly: collect.followersOnly,
    recipient: collect.recipient,
    referralFee: collect.mirrorReward,
  };
}

export function resolveChargeCollectModule(
  collect: ChargeCollectPolicyConfig,
): CollectModuleParams {
  if (collect.collectLimit && collect.timeLimited) {
    return {
      limitedTimedFeeCollectModule: {
        ...resolveCollectModuleFeeParams(collect),
        collectLimit: collect.collectLimit.toString(),
      },
    };
  }
  if (collect.collectLimit) {
    return {
      limitedFeeCollectModule: {
        ...resolveCollectModuleFeeParams(collect),
        collectLimit: collect.collectLimit.toString(),
      },
    };
  }
  if (collect.timeLimited) {
    return {
      timedFeeCollectModule: resolveCollectModuleFeeParams(collect),
    };
  }
  return {
    feeCollectModule: resolveCollectModuleFeeParams(collect),
  };
}

export function resolveCollectModule(
  request: CreatePostRequest | CreateCommentRequest,
): CollectModuleParams {
  switch (request.collect.type) {
    case CollectPolicyType.FREE:
      return {
        freeCollectModule: {
          followerOnly: request.collect.followersOnly,
        },
      };

    case CollectPolicyType.NO_COLLECT:
      return {
        revertCollectModule: true,
      };

    case CollectPolicyType.CHARGE:
      return resolveChargeCollectModule(request.collect);
  }
}

export function resolveReferenceModule(
  request: CreatePostRequest | CreateCommentRequest,
): ReferenceModuleParams | undefined {
  if (request.reference.type === ReferencePolicyType.FOLLOWERS_ONLY) {
    return {
      followerOnlyReferenceModule: true,
    };
  }

  if (request.reference.type === ReferencePolicyType.DEGREES_OF_SEPARATION) {
    return {
      degreesOfSeparationReferenceModule: request.reference.params,
    };
  }

  return undefined;
}
