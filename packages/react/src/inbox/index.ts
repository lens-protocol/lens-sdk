export * from './useConversations';
export * from './useEnableConversations';
export { ConversationsDisabledError } from '@lens-protocol/domain/entities';

export type { InboxConfig } from './config';
export type {
  FetchConversationsRequest,
  EnableConversationsRequest,
  IConversationProvider,
} from './adapters/IConversationProvider';
export type {
  Conversation,
  ConversationId,
  Emoji,
  Markdown,
  Message,
  Participant,
} from '@lens-protocol/domain/entities';
export type {
  EnableConversationsResult,
  GetAllConversationsResult,
} from '@lens-protocol/domain/use-cases/inbox';
