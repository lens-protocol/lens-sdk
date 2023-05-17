import { CollectPolicyType } from '@lens-protocol/domain/use-cases/publications';
import { Erc20Amount, EthereumAddress } from '@lens-protocol/shared-kernel';

export enum CollectState {
  CAN_BE_COLLECTED = 'CAN_BE_COLLECTED',
  CANNOT_BE_COLLECTED = 'CANNOT_BE_COLLECTED',
  NOT_A_FOLLOWER = 'NOT_A_FOLLOWER',
  COLLECT_LIMIT_REACHED = 'COLLECT_LIMIT_REACHED',
  COLLECT_TIME_EXPIRED = 'COLLECT_TIME_EXPIRED',
}

export type FeeCollectPolicy = {
  type: CollectPolicyType.CHARGE;
  state:
    | CollectState.CAN_BE_COLLECTED
    | CollectState.NOT_A_FOLLOWER
    | CollectState.COLLECT_LIMIT_REACHED
    | CollectState.COLLECT_TIME_EXPIRED;
  amount: Erc20Amount;
  referralFee: number;
  followerOnly: boolean;
  collectNftAddress: EthereumAddress | null;
  contractAddress: EthereumAddress;
  endTimestamp: string | null;
  collectLimit: number | null;
};

export type NoFeeCollectPolicy = {
  type: CollectPolicyType.FREE;
  state:
    | CollectState.CAN_BE_COLLECTED
    | CollectState.NOT_A_FOLLOWER
    | CollectState.COLLECT_LIMIT_REACHED
    | CollectState.COLLECT_TIME_EXPIRED;
  followerOnly: boolean;
  collectNftAddress: EthereumAddress | null;
  contractAddress: EthereumAddress;
  endTimestamp: string | null;
  collectLimit: number | null;
};

/**
 * @deprecated Use {@link FeeCollectPolicy} with `collectLimit` instead.
 */
export type LimitedFeeCollectPolicy = {
  type: CollectPolicyType.CHARGE;
  state:
    | CollectState.CAN_BE_COLLECTED
    | CollectState.NOT_A_FOLLOWER
    | CollectState.COLLECT_LIMIT_REACHED;
  amount: Erc20Amount;
  referralFee: number;
  followerOnly: boolean;
  collectLimit: number;
  collectNftAddress: EthereumAddress | null;
  contractAddress: EthereumAddress;
};

/**
 * @deprecated Use {@link FeeCollectPolicy} with `endTimestamp` instead.
 */
export type TimedFeeCollectPolicy = {
  type: CollectPolicyType.CHARGE;
  state:
    | CollectState.CAN_BE_COLLECTED
    | CollectState.NOT_A_FOLLOWER
    | CollectState.COLLECT_TIME_EXPIRED;
  amount: Erc20Amount;
  referralFee: number;
  followerOnly: boolean;
  endTimestamp: string;
  collectNftAddress: EthereumAddress | null;
  contractAddress: EthereumAddress;
};

/**
 * @deprecated Use {@link FeeCollectPolicy} with `collectLimit` and `endTimestamp` instead.
 */
export type LimitedTimedFeeCollectPolicy = {
  type: CollectPolicyType.CHARGE;
  state:
    | CollectState.CAN_BE_COLLECTED
    | CollectState.NOT_A_FOLLOWER
    | CollectState.COLLECT_LIMIT_REACHED
    | CollectState.COLLECT_TIME_EXPIRED;
  amount: Erc20Amount;
  referralFee: number;
  followerOnly: boolean;
  collectLimit: number;
  endTimestamp: string;
  collectNftAddress: EthereumAddress | null;
  contractAddress: EthereumAddress;
};

export type MultirecipientFeeCollectPolicy = {
  type: CollectPolicyType.CHARGE;
  state:
    | CollectState.CAN_BE_COLLECTED
    | CollectState.NOT_A_FOLLOWER
    | CollectState.COLLECT_LIMIT_REACHED
    | CollectState.COLLECT_TIME_EXPIRED;
  amount: Erc20Amount;
  referralFee: number;
  followerOnly: boolean;
  collectLimit: number | null;
  endTimestamp: string | null;
  collectNftAddress: EthereumAddress | null;
  contractAddress: EthereumAddress;
};

export type VaultFeeCollectPolicy = {
  type: CollectPolicyType.CHARGE;
  state:
    | CollectState.CAN_BE_COLLECTED
    | CollectState.NOT_A_FOLLOWER
    | CollectState.COLLECT_LIMIT_REACHED
    | CollectState.COLLECT_TIME_EXPIRED;
  amount: Erc20Amount;
  referralFee: number;
  followerOnly: boolean;
  collectLimit: number | null;
  endTimestamp: string | null;
  collectNftAddress: EthereumAddress | null;
  contractAddress: EthereumAddress;
};

export type AaveFeeCollectPolicy = {
  type: CollectPolicyType.CHARGE;
  state:
    | CollectState.CAN_BE_COLLECTED
    | CollectState.NOT_A_FOLLOWER
    | CollectState.COLLECT_LIMIT_REACHED
    | CollectState.COLLECT_TIME_EXPIRED;
  amount: Erc20Amount;
  referralFee: number;
  followerOnly: boolean;
  collectLimit: number | null;
  endTimestamp: string | null;
  collectNftAddress: EthereumAddress | null;
  contractAddress: EthereumAddress;
};

export type NoCollectPolicy = {
  state: CollectState.CANNOT_BE_COLLECTED;
  type: CollectPolicyType.NO_COLLECT;
};

export type CollectPolicy =
  | FeeCollectPolicy
  | NoFeeCollectPolicy
  | LimitedFeeCollectPolicy
  | TimedFeeCollectPolicy
  | LimitedTimedFeeCollectPolicy
  | MultirecipientFeeCollectPolicy
  | VaultFeeCollectPolicy
  | AaveFeeCollectPolicy
  | NoCollectPolicy;
