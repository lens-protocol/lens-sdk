import { EthereumAddress } from '@lens-protocol/shared-kernel';

import { ProfileId } from './Profile';

export type ConversationId = string;
export type Markdown = string;
export type Emoji = string;

export type Participant = {
  profileId?: ProfileId;
  address: EthereumAddress;
};

export type Conversation = {
  id: ConversationId;
  peer: Participant;
  me: Participant;
};

export type Message = {
  id: string;
  conversationId: ConversationId;
  content: Markdown;
  reactions: Emoji[];
  sentAt: Date;
  sender: Participant;
};
