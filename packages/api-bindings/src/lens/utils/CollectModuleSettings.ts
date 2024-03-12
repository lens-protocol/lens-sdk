import { Erc20Amount, EvmAddress, FiatAmount } from '@lens-protocol/shared-kernel';

import * as gql from '../graphql/generated';
import { OpenActionModuleSettings, PrimaryPublication } from '../publication';
import { erc20Amount, fiatAmount } from './amount';

export type CollectModuleSettings =
  | gql.LegacyAaveFeeCollectModuleSettings
  | gql.LegacyErc4626FeeCollectModuleSettings
  | gql.LegacyFeeCollectModuleSettings
  | gql.LegacyLimitedFeeCollectModuleSettings
  | gql.LegacyLimitedTimedFeeCollectModuleSettings
  | gql.LegacyMultirecipientFeeCollectModuleSettings
  | gql.LegacyTimedFeeCollectModuleSettings
  | gql.LegacySimpleCollectModuleSettings
  | gql.LegacyFreeCollectModuleSettings
  | gql.MultirecipientFeeCollectOpenActionSettings
  | gql.SimpleCollectOpenActionSettings;

const ModulesWithKnownCollectCapability: Record<OpenActionModuleSettings['__typename'], boolean> = {
  LegacyAaveFeeCollectModuleSettings: true,
  LegacyERC4626FeeCollectModuleSettings: true,
  LegacyFeeCollectModuleSettings: true,
  LegacyLimitedFeeCollectModuleSettings: true,
  LegacyLimitedTimedFeeCollectModuleSettings: true,
  LegacyMultirecipientFeeCollectModuleSettings: true,
  LegacyTimedFeeCollectModuleSettings: true,
  LegacySimpleCollectModuleSettings: true,
  LegacyFreeCollectModuleSettings: true,
  MultirecipientFeeCollectOpenActionSettings: true,
  SimpleCollectOpenActionSettings: true,

  LegacyRevertCollectModuleSettings: false,
  UnknownOpenActionModuleSettings: false,
};

/**
 * Given an open action module settings, determine if it is a collect module
 *
 * @experimental This function is not yet stable and may be removed in a future release
 */
export function isCollectModuleSettings(
  settings: OpenActionModuleSettings,
): settings is CollectModuleSettings {
  return ModulesWithKnownCollectCapability[settings.__typename] ?? false;
}

/**
 * Given a publication, find the collect module settings if any
 *
 * @experimental This function is not yet stable and may be removed in a future release
 */
export function findCollectModuleSettings(
  collectable: PrimaryPublication,
): CollectModuleSettings | null {
  return collectable.openActionModules?.find(isCollectModuleSettings) ?? null;
}

export type CollectFee = {
  amount: Erc20Amount;
  rate?: FiatAmount;
};

export type FreeCollectPolicy = {
  type: CollectPolicyType.FREE_COLLECT;
  collectNft: EvmAddress | null;
  followerOnly: boolean;
  collectLimit: string | null;
  endsAt: string | null;
  contract: gql.NetworkAddress;
};

export type PaidCollectPolicy = {
  type: CollectPolicyType.PAID_COLLECT;
  collectNft: EvmAddress | null;
  recipient: EvmAddress;
  referralFee: number;
  followerOnly: boolean;
  collectLimit: string | null;
  endsAt: string | null;
  contract: gql.NetworkAddress;
  fee: CollectFee;
};

export type MultirecipientCollectPolicy = {
  type: CollectPolicyType.MULTIRECIPIENT_COLLECT;
  collectNft: EvmAddress | null;
  recipients: gql.Recipient[];
  referralFee: number;
  followerOnly: boolean;
  collectLimit: string | null;
  endsAt: string | null;
  contract: gql.NetworkAddress;
  fee: CollectFee;
};

export type CollectPolicy = FreeCollectPolicy | PaidCollectPolicy | MultirecipientCollectPolicy;

export enum CollectPolicyType {
  FREE_COLLECT = 'FREE_COLLECT',
  PAID_COLLECT = 'PAID_COLLECT',
  MULTIRECIPIENT_COLLECT = 'MULTIRECIPIENT_COLLECT',
}

function buildCollectFee(amount?: gql.Amount): CollectFee | undefined {
  if (!amount) return undefined;

  const erc20 = erc20Amount(amount);

  if (erc20.isZero()) return undefined;

  return {
    amount: erc20Amount(amount),
    rate: amount.rate ? fiatAmount(amount.rate) : undefined,
  };
}

