import {
  AnyPublication,
  PublicationRequest,
  UnspecifiedError,
  usePublication as usePublicationHook,
} from '@lens-protocol/api-bindings';
import { OneOf, invariant } from '@lens-protocol/shared-kernel';

import { NotFoundError } from '../NotFoundError';
import {
  useLensApolloClient,
  useMediaTransformFromConfig,
  useProfileStatsArgFromConfig,
} from '../helpers/arguments';
import { ReadResult, useReadResult } from '../helpers/reads';

/**
 * {@link usePublication} hook arguments
 */
export type UsePublicationArgs = OneOf<PublicationRequest>;

/**
 * Fetch a publication by either it's publicationId or transaction hash.
 *
 * @category Publications
 * @group Hooks
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
        variables: useMediaTransformFromConfig(
          useProfileStatsArgFromConfig({
            request: {
              forId,
              forTxHash,
            },
          }),
        ),
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
          ? `Publication with id: ${forId}`
          : `Publication with txHash: ${forTxHash ? forTxHash : ''}`,
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
