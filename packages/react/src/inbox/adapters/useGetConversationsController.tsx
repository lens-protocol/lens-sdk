import {
  GetAllConversations,
  GetAllConversationsRequest,
} from '@lens-protocol/domain/use-cases/inbox';

import { InboxConfig } from '../config';
import { GetConversationsGateway } from './GetConversationsGateway';
import { GetConversationsPresenter } from './GetConversationsPresenter';

export function useGetConversationsController(config: InboxConfig) {
  return async (request: GetAllConversationsRequest) => {
    const gateway = new GetConversationsGateway(config.provider);
    const presenter = new GetConversationsPresenter();
    const useCase = new GetAllConversations(gateway, presenter);

    await useCase.execute(request);

    return presenter.asResult();
  };
}
