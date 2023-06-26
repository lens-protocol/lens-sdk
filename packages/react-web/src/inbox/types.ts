import { Profile } from '@lens-protocol/react';
import { Conversation } from '@xmtp/react-sdk';

export type EnhancedConversation = Conversation & {
  peerProfile?: Profile;
};
