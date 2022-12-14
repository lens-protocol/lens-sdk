import { ProfileFieldsFragment, useGetProfileByHandleQuery } from '@lens-protocol/api';

import { LensResponse, useLensResponse } from '../helpers';
import { useSharedDependencies } from '../shared';

type UseProfileByHandleArgs = {
  handle: string;
  activeProfileId?: string;
};

export function useProfileByHandle({
  handle,
  activeProfileId,
}: UseProfileByHandleArgs): LensResponse<ProfileFieldsFragment> {
  const { apolloClient } = useSharedDependencies();

  const response = useLensResponse(
    useGetProfileByHandleQuery({
      variables: {
        handle,
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
