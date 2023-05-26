import {
  GetAllConversations,
  GetAllConversationsRequest,
} from '@lens-protocol/domain/use-cases/inbox';

import { InboxConfig } from '../config';
import { GetAllConversationsGateway } from './GetAllConversationsGateway';
import { GetAllConversationsPresenter } from './GetAllConversationsPresenter';

export function useGetAllConversationsController(config: InboxConfig) {
  return async (request: GetAllConversationsRequest) => {
    const gateway = new GetAllConversationsGateway(config.provider);
    const presenter = new GetAllConversationsPresenter();
    const useCase = new GetAllConversations(gateway, presenter);

    await useCase.execute(request);

    return presenter.asResult();
  };
}
