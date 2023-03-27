import { invariant } from '@lens-protocol/shared-kernel';

import { AppId, DecryptionCriteria, ProfileId, TransactionKind } from '../../entities';
import {
  DelegableProtocolCallUseCase,
  IDelegableProtocolCallGateway,
  IProtocolCallPresenter,
} from '../transactions/DelegableProtocolCallUseCase';
import { IUnsignedProtocolCallGateway } from '../transactions/ProtocolCallUseCase';
import { ReferencePolicyConfig } from './ReferencePolicyConfig';
import { CollectPolicyConfig, MediaObject, ContentFocus, Locale } from './types';

export type CreateCommentRequest = {
  appId?: AppId;
  publicationId: string;
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
};

export type ICreateCommentCallGateway = IDelegableProtocolCallGateway<CreateCommentRequest> &
  IUnsignedProtocolCallGateway<CreateCommentRequest>;

export type ICreateCommentPresenter = IProtocolCallPresenter;

export class CreateComment extends DelegableProtocolCallUseCase<CreateCommentRequest> {
  async execute(request: CreateCommentRequest) {
    invariant(request.media || request.content, 'One of post media or content is required');
    await super.execute(request);
  }
}
