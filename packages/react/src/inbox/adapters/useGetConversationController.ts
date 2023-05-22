import {
  ConversationId,
  ConversationWithMessages,
  ConversationsDisabledError,
  ProfileId,
} from '@lens-protocol/domain/entities';
import { GetConversation } from '@lens-protocol/domain/use-cases/inbox';

import { useSharedDependencies } from '../../shared';
import { PromiseResultPresenter } from '../../transactions/adapters/PromiseResultPresenter';
import { InboxConfig } from '../config';
import { GetConversationGateway } from './GetConversationGateway';

export type GetConversationControllerRequest = {
  conversationId: ConversationId;
  profileId?: ProfileId;
};

export function useGetConversationController(config: InboxConfig) {
  const { activeWallet } = useSharedDependencies();

  return async (request: GetConversationControllerRequest) => {
    const presenter = new PromiseResultPresenter<
      ConversationWithMessages | null,
      ConversationsDisabledError
    >();
    const gateway = new GetConversationGateway(config.provider);
    const useCase = new GetConversation(activeWallet, gateway, presenter);

    await useCase.execute(request);

    return presenter.asResult();
  };
}
