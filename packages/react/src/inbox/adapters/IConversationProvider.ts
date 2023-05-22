import {
  Conversation,
  ConversationId,
  Markdown,
  Message,
  Participant,
} from '@lens-protocol/domain/entities';

export type FetchConversationsRequest = {
  participant: Participant;
};

export type FetchConversationRequest = {
  participant: Participant;
  conversationId: ConversationId;
};

export type CreateConversationRequest = {
  creator: Participant;
  peer: Participant;
};

export type FetchMessagesRequest = {
  conversationId: ConversationId;
  // TODO: add filters and pagination
};

export type SendMessageRequest = {
  participant: Participant;
  conversationId: ConversationId;
  message: Markdown;
};

export interface IConversationProvider {
  fetchConversations(request: FetchConversationsRequest): Promise<Conversation[]>;
  // fetchConversation(request: FetchConversationRequest): Promise<Conversation | null>;
  // createConversation(request: CreateConversationRequest): Promise<Conversation>;
  fetchMessages(request: FetchMessagesRequest): Promise<Message[]>;
  // sendMessage(request: SendMessageRequest): Promise<Message>;
}
