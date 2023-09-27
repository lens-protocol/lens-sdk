import {
  Profile,
  UnspecifiedError,
  useProfile as useProfileHook,
} from '@lens-protocol/api-bindings';
import { ProfileId } from '@lens-protocol/domain/entities';
import { invariant, XOR } from '@lens-protocol/shared-kernel';

import { NotFoundError } from '../NotFoundError';
import {
  useLensApolloClient,
  useMediaTransformFromConfig,
  useProfileStatsArgFromConfig,
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
export type UseProfileArgs = XOR<UseProfileByIdArgs, UseProfileByHandleArgs>;

/**
 * Get a profile by either a handle or profile Id.
 *
 * @category Profiles
 * @group Hooks
 *
 * @param args - {@link UseProfileArgs}
 */
export function useProfile({
  handle,
  profileId,
}: UseProfileArgs): ReadResult<Profile, NotFoundError | UnspecifiedError> {
  invariant(
    profileId === undefined || handle === undefined,
    "Only one of 'id' or 'handle' should be provided to 'useProfile' hook",
  );

  const { data, error, loading } = useReadResult(
    useProfileHook(
      useLensApolloClient({
        variables: useMediaTransformFromConfig(
          useProfileStatsArgFromConfig({
            request: {
              forHandle: handle,
              forProfileId: profileId,
            },
          }),
        ),
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
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
      error: new NotFoundError(`Profile with id or handle: ${profileId ?? handle}`),
      loading: false,
    };
  }

  return {
    data,
    error: undefined,
    loading: false,
  };
}
