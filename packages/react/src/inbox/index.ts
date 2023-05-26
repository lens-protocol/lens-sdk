export * from './useConversations';
export * from './useEnableConversations';

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
export type { EnableConversationsResult } from '@lens-protocol/domain/use-cases/inbox';
