import {
  Conversation,
  ConversationsDisabledError,
  Participant,
  ProfileId,
} from '@lens-protocol/domain/entities';
import { CreateConversation } from '@lens-protocol/domain/use-cases/inbox';

import { useSharedDependencies } from '../../shared';
import { PromiseResultPresenter } from '../../transactions/adapters/PromiseResultPresenter';
import { InboxConfig } from '../config';
import { CreateConversationGateway } from './CreateConversationGateway';

export type CreateConversationControllerRequest = {
  profileId?: ProfileId;
  peer: Participant;
};

export function useCreateConversationController(config: InboxConfig) {
  const { activeWallet } = useSharedDependencies();

  return async (request: CreateConversationControllerRequest) => {
    const presenter = new PromiseResultPresenter<Conversation, ConversationsDisabledError>();
    const gateway = new CreateConversationGateway(config.provider);
    const useCase = new CreateConversation(activeWallet, gateway, presenter);

    await useCase.execute(request);

    return presenter.asResult();
  };
}
