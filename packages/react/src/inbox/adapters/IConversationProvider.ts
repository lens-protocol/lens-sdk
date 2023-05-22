import { ConversationId, Participant } from '@lens-protocol/domain/entities';
import {
  EnableConversationsResult,
  GetAllConversationsResult,
  GetConversationResult,
} from '@lens-protocol/domain/use-cases/inbox';
import { EthereumAddress, PromiseResult } from '@lens-protocol/shared-kernel';

export interface IConversationWallet {
  address: EthereumAddress;

  signMessage(message: string): PromiseResult<string, Error>;
}

export type EnableConversationsRequest = {
  participant: Participant;
};

export type FetchConversationsRequest = {
  participant: Participant;
};

export type FetchConversationRequest = {
  participant: Participant;
  conversationId: ConversationId;
};

export interface IConversationProvider {
  enableConversations(
    wallet: IConversationWallet,
    request: EnableConversationsRequest,
  ): Promise<EnableConversationsResult>;

  fetchConversations(request: FetchConversationsRequest): Promise<GetAllConversationsResult>;

  fetchConversation(request: FetchConversationRequest): Promise<GetConversationResult>;
}
