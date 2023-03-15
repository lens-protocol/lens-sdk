import {
  PublicationRevenueFragment,
  PublicationTypes,
  useProfilePublicationRevenueQuery,
} from '@lens-protocol/api-bindings';
import { ProfileId } from '@lens-protocol/domain/entities';

import {
  WithObserverIdOverride,
  useActiveProfileAsDefaultObserver,
  useSourcesFromConfig,
  useLensApolloClient,
} from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';

export type UseProfilePublicationRevenueArgs = PaginatedArgs<
  WithObserverIdOverride<{
    profileId: ProfileId;
    publicationTypes?: PublicationTypes[];
  }>
>;

export function useProfilePublicationRevenue({
  profileId,
  observerId,
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
  publicationTypes,
}: UseProfilePublicationRevenueArgs): PaginatedReadResult<PublicationRevenueFragment[]> {
  return usePaginatedReadResult(
    useProfilePublicationRevenueQuery(
      useLensApolloClient(
        useActiveProfileAsDefaultObserver({
          variables: useSourcesFromConfig({
            limit,
            publicationTypes,
            observerId,
            profileId,
          }),
        }),
      ),
    ),
  );
}
