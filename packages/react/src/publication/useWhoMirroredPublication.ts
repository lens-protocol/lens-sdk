import {
  ProfileFragment,
  useGetAllProfilesByWhoMirroredPublicationQuery,
} from '@lens-protocol/api-bindings';

import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers';
import { useSharedDependencies } from '../shared';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';

type UseWhoMirroredPublicationArgs = PaginatedArgs<{
  limit?: number;
  observerId?: string;
  publicationId: string;
}>;

export function useWhoMirroredPublication({
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
  publicationId,
  observerId,
}: UseWhoMirroredPublicationArgs): PaginatedReadResult<ProfileFragment[]> {
  const { apolloClient } = useSharedDependencies();

  return usePaginatedReadResult(
    useGetAllProfilesByWhoMirroredPublicationQuery({
      variables: {
        publicationId,
        observerId,
        limit,
      },
      client: apolloClient,
    }),
  );
}
