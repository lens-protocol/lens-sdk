import { invariant } from '@lens-protocol/shared-kernel';

import { AppId, DecryptionCriteria, ProfileId, TransactionKind } from '../../entities';
import {
  DelegableProtocolCallUseCase,
  IDelegableProtocolCallGateway,
  IProtocolCallPresenter,
} from '../transactions/DelegableProtocolCallUseCase';
import { IUnsignedProtocolCallGateway } from '../transactions/ProtocolCallUseCase';
import { ReferencePolicyConfig } from './ReferencePolicyConfig';
import { CollectPolicyConfig, ContentFocus, Locale, MediaObject } from './types';

export type CreatePostRequest = {
  appId?: AppId;
  content?: string;
  contentFocus: ContentFocus;
  media?: MediaObject[];
  reference: ReferencePolicyConfig;
  collect: CollectPolicyConfig;
  profileId: ProfileId;
  kind: TransactionKind.CREATE_POST;
  locale: Locale;
  delegate: boolean;
  decryptionCriteria?: DecryptionCriteria;
};

export type ICreatePostCallGateway = IDelegableProtocolCallGateway<CreatePostRequest> &
  IUnsignedProtocolCallGateway<CreatePostRequest>;

export type ICreatePostPresenter = IProtocolCallPresenter;

export class CreatePost extends DelegableProtocolCallUseCase<CreatePostRequest> {
  async execute(request: CreatePostRequest) {
    invariant(request.media || request.content, 'One of post media or content is required');
    await super.execute(request);
  }
}
