import { URI } from '@lens-protocol/shared-kernel';

import { TransactionKind } from '../../entities';
import { DelegableSigning } from '../transactions/DelegableSigning';
import { PaidTransaction } from '../transactions/PaidTransaction';
import { SponsorshipReady } from '../transactions/SponsorshipReady';
import { OpenActionConfig } from './OpenActionConfig';
import { ReferencePolicyConfig, ReferencePolicyType } from './ReferencePolicyConfig';

export type CreatePostRequest = {
  /**
   * The discriminator for the transaction kind.
   */
  kind: TransactionKind.CREATE_POST;
  /**
   * Whether is possible to delegate the publication signing to the profile's chosen profile manager.
   */
  signless: boolean;
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

export class CreatePost extends SponsorshipReady<CreatePostRequest> {
  constructor(
    protected readonly sponsoredOnChain: DelegableSigning<CreatePostRequest>,
    protected readonly sponsoredOnMomoka: DelegableSigning<CreatePostRequest>,
    protected readonly paidOnChain: PaidTransaction<CreatePostRequest>,
  ) {
    super();
  }

  protected override async charged(request: CreatePostRequest): Promise<void> {
    return this.paidOnChain.execute(request);
  }

  protected override async sponsored(request: CreatePostRequest): Promise<void> {
    if (request.reference.type === ReferencePolicyType.ANYONE && request.actions.length === 0) {
      return this.sponsoredOnMomoka.execute(request);
    }
    return this.sponsoredOnChain.execute(request);
  }
}
