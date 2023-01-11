import { TransactionKind } from '../../entities';
import {
  IProtocolCallPresenter,
  IUnsignedProtocolCallGateway,
  ProtocolCallUseCase,
} from '../transactions/ProtocolCallUseCase';

export type UnfollowRequest = {
  profileId: string;
  kind: TransactionKind.UNFOLLOW_PROFILE;
};

export type IUnfollowProfileCallGateway = IUnsignedProtocolCallGateway<UnfollowRequest>;

export type IUnfollowProfilePresenter = IProtocolCallPresenter;

export class UnfollowProfile extends ProtocolCallUseCase<UnfollowRequest> {}
