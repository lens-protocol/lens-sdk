import { FollowPolicyType } from '@lens-protocol/domain/use-cases/profile';

import { ClientErc20Amount } from './ClientErc20Amount';

export type ChargeFollowPolicy = {
  type: FollowPolicyType.CHARGE;
  amount: ClientErc20Amount;
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
