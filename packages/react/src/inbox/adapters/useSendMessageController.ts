import {
  ConversationId,
  ConversationNotFoundError,
  ConversationsDisabledError,
  Markdown,
  Message,
  ProfileId,
} from '@lens-protocol/domain/entities';
import { SendMessage } from '@lens-protocol/domain/use-cases/inbox';

import { useSharedDependencies } from '../../shared';
import { PromiseResultPresenter } from '../../transactions/adapters/PromiseResultPresenter';
import { InboxConfig } from '../config';
import { SendMessageGateway } from './SendMessageGateway';

export type SendMessageControllerRequest = {
  conversationId: ConversationId;
  content: Markdown;
  profileId?: ProfileId;
};

export function useSendMessageController(config: InboxConfig) {
  const { activeWallet } = useSharedDependencies();

  return async (request: SendMessageControllerRequest) => {
    const presenter = new PromiseResultPresenter<
      Message,
      ConversationsDisabledError | ConversationNotFoundError
    >();
    const gateway = new SendMessageGateway(config.provider);
    const useCase = new SendMessage(activeWallet, gateway, presenter);

    await useCase.execute(request);

    return presenter.asResult();
  };
}
