import { ProfileId, PublicationId, TransactionKind } from '../../entities';
import { DelegableSigning } from '../transactions/DelegableSigning';

export type CreateMirrorRequest = {
  profileId: ProfileId;
  publicationId: PublicationId;
  kind: TransactionKind.MIRROR_PUBLICATION;
  delegate: boolean;
};

export class CreateMirror extends DelegableSigning<CreateMirrorRequest> {}
