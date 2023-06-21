import { Brand, EthereumAddress } from '@lens-protocol/shared-kernel';

import { ProfileId } from './Profile';

export type ConversationId = string;
export type Markdown = Brand<string, 'Markdown'>;
export type Emoji = Brand<string, 'Emoji'>;

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

export type ConversationWithMessages = Conversation & {
  messages: Message[];
};

export class ConversationsDisabledError extends Error {
  name = 'ConversationsDisabledError' as const;
  message = 'Conversations are disabled, enable them first';
}

export class ConversationNotFoundError extends Error {
  name = 'ConversationNotFoundError' as const;
  message = 'Conversation not found';

  constructor(readonly conversationId: ConversationId) {
    super(`Conversation with id ${conversationId} was not found`);
  }
}
