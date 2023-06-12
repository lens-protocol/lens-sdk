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

export type ConversationsEnabled = {
  config: InboxConfig;
  participant: Participant;
};

export type UseEnableConversationsArgs = {
  config: InboxConfig;
};

export type UseEnableConversationsResult = Prettify<
  Operation<
    ConversationsEnabled,
    PendingSigningRequestError | UserRejectedError | WalletConnectionError | UnspecifiedError
  > & {
    data: ConversationsEnabled | undefined;
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
  const [dataResult, setDataResult] = useState<ConversationsEnabled>();

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
        setDataResult({
          participant: result.value,
          config: args.config,
        });
        return success({
          participant: result.value,
          config: args.config,
        });
      }

      return failure(result.error);
    }),
    data: dataResult,
  };
}
