import { ProfileId, TransactionKind } from '../../entities';
import { DelegableSigning } from '../transactions/DelegableSigning';
import { PaidTransaction } from '../transactions/PaidTransaction';
import { SponsorshipReady } from '../transactions/SponsorshipReady';

export type UnfollowRequest = {
  profileId: ProfileId;
  kind: TransactionKind.UNFOLLOW_PROFILE;
  signless: boolean;
  sponsored: boolean;
};

export class UnfollowProfile extends SponsorshipReady<UnfollowRequest> {
  constructor(
    private readonly delegableExecution: DelegableSigning<UnfollowRequest>,
    private readonly paidExecution: PaidTransaction<UnfollowRequest>,
  ) {
    super();
  }

  protected override async charged(request: UnfollowRequest): Promise<void> {
    await this.paidExecution.execute(request);
  }
  protected override async sponsored(request: UnfollowRequest): Promise<void> {
    await this.delegableExecution.execute(request);
  }
}
