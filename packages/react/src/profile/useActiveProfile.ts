import { ProfileFragment, useGetProfileQuery } from '@lens-protocol/api-bindings';

import { ReadResult } from '../helpers';
import { ApplicationsState, useAppState } from '../lifecycle/adapters/ApplicationPresenter';
import { useSharedDependencies } from '../shared';
import { useActiveProfileVar } from './adapters/ActiveProfilePresenter';

export function useActiveProfile(): ReadResult<ProfileFragment | null> {
  const state = useAppState();
  const { apolloClient } = useSharedDependencies();
  const profile = useActiveProfileVar();

  const { data, loading } = useGetProfileQuery({
    variables: {
      request: {
        profileId: profile?.id,
      },
    },
    fetchPolicy: 'cache-first',
    skip: state !== ApplicationsState.READY || !profile,
    client: apolloClient,
  });

  if (loading) {
    return {
      loading: true,
      data: undefined,
    };
  }

  if (!data?.result) {
    return {
      loading: false,
      data: null,
    };
  }

  return {
    loading: false,
    data: data.result,
  };
}
