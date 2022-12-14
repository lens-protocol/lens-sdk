import { ProfileFieldsFragment, useGetProfileByIdQuery } from '@lens-protocol/api';

import { LensResponse, useLensResponse } from '../helpers';
import { useSharedDependencies } from '../shared';

type UseProfileByIdArgs = {
  id: string;
  observerId?: string;
};

export function useProfileById({
  id,
  observerId,
}: UseProfileByIdArgs): LensResponse<ProfileFieldsFragment> {
  const { apolloClient } = useSharedDependencies();

  const response = useLensResponse(
    useGetProfileByIdQuery({
      variables: {
        id,
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
