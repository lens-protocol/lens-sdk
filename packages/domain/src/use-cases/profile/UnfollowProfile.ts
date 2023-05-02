import { ProfileId, TransactionKind } from '../../entities';
import { SubsidizeOnChain } from '../transactions/SubsidizeOnChain';

export type UnfollowRequest = {
  profileId: ProfileId;
  kind: TransactionKind.UNFOLLOW_PROFILE;
};

export class UnfollowProfile extends SubsidizeOnChain<UnfollowRequest> {}
