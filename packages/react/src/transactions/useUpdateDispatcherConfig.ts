import {
  ProfileOwnedByMe,
  TransactionState,
  useHasPendingTransaction,
} from '@lens-protocol/api-bindings';
import {
  PendingSigningRequestError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { UpdateDispatcherConfigRequest } from '@lens-protocol/domain/use-cases/profile';

import { Operation, useOperation } from '../helpers/operations';
import { useUpdateDispatcherConfigController } from './adapters/useUpdateDispatcherConfigController';

export type UseUpdateDispatcherConfigArgs = {
  profile: ProfileOwnedByMe;
};

export type UpdateDispatcherConfigArgs = {
  enabled: boolean;
};

export type UpdateDispatcherConfigOperation = Operation<
  void,
  PendingSigningRequestError | UserRejectedError | WalletConnectionError,
  [UpdateDispatcherConfigArgs]
>;

export function useUpdateDispatcherConfig({
  profile,
}: UseUpdateDispatcherConfigArgs): UpdateDispatcherConfigOperation {
  // note: this is one of the hooks for which we need to wait for the corresponding tx to be mined
  // as it's affecting the way we would handle all tx after this one is done.
  const hasPendingUpdateTransaction = useHasPendingTransaction(
    (tx): tx is TransactionState<UpdateDispatcherConfigRequest> =>
      tx.request.kind === TransactionKind.UPDATE_DISPATCHER_CONFIG &&
      tx.request.profileId === profile.id,
  );
  const update = useUpdateDispatcherConfigController();

  const { execute, error, isPending } = useOperation(
    async ({ enabled }: UpdateDispatcherConfigArgs) =>
      update({
        enabled,
        profileId: profile.id,
      }),
  );

  return {
    execute,
    error,
    isPending: isPending || hasPendingUpdateTransaction,
  };
}
