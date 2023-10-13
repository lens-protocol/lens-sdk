import { ProfileId, TransactionKind } from '../../entities';
import { DelegableSigning } from '../transactions/DelegableSigning';

export type UpdateProfileDetailsRequest = {
  profileId: ProfileId;
  metadataURI: string;
  kind: TransactionKind.UPDATE_PROFILE_DETAILS;
  delegate: boolean;
};

export class UpdateProfileDetails extends DelegableSigning<UpdateProfileDetailsRequest> {}
