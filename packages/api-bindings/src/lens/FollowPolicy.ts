import { FollowPolicyType } from '@lens-protocol/domain/use-cases/profile';
import { Erc20Amount } from '@lens-protocol/shared-kernel';

export type ChargeFollowPolicy = {
  type: FollowPolicyType.CHARGE;
  amount: Erc20Amount;
  recipient: string;
  contractAddress: string;
  chainId: number;
};

export type NoFeeFollowPolicy = {
  type: FollowPolicyType.NO_ONE | FollowPolicyType.UNKNOWN;
  contractAddress: string;
  chainId: number;
};

export type OpenFollowPolicy = {
  type: FollowPolicyType.ANYONE;
};

export type FollowPolicy = ChargeFollowPolicy | NoFeeFollowPolicy | OpenFollowPolicy;
