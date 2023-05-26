import {
  EnableConversations,
  EnableConversationsRequest,
} from '@lens-protocol/domain/use-cases/inbox';

import { useSharedDependencies } from '../../shared';
import { InboxConfig } from '../config';
import { EnableConversationsGateway } from './EnableConversationsGateway';
import { EnableConversationsPresenter } from './EnableConversationsPresenter';

export function useEnableConversationsController(config: InboxConfig) {
  const { activeWallet } = useSharedDependencies();

  return async (request: EnableConversationsRequest) => {
    const gateway = new EnableConversationsGateway(config.provider);
    const presenter = new EnableConversationsPresenter();
    const useCase = new EnableConversations(activeWallet, gateway, presenter);

    await useCase.execute(request);

    return presenter.asResult();
  };
}
