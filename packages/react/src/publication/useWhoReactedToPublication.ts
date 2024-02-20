import {
  ProfileWhoReactedResult,
  WhoReactedPublicationRequest,
  useWhoReactedPublication as useWhoReactedPublicationHook,
} from '@lens-protocol/api-bindings';

import { useLensApolloClient } from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
import { useFragmentVariables } from '../helpers/variables';

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
export function useWhoReactedToPublication(
  args: UseWhoReactedToPublicationArgs,
): PaginatedReadResult<ProfileWhoReactedResult[]> {
  return usePaginatedReadResult(
    useWhoReactedPublicationHook(
      useLensApolloClient({
        variables: useFragmentVariables(args),
      }),
    ),
  );
}
