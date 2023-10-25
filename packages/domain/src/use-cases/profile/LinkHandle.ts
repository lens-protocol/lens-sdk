import { TransactionKind } from '../../entities';
import { DelegableSigning } from '../transactions/DelegableSigning';

export type LinkHandleRequest = {
  handle: string;
  kind: TransactionKind.LINK_HANDLE;
  delegate: boolean;
};

export class LinkHandle extends DelegableSigning<LinkHandleRequest> {}
