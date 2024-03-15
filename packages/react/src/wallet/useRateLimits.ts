import {
  UnspecifiedError,
  UserCurrentRateLimitRequest,
  UserCurrentRateLimitResult,
  useUserRateLimit,
} from '@lens-protocol/api-bindings';

import { NotFoundError } from '../NotFoundError';
import { useLensApolloClient } from '../helpers/arguments';
import { ReadResult, useReadResult } from '../helpers/reads';
import { useFragmentVariables } from '../helpers/variables';

/**
 * {@link useRateLimits} hook arguments
 */
export type UseRateLimitsArgs = UserCurrentRateLimitRequest;

/**
 * Fetch the current sponsored transaction limits for the requested address and profile.
 *
 * @example
 * ```ts
 * const { data, error, loading } = useRateLimits({
 *   userAddress: '0x1234567890123456789012345678901234567890',
 * });
 * ```
 *
 * @category Wallet
 * @group Hooks
 */
export function useRateLimits(
  args: UseRateLimitsArgs,
): ReadResult<UserCurrentRateLimitResult, NotFoundError | UnspecifiedError> {
  const { data, error, loading } = useReadResult(
    useUserRateLimit(
      useLensApolloClient({
        variables: useFragmentVariables({
          request: args,
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

  return {
    data,
    error: undefined,
    loading: false,
  };
}
