import { Amount, Erc20, EvmAddress } from '@lens-protocol/shared-kernel';

export enum FollowPolicyType {
  CHARGE = 'CHARGE',
  ANYONE = 'ANYONE',
  NO_ONE = 'NO_ONE',
  UNKNOWN = 'UNKNOWN',
}

export type ChargeFollowConfig = {
  type: FollowPolicyType.CHARGE;
  amount: Amount<Erc20>;
  recipient: EvmAddress;
};

export type NoFeeFollowConfig = {
  type: FollowPolicyType.ANYONE | FollowPolicyType.NO_ONE;
};

export type FollowPolicyConfig = ChargeFollowConfig | NoFeeFollowConfig;
