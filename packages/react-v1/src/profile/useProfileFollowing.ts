import { Following, useProfileFollowing as useUnderlyingQuery } from '@lens-protocol/api-bindings';

import {
  useActiveProfileAsDefaultObserver,
  useLensApolloClient,
  useMediaTransformFromConfig,
  useSourcesFromConfig,
  WithObserverIdOverride,
} from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';

export type UseProfileFollowingArgs = PaginatedArgs<
  WithObserverIdOverride<{
    walletAddress: string;
  }>
>;

/**
 * @category Profiles
 * @group Hooks
 */
export function useProfileFollowing({
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
  observerId,
  walletAddress,
}: UseProfileFollowingArgs): PaginatedReadResult<Following[]> {
  return usePaginatedReadResult(
    useUnderlyingQuery(
      useLensApolloClient(
        useActiveProfileAsDefaultObserver({
          variables: useMediaTransformFromConfig(
            useSourcesFromConfig({
              walletAddress,
              limit,
              observerId,
            }),
          ),
        }),
      ),
    ),
  );
}
