import {
  PublicationFragment,
  useProfilePublicationsForSaleQuery,
} from '@lens-protocol/api-bindings';

import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers';
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
}: UseProfilePublicationsForSaleArgs): PaginatedReadResult<PublicationFragment[]> {
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
