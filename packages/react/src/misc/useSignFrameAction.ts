import {
  CreateFrameEip712TypedData,
  FrameLensManagerEip712Request,
} from '@lens-protocol/api-bindings';
import {
  PendingSigningRequestError,
  SignedFrameAction as SignedFrameActionEntity,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { invariant, success } from '@lens-protocol/shared-kernel';

import { SessionType, useSession } from '../authentication';
import { UseDeferredTask, useDeferredTask } from '../helpers/tasks';
import { useSignFrameActionController } from './adapters/useSignFrameActionController';

export type SignFrameActionArgs = FrameLensManagerEip712Request;

export type SignedFrameAction = SignedFrameActionEntity<CreateFrameEip712TypedData>;

/**
 * Sign a Frame action to be verified by a Frame server.
 *
 * You MUST be authenticated via {@link useLogin} to use this hook.
 *
 * @category Misc
 * @group Hooks
 */
export function useSignFrameAction(): UseDeferredTask<
  SignedFrameAction,
  PendingSigningRequestError | UserRejectedError | WalletConnectionError,
  SignFrameActionArgs
> {
  const { data: session } = useSession();
  const sign = useSignFrameActionController();

  return useDeferredTask(async (args) => {
    invariant(
      session?.type === SessionType.WithProfile,
      'You must be authenticated with a profile. Use `useLogin` hook to authenticate.',
    );

    const result = await sign({
      input: args,
      signless: session.profile.signless,
    });

    if (result.isFailure()) {
      return result;
    }

    return success(result.value);
  });
}
