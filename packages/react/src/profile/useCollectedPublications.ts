import {
  AnyPublicationFragment,
  useWalletCollectedPublicationsQuery,
} from '@lens-protocol/api-bindings';

import {
  WithObserverIdOverride,
  useActiveProfileAsDefaultObserver,
  useConfigSourcesVariable,
  useLensApolloClient,
} from '../helpers/arguments';
import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';

type UseCollectablesArgs = PaginatedArgs<
  WithObserverIdOverride<{
    walletAddress: string;
  }>
>;

export function useCollectedPublications({
  walletAddress,
  observerId,
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
}: UseCollectablesArgs): PaginatedReadResult<AnyPublicationFragment[]> {
  return usePaginatedReadResult(
    useWalletCollectedPublicationsQuery(
      useLensApolloClient(
        useActiveProfileAsDefaultObserver({
          variables: useConfigSourcesVariable({
            walletAddress,
            limit: limit,
            observerId,
          }),
        }),
      ),
    ),
  );
}
