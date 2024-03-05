import { Erc20Amount, EvmAddress } from '@lens-protocol/shared-kernel';

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
