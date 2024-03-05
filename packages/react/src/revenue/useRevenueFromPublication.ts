import {
  UnspecifiedError,
  RevenueFromPublicationRequest,
  useRevenueFromPublication as useRevenueFromPublicationHook,
  PublicationRevenue,
} from '@lens-protocol/api-bindings';

import { NotFoundError } from '../NotFoundError';
import { useLensApolloClient } from '../helpers/arguments';
import { ReadResult, useReadResult } from '../helpers/reads';
import { useFragmentVariables } from '../helpers/variables';

/**
 * {@link useRevenueFromPublication} hook arguments
 */
export type UseRevenueFromPublicationArgs = RevenueFromPublicationRequest;

/**
 * Fetch a profile's revenue from a single publication.
 *
 * @example
 * ```tsx
 * const { data, error, loading } = useRevenueFromPublication({
 *   for: '0x04-0x0b',
 * });
 * ```
 *
 * @category Revenue
 * @group Hooks
 */
export function useRevenueFromPublication(
  args: UseRevenueFromPublicationArgs,
): ReadResult<PublicationRevenue, NotFoundError | UnspecifiedError> {
  const { data, error, loading } = useReadResult(
    useRevenueFromPublicationHook(
      useLensApolloClient({
        variables: useFragmentVariables({
          request: args,
          statsFor: args.publishedOn,
        }),
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
      error: new NotFoundError(`Publication with id: ${args.for}`),
      loading: false,
    };
  }

  return {
    data,
    error: undefined,
    loading: false,
  };
}
