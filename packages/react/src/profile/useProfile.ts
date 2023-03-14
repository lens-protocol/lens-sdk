import { ProfileFragment, UnspecifiedError, useGetProfileQuery } from '@lens-protocol/api-bindings';
import { invariant, XOR } from '@lens-protocol/shared-kernel';

import { NotFoundError } from '../NotFoundError';
import {
  SubjectiveArgs,
  useConfigSourcesVariable,
  useLensApolloClient,
} from '../helpers/arguments';
import { ReadResult, useReadResult } from '../helpers/reads';

type UseProfileByIdArgs = {
  profileId: string;
};

type UseProfileByHandleArgs = {
  handle: string;
};

type UseProfileArgs = SubjectiveArgs<XOR<UseProfileByIdArgs, UseProfileByHandleArgs>>;

export function useProfile({
  observerId,
  ...request
}: UseProfileArgs): ReadResult<ProfileFragment, NotFoundError | UnspecifiedError> {
  invariant(
    request.profileId === undefined || request.handle === undefined,
    "Only one of 'id' or 'handle' should be provided to useProfile",
  );

  const { data, error, loading } = useReadResult(
    useGetProfileQuery(
      useLensApolloClient({
        variables: useConfigSourcesVariable({
          request,
          observerId,
        }),
      }),
    ),
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
