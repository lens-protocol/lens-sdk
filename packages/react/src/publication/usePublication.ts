import {
  AnyPublication,
  PublicationDocument,
  PublicationRequest,
  PublicationVariables,
  UnspecifiedError,
} from '@lens-protocol/api-bindings';
import { OneOf, invariant } from '@lens-protocol/shared-kernel';

import { NotFoundError } from '../NotFoundError';
import { useLensApolloClient } from '../helpers/arguments';
import { ReadResult } from '../helpers/reads';
import { SuspenseEnabled, SuspenseResultWithError, useSuspendableQuery } from '../helpers/suspense';
import { useFragmentVariables } from '../helpers/variables';

function publicationNotFound({ forId, forTxHash }: UsePublicationArgs) {
  return new NotFoundError(
    forId
      ? `Publication with id ${forId} was not found`
      : `Publication with txHash ${forTxHash ? forTxHash : ''} was not found`,
  );
}

export type { PublicationRequest };

/**
 * {@link usePublication} hook arguments
 */
export type UsePublicationArgs = OneOf<PublicationRequest>;

/**
 * {@link usePublication} hook arguments with Suspense support
 *
 * @experimental This API can change without notice
 */
export type UseSuspensePublicationArgs = SuspenseEnabled<UsePublicationArgs>;

export type UsePublicationResult =
  | ReadResult<AnyPublication, NotFoundError | UnspecifiedError>
  | SuspenseResultWithError<AnyPublication, NotFoundError>;

/**
 * Fetch a publication by either its publication id or transaction hash.
 *
 * ```ts
 * const { data, error, loading } = usePublication({
 *   forId: '0x04-0x0b',
 *   // OR
 *   forTxHash: '0xcd0655e8d1d131ebfc72fa5ebff6ed0430e6e39e729af1a81da3b6f33822a6ff',
 * });
 * ```
 *
 * @category Publications
 * @group Hooks
 *
 * @param args - {@link UsePublicationArgs}
 */
export function usePublication({
  forId,
  forTxHash,
}: UsePublicationArgs): ReadResult<AnyPublication, NotFoundError | UnspecifiedError>;

/**
 * Fetch a publication by either its publication id or transaction hash.
 *
 * This signature supports [React Suspense](https://react.dev/reference/react/Suspense).
 *
 * ```ts
 * const { data } = usePublication({
 *   forId: '0x04-0x0b',
 *   suspense: true,
 * });
 *
 * console.log(data.id);
 * ```
 *
 * @experimental This API can change without notice
 * @category Publications
 * @group Hooks
 */
export function usePublication(
  args: UseSuspensePublicationArgs,
): SuspenseResultWithError<AnyPublication, NotFoundError>;

export function usePublication({
  suspense = false,
  ...request
}: UsePublicationArgs & { suspense?: boolean }): UsePublicationResult {
  invariant(
    request.forId === undefined || request.forTxHash === undefined,
    "Only one of 'forId' or 'forTxHash' should be provided to 'usePublication' hook",
  );

  const result = useSuspendableQuery<AnyPublication | null, PublicationVariables>({
    suspense,
    query: PublicationDocument,
    options: useLensApolloClient({
      variables: useFragmentVariables({ request }),
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-first',
    }),
  });

  if (result.data === null) {
    return {
      data: undefined,
      error: publicationNotFound(request),
    };
  }

  return result as UsePublicationResult;
}
