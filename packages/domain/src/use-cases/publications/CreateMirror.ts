import { isMomokaPublicationId, PublicationId, TransactionKind } from '../../entities';
import { DelegableSigning } from '../transactions/DelegableSigning';
import { PaidTransaction } from '../transactions/PaidTransaction';
import { SponsorshipReady } from '../transactions/SponsorshipReady';

export type CreateMirrorRequest = {
  mirrorOn: PublicationId;
  kind: TransactionKind.MIRROR_PUBLICATION;
  signless: boolean;
  sponsored: boolean;
};

export class CreateMirror extends SponsorshipReady<CreateMirrorRequest> {
  constructor(
    protected readonly sponsoredOnChain: DelegableSigning<CreateMirrorRequest>,
    protected readonly sponsoredOnMomoka: DelegableSigning<CreateMirrorRequest>,
    protected readonly paidOnChain: PaidTransaction<CreateMirrorRequest>,
  ) {
    super();
  }
  protected override async charged(request: CreateMirrorRequest): Promise<void> {
    return this.paidOnChain.execute(request);
  }

  protected override async sponsored(request: CreateMirrorRequest): Promise<void> {
    if (isMomokaPublicationId(request.mirrorOn)) {
      return this.sponsoredOnMomoka.execute(request);
    }
    return this.sponsoredOnChain.execute(request);
  }
}
