import { ProfileFieldsFragment, useGetProfileByIdQuery } from '@lens-protocol/api';

import { LensResponse, useLensResponse } from '../helpers';
import { useSharedDependencies } from '../shared';

type UseProfileByIdArgs = {
  id: string;
};

export function useProfileById({ id }: UseProfileByIdArgs): LensResponse<ProfileFieldsFragment> {
  const { apolloClient } = useSharedDependencies();

  const response = useLensResponse(
    useGetProfileByIdQuery({
      variables: {
        id,
      },
      client: apolloClient,
    }),
  );

  return {
    ...response,
    data: response.data?.result ?? null,
  };
}
