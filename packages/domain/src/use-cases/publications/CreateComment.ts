import { invariant } from '@lens-protocol/shared-kernel';

import {
  AppId,
  DecryptionCriteria,
  ProfileId,
  PublicationId,
  TransactionKind,
} from '../../entities';
import { DelegableSigning } from '../transactions/DelegableSigning';
import { ReferencePolicyConfig } from './ReferencePolicyConfig';
import { CollectPolicyConfig, MediaObject, ContentFocus, Locale } from './types';

export type CreateCommentRequest = {
  appId?: AppId;
  publicationId: PublicationId;
  content?: string;
  contentFocus: ContentFocus;
  media?: MediaObject[];
  reference: ReferencePolicyConfig;
  collect: CollectPolicyConfig;
  profileId: ProfileId;
  kind: TransactionKind.CREATE_COMMENT;
  locale: Locale;
  delegate: boolean;
  decryptionCriteria?: DecryptionCriteria;
  offChain: boolean;
};

export class CreateComment {
  constructor(
    private readonly createOnChainPost: DelegableSigning<CreateCommentRequest>,
    private readonly createOffChainPost: DelegableSigning<CreateCommentRequest>,
  ) {}

  async execute(request: CreateCommentRequest) {
    invariant(request.media || request.content, 'One of post media or content is required');

    if (request.offChain) {
      await this.createOffChainPost.execute(request);
    } else {
      await this.createOnChainPost.execute(request);
    }
  }
}
