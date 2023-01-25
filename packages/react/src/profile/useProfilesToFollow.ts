import { ProfileFragment, useProfilesToFollowQuery } from '@lens-protocol/api-bindings';

import { useReadResult, ReadResult } from '../helpers';
import { useSharedDependencies } from '../shared';

export type { ProfileFragment };

export function useProfilesToFollow(): ReadResult<ProfileFragment[]> {
  const { apolloClient } = useSharedDependencies();

  return useReadResult(useProfilesToFollowQuery({ client: apolloClient }));
}
