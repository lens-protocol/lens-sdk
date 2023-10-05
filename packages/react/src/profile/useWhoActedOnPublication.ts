import {
  LimitType,
  Profile,
  useWhoActedOnPublication as useWhoActedOnPublicationHook,
  WhoActedOnPublicationRequest,
} from '@lens-protocol/api-bindings';

import { useLensApolloClient, useMediaTransformFromConfig } from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';

/**
 * {@link useWhoActedOnPublication} hook arguments
 */
export type UseWhoActedOnPublicationArgs = PaginatedArgs<WhoActedOnPublicationRequest>;

/**
 * `useWhoActedOnPublication` is a paginated hook that lets you fetch profiles that acted on a publication.
 *
 * @category Profiles
 * @group Hooks
 *
 * @example
 * ```tsx
 * const { data, loading, error } = useWhoActedOnPublication({
 *   on: '0x123-0x456',
 * });
 * ```
 */
export function useWhoActedOnPublication({
  on,
  where,
  limit = LimitType.Ten,
}: UseWhoActedOnPublicationArgs): PaginatedReadResult<Profile[]> {
  return usePaginatedReadResult(
    useWhoActedOnPublicationHook(
      useLensApolloClient({
        variables: useMediaTransformFromConfig({
          on,
          where,
          limit,
        }),
      }),
    ),
  );
}
