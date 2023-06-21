import {
  Conversation,
  ConversationsDisabledError,
  EnableConversationsRequest,
  EnableConversationsResult,
  FetchConversationsRequest,
  GetAllConversationsResult,
  IConversationProvider,
  Participant,
  profileId as createProfileId,
  EnvironmentConfig,
  ConversationId,
  Message,
  Markdown,
  FetchConversationRequest,
  GetConversationResult,
  ProfileId,
  ConversationWithMessages,
  IConversationWallet,
  CreateConversationRequest,
  CreateConversationResult,
  SendMessageRequest,
  SendMessageResult,
  ConversationNotFoundError,
} from '@lens-protocol/react';
import { failure, invariant, success } from '@lens-protocol/shared-kernel';
import { IStorage } from '@lens-protocol/storage';
import { Client, DecodedMessage, Conversation as XmtpConversation } from '@xmtp/xmtp-js';

import {
  buildConversationId,
  extractPeerProfileId,
  isLensConversation,
  notEmpty,
} from '../helpers';
import { SignerAdapter } from './SignerAdapter';

export class WebConversationProvider implements IConversationProvider {
  private client?: Client;

  constructor(
    private readonly environment: EnvironmentConfig,
    private readonly storage: IStorage<string>,
  ) {}

  private async storeKeys(keys: Uint8Array) {
    await this.storage.set(Uint8Array.from(keys).toString());
  }

  private async loadKeys(): Promise<Uint8Array | null> {
    const val = await this.storage.get();
    return val ? Uint8Array.from(val.split(',').map((c) => parseInt(c))) : null;
  }

  private async getClient(): Promise<Client> {
    if (!this.client) {
      // try to create xmtp client from stored keys
      const keys = await this.loadKeys();

      if (keys) {
        this.client = await Client.create(null, {
          env: this.environment.xmtpEnv.name,
          privateKeyOverride: keys,
          persistConversations: true,
        });

        return this.client;
      }

      // if no keys stored
      throw new ConversationsDisabledError();
    }

    return this.client;
  }

  async enableConversations(
    wallet: IConversationWallet,
    { participant }: EnableConversationsRequest,
  ): Promise<EnableConversationsResult> {
    // check if we can recreate client from the storage
    try {
      await this.getClient();
      return success({
        profileId: participant.profileId,
        address: wallet.address,
      });
    } catch (e) {
      // ignore
    }

    // if not, try to create client from the wallet
    try {
      const signer = new SignerAdapter(wallet);
      const keys = await Client.getKeys(signer, {
        env: this.environment.xmtpEnv.name,
        persistConversations: false,
        skipContactPublishing: true,
      });
      await this.storeKeys(keys);
      return success({
        profileId: participant.profileId,
        address: wallet.address,
      });
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore Error not yet properly typed
      return failure(e);
    }
  }

  async fetchConversations(request: FetchConversationsRequest): Promise<GetAllConversationsResult> {
    try {
      const client = await this.getClient();
      const xmtpConversations = await client.conversations.list();

      const conversationsOrNot = await Promise.all(
        xmtpConversations.map(
          async (xmtpConversation: XmtpConversation): Promise<ConversationWithMessages | null> => {
            const peerProfileId = this.extractPeerProfileIdFromConversation(
              xmtpConversation,
              request.participant,
            );
            const xmtpMessages = await xmtpConversation.messages();

            // exclude conversations without messages
            if (xmtpMessages.length === 0) {
              return null;
            }

            invariant(xmtpMessages[0], 'Conversation should have at least one message');

            const lastMessage = this.buildMessage(xmtpMessages[0], xmtpConversation, peerProfileId);
            const conversation = this.buildConversation(xmtpConversation, request.participant);

            return {
              ...conversation,
              messages: [lastMessage],
            };
          },
        ),
      );

      const conversations = conversationsOrNot.filter(notEmpty);

      return success(conversations);
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore Error not yet properly typed
      return failure(e);
    }
  }

