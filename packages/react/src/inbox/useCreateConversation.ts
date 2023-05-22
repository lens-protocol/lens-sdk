import { UnspecifiedError } from '@lens-protocol/api-bindings';
import type {
  Conversation,
  ConversationsDisabledError,
  Participant,
} from '@lens-protocol/domain/entities';
import { Prettify, failure, success } from '@lens-protocol/shared-kernel';
import { useState } from 'react';

import { Operation, useOperation } from '../helpers/operations';
import { useActiveProfile } from '../profile';
import { useCreateConversationController } from './adapters/useCreateConversationController';
import type { InboxConfig } from './config';

export type UseCreateConversationsArgs = {
  config: InboxConfig;
  peer: Participant;
};

export type UseCreateConversationsResult = Prettify<
  Operation<Conversation, ConversationsDisabledError | UnspecifiedError> & {
    data: Conversation | undefined;
  }
>;

/**
 * @internal
 * @experimental
 */
export function useCreateConversation(
  args: UseCreateConversationsArgs,
): UseCreateConversationsResult {
  const { data: profile, error } = useActiveProfile();
  const execute = useCreateConversationController(args.config);
  const [dataResult, setDataResult] = useState<Conversation>();

  return {
    ...useOperation(async () => {
      if (error) {
        return failure(error);
      }

      if (!profile) {
        return failure(new UnspecifiedError(new Error('No profile found')));
      }

      const result = await execute({
        peer: args.peer,
        profileId: profile.id,
      });

      if (result.isSuccess()) {
        setDataResult(result.value);
        return success(result.value);
      }

      return failure(result.error);
    }),
    data: dataResult,
  };
}
