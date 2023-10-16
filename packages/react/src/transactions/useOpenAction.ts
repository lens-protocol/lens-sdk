import {
  AnyPublication,
  OpenActionParams,
  resolveOpenActionRequestFor,
} from '@lens-protocol/api-bindings';
import {
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/src/entities';
import { BroadcastingError } from '@lens-protocol/domain/src/use-cases/transactions/BroadcastingError';
import {
  InsufficientAllowanceError,
  InsufficientFundsError,
} from '@lens-protocol/domain/use-cases/wallets';
import { invariant } from '@lens-protocol/shared-kernel';

import { SessionType, useSession } from '../authentication';
import { useDeferredTask, UseDeferredTask } from '../helpers/tasks';
import { AsyncTransactionResult } from './adapters/AsyncTransactionResult';
import { useOpenActionController } from './adapters/useOpenActionController';

export { OpenActionKind } from '@lens-protocol/api-bindings';
export type {
  OpenActionParams,
  CollectParams,
  UnknownActionParams,
} from '@lens-protocol/api-bindings';

/**
 * Arguments for the `useOpenAction` hook.
 */
export type UseOpenActionArgs = {
  /**
   * The action to perform on the publication.
   */
  action: OpenActionParams;
};

/**
 * An object representing the result of an open action is finalized.
 *
 * It allows to wait for the action to be fully processed and indexed.
 */
export type OpenActionAsyncResult = AsyncTransactionResult<void>;

/**
 * Arguments for the `useOpenAction` hook callback.
 */
export type OpenActionArgs = {
  /**
   * The publication to perform the Open Action on.
   */
  publication: AnyPublication;
};

/**
 * `useOpenAction` is a React Hook that allows to perform an Open Action on a publication.
 *
 * You MUST be authenticated via {@link useLogin} to use this hook.
 *
 * @example
 * ```ts
 * const { execute, error, loading } = useOpenAction({
 *   action: {
 *     kind: OpenActionKind.COLLECT,
 *   }
 * });
 * ```
 *
 * ## Collect a publication
 *
 * You can use the `useOpenAction` hook to collect a publication.
 *
 * ```ts
 * const { execute, error, loading } = useOpenAction({
 *   action: {
 *     kind: OpenActionKind.COLLECT,
 *   }
 * });
 *
 * const collect = async (publication: AnyPublication) => {
 *   const result = await execute({ publication });
 * }
 * ```
 *
 * It supports seamlessly new collect Open Action modules as well as legacy collect modules.
 *
 * ## Failure scenarios
 *
 * You can handle possible failure scenarios by checking the `result` value.
 *
 * ```ts
 * const collect = async (publication: AnyPublication) => {
 *   const result = await execute({ publication });
 *
 *   if (result.isFailure()) {
 *     switch (result.error.constructor) {
 *       case BroadcastingError:
 *         console.log('There was an error broadcasting the transaction', error.message);
 *         break;
 *
 *       case PendingSigningRequestError:
 *         console.log(
 *           'There is a pending signing request in your wallet. ' +
 *             'Approve it or discard it and try again.'
 *         );
 *         break;
 *
 *       case InsufficientAllowanceError:
 *         const requestedAmount = result.error.requestedAmount;
 *         console.log(
 *           'You must approve the contract to spend at least: '+
 *             `${requestedAmount.asset.symbol} ${requestedAmount.toSignificantDigits(6)}`
 *         );
 *         break;
 *
 *       case InsufficientFundsError:
 *         const requestedAmount = result.error.requestedAmount;
 *         console.log(
 *           'You do not have enough funds to pay for this collect fee: '+
 *             `${requestedAmount.asset.symbol} ${requestedAmount.toSignificantDigits(6)}`
 *         );
 *         break;
 *
 *       case WalletConnectionError:
 *         console.log('There was an error connecting to your wallet', error.message);
 *         break;
 *
 *       case UserRejectedError:
 *         // the user decided to not sign, usually this is silently ignored by UIs
 *         break;
 *     }
 *     return;
 *   }
 * };
 * ```
 *
 * ## Wait for completion
 *
 * You can always wait the operation to be fully processed and indexed by Lens API.
 *
 * ```ts
 * const run = async (publication: AnyPublication) => {
 *   const result = await execute({ publication });
 *
 *   if (result.isFailure()) {
 *     // handle failure scenarios
 *     return;
 *   }
 *
 *   // this might take a while depending on the congestion of the network
 *   const completion = await result.value.waitForCompletion();
 *
 *   if (completion.isFailure()) {
 *     console.log('There was an processing the transaction', completion.error.message);
 *     return;
 *   }
 *
 *   console.log('Open action executed successfully');
 * };
 * ```
 *
 * ## Collect referrers
 *
 * When collecting a publication using the new SimpleCollectOpenAction or MultirecipientFeeCollectOpenAction
 * you can specify a list of referrer Publication and/or Profile IDs.
 *
 * ```ts
 * const { execute, error, loading } = useOpenAction({
 *   action: {
 *     kind: OpenActionKind.COLLECT,
 *     referrers: [
 *       publicationId,
 *       profileId,
 *     ],
 *   },
 * });
 * ```
 *
 * The referrers will split the referral reward of any collect fee paid by the collector.
 *
 * ## Custom Open Action
 *
 * You can use the `useOpenAction` hook to execute a custom Open Action.
 *
 * You must know the address of the Open Action module and the data required to execute it.
 *
 * ```ts
 * const { execute, error, loading } = useOpenAction({
 *   action: {
 *     kind: OpenActionKind.UNKNOWN,
 *     address: '0x...', // the address of the Open Action module
 *     data: '0x...', // any data needed to execute the Open Action
 *   }
 * });
 *
 * const collect = async (publication: AnyPublication) => {
 *   const result = await execute({ publication });
 *
 *   // ...
 * }
 * ```
 *
 * @category Publications
 * @group Hooks
 */
export function useOpenAction({
  action,
}: UseOpenActionArgs): UseDeferredTask<
  OpenActionAsyncResult,
  | BroadcastingError
  | InsufficientAllowanceError
  | InsufficientFundsError
  | PendingSigningRequestError
  | UserRejectedError
  | WalletConnectionError,
  OpenActionArgs
> {
  const { data: session } = useSession();
  const openAction = useOpenActionController();

  return useDeferredTask(async ({ publication }: OpenActionArgs) => {
    invariant(
      session?.authenticated,
      'You must be authenticated to execute an Open Action a post. Use `useLogin` hook to authenticate.',
    );
    invariant(
      session.type === SessionType.WithProfile,
      'You must have a profile to execute an Open Action.',
    );
    invariant(
      publication.momoka === null,
      'You cannot execute an Open Action on a Momoka publication.',
    );
    invariant(
      publication.momoka === null,
      'You cannot execute an Open Action on a Momoka publication.',
    );

    const request = resolveOpenActionRequestFor(publication, {
      action,
      delegate: session.profile.lensManager,
    });

    return openAction(request);
  });
}
