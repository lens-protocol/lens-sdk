import { AnyPublication, useGetPublications } from '@lens-protocol/api-bindings';
import { ProfileId } from '@lens-protocol/domain/entities';

import {
  WithObserverIdOverride,
  useActiveProfileAsDefaultObserver,
  useSourcesFromConfig,
  useLensApolloClient,
} from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';
import { createPublicationMetadataFilters, PublicationMetadataFilters } from './filters';

export type UsePublicationsArgs = PaginatedArgs<
  WithObserverIdOverride<{
    metadataFilter?: PublicationMetadataFilters;
    profileId: ProfileId;
  }>
>;

/**
 * @category Publications
 * @group Hooks
 */
export function usePublications({
  profileId,
  metadataFilter,
  observerId,
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
}: UsePublicationsArgs): PaginatedReadResult<AnyPublication[]> {
  return usePaginatedReadResult(
    useGetPublications(
      useLensApolloClient(
        useActiveProfileAsDefaultObserver({
          variables: useSourcesFromConfig({
            profileId,
            observerId,
            limit,
            metadata: createPublicationMetadataFilters(metadataFilter),
          }),
        }),
      ),
    ),
  );
}
