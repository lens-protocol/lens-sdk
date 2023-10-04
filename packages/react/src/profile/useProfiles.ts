import {
  LimitType,
  Profile,
  ProfilesRequest,
  useProfiles as useProfilesHook,
} from '@lens-protocol/api-bindings';

import { useLensApolloClient, useMediaTransformFromConfig } from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';

/**
 * {@link useProfiles} hook arguments
 */
export type UseProfilesArgs = PaginatedArgs<ProfilesRequest>;

/**
 * `useProfiles` is a paginated hook that lets you fetch profiles based on a set of filters.
 *
 * @category Profiles
 * @group Hooks
 */
export function useProfiles({
  where,
  limit = LimitType.Ten,
}: UseProfilesArgs): PaginatedReadResult<Profile[]> {
  return usePaginatedReadResult(
    useProfilesHook(
      useLensApolloClient({
        variables: useMediaTransformFromConfig({
          where,
          limit,
        }),
      }),
    ),
  );
}
