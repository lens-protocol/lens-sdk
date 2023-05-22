import {
  Participant,
  PendingSigningRequestError,
  ProfileId,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { EnableConversations } from '@lens-protocol/domain/use-cases/inbox';

import { useSharedDependencies } from '../../shared';
import { PromiseResultPresenter } from '../../transactions/adapters/PromiseResultPresenter';
import { InboxConfig } from '../config';
import { EnableConversationsGateway } from './EnableConversationsGateway';

export type EnableConversationsControllerRequest = {
  profileId?: ProfileId;
};

export function useEnableConversationsController(config: InboxConfig) {
  const { activeWallet } = useSharedDependencies();

  return async (request: EnableConversationsControllerRequest) => {
    const presenter = new PromiseResultPresenter<
      Participant,
      PendingSigningRequestError | UserRejectedError | WalletConnectionError
    >();
    const gateway = new EnableConversationsGateway(config.provider);
    const useCase = new EnableConversations(activeWallet, gateway, presenter);

    void useCase.execute({
      profileId: request.profileId,
    });

    return presenter.asResult();
  };
}
