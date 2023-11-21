import { ProfileId, TransactionKind } from '../../entities';
import { DelegableSigning } from '../transactions/DelegableSigning';

export type UnlinkHandleRequest = {
  fullHandle: string;
  profileId: ProfileId;
  kind: TransactionKind.UNLINK_HANDLE;
  delegate: boolean;
};

export class UnlinkHandle extends DelegableSigning<UnlinkHandleRequest> {}
