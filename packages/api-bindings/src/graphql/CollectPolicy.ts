import { CollectPolicyType } from '@lens-protocol/domain/use-cases/publications';
import { Erc20Amount } from '@lens-protocol/shared-kernel';

export enum CollectState {
  CAN_BE_COLLECTED = 'CAN_BE_COLLECTED',
  CANNOT_BE_COLLECTED = 'CANNOT_BE_COLLECTED',
  NOT_A_FOLLOWER = 'NOT_A_FOLLOWER',
  COLLECT_LIMIT_REACHED = 'COLLECT_LIMIT_REACHED',
  COLLECT_TIME_EXPIRED = 'COLLECT_TIME_EXPIRED',
}

export type FeeCollectPolicy = {
  type: CollectPolicyType.CHARGE;
  state: CollectState.CAN_BE_COLLECTED | CollectState.NOT_A_FOLLOWER;
  amount: Erc20Amount;
  referralFee: number;
  followerOnly: boolean;
  collectNftAddress: string | null;
};

export type NoFeeCollectPolicy = {
  type: CollectPolicyType.FREE;
  state: CollectState.CAN_BE_COLLECTED | CollectState.NOT_A_FOLLOWER;
  followerOnly: boolean;
  collectNftAddress: string | null;
};

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
  collectNftAddress: string | null;
};

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
  collectNftAddress: string | null;
};

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
  collectNftAddress: string | null;
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
  | NoCollectPolicy;
