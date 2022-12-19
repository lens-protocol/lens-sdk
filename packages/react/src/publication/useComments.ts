import { useCommentsQuery } from '@lens-protocol/api';

import { useLensResponse } from '../helpers';
import { useSharedDependencies } from '../shared';

type UseCommentsArgs = {
  commentsOf: string;
  limit?: number;
  observerId?: string;
  cursor?: string;
};

export function useComments({ commentsOf, limit, observerId, cursor }: UseCommentsArgs) {
  const { apolloClient, sources } = useSharedDependencies();

  const response = useLensResponse(
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

  return {
    ...response,
    data: response.data?.result ?? null,
  };
}
