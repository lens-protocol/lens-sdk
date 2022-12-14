import { ProfileFieldsFragment, useGetProfileByHandleQuery } from '@lens-protocol/api';

import { LensResponse, useLensResponse } from '../helpers';
import { useSharedDependencies } from '../shared';

type UseProfileByHandleArgs = {
  handle: string;
  observerId?: string;
};

export function useProfileByHandle({
  handle,
  observerId,
}: UseProfileByHandleArgs): LensResponse<ProfileFieldsFragment> {
  const { apolloClient } = useSharedDependencies();

  const response = useLensResponse(
    useGetProfileByHandleQuery({
      variables: {
        handle,
        observerId,
      },
      client: apolloClient,
    }),
  );

  return {
    ...response,
    data: response.data?.result ?? null,
  };
}
