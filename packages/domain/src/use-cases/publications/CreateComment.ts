import { invariant } from '@lens-protocol/shared-kernel';

import {
  AppId,
  DecryptionCriteria,
  ProfileId,
  PublicationId,
  TransactionKind,
} from '../../entities';
import {
  DelegableSubsidizedCall,
  IDelegatedCallGateway,
  IProtocolCallPresenter,
} from '../transactions/DelegableSubsidizedCall';
import { IUnsignedProtocolCallGateway } from '../transactions/SubsidizedCall';
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
};

export type ICreateCommentCallGateway = IDelegatedCallGateway<CreateCommentRequest> &
  IUnsignedProtocolCallGateway<CreateCommentRequest>;

export type ICreateCommentPresenter = IProtocolCallPresenter;

export class CreateComment extends DelegableSubsidizedCall<CreateCommentRequest> {
  async execute(request: CreateCommentRequest) {
    invariant(request.media || request.content, 'One of post media or content is required');
    await super.execute(request);
  }
}
