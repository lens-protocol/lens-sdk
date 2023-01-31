import { invariant } from '@lens-protocol/shared-kernel';

import { TransactionKind } from '../../entities';
import {
  DelegableProtocolCallUseCase,
  IDelegableProtocolCallGateway,
  IProtocolCallPresenter,
} from '../transactions/DelegableProtocolCallUseCase';
import { IUnsignedProtocolCallGateway } from '../transactions/ProtocolCallUseCase';
import { ReferencePolicyConfig } from './ReferencePolicyConfig';
import { CollectPolicy, ContentFocus, Locale, Media } from './types';

export type CreatePostRequest = {
  content?: string;
  contentFocus: ContentFocus;
  media?: Media[];
  reference: ReferencePolicyConfig;
  collect: CollectPolicy;
  profileId: string;
  kind: TransactionKind.CREATE_POST;
  locale: Locale;
  delegate: boolean;
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
