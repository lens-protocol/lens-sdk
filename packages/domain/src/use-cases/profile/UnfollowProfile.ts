import { ProfileId, TransactionKind } from '../../entities';
import {
  IProtocolCallPresenter,
  IUnsignedProtocolCallGateway,
  SubsidizedCall,
} from '../transactions/SubsidizedCall';

export type UnfollowRequest = {
  profileId: ProfileId;
  kind: TransactionKind.UNFOLLOW_PROFILE;
};

export type IUnfollowProfileCallGateway = IUnsignedProtocolCallGateway<UnfollowRequest>;

export type IUnfollowProfilePresenter = IProtocolCallPresenter;

export class UnfollowProfile extends SubsidizedCall<UnfollowRequest> {}
