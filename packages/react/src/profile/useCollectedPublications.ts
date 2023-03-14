import {
  AnyPublicationFragment,
  useWalletCollectedPublicationsQuery,
} from '@lens-protocol/api-bindings';

import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
import { useSharedDependencies } from '../shared';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';

type UseCollectablesArgs = PaginatedArgs<{
  walletAddress: string;
}>;

export function useCollectedPublications({
  walletAddress,
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
}: UseCollectablesArgs): PaginatedReadResult<AnyPublicationFragment[]> {
  const { apolloClient, sources } = useSharedDependencies();

  return usePaginatedReadResult(
    useWalletCollectedPublicationsQuery({
      variables: {
        walletAddress,
        limit: limit,
        sources,
      },
      client: apolloClient,
    }),
  );
}
