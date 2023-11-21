import { URI } from '@lens-protocol/shared-kernel';

import { isMomokaPublicationId, PublicationId, TransactionKind } from '../../entities';
import { MomokaCapable } from '../transactions/MomokaCapable';
import { OpenActionConfig } from './OpenActionConfig';
import { ReferencePolicyConfig } from './ReferencePolicyConfig';

export type CreateCommentRequest = {
  /**
   * The discriminator for the transaction kind.
   */
  kind: TransactionKind.CREATE_COMMENT;
  /**
   * Whether is possible to delegate the publication signing to the profile's chosen profile manager.
   */
  signless: boolean;
  /**
   * The publication ID to comment on.
   */
  commentOn: PublicationId;
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

export class CreateComment extends MomokaCapable<CreateCommentRequest> {
  override async execute(request: CreateCommentRequest): Promise<void> {
    if (
      ['actions', 'reference'].some((key) => key in request) ||
      !isMomokaPublicationId(request.commentOn)
    ) {
      return this.onChain.execute(request);
    }
    return this.momoka.execute(request);
  }
}
