import { URI } from '@lens-protocol/shared-kernel';

import { isMomokaPublicationId, PublicationId, TransactionKind } from '../../entities';
import { MomokaCapable } from '../transactions/MomokaCapable';

export type CreateMirrorRequest = {
  /**
   * The discriminator for the transaction kind.
   */
  kind: TransactionKind.MIRROR_PUBLICATION;
  /**
   * The publication ID to mirror.
   */
  mirrorOn: PublicationId;
  /**
   * Whether is possible to delegate the publication signing to the profile's chosen profile manager.
   */
  delegate: boolean;
  /**
   * The metadata URI.
   */
  metadata?: URI;
};

export class CreateMirror extends MomokaCapable<CreateMirrorRequest> {
  override async execute(request: CreateMirrorRequest): Promise<void> {
    if (isMomokaPublicationId(request.mirrorOn)) {
      return this.momoka.execute(request);
    }
    return this.onChain.execute(request);
  }
}
