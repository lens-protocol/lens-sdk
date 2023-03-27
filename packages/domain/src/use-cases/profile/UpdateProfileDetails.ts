import { ProfileId, TransactionKind } from '../../entities';
import {
  DelegableProtocolCallUseCase,
  IDelegableProtocolCallGateway,
} from '../transactions/DelegableProtocolCallUseCase';
import { IProtocolCallPresenter } from '../transactions/ProtocolCallUseCase';

export type ProfileAttributeValue = boolean | Date | string | number;

export type PartialAttributesUpdate = Record<string, ProfileAttributeValue | null>;

export type UpdateProfileDetailsRequest = {
  attributes?: PartialAttributesUpdate;
  bio?: string | null;
  coverPicture?: string | null;
  delegate: boolean;
  kind: TransactionKind.UPDATE_PROFILE_DETAILS;
  name: string;
  profileId: ProfileId;
};

export type IProfileDetailsCallGateway = IDelegableProtocolCallGateway<UpdateProfileDetailsRequest>;

export type IUpdateProfileDetailsPresenter = IProtocolCallPresenter;

export class UpdateProfileDetails extends DelegableProtocolCallUseCase<UpdateProfileDetailsRequest> {}
