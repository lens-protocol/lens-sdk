import {
  PendingSigningRequestError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { UpdateDispatcherConfigRequest } from '@lens-protocol/domain/use-cases/profile';
import { useState } from 'react';

import { ProfileFieldsFragment } from '../profile';
import { TransactionState, useHasPendingTransaction } from './adapters/TransactionQueuePresenter';
import { useUpdateDispatcherConfigController } from './adapters/useUpdateDispatcherConfigController';

export type UseUpdateDispatcherConfigArgs = {
  profile: ProfileFieldsFragment;
};

export type UseUpdateDispatcherConfigParams = {
  enabled: boolean;
};

export function useUpdateDispatcherConfig({ profile }: UseUpdateDispatcherConfigArgs) {
  const [error, setError] = useState<
    PendingSigningRequestError | UserRejectedError | WalletConnectionError | null
  >(null);

  // note: this is one of the hooks that we need to wait for tx to be mined
  // as it's affecting the way how we handle all tx after this one is done
  const isPending = useHasPendingTransaction(
    (tx): tx is TransactionState<UpdateDispatcherConfigRequest> =>
      tx.request.kind === TransactionKind.UPDATE_DISPATCHER_CONFIG &&
      tx.request.profileId === profile.id,
  );

  const update = useUpdateDispatcherConfigController();

  return {
    update: async ({ enabled }: UseUpdateDispatcherConfigParams) => {
      setError(null);

      const result = await update({
        enabled,
        profileId: profile.id,
      });

      if (result.isFailure()) {
        setError(result.error);
      }
    },
    error,
    isPending,
  };
}
