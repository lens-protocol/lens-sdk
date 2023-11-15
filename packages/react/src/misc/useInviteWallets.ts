import {
  InviteWalletsRequest,
  WalletAlreadyInvitedError,
} from '@lens-protocol/domain/use-cases/wallets';
import { invariant, success } from '@lens-protocol/shared-kernel';

import { useSession } from '../authentication';
import { UseDeferredTask, useDeferredTask } from '../helpers/tasks';
import { useInviteWalletsController } from './adapters/useInviteWalletsController';

export type InviteArgs = InviteWalletsRequest;

/**
 * Invite one or many wallet addresses to join Lens Protocol.
 *
 * You MUST be authenticated via {@link useLogin} to use this hook.
 *
 * @example
 * ```tsx
 * const { called, loading, data, error, execute: invite } = useInviteWallets();
 *
 * invite({
 *   wallets: ['0x1234567890123456789012345678901234567890'],
 * })
 * ```
 *
 * @category Misc
 * @group Hooks
 */
export function useInviteWallets(): UseDeferredTask<void, WalletAlreadyInvitedError, InviteArgs> {
  const { data: session } = useSession();
  const invite = useInviteWalletsController();

  return useDeferredTask(async (args) => {
    invariant(
      session?.authenticated,
      'You must be authenticated to use this operation. Use `useLogin` hook to authenticate.',
    );

    const result = await invite(args);

    if (result.isFailure()) {
      return result;
    }

    return success();
  });
}
