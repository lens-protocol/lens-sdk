import {
  PublicationRevenueFragment,
  PublicationTypes,
  useProfilePublicationRevenueQuery,
} from '@lens-protocol/api-bindings';

import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers';
import { useSharedDependencies } from '../shared';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';

type UseProfilePublicationRevenueArgs = PaginatedArgs<{
  profileId: string;
  observerId?: string;
  sources?: string[];
  publicationTypes?: PublicationTypes[];
}>;

export function useProfilePublicationRevenue({
  profileId,
  observerId,
  sources,
  limit,
  publicationTypes,
}: UseProfilePublicationRevenueArgs): PaginatedReadResult<PublicationRevenueFragment[]> {
  const { apolloClient } = useSharedDependencies();

  return usePaginatedReadResult(
    useProfilePublicationRevenueQuery({
      variables: {
        limit: limit ?? DEFAULT_PAGINATED_QUERY_LIMIT,
        publicationTypes,
        observerId,
        profileId,
        sources,
      },
      client: apolloClient,
    }),
  );
}
