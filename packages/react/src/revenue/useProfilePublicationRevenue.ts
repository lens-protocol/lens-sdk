import {
  PublicationRevenueFragment,
  PublicationTypes,
  useProfilePublicationRevenueQuery,
} from '@lens-protocol/api-bindings';

import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
import { useSharedDependencies } from '../shared';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';

type UseProfilePublicationRevenueArgs = PaginatedArgs<{
  profileId: string;
  observerId?: string;
  publicationTypes?: PublicationTypes[];
}>;

export function useProfilePublicationRevenue({
  profileId,
  observerId,
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
  publicationTypes,
}: UseProfilePublicationRevenueArgs): PaginatedReadResult<PublicationRevenueFragment[]> {
  const { apolloClient, sources } = useSharedDependencies();

  return usePaginatedReadResult(
    useProfilePublicationRevenueQuery({
      variables: {
        limit,
        publicationTypes,
        observerId,
        profileId,
        sources,
      },
      client: apolloClient,
    }),
  );
}
