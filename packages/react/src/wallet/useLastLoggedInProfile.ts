import {
  LastLoggedInProfileRequest,
  Profile,
  UnspecifiedError,
  useLastLoggedInProfile as useLastLoggedInProfileHook,
} from '@lens-protocol/api-bindings';

import { NotFoundError } from '../NotFoundError';
import { useLensApolloClient } from '../helpers/arguments';
import { ReadResult, useReadResult } from '../helpers/reads';
import { useFragmentVariables } from '../helpers/variables';

/**
 * {@link useLastLoggedInProfile} hook arguments
 */
export type UseLastLoggedInProfileArgs = LastLoggedInProfileRequest;

/**
 * Fetch the last logged in profile for a wallet address.
 *
 * @example
 * ```ts
 * const { data, error, loading } = useLastLoggedInProfile({
 *   for: '0x1234567890123456789012345678901234567890',
 * });
 * ```
 *
 * @category Wallet
 * @group Hooks
 */
export function useLastLoggedInProfile(
  args: UseLastLoggedInProfileArgs,
): ReadResult<Profile, NotFoundError | UnspecifiedError> {
  const { data, error, loading } = useReadResult(
    useLastLoggedInProfileHook(
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

  if (data === null) {
    return {
      data: undefined,
      error: new NotFoundError(`No profile found for the wallet address: ${args.for}`),
      loading: false,
    };
  }

  return {
    data,
    error: undefined,
    loading: false,
  };
}
