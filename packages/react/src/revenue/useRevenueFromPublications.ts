import {
  useRevenueFromPublications as useRevenueFromPublicationsHook,
  PublicationRevenue,
  RevenueFromPublicationsRequest,
} from '@lens-protocol/api-bindings';

import { useLensApolloClient } from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';

/**
 * {@link useRevenueFromPublications} hook arguments
 */
export type UseRevenueFromPublicationsArgs = PaginatedArgs<RevenueFromPublicationsRequest>;

/**
 * Fetch a profile's revenue for all their publications.
 *
 * @example
 * ```tsx
 * const { data, error, loading } = useRevenueFromPublications({
 *   for: '0x04',
 * });
 * ```
 *
 * @category Revenue
 * @group Hooks
 */
export function useRevenueFromPublications(
  args: UseRevenueFromPublicationsArgs,
): PaginatedReadResult<PublicationRevenue[]> {
  return usePaginatedReadResult(
    useRevenueFromPublicationsHook(
      useLensApolloClient({
        variables: args,
      }),
    ),
  );
}
