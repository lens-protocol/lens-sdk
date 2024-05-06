import {
  Amount,
  ChainType,
  Erc20Amount,
  EvmAddress,
  FiatAmount,
  erc20,
} from '@lens-protocol/shared-kernel';

import * as gql from '../graphql/generated';
import { OpenActionModuleSettings, PrimaryPublication } from '../publication';
import { erc20Amount, fiatAmount } from './amount';

export type LegacyCollectModuleSettings =
  | gql.LegacyAaveFeeCollectModuleSettings
  | gql.LegacyErc4626FeeCollectModuleSettings
  | gql.LegacyFeeCollectModuleSettings
  | gql.LegacyFreeCollectModuleSettings
  | gql.LegacyLimitedFeeCollectModuleSettings
  | gql.LegacyLimitedTimedFeeCollectModuleSettings
  | gql.LegacyMultirecipientFeeCollectModuleSettings
  | gql.LegacySimpleCollectModuleSettings
  | gql.LegacyTimedFeeCollectModuleSettings;

export type CollectModuleSettings = Exclude<
  OpenActionModuleSettings,
  gql.UnknownOpenActionModuleSettings | gql.LegacyRevertCollectModuleSettings
>;

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
  ProtocolSharedRevenueCollectOpenActionSettings: true,

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
 * Given a publication, find the collect module settings, if any.
 *
 * @experimental This function is not yet stable and may be removed in a future release
 */
export function findCollectModuleSettings(
  collectable: PrimaryPublication,
): CollectModuleSettings | null {
  return collectable.openActionModules?.find(isCollectModuleSettings) ?? null;
}

/**
 * Describes a single recipient collect fee.
 */
export type CollectFee = {
  amount: Erc20Amount;
  rate?: FiatAmount;
  referralFee: number;
  recipient: EvmAddress;
};

/**
 * Describes a multi recipient collect fee.
 */
export type MultirecipientCollectFee = {
  amount: Erc20Amount;
  rate?: FiatAmount;
  referralFee: number;
  recipients: gql.Recipient[];
};

export type SharedMintFee = {
  amount: Erc20Amount;
  rate?: FiatAmount;
  /**
   * The creator app address.
   *
   * If not set, the share for the creator app will be given to the creator of the publication.
   */
  creatorClient?: EvmAddress | null;
};

/**
 * Type guard for {@link MultirecipientCollectFee} type.
 */
export function isMultirecipientCollectFee(
  fee: CollectFee | MultirecipientCollectFee,
): fee is MultirecipientCollectFee {
  return 'recipients' in fee;
}

/**
 * A developer friendly representation of the collect criteria
 * for a given publication.
 */
export type CollectPolicy = {
  /**
   * The collected NFT collection address.
   */
  collectNft: EvmAddress | null;
  /**
   * Whether the collect action is only available to followers.
   */
  followerOnly: boolean;
  /**
   * The maximum number of NFT to mint.
   */
  collectLimit: string | null;
  /**
   * The end time of the collect action.
   */
  endsAt: string | null;
  /**
   * The underlying Collect Action module address.
   */
  contract: gql.NetworkAddress;
  /**
   * The collect fee, if any.
   */
  fee: CollectFee | MultirecipientCollectFee | null;

  /**
   * Shared revenue mint fee, if any.
   */
  mintFee?: SharedMintFee | null;
};

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
  module:
    | gql.ProtocolSharedRevenueCollectOpenActionSettings
    | gql.LegacySimpleCollectModuleSettings
    | gql.SimpleCollectOpenActionSettings,
): CollectFee | null;
function buildCollectFee(
  module:
    | gql.LegacyMultirecipientFeeCollectModuleSettings
    | gql.MultirecipientFeeCollectOpenActionSettings,
): MultirecipientCollectFee;
function buildCollectFee(
  module: gql.LegacyFeeCollectModuleSettings | gql.LegacyTimedFeeCollectModuleSettings,
): CollectFee;
function buildCollectFee(
  module: gql.LegacyAaveFeeCollectModuleSettings | gql.LegacyErc4626FeeCollectModuleSettings,
): CollectFee;
function buildCollectFee(
  module:
    | gql.LegacyLimitedFeeCollectModuleSettings
    | gql.LegacyLimitedTimedFeeCollectModuleSettings,
): CollectFee;
function buildCollectFee(
  module: Extract<CollectModuleSettings, { amount: gql.Amount }>,
): CollectFee | MultirecipientCollectFee | null {
  const amount = erc20Amount(module.amount);

  if (amount.isZero()) return null;

  const shared = {
    amount,
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

function buildMintFee(
  module: gql.ProtocolSharedRevenueCollectOpenActionSettings,
): SharedMintFee | null {
  // TODO replace with data from `module` once available
  const bonsai = erc20({
    address: '0x3d2bD0e15829AA5C362a4144FdF4A1112fa29B5c',
    chainType: ChainType.POLYGON,
    decimals: 18,
    name: 'BONSAI',
    symbol: 'BONSAI',
  });
  const amount = Amount.erc20(bonsai, 10);

  if (amount.isZero()) return null;

  return {
    amount,
    creatorClient: module.creatorClient,
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

  const shared = {
    followerOnly: module.followerOnly,
    contract: module.contract,
  };

  switch (module.__typename) {
    case 'LegacyAaveFeeCollectModuleSettings':
    case 'LegacyERC4626FeeCollectModuleSettings':
      return {
        ...shared,
        collectNft: null,
        collectLimit: module.collectLimit,
        endsAt: module.endsAt,
        fee: buildCollectFee(module),
      };

    case 'LegacyLimitedFeeCollectModuleSettings':
    case 'LegacyLimitedTimedFeeCollectModuleSettings':
      return {
        ...shared,
        collectNft: module.collectNft,
        collectLimit: module.collectLimit,
        endsAt: null,
        fee: buildCollectFee(module),
      };

    case 'LegacyFeeCollectModuleSettings':
    case 'LegacyTimedFeeCollectModuleSettings':
      return {
        ...shared,
        collectNft: module.collectNft,
        collectLimit: null,
        endsAt: null,
        fee: buildCollectFee(module),
      };

    case 'LegacyFreeCollectModuleSettings':
      return {
        ...shared,
        collectNft: module.collectNft,
        collectLimit: null,
        endsAt: null,
        fee: null,
      };

    case 'LegacyMultirecipientFeeCollectModuleSettings':
    case 'MultirecipientFeeCollectOpenActionSettings':
      return {
        ...shared,
        collectNft: module.collectNft,
        collectLimit: module.collectLimit,
        endsAt: module.endsAt,
        fee: buildCollectFee(module),
      };

    case 'LegacySimpleCollectModuleSettings':
    case 'SimpleCollectOpenActionSettings':
      return {
        ...shared,
        collectNft: module.collectNft,
        collectLimit: module.collectLimit,
        endsAt: module.endsAt,
        fee: buildCollectFee(module),
      };

    case 'ProtocolSharedRevenueCollectOpenActionSettings': {
      return {
        ...shared,
        collectNft: module.collectNft,
        collectLimit: module.collectLimit,
        endsAt: module.endsAt,
        fee: buildCollectFee(module),
        mintFee: buildMintFee(module),
      };
    }
  }
}
