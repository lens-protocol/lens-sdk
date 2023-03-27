import { AnyPublication, useWalletCollectedPublications } from '@lens-protocol/api-bindings';

import {
  WithObserverIdOverride,
  useActiveProfileAsDefaultObserver,
  useSourcesFromConfig,
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
}: UseCollectablesArgs): PaginatedReadResult<AnyPublication[]> {
  return usePaginatedReadResult(
    useWalletCollectedPublications(
      useLensApolloClient(
        useActiveProfileAsDefaultObserver({
          variables: useSourcesFromConfig({
            walletAddress,
            limit: limit,
            observerId,
          }),
        }),
      ),
    ),
  );
}
