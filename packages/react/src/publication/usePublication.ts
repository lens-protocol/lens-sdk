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
import {
  ReadResult,
  SuspenseEnabled,
  SuspenseResultWithError,
  useSuspendableQuery,
} from '../helpers/reads';
import { useFragmentVariables } from '../helpers/variables';

// function isValidPublicationId(id: string) {
//   return id.includes('-');
// }

function publicationNotFound({ forId, forTxHash }: UsePublicationArgs<boolean>) {
  return new NotFoundError(
    forId
      ? `Publication with id ${forId} was not found`
      : `Publication with txHash ${forTxHash ? forTxHash : ''} was not found`,
  );
}

/**
 * {@link usePublication} hook arguments
 */
export type UsePublicationArgs<TSuspense extends boolean = never> = OneOf<PublicationRequest> &
  SuspenseEnabled<TSuspense>;

export type UsePublicationResult =
  | ReadResult<AnyPublication, NotFoundError | UnspecifiedError>
  | SuspenseResultWithError<AnyPublication, NotFoundError>;

/**
 * Fetch a publication by either its publication id or transaction hash.
 *
 * @example
 * ```tsx
 * const { data, error, loading } = usePublication({
 *   forId: '0x04-0x0b',
 * });
 * ```
 *
 * ## Basic Usage
 *
 * Get Publication by Id:
 *
 * ```ts
 * const { data, error, loading } = usePublication({
 *   forId: '0x04-0x0b',
 * });
 * ```
 *
 * Get Publication by Transaction Hash:
 *
 * ```ts
 * const { data, error, loading } = usePublication({
 *   forTxHash: '0xcd0655e8d1d131ebfc72fa5ebff6ed0430e6e39e729af1a81da3b6f33822a6ff',
 * });
 * ```
 *
 * ## Suspense Enabled
 *
 * You can enable suspense mode to suspend the component until the session data is available.
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
 * @category Publications
 * @group Hooks
 *
 * @param args - {@link UsePublicationArgs}
 */
export function usePublication({
  forId,
  forTxHash,
}: UsePublicationArgs<never>): ReadResult<AnyPublication, NotFoundError | UnspecifiedError>;
export function usePublication(
  args: UsePublicationArgs<true>,
): SuspenseResultWithError<AnyPublication, NotFoundError>;
export function usePublication({
  suspense = false,
  ...request
}: UsePublicationArgs<boolean>): UsePublicationResult {
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

  // if (request.forId && !isValidPublicationId(request.forId)) {
  //   return {
  //     data: undefined,
  //     error: publicationNotFound(request),
  //   };
  // }

  if (result.data === null) {
    return {
      data: undefined,
      error: publicationNotFound(request),
    };
  }

  return result as UsePublicationResult;
}
