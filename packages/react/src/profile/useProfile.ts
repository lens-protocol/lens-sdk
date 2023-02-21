import { ProfileFragment, UnspecifiedError, useGetProfileQuery } from '@lens-protocol/api-bindings';
import { invariant, XOR } from '@lens-protocol/shared-kernel';

import { NotFoundError } from '../NotFoundError';
import { ReadResult, useReadResult } from '../helpers';
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
  observerId,
  ...request
}: UseProfileArgs): ReadResult<ProfileFragment, NotFoundError | UnspecifiedError> {
  const { apolloClient, sources } = useSharedDependencies();

  invariant(
    request.profileId === undefined || request.handle === undefined,
    "Only one of 'id' or 'handle' should be provided to useProfile",
  );

  const { data, error, loading } = useReadResult(
    useGetProfileQuery({
      variables: {
        request,
        observerId,
        sources,
      },
      client: apolloClient,
    }),
  );

  if (loading) {
    return {
      data: undefined,
      error: undefined,
      loading: true,
    };
  }

  if (error) {
    return {
      data: undefined,
      error,
      loading: false,
    };
  }

  if (data === null) {
    return {
      data: undefined,
      error: new NotFoundError(`Profile for ${JSON.stringify(request)}`),
      loading: false,
    };
  }

  return {
    data,
    error: undefined,
    loading: false,
  };
}
