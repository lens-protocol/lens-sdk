import {
  Profile,
  ProfileRecommendationsDocument,
  ProfileRecommendationsRequest,
} from '@lens-protocol/api-bindings';

import { useLensApolloClient } from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult } from '../helpers/reads';
import {
  SuspendablePaginatedResult,
  SuspenseEnabled,
  SuspensePaginatedResult,
  useSuspendablePaginatedQuery,
} from '../helpers/suspense';
import { useFragmentVariables } from '../helpers/variables';

/**
 * {@link useRecommendedProfiles} hook arguments
 */
export type UseRecommendedProfilesArgs = PaginatedArgs<ProfileRecommendationsRequest>;

export type { ProfileRecommendationsRequest };

/**
 * {@link useRecommendedProfiles} hook arguments with Suspense support
 */
export type UseSuspenseRecommendedProfilesArgs = SuspenseEnabled<UseRecommendedProfilesArgs>;

/**
 * Provides profile recommendations based on user's social engagement and machine learning predictions.
 *
 * ```tsx
 * const { data, loading, error } = useRecommendedProfiles({
 *   for: '0x123',
 * });
 * ```
 *
 * @category Discovery
 * @group Hooks
 */
export function useRecommendedProfiles(
  args: UseRecommendedProfilesArgs,
): PaginatedReadResult<Profile[]>;

/**
 * Provides profile recommendations based on user's social engagement and machine learning predictions.
 *
 * This signature supports [React Suspense](https://react.dev/reference/react/Suspense).
 *
 * ```ts
 * const { data } = useRecommendedProfiles({
 *   for: '0x123',
 *   suspense: true
 * });
 *
 * console.log(data);
 * ```
 *
 * @experimental This API can change without notice
 * @category Discovery
 * @group Hooks
 */
export function useRecommendedProfiles(
  args: UseSuspenseRecommendedProfilesArgs,
): SuspensePaginatedResult<Profile[]>;

export function useRecommendedProfiles({
  suspense = false,
  ...args
}: UseRecommendedProfilesArgs & { suspense?: boolean }): SuspendablePaginatedResult<Profile[]> {
  return useSuspendablePaginatedQuery({
    suspense,
    query: ProfileRecommendationsDocument,
    options: useLensApolloClient({
      variables: useFragmentVariables(args),
    }),
  });
}
