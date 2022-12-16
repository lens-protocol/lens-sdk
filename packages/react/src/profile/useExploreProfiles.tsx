import { ProfileFieldsFragment, useExploreProfilesQuery } from '@lens-protocol/api';

import {
  LensResponseWithPagination,
  PaginatedArgs,
  useLensResponseWithPagination,
} from '../helpers';
import { useSharedDependencies } from '../shared';

type UseFeedArgs = PaginatedArgs<{
  observerId?: string;
}>;

export function useExploreProfiles({
  observerId,
  limit,
  cursor,
}: UseFeedArgs): LensResponseWithPagination<ProfileFieldsFragment[]> {
  const { apolloClient } = useSharedDependencies();

  return useLensResponseWithPagination(
    useExploreProfilesQuery({
      variables: {
        observerId,
        limit: limit ?? 10,
        cursor: cursor ?? undefined,
      },
      client: apolloClient,
    }),
  );
}
