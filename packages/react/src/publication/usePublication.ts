import {
  AnyPublication,
  PublicationRequest,
  UnspecifiedError,
  usePublication as usePublicationHook,
} from '@lens-protocol/api-bindings';
import { OneOf, invariant } from '@lens-protocol/shared-kernel';

import { NotFoundError } from '../NotFoundError';
import { useLensApolloClient } from '../helpers/arguments';
import { ReadResult, useReadResult } from '../helpers/reads';

/**
 * {@link usePublication} hook arguments
 */
export type UsePublicationArgs = OneOf<PublicationRequest>;

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
 * @category Publications
 * @group Hooks
 * @param args - {@link UsePublicationArgs}
 */
export function usePublication({
  forId,
  forTxHash,
}: UsePublicationArgs): ReadResult<AnyPublication, NotFoundError | UnspecifiedError> {
  invariant(
    forId === undefined || forTxHash === undefined,
    "Only one of 'forId' or 'forTxHash' should be provided to 'usePublication' hook",
  );

  const { data, error, loading } = useReadResult(
    usePublicationHook(
      useLensApolloClient({
        variables: {
          request: {
            ...(forId && { forId }),
            ...(forTxHash && { forTxHash }),
          },
        },
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
      }),
    ),
  );

  if (loading) {
    return {
      data: undefined,
      error: undefined,
      loading: true,
    };
  }

  if (error) {
    return {
      data: undefined,
      error,
      loading: false,
    };
  }

  if (data === null) {
    return {
      data: undefined,
      error: new NotFoundError(
        forId
          ? `Publication with id ${forId} was not found`
          : `Publication with txHash ${forTxHash ? forTxHash : ''} was not found`,
      ),
      loading: false,
    };
  }

  return {
    data,
    error: undefined,
    loading: false,
  };
}
