import { ProfileFragment, useExploreProfilesQuery } from '@lens-protocol/api-bindings';

import { PaginatedReadResult, PaginatedArgs, usePaginatedReadResult } from '../helpers';
import { useSharedDependencies } from '../shared';

type UseFeedArgs = PaginatedArgs<{
  observerId?: string;
}>;

export function useExploreProfiles(args?: UseFeedArgs): PaginatedReadResult<ProfileFragment[]> {
  const { apolloClient, sources } = useSharedDependencies();

  return usePaginatedReadResult(
    useExploreProfilesQuery({
      variables: {
        observerId: args?.observerId,
        limit: args?.limit ?? 10,
        sources,
      },
      client: apolloClient,
    }),
  );
}
