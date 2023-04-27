import { ProfileId, TransactionKind } from '../../entities';
import { SubsidizedCall } from '../transactions/SubsidizedCall';

export type UnfollowRequest = {
  profileId: ProfileId;
  kind: TransactionKind.UNFOLLOW_PROFILE;
};

export class UnfollowProfile extends SubsidizedCall<UnfollowRequest> {}
