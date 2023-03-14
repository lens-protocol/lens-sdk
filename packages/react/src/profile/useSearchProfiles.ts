import { ProfileFragment, useSearchProfilesQuery } from '@lens-protocol/api-bindings';

import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
import { useSharedDependencies } from '../shared';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';

type UseSearchProfilesArgs = PaginatedArgs<{
  query: string;
  limit?: number;
  observerId?: string;
}>;

export function useSearchProfiles({
  query,
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
  observerId,
}: UseSearchProfilesArgs): PaginatedReadResult<ProfileFragment[]> {
  const { apolloClient, sources } = useSharedDependencies();

  return usePaginatedReadResult(
    useSearchProfilesQuery({
      variables: {
        query,
        limit,
        observerId,
        sources,
      },
      client: apolloClient,
    }),
  );
}
