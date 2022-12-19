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

export function useExploreProfiles(
  args?: UseFeedArgs,
): LensResponseWithPagination<ProfileFieldsFragment[]> {
  const { apolloClient } = useSharedDependencies();

  return useLensResponseWithPagination(
    useExploreProfilesQuery({
      variables: {
        observerId: args?.observerId,
        limit: args?.limit ?? 10,
        cursor: args?.cursor,
      },
      client: apolloClient,
    }),
  );
}
