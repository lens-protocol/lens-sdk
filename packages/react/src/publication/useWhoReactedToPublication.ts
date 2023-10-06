import {
  LimitType,
  ProfileWhoReactedResult,
  WhoReactedPublicationRequest,
  useWhoReactedPublication as useWhoReactedPublicationHook,
} from '@lens-protocol/api-bindings';

import { useLensApolloClient, useMediaTransformFromConfig } from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';

/**
 * {@link useWhoReactedToPublication} hook arguments
 */
export type UseWhoReactedToPublicationArgs = PaginatedArgs<WhoReactedPublicationRequest>;

/**
 * `useWhoReactedToPublication` is a paginated hook that lets you fetch
 * profiles that reacted to a publication, together with the reactions.
 *
 * @category Publications
 * @group Hooks
 *
 * @example
 * ```tsx
 * const { data, loading, error } = useWhoReactedToPublication({
 *   for: '0x123-0x456',
 * });
 * ```
 */
export function useWhoReactedToPublication({
  for: forId,
  where,
  limit = LimitType.Ten,
}: UseWhoReactedToPublicationArgs): PaginatedReadResult<ProfileWhoReactedResult[]> {
  return usePaginatedReadResult(
    useWhoReactedPublicationHook(
      useLensApolloClient({
        variables: useMediaTransformFromConfig({
          for: forId,
          where,
          limit,
        }),
      }),
    ),
  );
}
