import { ProfileFieldsFragment, useGetProfileByIdQuery } from '@lens-protocol/api';

import { LensResponse, useLensResponse } from '../helpers';
import { useSharedDependencies } from '../shared';

type UseProfileByIdArgs = {
  id: string;
  activeProfileId?: string;
};

export function useProfileById({
  id,
  activeProfileId,
}: UseProfileByIdArgs): LensResponse<ProfileFieldsFragment> {
  const { apolloClient } = useSharedDependencies();

  const response = useLensResponse(
    useGetProfileByIdQuery({
      variables: {
        id,
        activeProfileId,
      },
      client: apolloClient,
    }),
  );

  return {
    ...response,
    data: response.data?.result ?? null,
  };
}
