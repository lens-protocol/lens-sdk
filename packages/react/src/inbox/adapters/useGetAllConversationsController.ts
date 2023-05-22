import {
  Conversation,
  ConversationsDisabledError,
  ProfileId,
} from '@lens-protocol/domain/entities';
import { GetAllConversations } from '@lens-protocol/domain/use-cases/inbox';

import { useSharedDependencies } from '../../shared';
import { PromiseResultPresenter } from '../../transactions/adapters/PromiseResultPresenter';
import { InboxConfig } from '../config';
import { GetAllConversationsGateway } from './GetAllConversationsGateway';

export type GetAllConversationsControllerRequest = {
  profileId?: ProfileId;
};

export function useGetAllConversationsController(config: InboxConfig) {
  const { activeWallet } = useSharedDependencies();

  return async (request: GetAllConversationsControllerRequest) => {
    const presenter = new PromiseResultPresenter<Conversation[], ConversationsDisabledError>();
    const gateway = new GetAllConversationsGateway(config.provider);
    const useCase = new GetAllConversations(activeWallet, gateway, presenter);

    await useCase.execute({
      profileId: request.profileId,
    });

    return presenter.asResult();
  };
}
