import { usePublicationsQuery } from '@lens-protocol/api-bindings';

import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers';
import { useSharedDependencies } from '../shared';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';
import { Publication } from './types';

type UsePublicationArgs = PaginatedArgs<{
  profileId: string;
  observerId?: string;
}>;

export function usePublications({
  profileId,
  observerId,
  limit,
}: UsePublicationArgs): PaginatedReadResult<Publication[]> {
  const { apolloClient } = useSharedDependencies();

  return usePaginatedReadResult(
    usePublicationsQuery({
      variables: {
        profileId,
        observerId,
        limit: limit ?? DEFAULT_PAGINATED_QUERY_LIMIT,
      },
      client: apolloClient,
    }),
  );
}
