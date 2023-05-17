import { CollectModuleParams, ModuleFeeParams } from '@lens-protocol/api-bindings';
import {
  CollectPolicyType,
  CreatePostRequest,
  CreateCommentRequest,
  AaveChargeCollectPolicyConfig,
  VaultChargeCollectPolicyConfig,
  MultirecipientChargeCollectPolicyConfig,
  ChargeCollectPolicyConfig,
  CollectPolicyConfig,
  SimpleChargeCollectPolicyConfig,
} from '@lens-protocol/domain/use-cases/publications';

function isAaveChargeCollectPolicy(
  collect: ChargeCollectPolicyConfig,
): collect is AaveChargeCollectPolicyConfig {
  return 'depositToAave' in collect && collect.depositToAave;
}

function isVaultChargeCollectPolicy(
  collect: ChargeCollectPolicyConfig,
): collect is VaultChargeCollectPolicyConfig {
  return 'vault' in collect;
}

function isMultirecipientChargeCollectPolicy(
  collect: ChargeCollectPolicyConfig,
): collect is MultirecipientChargeCollectPolicyConfig {
  return 'recipients' in collect;
}

function resolveChargeCollectModuleSharedParams(collect: ChargeCollectPolicyConfig) {
  return {
    amount: {
      currency: collect.fee.asset.address,
      value: collect.fee.toSignificantDigits(),
    },
    followerOnly: collect.followersOnly,
    referralFee: collect.mirrorReward,
  };
}

function resolveModuleFeeParams(collect: SimpleChargeCollectPolicyConfig): ModuleFeeParams {
  return {
    amount: {
      currency: collect.fee.asset.address,
      value: collect.fee.toSignificantDigits(),
    },
    referralFee: collect.mirrorReward,
    recipient: collect.recipient,
  };
}

function resolveOptionalCollectLimit(collect: CollectPolicyConfig) {
  return {
    ...('collectLimit' in collect &&
      collect.collectLimit && { collectLimit: collect.collectLimit.toString() }),
  };
}

function resolveOptionalEndTimestamp(collect: CollectPolicyConfig) {
  return {
    ...('endTimestamp' in collect &&
      collect.endTimestamp && { endTimestamp: collect.endTimestamp.toString() }),
  };
}

function oneDayFromNowTimestamp() {
  return Date.now() + 24 * 60 * 60 * 1000;
}

function resolveEndTimestampFromOptionalTimeLimited(collect: CollectPolicyConfig) {
  return {
    ...('timeLimited' in collect &&
      collect.timeLimited && { endTimestamp: oneDayFromNowTimestamp().toString() }),
  };
}

function resolveChargeCollectModule(collect: ChargeCollectPolicyConfig): CollectModuleParams {
  if (isAaveChargeCollectPolicy(collect)) {
    return {
      aaveFeeCollectModule: {
        ...resolveChargeCollectModuleSharedParams(collect),
        recipient: collect.recipient,
        ...resolveOptionalCollectLimit(collect),
        ...resolveOptionalEndTimestamp(collect),
      },
    };
  }

  if (isVaultChargeCollectPolicy(collect)) {
    return {
      erc4626FeeCollectModule: {
        ...resolveChargeCollectModuleSharedParams(collect),
        recipient: collect.recipient,
        vault: collect.vault,
        ...resolveOptionalCollectLimit(collect),
        ...resolveOptionalEndTimestamp(collect),
      },
    };
  }

  if (isMultirecipientChargeCollectPolicy(collect)) {
    return {
      multirecipientFeeCollectModule: {
        ...resolveChargeCollectModuleSharedParams(collect),
        recipients: collect.recipients,
        ...resolveOptionalCollectLimit(collect),
        ...resolveOptionalEndTimestamp(collect),
      },
    };
  }

  return {
    simpleCollectModule: {
      fee: resolveModuleFeeParams(collect),
      followerOnly: collect.followersOnly,
      ...resolveOptionalCollectLimit(collect),
      ...resolveOptionalEndTimestamp(collect),
      ...resolveEndTimestampFromOptionalTimeLimited(collect),
    },
  };
}

export function resolveCollectModuleParams(
  request: CreatePostRequest | CreateCommentRequest,
): CollectModuleParams {
  switch (request.collect.type) {
    case CollectPolicyType.FREE:
      return {
        simpleCollectModule: {
          followerOnly: request.collect.followersOnly,
          ...resolveOptionalCollectLimit(request.collect),
          ...resolveOptionalEndTimestamp(request.collect),
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