  async fetchConversation(request: FetchConversationRequest): Promise<GetConversationResult> {
    try {
      const xmtpConversation = await this.getXmtpConversation(request.conversationId);

      if (!xmtpConversation) {
        return success(null);
      }

      const peerProfileId = this.extractPeerProfileIdFromConversation(
        xmtpConversation,
        request.participant,
      );

      const xmtpMessages = await xmtpConversation.messages();

      const messages = xmtpMessages.map((decodedMessage: DecodedMessage) =>
        this.buildMessage(decodedMessage, xmtpConversation, peerProfileId),
      );

      const conversation = this.buildConversation(xmtpConversation, request.participant);

      return success({
        ...conversation,
        messages,
      });
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore Error not yet properly typed
      return failure(e);
    }
  }

  async createConversation({
    creator,
    peer,
  }: CreateConversationRequest): Promise<CreateConversationResult> {
    try {
      const client = await this.getClient();

      const conversationContext =
        creator.profileId && peer.profileId
          ? {
              conversationId: buildConversationId(creator.profileId, peer.profileId),
              metadata: {},
            }
          : undefined;

      const newXmtpConversation = await client.conversations.newConversation(
        peer.address,
        conversationContext,
      );

      const conversation = this.buildConversation(newXmtpConversation, creator);

      return success(conversation);
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore Error not yet properly typed
      return failure(e);
    }
  }

  async sendMessage(request: SendMessageRequest): Promise<SendMessageResult> {
    try {
      const xmtpConversation = await this.getXmtpConversation(request.conversationId);

      if (!xmtpConversation) {
        return failure(new ConversationNotFoundError(request.conversationId));
      }

      const decodedMessage = await xmtpConversation.send(request.content);

      const peerProfileId = this.extractPeerProfileIdFromConversation(
        xmtpConversation,
        request.participant,
      );

      return success(this.buildMessage(decodedMessage, xmtpConversation, peerProfileId));
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore Error not yet properly typed
      return failure(e);
    }
  }

  // async fetchMessages(request: FetchMessagesRequest): Promise<Message[]> {
  //   const xmtpConversation = await this.getXmtpConversation(request.conversationId);

  //   invariant(xmtpConversation, 'Conversation not found');

  //   const peerProfileId = this.extractPeerProfileIdFromConversation(
  //     xmtpConversation,
  //     request.participant,
  //   );

  //   const messages = await xmtpConversation.messages();

  //   return messages.map((decodedMessage: DecodedMessage) =>
  //     this.buildMessage(decodedMessage, xmtpConversation, peerProfileId),
  //   );
  // }

  private buildConversation(
    xmtpConversation: XmtpConversation,
    activeParticipant: Participant,
  ): Conversation {
    const activeProfileId = activeParticipant.profileId;

    const peerProfileId = this.extractPeerProfileIdFromConversation(
      xmtpConversation,
      activeParticipant,
    );

    return {
      id: xmtpConversation.topic,
      peer: {
        profileId: peerProfileId,
        address: xmtpConversation.peerAddress,
      },
      me: {
        profileId: activeProfileId,
        address: xmtpConversation.clientAddress,
      },
    };
  }

  private buildMessage(
    decodedMessage: DecodedMessage,
    xmtpConversation: XmtpConversation,
    peerProfileId: ProfileId | undefined,
  ): Message {
    return {
      id: decodedMessage.id,
      conversationId: xmtpConversation.topic,
      content: decodedMessage.content as Markdown,
      reactions: [],
      sentAt: decodedMessage.sent,
      sender: {
        profileId: peerProfileId,
        address: decodedMessage.senderAddress,
      },
    };
  }

  private async getXmtpConversation(
    conversationId: ConversationId,
  ): Promise<XmtpConversation | undefined> {
    const client = await this.getClient();
    const allXmtpConversations = await client.conversations.list();

    return allXmtpConversations.find((xmtpConversation) => {
      return conversationId === xmtpConversation.topic;
    });
  }

  private extractPeerProfileIdFromConversation(
    xmtpConversation: XmtpConversation,
    activeParticipant: Participant,
  ): ProfileId | undefined {
    const conversationId = xmtpConversation.context?.conversationId;
    const activeProfileId = activeParticipant.profileId;

    const peerProfileId =
      conversationId && activeProfileId && isLensConversation(activeProfileId, conversationId)
        ? extractPeerProfileId(conversationId, activeProfileId)
        : undefined;

    return peerProfileId ? createProfileId(peerProfileId) : undefined;
  }
}
