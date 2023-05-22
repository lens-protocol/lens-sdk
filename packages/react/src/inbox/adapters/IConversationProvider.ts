import { Participant, Wallet as WalletEntity } from '@lens-protocol/domain/entities';
import {
  EnableConversationsResult,
  GetAllConversationsResult,
} from '@lens-protocol/domain/use-cases/inbox';

export type FetchConversationsRequest = {
  participant: Participant;
};

export type EnableConversationsRequest = {
  participant: Participant;
};

export interface IConversationProvider {
  enableConversations(
    wallet: WalletEntity,
    request: EnableConversationsRequest,
  ): Promise<EnableConversationsResult>;
  fetchConversations(request: FetchConversationsRequest): Promise<GetAllConversationsResult>;
}
