import {
  WhoReactedResultFragment,
  useWhoReactedPublicationQuery,
} from '@lens-protocol/api-bindings';

import { PaginatedReadResult, PaginatedArgs, usePaginatedReadResult } from '../helpers';
import { useSharedDependencies } from '../shared';

type UseWhoReactedArgs = PaginatedArgs<{
  publicationId: string;
  observerId?: string;
}>;

export function useWhoReacted(
  args: UseWhoReactedArgs,
): PaginatedReadResult<WhoReactedResultFragment[]> {
  const { apolloClient, sources } = useSharedDependencies();

  return usePaginatedReadResult(
    useWhoReactedPublicationQuery({
      variables: {
        publicationId: args.publicationId,
        observerId: args?.observerId,
        limit: args?.limit ?? 10,
        sources,
      },
      client: apolloClient,
    }),
  );
}
