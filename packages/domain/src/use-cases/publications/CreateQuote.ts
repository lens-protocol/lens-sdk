import { URI } from '@lens-protocol/shared-kernel';

import { PublicationId, TransactionKind, isMomokaPublicationId } from '../../entities';
import { DelegableSigning } from '../transactions/DelegableSigning';
import { PaidTransaction } from '../transactions/PaidTransaction';
import { SponsorshipReady } from '../transactions/SponsorshipReady';
import { OpenActionConfig } from './OpenActionConfig';
import { ReferencePolicyConfig, ReferencePolicyType } from './ReferencePolicyConfig';

export type CreateQuoteRequest = {
  /**
   * The discriminator for the transaction kind.
   */
  kind: TransactionKind.CREATE_QUOTE;
  /**
   * Whether is possible to delegate the publication signing to the profile's chosen profile manager.
   */
  signless: boolean;
  /**
   * The publication ID that is being quoted.
   */
  quoteOn: PublicationId;
  /**
   * The metadata URI.
   */
  metadata: URI;
  /**
   * The Open Actions associated with the publication.
   */
  actions: OpenActionConfig[];
  /**
   * The post reference policy.
   */
  reference: ReferencePolicyConfig;
  /**
   * Whether the transaction costs should be sponsored by the Lens API or not.
   */
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
    if (
      request.reference.type === ReferencePolicyType.ANYONE &&
      request.actions.length === 0 &&
      isMomokaPublicationId(request.quoteOn)
    ) {
      return this.sponsoredOnMomoka.execute(request);
    }
    return this.sponsoredOnChain.execute(request);
  }
}
