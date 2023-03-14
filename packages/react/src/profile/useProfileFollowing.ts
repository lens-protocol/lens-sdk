import { FollowingFragment, useProfileFollowingQuery } from '@lens-protocol/api-bindings';

import {
  SubjectiveArgs,
  useActiveProfileAsDefaultObserver,
  useConfigSourcesVariable,
  useLensApolloClient,
} from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';

export type UseProfileFollowingArgs = PaginatedArgs<
  SubjectiveArgs<{
    walletAddress: string;
  }>
>;

export function useProfileFollowing({
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
  observerId,
  walletAddress,
}: UseProfileFollowingArgs): PaginatedReadResult<FollowingFragment[]> {
  return usePaginatedReadResult(
    useProfileFollowingQuery(
      useLensApolloClient(
        useActiveProfileAsDefaultObserver({
          variables: useConfigSourcesVariable({
            walletAddress,
            limit,
            observerId,
          }),
        }),
      ),
    ),
  );
}
