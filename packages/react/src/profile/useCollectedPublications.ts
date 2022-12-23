import { useWalletCollectedPublicationsQuery } from '@lens-protocol/api-bindings';

import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers';
import { Publication } from '../publication';
import { useSharedDependencies } from '../shared';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';

type UseCollectablesArgs = PaginatedArgs<{
  walletAddress: string;
}>;

export function useCollectedPublications({
  walletAddress,
  limit,
}: UseCollectablesArgs): PaginatedReadResult<Publication[]> {
  const { apolloClient } = useSharedDependencies();

  return usePaginatedReadResult(
    useWalletCollectedPublicationsQuery({
      variables: {
        walletAddress,
        limit: limit ?? DEFAULT_PAGINATED_QUERY_LIMIT,
      },
      client: apolloClient,
    }),
  );
}
