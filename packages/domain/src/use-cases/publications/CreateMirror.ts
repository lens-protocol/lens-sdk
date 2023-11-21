import { isMomokaPublicationId, PublicationId, TransactionKind } from '../../entities';
import { MomokaCapable } from '../transactions/MomokaCapable';

export type CreateMirrorRequest = {
  mirrorOn: PublicationId;
  kind: TransactionKind.MIRROR_PUBLICATION;
  signless: boolean;
};

export class CreateMirror extends MomokaCapable<CreateMirrorRequest> {
  override async execute(request: CreateMirrorRequest): Promise<void> {
    if (isMomokaPublicationId(request.mirrorOn)) {
      return this.momoka.execute(request);
    }
    return this.onChain.execute(request);
  }
}
