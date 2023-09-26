import { Profile, UnspecifiedError, useGetProfile } from '@lens-protocol/api-bindings';
import { ProfileId } from '@lens-protocol/domain/entities';
import { invariant, Prettify, XOR } from '@lens-protocol/shared-kernel';

import { NotFoundError } from '../NotFoundError';
import {
  Skippable,
  useActiveProfileAsDefaultObserver,
  useLensApolloClient,
  useMediaTransformFromConfig,
  useSourcesFromConfig,
  WithObserverIdOverride,
} from '../helpers/arguments';
import { ReadResult, useReadResult } from '../helpers/reads';

export type UseProfileByIdArgs = {
  profileId: ProfileId;
};

export type UseProfileByHandleArgs = {
  handle: string;
};

/**
 * {@link useProfile} hook arguments
 */
export type UseProfileArgs = Prettify<
  Skippable<WithObserverIdOverride<XOR<UseProfileByIdArgs, UseProfileByHandleArgs>>>
>;

/**
 * Get a profile by either a handle or profile Id.
 *
 * @category Profiles
 * @group Hooks
 *
 * @param args - {@link UseProfileArgs}
 */
export function useProfile({
  observerId,
  skip,
  ...request
}: UseProfileArgs): ReadResult<Profile, NotFoundError | UnspecifiedError> {
  invariant(
    request.profileId === undefined || request.handle === undefined,
    "Only one of 'id' or 'handle' should be provided to 'useProfile' hook",
  );

  const { data, error, loading } = useReadResult(
    useGetProfile(
      useLensApolloClient(
        useActiveProfileAsDefaultObserver({
          variables: useMediaTransformFromConfig(
            useSourcesFromConfig({
              request,
              observerId,
            }),
          ),
          fetchPolicy: 'cache-and-network',
          nextFetchPolicy: 'cache-first',
          skip,
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
