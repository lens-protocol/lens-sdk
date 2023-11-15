import { Mirror } from '@lens-protocol/api-bindings';
import {
  PendingSigningRequestError,
  PublicationId,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';
import { invariant } from '@lens-protocol/shared-kernel';

import { SessionType, useSession } from '../authentication';
import { useDeferredTask, UseDeferredTask } from '../helpers/tasks';
import { AsyncTransactionResult } from './adapters/AsyncTransactionResult';
import { createMirrorRequest } from './adapters/schemas/builders';
import { useCreateMirrorController } from './adapters/useCreateMirrorController';

/**
 * An object representing the result of a mirror creation.
 *
 * It allows to wait for the mirror to be fully processed and indexed.
 */
export type MirrorAsyncResult = AsyncTransactionResult<Mirror>;

/**
 * Mirror a publication.
 */
export type CreateMirrorArgs = {
  /**
   * The publication ID to mirror.
   */
  mirrorOn: PublicationId;
};

/**
 * `useCreateMirror` is React Hook that allows you to mirror a Lens publication.
 *
 * You MUST be authenticated via {@link useLogin} to use this hook.
 *
 * @example
 * ```ts
 * const { execute, error, loading } = useCreateMirror();
 * ```
 *
 * ## Basic usage
 *
 * ```tsx
 * const { execute, error, loading } = useCreateMirror();
 *
 * const mirror = () => {
 *   const result = await execute({
 *     mirrorOn: publicationId, // the publication ID to mirror
 *   });
 * }
 * ```
 *
 * ## Failure scenarios
 *
 * You can handle possible failure scenarios by checking the `result` value.
 *
 * ```tsx
 * const { execute, error, loading } = useCreateMirror();
 *
 * const mirror = async () => {
 *   const result = await execute({
 *     mirrorOn: publicationId,
 *   });
 *
 *   if (result.isFailure()) {
 *     switch (result.error.name) {
 *       case 'BroadcastingError':
 *         console.log('There was an error broadcasting the transaction', error.message);
 *         break;
 *
 *       case 'PendingSigningRequestError':
 *         console.log(
 *           'There is a pending signing request in your wallet. ' +
 *             'Approve it or discard it and try again.'
 *         );
 *         break;
 *
 *       case 'WalletConnectionError':
 *         console.log('There was an error connecting to your wallet', error.message);
 *         break;
 *
 *       case 'UserRejectedError':
 *         // the user decided to not sign, usually this is silently ignored by UIs
 *         break;
 *     }
 *     return;
 *   }
 * };
 * ```
 * At this point the mirror creation is completed from an end-user perspective but,
 * in case of on-chain TX, this not necessarily mined and indexed. See the following section.
 *
 * ## Wait for completion
 *
 * In case of successful submission, the `result` value can be used to wait for the mirror to be fully processed.
 *
 * This gives you an opportunity to decide what UX to provide to the end-user.
 *
 * For example if the mirror is on-chain it might take a while to be mined and indexed. So you might want to show a loading indicator or
 * let the user navigate away from the page.
 *
 * ```tsx
 * const { execute, error, loading } = useCreateMirror();
 *
 * const mirror = async () => {
 *   const result = await execute({
 *     mirrorOn: publicationId,
 *   });
 *
 *   if (result.isFailure()) {
 *     // handle failure scenarios
 *     return;
 *   }
 *
 *   // this might take a while, depends on the type of tx (on-chain or Momoka)
 *   // and the congestion of the network
 *   const completion = await result.value.waitForCompletion();
 *
 *   if (completion.isFailure()) {
 *     console.log('There was an processing the transaction', completion.error.message);
 *     return;
 *   }
 *
 *   // the mirror is now ready to be used
 *   const mirror = completion.value;
 *   console.log('Mirror created', mirror);
 * };
 * ```
 *
 * @category Publications
 * @group Hooks
 */
export function useCreateMirror(): UseDeferredTask<
  MirrorAsyncResult,
  BroadcastingError | PendingSigningRequestError | UserRejectedError | WalletConnectionError,
  CreateMirrorArgs
> {
  const { data: session } = useSession();
  const createMirror = useCreateMirrorController();

  return useDeferredTask(async (args: CreateMirrorArgs) => {
    invariant(
      session?.authenticated,
      'You must be authenticated to create a mirror. Use `useLogin` hook to authenticate.',
    );
    invariant(
      session.type === SessionType.WithProfile,
      'You must have a profile to create a mirror.',
    );

    const request = createMirrorRequest({
      signless: session.profile.signless,
      ...args,
    });

    return createMirror(request);
  });
}
