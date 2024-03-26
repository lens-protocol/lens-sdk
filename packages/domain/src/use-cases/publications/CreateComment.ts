import { Data, URI } from '@lens-protocol/shared-kernel';

import { isMomokaPublicationId, PublicationId, TransactionKind } from '../../entities';
import { DelegableSigning } from '../transactions/DelegableSigning';
import { PaidTransaction } from '../transactions/PaidTransaction';
import { SponsorshipReady } from '../transactions/SponsorshipReady';
import { OpenActionConfig } from './OpenActionConfig';
import { ReferencePolicyConfig } from './ReferencePolicyConfig';
import { Referrers } from './Referrers';

export type CreateCommentRequest = {
  kind: TransactionKind.CREATE_COMMENT;
  actions: OpenActionConfig[];
  commentOn: PublicationId;
  commentOnReferenceData?: Data;
  metadata: URI;
  reference: ReferencePolicyConfig;
  referrers?: Referrers;
  signless: boolean;
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
    if (isMomokaPublicationId(request.commentOn)) {
      return this.sponsoredOnMomoka.execute(request);
    }
    return this.sponsoredOnChain.execute(request);
  }
}
