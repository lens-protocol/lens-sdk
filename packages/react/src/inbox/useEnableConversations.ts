import type {
  PendingSigningRequestError,
  ProfileId,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { EthereumAddress, invariant } from '@lens-protocol/shared-kernel';
import { useEffect, useState } from 'react';

import type { ReadResult } from '../helpers/reads';
import { useEnableConversationsController } from './adapters/useEnableConversationsController';
import type { InboxConfig } from './config';

export type ConversationParticipant = {
  profileId?: ProfileId;
  address: EthereumAddress;
  // TODO: Add something unique?
};

export type UseEnableConversationsArgs = {
  profileId?: ProfileId;
  address: EthereumAddress;
  config: InboxConfig;
};

/**
 * @internal
 * @experimental
 */
export function useEnableConversations(
  args: UseEnableConversationsArgs,
): ReadResult<
  ConversationParticipant,
  PendingSigningRequestError | UserRejectedError | WalletConnectionError
> {
  const execute = useEnableConversationsController(args.config);

  const [data, setData] = useState<ConversationParticipant>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<
    PendingSigningRequestError | UserRejectedError | WalletConnectionError
  >();

  useEffect(() => {
    void (async () => {
      setLoading(true);
      setError(undefined);

      const result = await execute({
        profileId: args.profileId,
        address: args.address,
      });

      if (result.isFailure()) {
        setError(result.error);
      }

      if (result.isSuccess()) {
        setData({
          profileId: args.profileId,
          address: args.address,
        });
      }

      setLoading(false);
    })();
  }, [args, execute]);

  if (loading) {
    return {
      data: undefined,
      error: undefined,
      loading: true,
    };
  }

  if (error) {
    return {
      data: undefined,
      error,
      loading: false,
    };
  }

  invariant(data, 'Data should be defined');

  return {
    data,
    error: undefined,
    loading: false,
  };
}
