import { ProfileId, PublicationId, TransactionKind } from '../../entities';
import { DelegableSigning } from '../transactions/DelegableSigning';

export type CreateMirrorRequest = {
  profileId: ProfileId;
  publicationId: PublicationId;
  kind: TransactionKind.MIRROR_PUBLICATION;
  delegate: boolean;
  offChain: boolean;
};

export class CreateMirror {
  constructor(
    private readonly createOnChainPost: DelegableSigning<CreateMirrorRequest>,
    private readonly createOffChainPost: DelegableSigning<CreateMirrorRequest>,
  ) {}

  async execute(request: CreateMirrorRequest) {
    if (request.offChain) {
      await this.createOffChainPost.execute(request);
    } else {
      await this.createOnChainPost.execute(request);
    }
  }
}
