import { ProfileFieldsFragment, useProfilesToFollowQuery } from '@lens-protocol/api-bindings';

import { useReadResult, ReadResult } from '../helpers';
import { useSharedDependencies } from '../shared';

export type { ProfileFieldsFragment };

export function useProfilesToFollow(): ReadResult<ProfileFieldsFragment[]> {
  const { apolloClient } = useSharedDependencies();

  return useReadResult(useProfilesToFollowQuery({ client: apolloClient }));
}
