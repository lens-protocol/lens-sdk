import { TransactionKind } from '../../entities';
import {
  DelegableProtocolCallUseCase,
  IDelegableProtocolCallGateway,
} from '../transactions/DelegableProtocolCallUseCase';
import { IProtocolCallPresenter } from '../transactions/ProtocolCallUseCase';

export type ProfileAttributeValue = Date | string | number | null;

export type PartialAttributesUpdate = Record<string, ProfileAttributeValue>;

export type ProfileDetails = {
  // attributes: PartialAttributesUpdate;
  bio: string | null;
  location: string | null;
  name: string;
  twitter: string | null;
  website: string | null;
};

export type UpdateProfileDetailsRequest = {
  profileId: string;
  details: ProfileDetails;
  kind: TransactionKind.UPDATE_PROFILE_DETAILS;
  delegate: boolean;
};

export type IProfileDetailsCallGateway = IDelegableProtocolCallGateway<UpdateProfileDetailsRequest>;

export type IUpdateProfileDetailsPresenter = IProtocolCallPresenter;

export class UpdateProfileDetails extends DelegableProtocolCallUseCase<UpdateProfileDetailsRequest> {}
