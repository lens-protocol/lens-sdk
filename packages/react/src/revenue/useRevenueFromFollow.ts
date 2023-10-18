import {
  FollowRevenueRequest,
  RevenueAggregate,
  useFollowRevenues,
} from '@lens-protocol/api-bindings';

import { useLensApolloClient } from '../helpers/arguments';
import { ReadResult, useReadResult } from '../helpers/reads';

/**
 * {@link useRevenueFromFollow} hook arguments
 */
export type UseRevenueFromFollowArgs = FollowRevenueRequest;

/**
 * Fetch a revenue from all follow actions.
 *
 * @category Revenue
 * @group Hooks
 */
export function useRevenueFromFollow(
  args: UseRevenueFromFollowArgs,
): ReadResult<RevenueAggregate[]> {
  const { data, error, loading } = useReadResult(
    useFollowRevenues(
      useLensApolloClient({
        variables: {
          request: args,
        },
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
      error: error,
      loading: false,
    };
  }

  return {
    data: data.revenues,
    error: undefined,
    loading: false,
  };
}
