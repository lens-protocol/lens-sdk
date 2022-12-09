import { TransactionKind } from '../../entities';
import {
  DelegableProtocolCallUseCase,
  IProtocolCallGateway,
} from '../transactions/DelegableProtocolCallUseCase';
import { IProtocolCallPresenter } from '../transactions/ProtocolCallUseCase';

export type ProfileDetails = {
  name: string;
  bio: string | null;
  location: string | null;
  website: string | null;
  twitter: string | null;
};

export type UpdateProfileDetailsRequest = {
  profileId: string;
  details: ProfileDetails;
  kind: TransactionKind.UPDATE_PROFILE_DETAILS;
  delegate: boolean;
};

export type IProfileDetailsCallGateway = IProtocolCallGateway<UpdateProfileDetailsRequest>;

export type IUpdateProfileDetailsPresenter = IProtocolCallPresenter;

export class UpdateProfileDetails extends DelegableProtocolCallUseCase<UpdateProfileDetailsRequest> {}
