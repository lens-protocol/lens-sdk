import { ProfileId, TransactionKind } from '../../entities';
import { SubsidizeOnChain } from '../transactions/SubsidizeOnChain';
import { FollowPolicyConfig } from './types';

export type UpdateFollowPolicyRequest = {
  profileId: ProfileId;
  policy: FollowPolicyConfig;
  kind: TransactionKind.UPDATE_FOLLOW_POLICY;
};

export class UpdateFollowPolicy extends SubsidizeOnChain<UpdateFollowPolicyRequest> {}
