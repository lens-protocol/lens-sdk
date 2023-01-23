import { ProfileFragment, useGetAllProfilesByOwnerAddressQuery } from '@lens-protocol/api-bindings';
import { EthereumAddress } from '@lens-protocol/shared-kernel';

import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers';
import { useSharedDependencies } from '../shared';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';

type UseProfilesOwnedByArgs = PaginatedArgs<{
  address: EthereumAddress;
  observerId?: string;
}>;

export function useProfilesOwnedBy({
  address,
  observerId,
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
}: UseProfilesOwnedByArgs): PaginatedReadResult<ProfileFragment[]> {
  const { apolloClient } = useSharedDependencies();

  return usePaginatedReadResult(
    useGetAllProfilesByOwnerAddressQuery({
      variables: {
        address,
        observerId,
        limit,
      },
      client: apolloClient,
    }),
  );
}
