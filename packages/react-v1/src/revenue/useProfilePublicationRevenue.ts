import {
  PublicationRevenue,
  PublicationTypes,
  useGetProfilePublicationRevenue,
} from '@lens-protocol/api-bindings';
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

export type UseProfilePublicationRevenueArgs = PaginatedArgs<
  WithObserverIdOverride<{
    profileId: ProfileId;
    publicationTypes?: PublicationTypes[];
  }>
>;

/**
 * @category Revenues
 * @group Hooks
 */
export function useProfilePublicationRevenue({
  profileId,
  observerId,
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
  publicationTypes,
}: UseProfilePublicationRevenueArgs): PaginatedReadResult<PublicationRevenue[]> {
  return usePaginatedReadResult(
    useGetProfilePublicationRevenue(
      useLensApolloClient(
        useActiveProfileAsDefaultObserver({
          variables: useMediaTransformFromConfig(
            useSourcesFromConfig({
              limit,
              publicationTypes,
              observerId,
              profileId,
            }),
          ),
        }),
      ),
    ),
  );
}
