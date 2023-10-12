import { PublicationId, TransactionKind } from '../../entities';
import { MomokaCapable } from '../transactions/MomokaCapable';

export type CreateMirrorRequest = {
  mirrorOn: PublicationId;
  kind: TransactionKind.MIRROR_PUBLICATION;
  delegate: boolean;
  momoka: boolean;
};

export class CreateMirror extends MomokaCapable<CreateMirrorRequest> {
  override async execute(request: CreateMirrorRequest): Promise<void> {
    if (request.momoka) {
      return this.onChain.execute(request);
    }
    return this.momoka.execute(request);
  }
}
