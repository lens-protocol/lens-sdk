import { ProfileFragment, useProfilesToFollowQuery } from '@lens-protocol/api-bindings';

import { useReadResult } from '../helpers';
import { useSharedDependencies } from '../shared';

export type { ProfileFragment };

export function useProfilesToFollow() {
  const { apolloClient } = useSharedDependencies();

  return useReadResult(useProfilesToFollowQuery({ client: apolloClient }));
}
