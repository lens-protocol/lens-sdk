import { ProfileId, TransactionKind } from '../../entities';
import { DelegableSigning } from '../transactions/DelegableSigning';
import { PaidTransaction } from '../transactions/PaidTransaction';
import { SponsorshipReady } from '../transactions/SponsorshipReady';

export type LinkHandleRequest = {
  fullHandle: string;
  profileId: ProfileId;
  kind: TransactionKind.LINK_HANDLE;
  signless: boolean;
  sponsored: boolean;
};

export class LinkHandle extends SponsorshipReady<LinkHandleRequest> {
  constructor(
    private readonly delegableExecution: DelegableSigning<LinkHandleRequest>,
    private readonly paidExecution: PaidTransaction<LinkHandleRequest>,
  ) {
    super();
  }

  protected override async charged(request: LinkHandleRequest): Promise<void> {
    await this.paidExecution.execute(request);
  }
  protected override async sponsored(request: LinkHandleRequest): Promise<void> {
    await this.delegableExecution.execute(request);
  }
}
