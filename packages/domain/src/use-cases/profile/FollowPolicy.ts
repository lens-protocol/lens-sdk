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

export type NoFeeFollowConfig = {
  type: FollowPolicyType.ANYONE | FollowPolicyType.NO_ONE;
};

/**
 * Use when configuring a profile's follow module.
 */
export type FollowPolicyConfig = ChargeFollowConfig | NoFeeFollowConfig;

export type ChargeFollowPolicy = {
  type: FollowPolicyType.CHARGE;
  amount: Erc20Amount;
  recipient: string;
  contractAddress: EvmAddress;
  chainId: number;
};

export type NoFeeFollowPolicy = {
  type: FollowPolicyType.NO_ONE | FollowPolicyType.UNKNOWN;
  contractAddress: EvmAddress;
  chainId: number;
};

export type OpenFollowPolicy = {
  type: FollowPolicyType.ANYONE;
};

/**
 * Use when preparing a follow profile request.
 */
export type FollowPolicy = ChargeFollowPolicy | NoFeeFollowPolicy | OpenFollowPolicy;
