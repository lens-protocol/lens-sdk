import {
  ProfileFieldsFragment,
  useGetAllProfilesByWhoMirroredPublicationQuery,
} from '@lens-protocol/api-bindings';

import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers';
import { useSharedDependencies } from '../shared';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';

type UseProfilesWhoMirroredPublicationArgs = PaginatedArgs<{
  limit?: number;
  observerId?: string;
  publicationId: string;
}>;

export function useProfilesWhoMirroredPublication({
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
  publicationId,
  observerId,
}: UseProfilesWhoMirroredPublicationArgs): PaginatedReadResult<ProfileFieldsFragment[]> {
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
