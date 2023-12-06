import {
  Profile,
  ProfileRecommendationsRequest,
  useProfileRecommendations as useProfileRecommendationsHook,
} from '@lens-protocol/api-bindings';

import { useLensApolloClient } from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';

/**
 * {@link useRecommendedProfiles} hook arguments
 */
export type UseRecommendedProfilesArgs = PaginatedArgs<ProfileRecommendationsRequest>;

/**
 * `useRecommendedProfiles` is a paginated hook that lets you fetch recommended profiles.
 *
 * @category Discovery
 * @group Hooks
 *
 * @example
 * ```tsx
 * const { data, loading, error } = useRecommendedProfiles({
 *   for: '0x123',
 * });
 * ```
 */
export function useRecommendedProfiles(
  args: UseRecommendedProfilesArgs,
): PaginatedReadResult<Profile[]> {
  return usePaginatedReadResult(
    useProfileRecommendationsHook(
      useLensApolloClient({
        variables: args,
      }),
    ),
  );
}
