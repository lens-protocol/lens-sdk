import { ProfileFragment, useGetProfileQuery } from '@lens-protocol/api-bindings';
import { invariant, XOR } from '@lens-protocol/shared-kernel';

import { ReadResult, useReadResult } from '../helpers';
import { NetworkError } from '../publication/adapters/NetworkError';
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
}: UseProfileArgs): ReadResult<ProfileFragment, NetworkError> {
  const { apolloClient } = useSharedDependencies();

  invariant(
    profileId === undefined || handle === undefined,
    "Only one of 'id' or 'handle' should be provided to useProfile",
  );

  return useReadResult(
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
}
