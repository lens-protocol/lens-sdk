import { TransactionKind } from '../../entities';
import { SubsidizeOnChain } from '../transactions/SubsidizeOnChain';
import { FollowPolicyConfig } from './types';

export type UpdateFollowPolicyRequest = {
  policy: FollowPolicyConfig;
  kind: TransactionKind.UPDATE_FOLLOW_POLICY;
};

export class UpdateFollowPolicy extends SubsidizeOnChain<UpdateFollowPolicyRequest> {}
