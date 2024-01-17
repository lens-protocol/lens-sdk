import { Data, Erc20Amount, EvmAddress } from '@lens-protocol/shared-kernel';

export enum FollowPolicyType {
  CHARGE = 'CHARGE',
  ANYONE = 'ANYONE',
  NO_ONE = 'NO_ONE',
  UNKNOWN = 'UNKNOWN',
}

export type ChargeFollowConfig = {
  type: FollowPolicyType.CHARGE;
  amount: Erc20Amount;
  recipient: EvmAddress;
};

export type NoFollowConfig = {
  type: FollowPolicyType.NO_ONE;
};

export type OpenFollowConfig = {
  type: FollowPolicyType.ANYONE;
};

/**
 * @deprecated not longer in use - removal slated for stable 2.x release
 */
export type NoFeeFollowConfig = {
  type: FollowPolicyType.ANYONE | FollowPolicyType.NO_ONE;
};

export type UnknownFollowConfig = {
  type: FollowPolicyType.UNKNOWN;
  /**
   * The address of the Unknown Follow module contract.
   */
  address: EvmAddress;
  /**
   * The data required by the Unknown Follow contract to operate.
   *
   * It's consumer responsibility to encode it correctly.
   */
  data: string;
};

/**
 * Use when configuring a profile's Follow Policy.
 */
export type FollowPolicyConfig =
  | ChargeFollowConfig
  | NoFollowConfig
  | OpenFollowConfig
  | UnknownFollowConfig;

export type ChargeFollowPolicy = {
  type: FollowPolicyType.CHARGE;
  amount: Erc20Amount;
  recipient: string;
  contractAddress: EvmAddress;
  chainId: number;
};

export type NoFollowPolicy = {
  type: FollowPolicyType.NO_ONE;
  contractAddress: EvmAddress;
  chainId: number;
};

/**
 * @deprecated use {@link NoFollowPolicy} instead - removal slated for stable 2.x release
 */
export type NoFeeFollowPolicy = NoFollowPolicy;

export type UnknownFollowPolicy = {
  type: FollowPolicyType.UNKNOWN;
  contractAddress: EvmAddress;
  chainId: number;
  initializeCalldata: Data;
  initializeResultData?: Data;
  signlessApproved: boolean;
  sponsoredApproved: boolean;
  verified: boolean;
};

export type OpenFollowPolicy = {
  type: FollowPolicyType.ANYONE;
};

/**
 * Use when preparing a follow profile request.
 */
export type FollowPolicy =
  | ChargeFollowPolicy
  | NoFeeFollowPolicy
  | OpenFollowPolicy
  | UnknownFollowPolicy;
