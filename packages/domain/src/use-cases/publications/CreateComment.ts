import { URI } from '@lens-protocol/shared-kernel';

import { isMomokaPublicationId, PublicationId, TransactionKind } from '../../entities';
import { DelegableSigning } from '../transactions/DelegableSigning';
import { PaidTransaction } from '../transactions/PaidTransaction';
import { SponsorshipReady } from '../transactions/SponsorshipReady';
import { OpenActionConfig } from './OpenActionConfig';
import { ReferencePolicyConfig, ReferencePolicyType } from './ReferencePolicyConfig';

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

export class CreateComment extends SponsorshipReady<CreateCommentRequest> {
  constructor(
    protected readonly sponsoredOnChain: DelegableSigning<CreateCommentRequest>,
    protected readonly sponsoredOnMomoka: DelegableSigning<CreateCommentRequest>,
    protected readonly paidOnChain: PaidTransaction<CreateCommentRequest>,
  ) {
    super();
  }

  protected override async charged(request: CreateCommentRequest): Promise<void> {
    return this.paidOnChain.execute(request);
  }

  protected override async sponsored(request: CreateCommentRequest): Promise<void> {
    if (
      request.reference.type === ReferencePolicyType.ANYONE &&
      request.actions.length === 0 &&
      isMomokaPublicationId(request.commentOn)
    ) {
      return this.sponsoredOnMomoka.execute(request);
    }
    return this.sponsoredOnChain.execute(request);
  }
}
