import {
  ProfileFieldsFragment,
  useSearchProfilesQuery,
} from '@lens-protocol/api-bindings';

import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers';
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
}: UseSearchProfilesArgs): PaginatedReadResult<ProfileFieldsFragment[]> {
  const { apolloClient } = useSharedDependencies();

  return usePaginatedReadResult(
    useSearchProfilesQuery({
      variables: {
        query,
        limit,
        observerId,
      },
      client: apolloClient,
    }),
  );
}
