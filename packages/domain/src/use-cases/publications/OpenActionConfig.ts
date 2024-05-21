import { Data, Erc20Amount, EvmAddress } from '@lens-protocol/shared-kernel';

import { AllOpenActionType } from './OpenAction';

export type RecipientWithSplit = {
  /**
   * The recipient of the collect fee split.
   */
  recipient: EvmAddress;
  /**
   * The split of the collect fee.
   *
   * Number between 1-100 with up to 2 decimals of precision (e.g. 10.5 for 10.5%)
   */
  split: number;
};

export enum OpenActionType {
  MULTIRECIPIENT_COLLECT = AllOpenActionType.MULTIRECIPIENT_COLLECT,
  SHARED_REVENUE_COLLECT = AllOpenActionType.SHARED_REVENUE_COLLECT,
  /**
   * @deprecated As part of [LIP-23](https://github.com/lens-protocol/LIPs/pull/51) the 'free collect'
   * will evolve into shared revenue model. Over time this option will be deprecated and removed
   * from gasless support in the Lens API. Use {@link OpenActionType.SHARED_REVENUE_COLLECT} instead.
   */
  SIMPLE_COLLECT = AllOpenActionType.SIMPLE_COLLECT,
  UNKNOWN_OPEN_ACTION = AllOpenActionType.UNKNOWN_OPEN_ACTION,
}

/**
 * @deprecated Use {@link SharedRevenueCollectActionConfig} instead.
 */
export type SimpleCollectActionConfig = {
  type: OpenActionType.SIMPLE_COLLECT;
  /**
   * The collect fee amount.
   *
   * Use {@link Amount.erc20} with instances {@link Erc20} to create an instance of this type.
   *
   * @defaultValue no collect fee
   */
  amount?: Erc20Amount;
  /**
   * The referral reward as a percentage.
   *
   * This is the maximum referral fee percentage that can be used to reward the referrer.
   * The referrers are determined by the FE app used when this simple collect open action is executed.
   *
   * Number between 1-100 with up to 2 decimals of precision (e.g. 10.5 for 10.5%)
   *
   * @defaultValue no referral reward
   */
  referralFee?: number;
  /**
   * The recipient of the collect fee.
   */
  recipient?: EvmAddress;
  /**
   * The maximum number of NFT to mint.
   *
   * @defaultValue no limit
   */
  collectLimit?: number;
  /**
   * Whether only followers can collect.
   */
  followerOnly: boolean;
  /**
   * The date when the collect ends.
   *
   * @defaultValue no end date
   */
  endsAt?: Date;
};

/**
 * A [LIP-23](https://github.com/lens-protocol/LIPs/pull/51) compliant collect action configuration.
 */
export type SharedRevenueCollectActionConfig = {
  type: OpenActionType.SHARED_REVENUE_COLLECT;
  /**
   * The maximum number of NFT to mint.
   *
   * @defaultValue no limit
   */
  collectLimit?: number;
  /**
   * Whether only followers can collect.
   */
  followerOnly: boolean;
  /**
   * The date when the collect ends.
   *
   * @defaultValue no end date
   */
  endsAt?: Date;
} & (
  | {
      /**
       * The collect fee amount.
       *
       * Use {@link Amount.erc20} with instances {@link Erc20} to create an instance of this type.
       */
      amount: Erc20Amount;
      /**
       * The referral reward as a percentage.
       *
       * This is the maximum referral fee percentage that can be used to reward the referrer.
       * The referrers are determined by the FE app used when this simple collect open action is executed.
       *
       * Number between 1-100 with up to 2 decimals of precision (e.g. 10.5 for 10.5%)
       *
       * @defaultValue no referral reward
       */
      referralFee?: number;
      /**
       * The recipient of the collect fee.
       */
      recipient?: EvmAddress;
    }
  | {
      /**
       * The creator app address.
       *
       * If not set, the share for the creator app will be given to the creator of the publication.
       */
      creatorClient?: EvmAddress;
    }
);

export type MultirecipientCollectActionConfig = {
  type: OpenActionType.MULTIRECIPIENT_COLLECT;
  /**
   * The collect fee amount.
   *
   * Use {@link Amount.erc20} with instances {@link Erc20} to create an instance of this type.
   */
  amount: Erc20Amount;
  /**
   * The referral reward as a percentage.
   *
   * This is the maximum referral fee percentage that can be used to reward the referrer.
   * The referrers are determined by the FE app used when this multirecipient collect open action is executed.
   *
   * Number between 1-100 with up to 2 decimals of precision (e.g. 10.5 for 10.5%)
   *
   * @defaultValue no referral reward
   */
  referralFee?: number;
  /**
   * The recipients of the collect fee and their split.
   */
  recipients: RecipientWithSplit[];
  /**
   * The maximum number of NFT to mint.
   *
   * @defaultValue no limit
   */
  collectLimit?: number;
  /**
   * Whether only followers can collect.
   */
  followerOnly: boolean;
  /**
   * The date when the collect ends.
   *
   * @defaultValue no end date
   */
  endsAt?: Date;
};

export type CollectActionConfig =
  | SimpleCollectActionConfig
  | MultirecipientCollectActionConfig
  | SharedRevenueCollectActionConfig;

export type UnknownOpenActionConfig = {
  type: OpenActionType.UNKNOWN_OPEN_ACTION;
  /**
   * The address of the Unknown Open Action module contract.
   */
  address: EvmAddress;
  /**
   * The data to initialize the Unknown Open Action contract logic
   * for the given publication.
   *
   * It's consumer responsibility to encode it correctly.
   */
  data: Data;
};

export type OpenActionConfig = CollectActionConfig | UnknownOpenActionConfig;
