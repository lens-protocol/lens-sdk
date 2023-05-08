import { ProfileId, TransactionKind } from '../../entities';
import { DelegableSigning } from '../transactions/DelegableSigning';

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

export class UpdateProfileDetails extends DelegableSigning<UpdateProfileDetailsRequest> {}
