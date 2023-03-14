import { ProfileFragment, useExploreProfilesQuery } from '@lens-protocol/api-bindings';

import { useConfigSourcesVariable, useLensApolloClient } from '../helpers/arguments';
import { PaginatedReadResult, PaginatedArgs, usePaginatedReadResult } from '../helpers/reads';

type UseFeedArgs = PaginatedArgs<{
  observerId?: string;
}>;

export function useExploreProfiles(args?: UseFeedArgs): PaginatedReadResult<ProfileFragment[]> {
  return usePaginatedReadResult(
    useExploreProfilesQuery(
      useLensApolloClient({
        variables: useConfigSourcesVariable({
          observerId: args?.observerId,
          limit: args?.limit ?? 10,
        }),
      }),
    ),
  );
}
