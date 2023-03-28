import {
  useWhoCollectedPublication as useUnderlyingQuery,
  Wallet,
} from '@lens-protocol/api-bindings';
import { PublicationId } from '@lens-protocol/domain/entities';

import {
  WithObserverIdOverride,
  useActiveProfileAsDefaultObserver,
  useSourcesFromConfig,
  useLensApolloClient,
} from '../helpers/arguments';
import { PaginatedReadResult, PaginatedArgs, usePaginatedReadResult } from '../helpers/reads';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';

export type UseWhoCollectedPublicationArgs = PaginatedArgs<
  WithObserverIdOverride<{
    publicationId: PublicationId;
  }>
>;

/**
 * @category Publications
 * @group Hooks
 */
export function useWhoCollectedPublication({
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
  observerId,
  publicationId,
}: UseWhoCollectedPublicationArgs): PaginatedReadResult<Wallet[]> {
  return usePaginatedReadResult(
    useUnderlyingQuery(
      useLensApolloClient(
        useActiveProfileAsDefaultObserver({
          variables: useSourcesFromConfig({ limit, publicationId, observerId }),
        }),
      ),
    ),
  );
}
