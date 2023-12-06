import { ProfileId, TransactionKind } from '../../entities';
import { DelegableSigning } from '../transactions/DelegableSigning';
import { PaidTransaction } from '../transactions/PaidTransaction';
import { SponsorshipReady } from '../transactions/SponsorshipReady';

export type BlockProfilesRequest = {
  profileIds: ProfileId[];
  kind: TransactionKind.BLOCK_PROFILE;
  signless: boolean;
  sponsored: boolean;
};

export class BlockProfiles extends SponsorshipReady<BlockProfilesRequest> {
  constructor(
    private readonly delegableExecution: DelegableSigning<BlockProfilesRequest>,
    private readonly paidExecution: PaidTransaction<BlockProfilesRequest>,
  ) {
    super();
  }

  protected override async charged(request: BlockProfilesRequest): Promise<void> {
    await this.paidExecution.execute(request);
  }

  protected override async sponsored(request: BlockProfilesRequest): Promise<void> {
    await this.delegableExecution.execute(request);
  }
}
