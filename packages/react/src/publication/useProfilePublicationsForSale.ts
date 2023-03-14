import {
  AnyPublicationFragment,
  useProfilePublicationsForSaleQuery,
} from '@lens-protocol/api-bindings';

import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
import { useSharedDependencies } from '../shared';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';

type UseProfilePublicationsForSaleArgs = PaginatedArgs<{
  profileId: string;
  observerId?: string;
}>;

export function useProfilePublicationsForSale({
  profileId,
  observerId,
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
}: UseProfilePublicationsForSaleArgs): PaginatedReadResult<AnyPublicationFragment[]> {
  const { apolloClient, sources } = useSharedDependencies();

  return usePaginatedReadResult(
    useProfilePublicationsForSaleQuery({
      variables: {
        profileId,
        observerId,
        limit,
        sources,
      },
      client: apolloClient,
    }),
  );
}
