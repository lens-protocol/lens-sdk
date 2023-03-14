import { ProfileFragment, useMutualFollowersProfilesQuery } from '@lens-protocol/api-bindings';
import { ProfileId } from '@lens-protocol/domain/entities';

import { useConfigSourcesVariable, useLensApolloClient } from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';

export type UseMutualFollowersArgs = PaginatedArgs<{
  observerId: ProfileId;
  viewingProfileId: ProfileId;
}>;

export function useMutualFollowers({
  observerId,
  viewingProfileId,
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
}: UseMutualFollowersArgs): PaginatedReadResult<ProfileFragment[]> {
  return usePaginatedReadResult(
    useMutualFollowersProfilesQuery(
      useLensApolloClient({
        variables: useConfigSourcesVariable({ limit, observerId, viewingProfileId }),
      }),
    ),
  );
}
