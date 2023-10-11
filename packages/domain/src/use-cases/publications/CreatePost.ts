import { NonEmptyArray, URI } from '@lens-protocol/shared-kernel';

import { TransactionKind } from '../../entities';
import { MomokaOption } from '../transactions/MomokaOption';
import { OpenActionConfig } from './OpenActionConfig';
import { ReferencePolicyConfig } from './ReferencePolicyConfig';

export type CreatePostRequest = {
  /**
   * The discriminator for the transaction kind.
   */
  kind: TransactionKind.CREATE_POST;
  /**
   * Whether is possible to delegate the publication signing to the profile's dispatcher.
   */
  delegate: boolean;
  /**
   * The metadata URI.
   */
  metadata: URI;
} & (
  | {
      momoka: true;
    }
  | {
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

export class CreatePost extends MomokaOption<CreatePostRequest> {}
