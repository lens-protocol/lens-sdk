import {
  AnyPublicationFragment,
  PublicationSortCriteria,
  PublicationTypes,
  useExplorePublicationsQuery,
} from '@lens-protocol/api-bindings';
import { ProfileId } from '@lens-protocol/domain/entities';

import {
  SubjectiveArgs,
  useActiveProfileAsDefaultObserver,
  useConfigSourcesVariable,
  useLensApolloClient,
} from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';
import { createPublicationMetadataFilters, PublicationMetadataFilters } from './filters';

export type UseExplorePublicationsArgs = PaginatedArgs<
  SubjectiveArgs<{
    excludeProfileIds?: Array<ProfileId>;
    metadataFilter?: PublicationMetadataFilters;
    publicationTypes?: Array<PublicationTypes>;
    sortCriteria?: PublicationSortCriteria;
    timestamp?: number;
  }>
>;

export function useExplorePublications({
  observerId,
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
  sortCriteria = PublicationSortCriteria.Latest,
  timestamp,
  publicationTypes,
  excludeProfileIds,
  metadataFilter,
}: UseExplorePublicationsArgs = {}): PaginatedReadResult<Array<AnyPublicationFragment>> {
  return usePaginatedReadResult(
    useExplorePublicationsQuery(
      useLensApolloClient(
        useActiveProfileAsDefaultObserver({
          variables: useConfigSourcesVariable({
            excludeProfileIds,
            limit,
            metadata: createPublicationMetadataFilters(metadataFilter),
            publicationTypes,
            sortCriteria,
            timestamp,
            observerId,
          }),
        }),
      ),
    ),
  );
}
