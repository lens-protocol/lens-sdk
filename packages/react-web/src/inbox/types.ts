import { Profile } from '@lens-protocol/react';
import { CachedConversation } from '@xmtp/react-sdk';

export type EnhancedConversation = CachedConversation & {
  peerProfile?: Profile;
};
