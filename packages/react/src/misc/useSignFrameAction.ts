import { CreateFrameEip712TypedData, FrameEip712Request } from '@lens-protocol/api-bindings';
import {
  PendingSigningRequestError,
  SignedFrameAction as SignedFrameActionEntity,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { Prettify, invariant, success } from '@lens-protocol/shared-kernel';

import { SessionType, useSession } from '../authentication';
import { UseDeferredTask, useDeferredTask } from '../helpers/tasks';
import { useSignFrameActionController } from './adapters/useSignFrameActionController';

export type SignFrameActionArgs = Prettify<
  Omit<FrameEip712Request, 'deadline'> & {
    deadline?: FrameEip712Request['deadline'];
  }
>;

export type SignedFrameAction = SignedFrameActionEntity<CreateFrameEip712TypedData>;

const DEFAULT_DEADLINE = 30 * 60 * 1000; // 30 minutes

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
      input: {
        ...args,
        deadline: args.deadline || new Date(Date.now() + DEFAULT_DEADLINE).getTime(),
      },
      signless: session.profile.signless,
    });

    if (result.isFailure()) {
      return result;
    }

    return success(result.value);
  });
}
