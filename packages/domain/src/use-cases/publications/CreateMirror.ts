import { ProfileId, PublicationId, TransactionKind } from '../../entities';
import { MomokaOption } from '../transactions/MomokaOption';

export type CreateMirrorRequest = {
  profileId: ProfileId;
  mirrorOn: PublicationId;
  kind: TransactionKind.MIRROR_PUBLICATION;
  delegate: boolean;
  momoka: boolean;
};

export class CreateMirror extends MomokaOption<CreateMirrorRequest> {}
