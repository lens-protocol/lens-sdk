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
  referralFee: number;
  recipient: EvmAddress;
};

export type MultirecipientCollectFee = {
  amount: Erc20Amount;
  rate?: FiatAmount;
  referralFee: number;
  recipients: gql.Recipient[];
};

export function isMultirecipientCollectFee(
  fee: CollectFee | MultirecipientCollectFee,
): fee is MultirecipientCollectFee {
  return 'recipients' in fee;
}

export type CollectPolicy = {
  collectNft: EvmAddress | null;
  followerOnly: boolean;
  collectLimit: string | null;
  endsAt: string | null;
  contract: gql.NetworkAddress;
  fee?: CollectFee | MultirecipientCollectFee;
};

function isFreeCollectModuleSettings(
  module: CollectModuleSettings,
): module is gql.LegacyFreeCollectModuleSettings {
  return module.__typename === 'LegacyFreeCollectModuleSettings';
}

function isMultirecipientCollectModuleSettings(
  module: CollectModuleSettings,
): module is
  | gql.MultirecipientFeeCollectOpenActionSettings
  | gql.LegacyMultirecipientFeeCollectModuleSettings {
  return (
    module.__typename === 'MultirecipientFeeCollectOpenActionSettings' ||
    module.__typename === 'LegacyMultirecipientFeeCollectModuleSettings'
  );
}

function buildCollectFee(
  module: CollectModuleSettings,
): CollectFee | MultirecipientCollectFee | undefined {
  if (isFreeCollectModuleSettings(module)) return undefined;

  const erc20 = erc20Amount(module.amount);

  if (erc20.isZero()) return undefined;

  const shared = {
    amount: erc20,
    rate: module.amount.rate ? fiatAmount(module.amount.rate) : undefined,
    referralFee: module.referralFee,
  };

  if (isMultirecipientCollectModuleSettings(module)) {
    return {
      ...shared,
      recipients: module.recipients,
    };
  }

  return {
    ...shared,
    recipient: module.recipient,
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

  const fee = buildCollectFee(module);
  const shared = {
    followerOnly: module.followerOnly,
    contract: module.contract,
  };

  switch (module.__typename) {
    case 'LegacyAaveFeeCollectModuleSettings':
    case 'LegacyERC4626FeeCollectModuleSettings': {
      return {
        ...shared,
        collectNft: null,
        collectLimit: module.collectLimit,
        endsAt: module.endsAt,
        fee,
      };
    }
    case 'LegacyLimitedFeeCollectModuleSettings':
    case 'LegacyLimitedTimedFeeCollectModuleSettings': {
      return {
        ...shared,
        collectNft: module.collectNft,
        collectLimit: module.collectLimit,
        endsAt: null,
        fee,
      };
    }
    case 'LegacyFeeCollectModuleSettings':
    case 'LegacyTimedFeeCollectModuleSettings': {
      return {
        ...shared,
        collectNft: module.collectNft,
        collectLimit: null,
        endsAt: null,
        fee,
      };
    }
    case 'LegacyFreeCollectModuleSettings':
      return {
        ...shared,
        collectNft: module.collectNft,
        collectLimit: null,
        endsAt: null,
      };
    case 'LegacyMultirecipientFeeCollectModuleSettings':
    case 'MultirecipientFeeCollectOpenActionSettings':
    case 'LegacySimpleCollectModuleSettings':
    case 'SimpleCollectOpenActionSettings': {
      return {
        ...shared,
        collectNft: module.collectNft,
        collectLimit: module.collectLimit,
        endsAt: module.endsAt,
        fee,
      };
    }

    default:
      return null;
  }
}
