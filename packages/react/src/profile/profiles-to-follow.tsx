import { ProfileFieldsFragment, useProfilesToFollowQuery } from '@lens-protocol/api';
import { useLensResponse, LensResponse } from '../helpers';

export type { ProfileFieldsFragment };

export function useProfilesToFollow(): LensResponse<ProfileFieldsFragment[]> {
  const response = useLensResponse(useProfilesToFollowQuery());

  return {
    ...response,
    data: response.data?.recommendedProfiles ?? null,
  };
}
