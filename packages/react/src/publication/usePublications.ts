import { AnyPublicationFragment, usePublicationsQuery } from '@lens-protocol/api-bindings';

import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
import { useSharedDependencies } from '../shared';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';
import { createPublicationMetadataFilters, PublicationMetadataFilters } from './filters';

type UsePublicationArgs = PaginatedArgs<{
  metadataFilter?: PublicationMetadataFilters;
  profileId: string;
  observerId?: string;
}>;

export function usePublications({
  profileId,
  metadataFilter,
  observerId,
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
}: UsePublicationArgs): PaginatedReadResult<AnyPublicationFragment[]> {
  const { apolloClient, sources } = useSharedDependencies();

  return usePaginatedReadResult(
    usePublicationsQuery({
      variables: {
        profileId,
        observerId,
        limit,
        metadata: createPublicationMetadataFilters(metadataFilter),
        sources,
      },
      client: apolloClient,
    }),
  );
}
