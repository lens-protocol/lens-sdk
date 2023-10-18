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
 * Fetch a profile's revenue from all publications.
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
