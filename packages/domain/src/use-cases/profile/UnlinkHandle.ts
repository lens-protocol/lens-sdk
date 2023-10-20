import { TransactionKind } from '../../entities';
import { DelegableSigning } from '../transactions/DelegableSigning';

export type UnlinkHandleRequest = {
  handle: string;
  kind: TransactionKind.UNLINK_HANDLE;
  delegate: boolean;
};

export class UnlinkHandle extends DelegableSigning<UnlinkHandleRequest> {}
