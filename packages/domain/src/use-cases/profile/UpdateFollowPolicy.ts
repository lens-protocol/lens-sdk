import { TransactionKind } from '../../entities';
import { DelegableSigning } from '../transactions/DelegableSigning';
import { PaidTransaction } from '../transactions/PaidTransaction';
import { SponsorshipReady } from '../transactions/SponsorshipReady';
import { FollowPolicyConfig } from './FollowPolicy';

export type UpdateFollowPolicyRequest = {
  policy: FollowPolicyConfig;
  kind: TransactionKind.UPDATE_FOLLOW_POLICY;
  signless: boolean;
  sponsored: boolean;
};

export class UpdateFollowPolicy extends SponsorshipReady<UpdateFollowPolicyRequest> {
  constructor(
    private readonly delegableExecution: DelegableSigning<UpdateFollowPolicyRequest>,
    private readonly paidExecution: PaidTransaction<UpdateFollowPolicyRequest>,
  ) {
    super();
  }

  protected override async charged(request: UpdateFollowPolicyRequest): Promise<void> {
    await this.paidExecution.execute(request);
  }

  protected override async sponsored(request: UpdateFollowPolicyRequest): Promise<void> {
    await this.delegableExecution.execute(request);
  }
}
