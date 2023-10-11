import { NonEmptyArray, URI } from '@lens-protocol/shared-kernel';

import { PublicationId, TransactionKind } from '../../entities';
import { MomokaOption } from '../transactions/MomokaOption';
import { OpenActionConfig } from './OpenActionConfig';
import { ReferencePolicyConfig } from './ReferencePolicyConfig';

export type CreateCommentRequest = {
  /**
   * The discriminator for the transaction kind.
   */
  kind: TransactionKind.CREATE_COMMENT;
  /**
   * Whether is possible to delegate the publication signing to the profile's dispatcher.
   */
  delegate: boolean;
  /**
   * The publication ID to comment on.
   */
  commentOn: PublicationId;
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

export class CreateComment extends MomokaOption<CreateCommentRequest> {}
