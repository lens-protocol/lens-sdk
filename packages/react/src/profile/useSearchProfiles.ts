import { ProfileFieldsFragment, useSearchProfilesQuery } from '@lens-protocol/api';

import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers';
import { useSharedDependencies } from '../shared';

type UseSearchProfilesArgs = PaginatedArgs<{
  query: string;
  limit?: number;
  observerId?: string;
}>;

export function useSearchProfiles({
  query,
  limit = 10,
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
