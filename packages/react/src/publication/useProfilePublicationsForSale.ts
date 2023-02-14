import { useProfilePublicationsForSaleQuery } from '@lens-protocol/api-bindings';

import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers';
import { useSharedDependencies } from '../shared';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';
import { Publication } from './types';

type UseProfilePublicationsForSaleArgs = PaginatedArgs<{
  profileId: string;
  observerId?: string;
}>;

export function useProfilePublicationsForSale({
  profileId,
  observerId,
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
}: UseProfilePublicationsForSaleArgs): PaginatedReadResult<Publication[]> {
  const { apolloClient } = useSharedDependencies();

  return usePaginatedReadResult(
    useProfilePublicationsForSaleQuery({
      variables: {
        profileId,
        observerId,
        limit,
      },
      client: apolloClient,
    }),
  );
}
