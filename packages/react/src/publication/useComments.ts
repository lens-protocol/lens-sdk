import { useCommentsQuery } from '@lens-protocol/api';

import { useLensResponseWithPagination } from '../helpers';
import { useSharedDependencies } from '../shared';

type UseCommentsArgs = {
  commentsOf: string;
  limit?: number;
  observerId?: string;
  cursor?: string;
};

export function useComments({ commentsOf, limit, observerId, cursor }: UseCommentsArgs) {
  const { apolloClient, sources } = useSharedDependencies();

  return useLensResponseWithPagination(
    useCommentsQuery({
      variables: {
        commentsOf,
        limit: limit ?? 10,
        observerId,
        cursor,
        sources,
      },
      client: apolloClient,
    }),
  );
}
