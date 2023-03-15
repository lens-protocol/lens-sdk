import { ProfileFragment, UnspecifiedError, useGetProfileQuery } from '@lens-protocol/api-bindings';
import { ProfileId } from '@lens-protocol/domain/entities';
import { invariant, XOR } from '@lens-protocol/shared-kernel';

import { NotFoundError } from '../NotFoundError';
import {
  WithObserverIdOverride,
  useActiveProfileAsDefaultObserver,
  useSourcesFromConfig,
  useLensApolloClient,
} from '../helpers/arguments';
import { ReadResult, useReadResult } from '../helpers/reads';

type UseProfileByIdArgs = {
  profileId: ProfileId;
};

type UseProfileByHandleArgs = {
  handle: string;
};

export type UseProfileArgs = WithObserverIdOverride<
  XOR<UseProfileByIdArgs, UseProfileByHandleArgs>
>;

export function useProfile({
  observerId,
  ...request
}: UseProfileArgs): ReadResult<ProfileFragment, NotFoundError | UnspecifiedError> {
  invariant(
    request.profileId === undefined || request.handle === undefined,
    "Only one of 'id' or 'handle' should be provided to 'useProfile' hook",
  );

  const { data, error, loading } = useReadResult(
    useGetProfileQuery(
      useLensApolloClient(
        useActiveProfileAsDefaultObserver({
          variables: useSourcesFromConfig({
            request,
            observerId,
          }),
        }),
      ),
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
