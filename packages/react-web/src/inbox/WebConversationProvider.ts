import {
  IConversationProvider,
  EnvironmentConfig,
  Conversation,
  profileId,
  Message,
  FetchConversationsRequest,
  FetchMessagesRequest,
  ConversationId,
  Markdown,
  Participant,
} from '@lens-protocol/react';
import { invariant } from '@lens-protocol/shared-kernel';
import { Client, DecodedMessage, Conversation as XmtpConversation } from '@xmtp/xmtp-js';

import { extractPeerProfileId } from './helpers';

function getXmtpEnvironment(name: EnvironmentConfig['name']) {
  switch (name) {
    case 'production':
      return 'production';
    case 'development':
      return 'dev';
  }
}

interface ISigner {
  getAddress(): Promise<string>;
  signMessage(message: ArrayLike<number> | string): Promise<string>;
}

export class WebConversationProvider implements IConversationProvider {
  private client?: Client;
  private signer?: ISigner;

  constructor(private readonly environment: EnvironmentConfig['name']) {}

  setSigner(signer: ISigner) {
    this.signer = signer;
  }

  private async getClient(): Promise<Client> {
    invariant(this.signer, 'Signer not set');

    if (!this.client) {
      this.client = await Client.create(this.signer, {
        env: getXmtpEnvironment(this.environment),
      });
    }

    return this.client;
  }

  async fetchConversations(request: FetchConversationsRequest): Promise<Conversation[]> {
    const client = await this.getClient();
    const xmtpConversations = await client.conversations.list();

    return xmtpConversations.map((xmtpConversation: XmtpConversation) => {
      return this.buildConversation(xmtpConversation, request.participant);
    });
  }

  async fetchMessages(request: FetchMessagesRequest): Promise<Message[]> {
    const xmtpConversations = await this.getXmtpConversations([request.conversationId]);
    const xmtpConversation = xmtpConversations[0];

    invariant(xmtpConversation, 'Conversation not found');

    const messages = await xmtpConversation.messages();

    return messages.map((decodedMessage: DecodedMessage) => {
      return {
        id: decodedMessage.id,
        conversationId: xmtpConversation.topic,
        content: decodedMessage.content as Markdown,
        reactions: [],
        sentAt: decodedMessage.sent,
        sender: {
          profileId: undefined, // TODO: extract sender profileId
          address: decodedMessage.senderAddress,
        },
      };
    });
  }

  private buildConversation(
    xmtpConversation: XmtpConversation,
    activeParticipant: Participant,
  ): Conversation {
    const conversationId = xmtpConversation.context?.conversationId;
    const activeProfileId = activeParticipant.profileId;

    const peerProfileId =
      conversationId && activeProfileId && this.isLensConversation(activeProfileId, conversationId)
        ? extractPeerProfileId(conversationId, activeProfileId)
        : undefined;

    return {
      id: xmtpConversation.topic,
      peer: {
        profileId: peerProfileId ? profileId(peerProfileId) : undefined,
        address: xmtpConversation.peerAddress,
      },
      me: {
        profileId: activeProfileId,
        address: xmtpConversation.clientAddress,
      },
    };
  }

  private isLensConversation(
    activeProfileId: string,
    conversationId?: string,
  ): conversationId is string {
    if (conversationId && conversationId.includes(activeProfileId)) {
      return true;
    }
    return false;
  }

  private async getXmtpConversations(
    conversationIds: ConversationId[],
  ): Promise<XmtpConversation[]> {
    const client = await this.getClient();
    const allXmtpConversations = await client.conversations.list();

    return allXmtpConversations.filter((xmtpConversation) => {
      return conversationIds.some((id) => id === xmtpConversation.topic);
    });
  }
}
