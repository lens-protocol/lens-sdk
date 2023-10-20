import { ProfileId, TransactionKind } from '../../entities';
import { DelegableSigning } from '../transactions/DelegableSigning';

export type LinkHandleRequest = {
  fullHandle: string;
  profileId: ProfileId;
  kind: TransactionKind.LINK_HANDLE;
  delegate: boolean;
};

export class LinkHandle extends DelegableSigning<LinkHandleRequest> {}
