import { TransactionKind } from '../../entities';
import { DelegableSigning } from '../transactions/DelegableSigning';

export type UpdateProfileDetailsRequest = {
  metadataURI: string;
  kind: TransactionKind.UPDATE_PROFILE_DETAILS;
  delegate: boolean;
};

export class UpdateProfileDetails extends DelegableSigning<UpdateProfileDetailsRequest> {}
