import {
  AnyPublication,
  useProfilePublicationsForSale as useUnderlyingQuery,
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

export type UseProfilePublicationsForSaleArgs = PaginatedArgs<
  WithObserverIdOverride<{
    profileId: ProfileId;
  }>
>;

/**
 * @category Publications
 * @group Hooks
 */
export function useProfilePublicationsForSale({
  profileId,
  observerId,
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
}: UseProfilePublicationsForSaleArgs): PaginatedReadResult<AnyPublication[]> {
  return usePaginatedReadResult(
    useUnderlyingQuery(
      useLensApolloClient(
        useActiveProfileAsDefaultObserver({
          variables: useMediaTransformFromConfig(
            useSourcesFromConfig({
              profileId,
              observerId,
              limit,
            }),
          ),
        }),
      ),
    ),
  );
}
