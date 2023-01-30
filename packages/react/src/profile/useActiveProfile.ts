import { ProfileFragment, useGetProfileQuery } from '@lens-protocol/api-bindings';

import { ReadResult } from '../helpers';
import { ApplicationsState, useAppState } from '../lifecycle/adapters/ApplicationPresenter';
import { useSharedDependencies } from '../shared';
import { useActiveProfileVar } from './adapters/ActiveProfilePresenter';

export function useActiveProfile(): ReadResult<ProfileFragment | null, void> {
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
      data: undefined,
      loading: true,
    };
  }

  return {
    data: data?.result ?? null,
    loading: false,
  };
}
