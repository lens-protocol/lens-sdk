import { CollectModuleParams, ReferenceModuleParams } from '@lens-protocol/api-bindings';
import {
  ChargeCollectPolicy,
  CollectPolicyType,
  ReferencePolicyType,
  CreatePostRequest,
  CreateCommentRequest,
  AaveChargeCollectPolicy,
  VaultChargeCollectPolicy,
  MultirecipientChargeCollectPolicy,
} from '@lens-protocol/domain/use-cases/publications';

function isAaveChargeCollectPolicy(
  collect: ChargeCollectPolicy,
): collect is AaveChargeCollectPolicy {
  return 'depositToAave' in collect && collect.depositToAave;
}

function isVaultChargeCollectPolicy(
  collect: ChargeCollectPolicy,
): collect is VaultChargeCollectPolicy {
  return 'vault' in collect;
}

function isMultirecipientChargeCollectPolicy(
  collect: ChargeCollectPolicy,
): collect is MultirecipientChargeCollectPolicy {
  return 'recipients' in collect;
}

function resolveChargeCollectModuleSharedParams(collect: ChargeCollectPolicy) {
  return {
    amount: {
      currency: collect.fee.asset.address,
      value: collect.fee.toSignificantDigits(),
    },
    followerOnly: collect.followersOnly,
    referralFee: collect.mirrorReward,
  };
}

function resolveChargeCollectModule(collect: ChargeCollectPolicy): CollectModuleParams {
  if (isAaveChargeCollectPolicy(collect)) {
    return {
      aaveFeeCollectModule: {
        ...resolveChargeCollectModuleSharedParams(collect),
        recipient: collect.recipient,
        ...(collect.collectLimit && { collectLimit: collect.collectLimit.toString() }),
        ...(collect.endTimestamp && { endTimestamp: collect.endTimestamp.toString() }),
      },
    };
  }

  if (isVaultChargeCollectPolicy(collect)) {
    return {
      erc4626FeeCollectModule: {
        ...resolveChargeCollectModuleSharedParams(collect),
        recipient: collect.recipient,
        vault: collect.vault,
        ...(collect.collectLimit && { collectLimit: collect.collectLimit.toString() }),
        ...(collect.endTimestamp && { endTimestamp: collect.endTimestamp.toString() }),
      },
    };
  }

  if (isMultirecipientChargeCollectPolicy(collect)) {
    return {
      multirecipientFeeCollectModule: {
        ...resolveChargeCollectModuleSharedParams(collect),
        recipients: collect.recipients,
        ...(collect.collectLimit && { collectLimit: collect.collectLimit.toString() }),
        ...(collect.endTimestamp && { endTimestamp: collect.endTimestamp.toString() }),
      },
    };
  }

  if (collect.collectLimit && collect.timeLimited) {
    return {
      limitedTimedFeeCollectModule: {
        ...resolveChargeCollectModuleSharedParams(collect),
        recipient: collect.recipient,
        collectLimit: collect.collectLimit.toString(),
      },
    };
  }

  if (collect.collectLimit) {
    return {
      limitedFeeCollectModule: {
        ...resolveChargeCollectModuleSharedParams(collect),
        recipient: collect.recipient,
        collectLimit: collect.collectLimit.toString(),
      },
    };
  }

  if (collect.timeLimited) {
    return {
      timedFeeCollectModule: {
        ...resolveChargeCollectModuleSharedParams(collect),
        recipient: collect.recipient,
      },
    };
  }

  return {
    feeCollectModule: {
      ...resolveChargeCollectModuleSharedParams(collect),
      recipient: collect.recipient,
    },
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
