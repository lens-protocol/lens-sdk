import { Conversation } from '@xmtp/react-sdk';

/**
 * Create a unique conversation ID based on sender/receiver addresses and
 * context values
 */
export const createUniqueConversationId = (conversation: Conversation): string =>
  [conversation.clientAddress, conversation.peerAddress, conversation.context?.conversationId]
    .filter((v) => Boolean(v))
    .join('/');
