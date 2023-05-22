export * from './useConversations';

export type { InboxConfig } from './config';
export type {
  CreateConversationRequest,
  FetchConversationRequest,
  FetchConversationsRequest,
  FetchMessagesRequest,
  IConversationProvider,
  SendMessageRequest,
} from './adapters/IConversationProvider';
export type {
  Conversation,
  ConversationId,
  Emoji,
  Markdown,
  Message,
  Participant,
} from '@lens-protocol/domain/entities';
