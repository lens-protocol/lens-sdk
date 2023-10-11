import { NonEmptyArray, URI } from '@lens-protocol/shared-kernel';

import { PublicationId, TransactionKind } from '../../entities';
import { MomokaOption } from '../transactions/MomokaOption';
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
} & (
  | {
      /**
       * Host on Momoka
       */
      momoka: true;
    }
  | {
      /**
       * Host on on-chain
       */
      momoka: false;
      /**
       * The Open Actions associated with the publication.
       */
      actions?: NonEmptyArray<OpenActionConfig>;
      /**
       * The post reference policy.
       */
      reference: ReferencePolicyConfig;
    }
);

export class CreateQuote extends MomokaOption<CreateQuoteRequest> {}
