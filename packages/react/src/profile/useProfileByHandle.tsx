import { ProfileFieldsFragment, useGetProfileByHandleQuery } from '@lens-protocol/api';

import { LensResponse, useLensResponse } from '../helpers';
import { useSharedDependencies } from '../shared';

type UseProfileByHandleArgs = {
  handle: string;
};

export function useProfileByHandle({
  handle,
}: UseProfileByHandleArgs): LensResponse<ProfileFieldsFragment> {
  const { apolloClient } = useSharedDependencies();

  const response = useLensResponse(
    useGetProfileByHandleQuery({
      variables: {
        handle,
      },
      client: apolloClient,
    }),
  );

  return {
    ...response,
    data: response.data?.result ?? null,
  };
}