/**
 * Resolve API's {@link OpenActionModuleSettings} to more user friendly {@link CollectPolicy}.
 *
 * @param collectable - The {@link PrimaryPublication} to resolve {@link CollectPolicy} from
 * @returns {@link CollectPolicy}
 */
export function resolveCollectPolicy(collectable: PrimaryPublication): CollectPolicy | null {
  const module = findCollectModuleSettings(collectable);

  if (!module) return null;

  switch (module.__typename) {
    case 'LegacyAaveFeeCollectModuleSettings':
    case 'LegacyERC4626FeeCollectModuleSettings': {
      const fee = buildCollectFee(module.amount);

      if (!fee)
        return {
          type: CollectPolicyType.FREE_COLLECT,
          collectNft: null,
          followerOnly: module.followerOnly,
          collectLimit: module.collectLimit,
          endsAt: module.endsAt,
          contract: module.contract,
        };

      return {
        type: CollectPolicyType.PAID_COLLECT,
        collectNft: null,
        recipient: module.recipient,
        referralFee: module.referralFee,
        followerOnly: module.followerOnly,
        collectLimit: module.collectLimit,
        endsAt: module.endsAt,
        contract: module.contract,
        fee,
      };
    }
    case 'LegacyLimitedFeeCollectModuleSettings':
    case 'LegacyLimitedTimedFeeCollectModuleSettings': {
      const fee = buildCollectFee(module.amount);

      if (!fee)
        return {
          type: CollectPolicyType.FREE_COLLECT,
          collectNft: module.collectNft,
          followerOnly: module.followerOnly,
          collectLimit: module.collectLimit,
          endsAt: null,
          contract: module.contract,
        };

      return {
        type: CollectPolicyType.PAID_COLLECT,
        collectNft: module.collectNft,
        recipient: module.recipient,
        referralFee: module.referralFee,
        followerOnly: module.followerOnly,
        collectLimit: module.collectLimit,
        endsAt: null,
        contract: module.contract,
        fee,
      };
    }
    case 'LegacyFeeCollectModuleSettings':
    case 'LegacyTimedFeeCollectModuleSettings': {
      const fee = buildCollectFee(module.amount);

      if (!fee)
        return {
          type: CollectPolicyType.FREE_COLLECT,
          collectNft: module.collectNft,
          followerOnly: module.followerOnly,
          collectLimit: null,
          endsAt: null,
          contract: module.contract,
        };

      return {
        type: CollectPolicyType.PAID_COLLECT,
        collectNft: module.collectNft,
        recipient: module.recipient,
        referralFee: module.referralFee,
        followerOnly: module.followerOnly,
        collectLimit: null,
        endsAt: null,
        contract: module.contract,
        fee,
      };
    }
    case 'LegacyFreeCollectModuleSettings':
      return {
        type: CollectPolicyType.FREE_COLLECT,
        collectNft: module.collectNft,
        followerOnly: module.followerOnly,
        collectLimit: null,
        endsAt: null,
        contract: module.contract,
      };
    case 'LegacyMultirecipientFeeCollectModuleSettings':
    case 'MultirecipientFeeCollectOpenActionSettings': {
      const fee = buildCollectFee(module.amount);

      if (!fee)
        return {
          type: CollectPolicyType.FREE_COLLECT,
          collectNft: module.collectNft,
          followerOnly: module.followerOnly,
          collectLimit: module.collectLimit,
          endsAt: module.endsAt,
          contract: module.contract,
        };

      return {
        type: CollectPolicyType.MULTIRECIPIENT_COLLECT,
        collectNft: module.collectNft,
        recipients: module.recipients,
        referralFee: module.referralFee,
        followerOnly: module.followerOnly,
        collectLimit: module.collectLimit,
        endsAt: module.endsAt,
        contract: module.contract,
        fee,
      };
    }
    case 'LegacySimpleCollectModuleSettings':
    case 'SimpleCollectOpenActionSettings': {
      const fee = buildCollectFee(module.amount);

      if (!fee)
        return {
          type: CollectPolicyType.FREE_COLLECT,
          collectNft: module.collectNft,
          followerOnly: module.followerOnly,
          collectLimit: module.collectLimit,
          endsAt: module.endsAt,
          contract: module.contract,
        };

      return {
        type: CollectPolicyType.PAID_COLLECT,
        collectNft: module.collectNft,
        recipient: module.recipient,
        referralFee: module.referralFee,
        followerOnly: module.followerOnly,
        collectLimit: module.collectLimit,
        endsAt: module.endsAt,
        contract: module.contract,
        fee,
      };
    }

    default:
      return null;
  }
}
