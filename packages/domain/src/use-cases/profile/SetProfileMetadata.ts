import { URI } from '@lens-protocol/shared-kernel';

import { TransactionKind } from '../../entities';
import { DelegableSigning } from '../transactions/DelegableSigning';
import { PaidTransaction } from '../transactions/PaidTransaction';
import { SponsorshipReady } from '../transactions/SponsorshipReady';

export type SetProfileMetadataRequest = {
  metadataURI: URI;
  kind: TransactionKind.UPDATE_PROFILE_DETAILS;
  signless: boolean;
  sponsored: boolean;
};

export class SetProfileMetadata extends SponsorshipReady<SetProfileMetadataRequest> {
  constructor(
    private readonly delegableExecution: DelegableSigning<SetProfileMetadataRequest>,
    private readonly paidExecution: PaidTransaction<SetProfileMetadataRequest>,
  ) {
    super();
  }

  protected override async charged(request: SetProfileMetadataRequest): Promise<void> {
    await this.paidExecution.execute(request);
  }

  protected override async sponsored(request: SetProfileMetadataRequest): Promise<void> {
    await this.delegableExecution.execute(request);
  }
}
