import {
  isProfileOwnedByMe,
  ProfileOwnedByMeFragment,
  UnspecifiedError,
  useGetProfileQuery,
} from '@lens-protocol/api-bindings';
import { invariant } from '@lens-protocol/shared-kernel';

import { ReadResult } from '../helpers';
import { ApplicationsState, useAppState } from '../lifecycle/adapters/ApplicationPresenter';
import { useSharedDependencies } from '../shared';
import { useActiveProfileVar } from './adapters/ActiveProfilePresenter';

export function useActiveProfile(): ReadResult<ProfileOwnedByMeFragment | null, UnspecifiedError> {
  const state = useAppState();
  const { apolloClient } = useSharedDependencies();
  const profile = useActiveProfileVar();

  const { data, error, loading } = useGetProfileQuery({
    variables: {
      request: {
        profileId: profile?.id,
      },
    },
    fetchPolicy: 'cache-first',
    skip: state !== ApplicationsState.READY || profile === null,
    client: apolloClient,
  });

  if (state !== ApplicationsState.READY || loading) {
    return {
      data: undefined,
      error: undefined,
      loading: true,
    };
  }

  if (error) {
    return {
      data: undefined,
      error: new UnspecifiedError(error),
      loading: false,
    };
  }

  invariant(data?.result, 'Profile not found.');
  invariant(isProfileOwnedByMe(data.result), 'Profile not owned by the active wallet.');

  return {
    data: data.result,
    error: undefined,
    loading: false,
  };
}
