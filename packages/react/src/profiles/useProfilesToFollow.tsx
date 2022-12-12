import { useProfilesToFollowQuery } from '@lens-protocol/api';

import { useSharedDependencies } from '../shared';

// Return type here is just a patch... this is just a pathfinder hook, might change a lot.
export function useProfilesToFollow(): ReturnType<typeof useProfilesToFollowQuery> {
  const { apolloClient } = useSharedDependencies();
  return useProfilesToFollowQuery({ client: apolloClient });
}
