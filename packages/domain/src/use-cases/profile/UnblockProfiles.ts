import { ProfileId, TransactionKind } from '../../entities';
import { DelegableSigning } from '../transactions/DelegableSigning';

export type UnblockProfilesRequest = {
  profileIds: ProfileId[];
  kind: TransactionKind.UNBLOCK_PROFILE;
  delegate: boolean;
};

export class UnblockProfiles extends DelegableSigning<UnblockProfilesRequest> {}
