import { Erc20Amount, EvmAddress, FiatAmount } from '@lens-protocol/shared-kernel';

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
  /**
   * The collect fee amount.
   */
  amount: Erc20Amount;
  /**
   * The collect fee fiat exchange rate.
   */
  rate?: FiatAmount;
  /**
   * The referral fee share.
   *
   * This is a number between 0 and 100%.
   */
  referralFee: number;
  /**
   * The recipient of the fee.
   */
  recipient: EvmAddress;
};

/**
 * Describes a multi recipient collect fee.
 */
export type MultirecipientCollectFee = {
  /**
   * The collect fee amount.
   */
  amount: Erc20Amount;
  /**
   * The collect fee fiat exchange rate.
   */
  rate?: FiatAmount;
  /**
   * The referral fee share.
   *
   * This is a number between 0 and 100%.
   */
  referralFee: number;
  /**
   * The list of recipients and their corresponding shares.
   */
  recipients: gql.Recipient[];
};

/**
 * The shared mint fee distribution.
 */
export type MintFeeDistribution = {
  /**
   * The creator app share.
   *
   * This is a number between 0 and 100%.
   */
  creatorClientSplit: number;
  /**
   * The default share for the publication creator Profile.
   *
   * This is a number between 0 and 100%.
   *
   * This could be increased by the creatorClientSplit and
   * by the executorClientSplit if the corresponding addresses
   * are not specified.
   */
  creatorSplit: number;
  /**
   * The executor app share.
   *
   * This is a number between 0 and 100%.
   */
  executorClientSplit: number;
  /**
   * The protocol share.
   *
   * This is a number between 0 and 100%.
   */
  protocolSplit: number;
};

export type MintFee = {
  /**
   * The mint fee amount.
   */
  amount: Erc20Amount;
  /**
   * The mint fee fiat exchange rate.
   */
  rate?: FiatAmount;
  /**
   * The creator app address.
   *
   * If not set, the share for the creator app will be given to the creator of the publication.
   */
  creatorClient?: EvmAddress | null;
  /**
   * The mint fee distribution.
   */
  distribution: MintFeeDistribution;
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
  collectFee: CollectFee | MultirecipientCollectFee | null;
  /**
   * The collect fee, if any.
   *
   * @deprecated Use `collectFee` instead.
   */
  fee: CollectFee | MultirecipientCollectFee | null;
  /**
   * Shared revenue mint fee, if any.
   */
  mintFee: MintFee | null;
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

function buildMintFee(module: gql.ProtocolSharedRevenueCollectOpenActionSettings): MintFee | null {
  const amount = erc20Amount(module.mintFee);

  if (amount.isZero()) return null;

  return {
    amount,
    creatorClient: module.creatorClient,
    distribution: {
      creatorClientSplit: module.distribution.creatorClientSplit / 100,
      creatorSplit: module.distribution.creatorSplit / 100,
      executorClientSplit: module.distribution.executorClientSplit / 100,
      protocolSplit: module.distribution.protocolSplit / 100,
    },
  };
}

function resolveEndsAt(datetime: string | null): string | null {
  if (!datetime) return null;

  const date = new Date(datetime);

  if (date.getTime() === 0) return null;

  return datetime;
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
    case 'LegacyERC4626FeeCollectModuleSettings': {
      const collectFee = buildCollectFee(module);

      return {
        ...shared,
        collectFee,
        collectNft: null,
        collectLimit: module.collectLimit,
        endsAt: resolveEndsAt(module.endsAt),
        fee: collectFee,
        mintFee: null,
      };
    }

    case 'LegacyLimitedFeeCollectModuleSettings':
    case 'LegacyLimitedTimedFeeCollectModuleSettings': {
      const collectFee = buildCollectFee(module);

      return {
        ...shared,
        collectFee,
        collectNft: module.collectNft,
        collectLimit: module.collectLimit,
        endsAt: null,
        fee: collectFee,
        mintFee: null,
      };
    }

    case 'LegacyFeeCollectModuleSettings':
    case 'LegacyTimedFeeCollectModuleSettings': {
      const collectFee = buildCollectFee(module);

      return {
        ...shared,
        collectFee,
        collectNft: module.collectNft,
        collectLimit: null,
        endsAt: null,
        fee: collectFee,
        mintFee: null,
      };
    }

    case 'LegacyFreeCollectModuleSettings':
      return {
        ...shared,
        collectNft: module.collectNft,
        collectLimit: null,
        collectFee: null,
        endsAt: null,
        fee: null,
        mintFee: null,
      };

    case 'LegacyMultirecipientFeeCollectModuleSettings':
    case 'MultirecipientFeeCollectOpenActionSettings': {
      const collectFee = buildCollectFee(module);

      return {
        ...shared,
        collectFee,
        collectNft: module.collectNft,
        collectLimit: module.collectLimit,
        endsAt: resolveEndsAt(module.endsAt),
        fee: collectFee,
        mintFee: null,
      };
    }

    case 'LegacySimpleCollectModuleSettings':
    case 'SimpleCollectOpenActionSettings': {
      const collectFee = buildCollectFee(module);

      return {
        ...shared,
        collectFee,
        collectNft: module.collectNft,
        collectLimit: module.collectLimit,
        endsAt: resolveEndsAt(module.endsAt),
        fee: collectFee,
        mintFee: null,
      };
    }

    case 'ProtocolSharedRevenueCollectOpenActionSettings': {
      const collectFee = buildCollectFee(module);

      return {
        ...shared,
        collectFee,
        collectNft: module.collectNft,
        collectLimit: module.collectLimit,
        endsAt: resolveEndsAt(module.endsAt),
        fee: collectFee,
        mintFee: buildMintFee(module),
      };
    }
  }
}
