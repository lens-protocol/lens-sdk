import { TransactionKind } from '../../entities';
import { DelegableSigning } from '../transactions/DelegableSigning';
import { FollowPolicyConfig } from './FollowPolicy';

export type UpdateFollowPolicyRequest = {
  policy: FollowPolicyConfig;
  kind: TransactionKind.UPDATE_FOLLOW_POLICY;
  delegate: boolean;
};

export class UpdateFollowPolicy extends DelegableSigning<UpdateFollowPolicyRequest> {}
