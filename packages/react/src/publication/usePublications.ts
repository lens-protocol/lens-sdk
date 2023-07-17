import { AnyPublication, PublicationTypes, useGetPublications } from '@lens-protocol/api-bindings';
import { ProfileId } from '@lens-protocol/domain/entities';

import {
  useActiveProfileAsDefaultObserver,
  useLensApolloClient,
  useMediaTransformFromConfig,
  useSourcesFromConfig,
  WithObserverIdOverride,
} from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';
import { createPublicationMetadataFilters, PublicationMetadataFilters } from './filters';

export type UsePublicationsArgs = PaginatedArgs<
  WithObserverIdOverride<{
    metadataFilter?: PublicationMetadataFilters;
    profileId: ProfileId;
    publicationTypes?: PublicationTypes[];
  }>
>;

/**
 * @category Publications
 * @group Hooks
 */
export function usePublications({
  profileId,
  metadataFilter,
  publicationTypes,
  observerId,
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
}: UsePublicationsArgs): PaginatedReadResult<AnyPublication[]> {
  return usePaginatedReadResult(
    useGetPublications(
      useLensApolloClient(
        useActiveProfileAsDefaultObserver({
          variables: useMediaTransformFromConfig(
            useSourcesFromConfig({
              profileId,
              observerId,
              limit,
              publicationTypes,
              metadata: createPublicationMetadataFilters(metadataFilter),
            }),
          ),
        }),
      ),
    ),
  );
}
