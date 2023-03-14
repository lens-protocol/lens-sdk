import { FollowerFragment, useProfileFollowersQuery } from '@lens-protocol/api-bindings';
import { ProfileId } from '@lens-protocol/domain/entities';

import {
  SubjectiveArgs,
  useActiveProfileAsDefaultObserver,
  useConfigSourcesVariable,
  useLensApolloClient,
} from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';

export type UseProfileFollowersArgs = PaginatedArgs<
  SubjectiveArgs<{
    profileId: ProfileId;
  }>
>;

export function useProfileFollowers({
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
  observerId,
  profileId,
}: UseProfileFollowersArgs): PaginatedReadResult<FollowerFragment[]> {
  return usePaginatedReadResult(
    useProfileFollowersQuery(
      useLensApolloClient(
        useActiveProfileAsDefaultObserver({
          variables: useConfigSourcesVariable({ profileId, limit, observerId }),
        }),
      ),
    ),
  );
}
