import { FollowPolicyType } from '@lens-protocol/domain/use-cases/profile';
import { Erc20Amount } from '@lens-protocol/shared-kernel';

export type ChargeFollowPolicy = {
  type: FollowPolicyType.CHARGE;
  amount: Erc20Amount;
  recipient: string;
  contractAddress: string;
};

export type NoFeeFollowPolicy = {
  type: FollowPolicyType.ONLY_PROFILE_OWNERS | FollowPolicyType.NO_ONE | FollowPolicyType.UNKNOWN;
  contractAddress: string;
};

export type OpenFollowPolicy = {
  type: FollowPolicyType.ANYONE;
};

export type FollowPolicy = ChargeFollowPolicy | NoFeeFollowPolicy | OpenFollowPolicy;
