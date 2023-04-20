import { ProfileId, TransactionKind } from '../../entities';
import {
  DelegableSubsidizedCall,
  IDelegatedCallGateway,
} from '../transactions/DelegableSubsidizedCall';
import { IProtocolCallPresenter } from '../transactions/SubsidizedCall';

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

export type IProfileDetailsCallGateway = IDelegatedCallGateway<UpdateProfileDetailsRequest>;

export type IUpdateProfileDetailsPresenter = IProtocolCallPresenter;

export class UpdateProfileDetails extends DelegableSubsidizedCall<UpdateProfileDetailsRequest> {}
