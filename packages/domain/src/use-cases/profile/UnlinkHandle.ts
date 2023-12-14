import { ProfileId, TransactionKind } from '../../entities';
import { DelegableSigning } from '../transactions/DelegableSigning';
import { PaidTransaction } from '../transactions/PaidTransaction';
import { SponsorshipReady } from '../transactions/SponsorshipReady';

export type UnlinkHandleRequest = {
  fullHandle: string;
  profileId: ProfileId;
  kind: TransactionKind.UNLINK_HANDLE;
  signless: boolean;
  sponsored: boolean;
};

export class UnlinkHandle extends SponsorshipReady<UnlinkHandleRequest> {
  constructor(
    private readonly delegableExecution: DelegableSigning<UnlinkHandleRequest>,
    private readonly paidExecution: PaidTransaction<UnlinkHandleRequest>,
  ) {
    super();
  }

  protected override async charged(request: UnlinkHandleRequest): Promise<void> {
    await this.paidExecution.execute(request);
  }
  protected override async sponsored(request: UnlinkHandleRequest): Promise<void> {
    await this.delegableExecution.execute(request);
  }
}
