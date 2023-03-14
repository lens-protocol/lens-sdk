import {
  AnyPublicationFragment,
  PublicationSortCriteria,
  PublicationTypes,
  useExplorePublicationsQuery,
} from '@lens-protocol/api-bindings';
import { ProfileId } from '@lens-protocol/domain/entities';

import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
import { useSharedDependencies } from '../shared';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';
import { createPublicationMetadataFilters, PublicationMetadataFilters } from './filters';

type UseExplorePublicationsArgs = PaginatedArgs<{
  observerId?: string;
  sortCriteria?: PublicationSortCriteria;
  timestamp?: number;
  publicationTypes?: Array<PublicationTypes>;
  excludeProfileIds?: Array<ProfileId>;
  metadataFilter?: PublicationMetadataFilters;
}>;

export function useExplorePublications({
  observerId,
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
  sortCriteria = PublicationSortCriteria.Latest,
  timestamp,
  publicationTypes,
  excludeProfileIds,
  metadataFilter,
}: UseExplorePublicationsArgs = {}): PaginatedReadResult<Array<AnyPublicationFragment>> {
  const { apolloClient, sources } = useSharedDependencies();

  return usePaginatedReadResult(
    useExplorePublicationsQuery({
      variables: {
        excludeProfileIds,
        limit,
        metadata: createPublicationMetadataFilters(metadataFilter),
        publicationTypes,
        sortCriteria,
        timestamp,
        observerId,
        sources,
      },
      client: apolloClient,
    }),
  );
}
