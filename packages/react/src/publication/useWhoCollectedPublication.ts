import { useWhoCollectedPublicationQuery, WalletFragment } from '@lens-protocol/api-bindings';

import { PaginatedReadResult, PaginatedArgs, usePaginatedReadResult } from '../helpers';
import { useSharedDependencies } from '../shared';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';

type UseWhoCollectedPublicationArgs = PaginatedArgs<{
  publicationId: string;
  observerId?: string;
}>;

export function useWhoCollectedPublication(
  args: UseWhoCollectedPublicationArgs,
): PaginatedReadResult<WalletFragment[]> {
  const { apolloClient, sources } = useSharedDependencies();

  return usePaginatedReadResult(
    useWhoCollectedPublicationQuery({
      variables: {
        limit: args.limit ?? DEFAULT_PAGINATED_QUERY_LIMIT,
        publicationId: args.publicationId,
        observerId: args.observerId,
        sources,
      },
      client: apolloClient,
    }),
  );
}
