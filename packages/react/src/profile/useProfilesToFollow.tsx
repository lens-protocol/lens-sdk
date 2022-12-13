import { ProfileFieldsFragment, useProfilesToFollowQuery } from '@lens-protocol/api';

import { useLensResponse, LensResponse } from '../helpers';
import { useSharedDependencies } from '../shared';

export type { ProfileFieldsFragment };

export function useProfilesToFollow(): LensResponse<ProfileFieldsFragment[]> {
  const { apolloClient } = useSharedDependencies();
  const response = useLensResponse(useProfilesToFollowQuery({ client: apolloClient }));

  return {
    ...response,
    data: response.data?.recommendedProfiles ?? null,
  };
}
