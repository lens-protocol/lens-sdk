import { URI } from '@lens-protocol/shared-kernel';

import { TransactionKind } from '../../entities';
import { MomokaCapable } from '../transactions/MomokaCapable';
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
  /**
   * The Open Actions associated with the publication.
   */
  actions?: OpenActionConfig[];
  /**
   * The post reference policy.
   */
  reference?: ReferencePolicyConfig;
};

export class CreatePost extends MomokaCapable<CreatePostRequest> {
  override async execute(request: CreatePostRequest): Promise<void> {
    if (['actions', 'reference'].some((key) => key in request)) {
      return this.onChain.execute(request);
    }
    return this.momoka.execute(request);
  }
}
