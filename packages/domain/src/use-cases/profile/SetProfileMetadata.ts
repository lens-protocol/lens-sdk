import { TransactionKind } from '../../entities';
import { DelegableSigning } from '../transactions/DelegableSigning';

export type SetProfileMetadataRequest = {
  metadataURI: string;
  kind: TransactionKind.UPDATE_PROFILE_DETAILS;
  delegate: boolean;
};

export class SetProfileMetadata extends DelegableSigning<SetProfileMetadataRequest> {}
