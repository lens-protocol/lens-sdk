import { Mirror } from '@lens-protocol/api-bindings';
import {
  InsufficientGasError,
  PendingSigningRequestError,
  PublicationId,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { Referrers } from '@lens-protocol/domain/use-cases/publications';
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';
import { invariant } from '@lens-protocol/shared-kernel';

import { SessionType, useSession } from '../../authentication';
import { useDeferredTask, UseDeferredTask } from '../../helpers/tasks';
import { AsyncTransactionResult } from '../adapters/AsyncTransactionResult';
import { createMirrorRequest } from '../adapters/schemas/builders';
import { useCreateMirrorController } from '../adapters/useCreateMirrorController';
import { useExecutionMode } from './useExecutionMode';

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
  /**
   * Use this if the mirrored publication is configured with an Unknown Reference Module
   * that requires a calldata to process the reference logic.
   *
   * It's consumer responsibility to encode it correctly.
   */
  mirrorOnReferenceData?: string;
  /**
   * The referrers list for any Unknown Reference Module logic.
   *
   * It can be a list of Publication IDs or Profile IDs.
   */
  referrers?: Referrers;
  /**
   * Whether the transaction costs should be sponsored by the Lens API or
   * should be paid by the authenticated wallet.
   *
   * There are scenarios where the sponsorship will be denied regardless of this value.
   * See {@link BroadcastingError} with:
   * - {@link BroadcastingErrorReason.NOT_SPONSORED} - the profile is not sponsored
   * - {@link BroadcastingErrorReason.RATE_LIMITED} - the profile reached the rate limit
   * - {@link BroadcastingErrorReason.APP_NOT_ALLOWED} - the app is not whitelisted for gasless transactions
   *
   * If not specified, or `true`, the hook will attempt a Sponsored Transaction.
   * Set it to `false` to force it to use a Self-Funded Transaction.
   */
  sponsored?: boolean;
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
 * in case of on-chain TX, this is not necessarily mined and indexed (yet). See the following section.
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
 * ## Self-funded approach
 *
 * In case you want to pay for the transaction gas costs yourself, you can do so by setting the
 * `sponsored` parameter to `false`:
 *
 * ```ts
 * const mirror = async (publicationId: PublicationId) => {
 *   const result = await execute({
 *     mirrorOn: publicationId,
 *     sponsored: false,
 *   });
 *
 *   if (result.isFailure()) {
 *     switch (result.error.name) {
 *       case 'InsufficientGasError':
 *         console.log('You do not have enough funds to pay for the transaction cost.');
 *         break;
 *
 *       // ...
 *     }
 *     return;
 *   }
 *
 *   // ...
 * }
 * ```
 *
 * The example above shows how to detect when the user does not have enough funds to pay for the transaction cost.
 *
 * ## Self-funded fallback
 *
 * If for some reason the Lens API cannot sponsor the transaction, the hook will fail with a {@link BroadcastingError} with one of the following reasons:
 * - {@link BroadcastingErrorReason.NOT_SPONSORED} - the profile is not sponsored
 * - {@link BroadcastingErrorReason.RATE_LIMITED} - the profile reached the rate limit
 * - {@link BroadcastingErrorReason.APP_NOT_ALLOWED} - the app is not whitelisted for gasless transactions
 *
 * In those cases you can retry the transaction as self-funded like in the following example:
 *
 * ```ts
 * const mirror = async (publicationId: PublicationId) => {
 *   const sponsoredResult = await execute({
 *     mirrorOn: publicationId,
 *     sponsored: false,
 *   });
 *
 *   if (sponsoredResult.isFailure()) {
 *     switch (sponsoredResult.error.name) {
 *       case 'BroadcastingError':
 *         if ([BroadcastingErrorReason.NOT_SPONSORED, BroadcastingErrorReason.RATE_LIMITED].includes(sponsoredResult.error.reason)) {
 *
 *           const chargedResult = = await execute({
 *             mirrorOn: publicationId,
 *             sponsored: false,
 *           });
 *
 *           // continue with chargedResult as in the previous example
 *         }
 *         break;
 *
 *      // ...
 *   }
 * }
 * ```
 *
 * We omitted the handling of the {@link BroadcastingErrorReason.APP_NOT_ALLOWED} error because it's usually
 * something that builder will face when deploying their app to production using the Production Lens API.
 *
 * It just requires the app to apply for whitelisting. See https://docs.lens.xyz/docs/gasless-and-signless#whitelisting-your-app.
 *
 *
 * @category Publications
 * @group Hooks
 */
export function useCreateMirror(): UseDeferredTask<
  MirrorAsyncResult,
  | BroadcastingError
  | InsufficientGasError
  | PendingSigningRequestError
  | UserRejectedError
  | WalletConnectionError,
  CreateMirrorArgs
> {
  const { data: session } = useSession();
  const createMirror = useCreateMirrorController();
  const resolveExecutionMode = useExecutionMode();

  return useDeferredTask(async (args: CreateMirrorArgs) => {
    invariant(
      session?.type === SessionType.WithProfile,
      'You must be authenticated with a Profile to mirror. Use `useLogin` hook to authenticate.',
    );

    const mode = await resolveExecutionMode({
      author: session.profile,
      referencedPublicationId: args.mirrorOn,
      sponsored: args.sponsored,
    });

    const request = createMirrorRequest({
      ...args,
      ...mode,
    });

    return createMirror(request);
  });
}
