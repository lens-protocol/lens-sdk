import { EvmAddress } from '@lens-protocol/shared-kernel';

import { TransactionKind } from '../../entities';
import { PaidTransaction } from '../transactions/PaidTransaction';
import { SignedOnChain } from '../transactions/SignedOnChain';
import { SponsorshipReady } from '../transactions/SponsorshipReady';

export type UpdateProfileManagersRequest = {
  kind: TransactionKind.UPDATE_PROFILE_MANAGERS;
  approveSignless?: boolean;
  add?: EvmAddress[];
  remove?: EvmAddress[];
  sponsored: boolean;
};

export class UpdateProfileManagers extends SponsorshipReady<UpdateProfileManagersRequest> {
  constructor(
    private readonly sponsoredExecution: SignedOnChain<UpdateProfileManagersRequest>,
    private readonly paidExecution: PaidTransaction<UpdateProfileManagersRequest>,
  ) {
    super();
  }

  protected override async charged(request: UpdateProfileManagersRequest): Promise<void> {
    await this.paidExecution.execute(request);
  }
  protected override async sponsored(request: UpdateProfileManagersRequest): Promise<void> {
    await this.sponsoredExecution.execute(request);
  }
}
