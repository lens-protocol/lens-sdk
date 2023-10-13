import { OnchainSetProfileMetadataRequest } from '@lens-protocol/api-bindings';
import {
  PendingSigningRequestError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';
import { invariant } from '@lens-protocol/shared-kernel';

import { SessionType, useSession } from '../authentication';
import { UseDeferredTask, useDeferredTask } from '../helpers/tasks';
import { AsyncTransactionResult } from './adapters/AsyncTransactionResult';
import { useSetProfileMetadataController } from './adapters/useSetProfileMetadataController';

export type UseSetProfileMetadataArgs = OnchainSetProfileMetadataRequest;

/**
 * Set a profile's metadata.
 *
 * You MUST be authenticated via {@link useLogin} to use this hook.
 *
 * @category Profiles
 * @group Hooks
 * @param args - {@link UseSetProfileMetadataArgs}
 */
export function useSetProfileMetadata(): UseDeferredTask<
  AsyncTransactionResult<void>,
  BroadcastingError | PendingSigningRequestError | UserRejectedError | WalletConnectionError,
  UseSetProfileMetadataArgs
> {
  const setProfileMetadata = useSetProfileMetadataController();
  const { data: session } = useSession();

  return useDeferredTask(async ({ metadataURI }: UseSetProfileMetadataArgs) => {
    invariant(
      session?.authenticated,
      'You must be authenticated to set profile metadata. Use `useLogin` hook to authenticate.',
    );
    invariant(
      session.type === SessionType.WithProfile,
      'You must have a profile to set profile metadata.',
    );

    return setProfileMetadata({
      kind: TransactionKind.UPDATE_PROFILE_DETAILS,
      delegate: session.profile.lensManager,
      metadataURI,
    });
  });
}
