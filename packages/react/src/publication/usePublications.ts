import { PublicationFragment, usePublicationsQuery } from '@lens-protocol/api-bindings';

import { createPublicationMetadataFilters, PublicationMetadataFilters } from './filters';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers';
import { useSharedDependencies } from '../shared';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';

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
}: UsePublicationArgs): PaginatedReadResult<PublicationFragment[]> {
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
