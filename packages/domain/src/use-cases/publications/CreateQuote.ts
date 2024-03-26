import { Data, URI } from '@lens-protocol/shared-kernel';

import { PublicationId, TransactionKind, isMomokaPublicationId } from '../../entities';
import { DelegableSigning } from '../transactions/DelegableSigning';
import { PaidTransaction } from '../transactions/PaidTransaction';
import { SponsorshipReady } from '../transactions/SponsorshipReady';
import { OpenActionConfig } from './OpenActionConfig';
import { ReferencePolicyConfig } from './ReferencePolicyConfig';
import { Referrers } from './Referrers';

export type CreateQuoteRequest = {
  kind: TransactionKind.CREATE_QUOTE;
  actions: OpenActionConfig[];
  metadata: URI;
  quoteOn: PublicationId;
  quoteOnReferenceData?: Data;
  referrers?: Referrers;
  reference: ReferencePolicyConfig;
  signless: boolean;
  sponsored: boolean;
};

export class CreateQuote extends SponsorshipReady<CreateQuoteRequest> {
  constructor(
    protected readonly sponsoredOnChain: DelegableSigning<CreateQuoteRequest>,
    protected readonly sponsoredOnMomoka: DelegableSigning<CreateQuoteRequest>,
    protected readonly paidOnChain: PaidTransaction<CreateQuoteRequest>,
  ) {
    super();
  }

  protected override async charged(request: CreateQuoteRequest): Promise<void> {
    return this.paidOnChain.execute(request);
  }

  protected override async sponsored(request: CreateQuoteRequest): Promise<void> {
    if (isMomokaPublicationId(request.quoteOn)) {
      return this.sponsoredOnMomoka.execute(request);
    }
    return this.sponsoredOnChain.execute(request);
  }
}
