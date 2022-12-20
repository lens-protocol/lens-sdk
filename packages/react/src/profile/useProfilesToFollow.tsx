import { ProfileFieldsFragment, useProfilesToFollowQuery } from '@lens-protocol/api';

import { useReadResult, ReadResult } from '../helpers';
import { useSharedDependencies } from '../shared';

export type { ProfileFieldsFragment };

export function useProfilesToFollow(): ReadResult<ProfileFieldsFragment[]> {
  const { apolloClient } = useSharedDependencies();

  const response = useReadResult(useProfilesToFollowQuery({ client: apolloClient }));

  return {
    ...response,
    data: response.data?.recommendedProfiles ?? null,
  };
}
