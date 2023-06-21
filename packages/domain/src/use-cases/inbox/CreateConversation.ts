import { Result } from '@lens-protocol/shared-kernel';

import {
  Conversation,
  ConversationsDisabledError,
  Participant,
  ProfileId,
  Wallet,
} from '../../entities';
import { ActiveWallet } from '../wallets';

export type CreateConversationRequest = {
  creatorProfileId?: ProfileId;
  peer: Participant;
};

export type CreateConversationResult = Result<Conversation, ConversationsDisabledError>;

export interface ICreateConversationGateway {
  createConversation(
    wallet: Wallet,
    request: CreateConversationRequest,
  ): Promise<CreateConversationResult>;
}

interface ICreateConversationPresenter {
  present(conversation: CreateConversationResult): void;
}

export class CreateConversation {
  constructor(
    private readonly activeWallet: ActiveWallet,
    private readonly gateway: ICreateConversationGateway,
    private readonly presenter: ICreateConversationPresenter,
  ) {}

  async execute(request: CreateConversationRequest): Promise<void> {
    const wallet = await this.activeWallet.requireActiveWallet();
    const conversation = await this.gateway.createConversation(wallet, request);
    this.presenter.present(conversation);
  }
}
