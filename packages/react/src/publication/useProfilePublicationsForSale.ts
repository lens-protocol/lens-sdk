import {
  AnyPublicationFragment,
  useProfilePublicationsForSaleQuery,
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

export type UseProfilePublicationsForSaleArgs = PaginatedArgs<
  WithObserverIdOverride<{
    profileId: ProfileId;
  }>
>;

export function useProfilePublicationsForSale({
  profileId,
  observerId,
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
}: UseProfilePublicationsForSaleArgs): PaginatedReadResult<AnyPublicationFragment[]> {
  return usePaginatedReadResult(
    useProfilePublicationsForSaleQuery(
      useLensApolloClient(
        useActiveProfileAsDefaultObserver({
          variables: useSourcesFromConfig({
            profileId,
            observerId,
            limit,
          }),
        }),
      ),
    ),
  );
}
