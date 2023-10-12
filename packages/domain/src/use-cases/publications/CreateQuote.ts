import { URI } from '@lens-protocol/shared-kernel';

import { PublicationId, TransactionKind } from '../../entities';
import { MomokaCapable } from '../transactions/MomokaCapable';
import { OpenActionConfig } from './OpenActionConfig';
import { ReferencePolicyConfig } from './ReferencePolicyConfig';

export type CreateQuoteRequest = {
  /**
   * The discriminator for the transaction kind.
   */
  kind: TransactionKind.CREATE_QUOTE;
  /**
   * Whether is possible to delegate the publication signing to the profile's dispatcher.
   */
  delegate: boolean;
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
  actions?: OpenActionConfig[];
  /**
   * The post reference policy.
   */
  reference?: ReferencePolicyConfig;
};

export class CreateQuote extends MomokaCapable<CreateQuoteRequest> {
  override async execute(request: CreateQuoteRequest): Promise<void> {
    if (['actions', 'reference'].some((key) => key in request)) {
      return this.onChain.execute(request);
    }
    return this.momoka.execute(request);
  }
}
