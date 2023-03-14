import { useReactiveVar } from '@apollo/client';
import { ProfileFragment, useGetAllProfilesByOwnerAddressQuery } from '@lens-protocol/api-bindings';

import { PaginatedArgs, PaginatedReadResult, usePaginatedReadResult } from '../helpers/reads';
import { useSharedDependencies } from '../shared';
import { createdProfilesVar } from '../transactions/adapters/responders/CreateProfileResponder';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../utils';
import { useActiveWallet } from '../wallet';

type UseProfilesOwnedByArgs = PaginatedArgs<{
  observerId?: string;
}>;

export function useProfilesOwnedByMe({
  observerId,
  limit = DEFAULT_PAGINATED_QUERY_LIMIT,
}: // TODO: rename ProfileFragment into ProfileOwnedByMeFragment
UseProfilesOwnedByArgs = {}): PaginatedReadResult<ProfileFragment[]> {
  const { apolloClient, sources } = useSharedDependencies();
  const activeWallet = useActiveWallet();
  const createdProfiles = useReactiveVar(createdProfilesVar);

  const result = usePaginatedReadResult(
    useGetAllProfilesByOwnerAddressQuery({
      variables: {
        address: activeWallet.data?.address || '',
        observerId,
        limit,
        sources,
      },
      skip: activeWallet.loading,
      client: apolloClient,
    }),
  );

  return {
    ...result,
    data: result.data ? [...result.data, ...createdProfiles] : result.data,
  } as PaginatedReadResult<ProfileFragment[]>;
}
