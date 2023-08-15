import {
  InsufficientGasError,
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import {
  BroadcastingError,
  ProtocolTransactionRequest,
} from '@lens-protocol/domain/use-cases/transactions';
import { IEquatableError } from '@lens-protocol/shared-kernel';

import { Operation, useOperation } from '../helpers/operations';
import { AsyncTransactionResult } from './adapters/AsyncTransactionResult';
import { SelfFundedProtocolTransactionRequest } from './adapters/SelfFundedProtocolTransactionRequest';
import { usePayTransactionController } from './adapters/usePayTransactionController';

/**
 * An opaque data structure that encapsulates the data required to make a self-funded protocol call.
 *
 * @internal
 * @privateRemarks Ensure SelfFundedProtocolTransactionRequest is also excluded from the generated docs.
 */
export type SelfFundedOperationRequest =
  SelfFundedProtocolTransactionRequest<ProtocolTransactionRequest>;

export interface ISelfFundedFallback {
  /**
   * The fallback request to be executed if the original request fails.
   *
   * See {@link useSelfFundedFallback} for more information.
   */
  fallback: SelfFundedOperationRequest;
}

/**
 * Given a {@link BroadcastingError}, returns true if it implements the {@link ISelfFundedFallback} interface.
 *
 */
export function supportsSelfFundedFallback(
  error: IEquatableError,
): error is BroadcastingError & ISelfFundedFallback {
  return error instanceof BroadcastingError && error.fallback !== undefined;
}

export type SelfFundedOperation = Operation<
  AsyncTransactionResult<void>,
  InsufficientGasError | PendingSigningRequestError | UserRejectedError | WalletConnectionError,
  [SelfFundedOperationRequest]
>;

/**
 * `useSelfFundedFallback` is an hook that let you retry a failed operation that could be self-funded.
 *
 * @category Misc
 * @group Hooks
 *
 * @example
 * ```tsx
 * import { ContentFocus, ProfileOwnedByMe, supportsSelfFundedFallback, useCreatePost, useSelfFundedFallback } from '@lens-protocol/react-web';
 *
 * function PostComposer({ publisher }: { publisher: ProfileOwnedByMe }) {
 *   const { execute: createPost, error, isPending } = useCreatePost({ publisher, upload: uploadToIpfs });
 *   const { execute: createPostFromWallet, error: selfFundedError, isPending: selfFundedPending } = useSelfFundedFallback();
 *
 *   const submit = async (content: string) => {
 *     const result = await createPost({
 *       content,
 *       contentFocus: ContentFocus.TEXT_ONLY,
 *       locale: 'en',
 *     });
 *
 *     if (result.isFailure()) {
 *       if (supportsSelfFundedFallback(result.error)) {
 *         await createPostFromWallet(result.error.fallback)
 *       }
 *     }
 *
 *     // ...
 *   };
 *
 *   // continues with your UI/form that invokes the submit(content) handler above
 * }
 * ```
 */
export function useSelfFundedFallback(): SelfFundedOperation {
  const payTransaction = usePayTransactionController();

  return useOperation(payTransaction);
}
