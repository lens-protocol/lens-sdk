import { ProfileId, TransactionKind } from '../../entities';
import { DelegableSigning } from '../transactions/DelegableSigning';
import { PaidTransaction } from '../transactions/PaidTransaction';
import { SponsorshipReady } from '../transactions/SponsorshipReady';

export type UnblockProfilesRequest = {
  profileIds: ProfileId[];
  kind: TransactionKind.UNBLOCK_PROFILE;
  signless: boolean;
  sponsored: boolean;
};

export class UnblockProfiles extends SponsorshipReady<UnblockProfilesRequest> {
  constructor(
    private readonly delegableExecution: DelegableSigning<UnblockProfilesRequest>,
    private readonly paidExecution: PaidTransaction<UnblockProfilesRequest>,
  ) {
    super();
  }

  protected override async charged(request: UnblockProfilesRequest): Promise<void> {
    await this.paidExecution.execute(request);
  }

  protected override async sponsored(request: UnblockProfilesRequest): Promise<void> {
    await this.delegableExecution.execute(request);
  }
}
