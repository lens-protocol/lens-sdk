import {
  LimitType,
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
 * @category Profiles
 * @group Hooks
 *
 * @example
 * ```tsx
 * const { data, loading, error } = useRecommendedProfiles({
 *   for: '0x123',
 * });
 * ```
 */
export function useRecommendedProfiles({
  for: forId,
  disableML,
  shuffle,
  limit = LimitType.Ten,
}: UseRecommendedProfilesArgs): PaginatedReadResult<Profile[]> {
  return usePaginatedReadResult(
    useProfileRecommendationsHook(
      useLensApolloClient({
        variables: {
          for: forId,
          disableML,
          shuffle,
          limit,
        },
      }),
    ),
  );
}
