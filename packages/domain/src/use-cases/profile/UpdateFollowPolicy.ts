import { TransactionKind } from '../../entities';
import { DelegableSigning } from '../transactions/DelegableSigning';
import { FollowPolicyConfig } from './FollowPolicy';

export type UpdateFollowPolicyRequest = {
  policy: FollowPolicyConfig;
  kind: TransactionKind.UPDATE_FOLLOW_POLICY;
  signless: boolean;
};

export class UpdateFollowPolicy extends DelegableSigning<UpdateFollowPolicyRequest> {}
