import { UnspecifiedError } from '@lens-protocol/api-bindings';
import type {
  Participant,
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { Prettify, failure, success } from '@lens-protocol/shared-kernel';
import { useState } from 'react';

import { Operation, useOperation } from '../helpers/operations';
import { useActiveProfile } from '../profile';
import { useEnableConversationsController } from './adapters/useEnableConversationsController';
import type { InboxConfig } from './config';

// TODO return ConversationProviderInstance
export type ConversationParticipant = Participant & {
  // TODO: Add something unique?
};

export type UseEnableConversationsArgs = {
  config: InboxConfig;
};

export type UseEnableConversationsResult = Prettify<
  Operation<
    ConversationParticipant,
    PendingSigningRequestError | UserRejectedError | WalletConnectionError | UnspecifiedError
  > & {
    data: ConversationParticipant | undefined;
  }
>;

/**
 * @internal
 * @experimental
 */
export function useEnableConversations(
  args: UseEnableConversationsArgs,
): UseEnableConversationsResult {
  const { data: profile, error } = useActiveProfile();
  const execute = useEnableConversationsController(args.config);
  const [participant, setParticipant] = useState<ConversationParticipant>();

  return {
    ...useOperation(async () => {
      if (error) {
        return failure(error);
      }

      if (!profile) {
        return failure(new UnspecifiedError(new Error('No profile found')));
      }

      const result = await execute({
        profileId: profile.id,
      });

      if (result.isSuccess()) {
        setParticipant(result.value);
        return success(result.value);
      }

      return result;
    }),
    data: participant,
  };
}
