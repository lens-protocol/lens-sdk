import { ProfileFieldsFragment, useGetProfileQuery } from '@lens-protocol/api';
import { invariant, XOR } from '@lens-protocol/shared-kernel';

import { LensResponse, useLensResponse } from '../helpers';
import { useSharedDependencies } from '../shared';

type BaseUseProfileArgs = {
  observerId?: string;
};

type UseProfileByIdArgs = BaseUseProfileArgs & {
  profileId: string;
};

type UseProfileByHandleArgs = BaseUseProfileArgs & {
  handle: string;
};

type UseProfileArgs = XOR<UseProfileByIdArgs, UseProfileByHandleArgs>;

export function useProfile({
  profileId,
  handle,
  observerId,
}: UseProfileArgs): LensResponse<ProfileFieldsFragment> {
  const { apolloClient } = useSharedDependencies();

  invariant(
    profileId === undefined || handle === undefined,
    "Only one of 'id' or 'handle' should be provided to useProfile",
  );

  const response = useLensResponse(
    useGetProfileQuery({
      variables: {
        request: {
          profileId,
          handle,
        },
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
