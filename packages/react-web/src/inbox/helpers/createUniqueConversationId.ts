import { CachedConversation } from '@xmtp/react-sdk';

/**
 * Create a unique conversation ID based on sender/receiver addresses and
 * context values
 */
export const createUniqueConversationId = (conversation: CachedConversation): string =>
  [conversation.walletAddress, conversation.peerAddress, conversation.context?.conversationId]
    .filter((v) => Boolean(v))
    .join('/');
