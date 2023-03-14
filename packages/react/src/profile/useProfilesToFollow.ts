import { useProfilesToFollowQuery } from '@lens-protocol/api-bindings';

import { useReadResult } from '../helpers/reads';
import { useSharedDependencies } from '../shared';

export function useProfilesToFollow() {
  const { apolloClient } = useSharedDependencies();

  return useReadResult(useProfilesToFollowQuery({ client: apolloClient }));
}
