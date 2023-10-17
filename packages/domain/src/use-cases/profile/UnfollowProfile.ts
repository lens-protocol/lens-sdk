import { ProfileId, TransactionKind } from '../../entities';
import { DelegableSigning } from '../transactions/DelegableSigning';

export type UnfollowRequest = {
  profileId: ProfileId;
  kind: TransactionKind.UNFOLLOW_PROFILE;
  delegate: boolean;
};

export class UnfollowProfile extends DelegableSigning<UnfollowRequest> {}
