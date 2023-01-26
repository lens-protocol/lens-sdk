import { ProfileFragment } from '@lens-protocol/api-bindings';

import { ReadResult } from '../helpers';
import { ApplicationsState, useAppState } from '../lifecycle/adapters/ApplicationPresenter';
import { useActiveProfileVar } from './adapters/ActiveProfilePresenter';

export function useActiveProfile(): ReadResult<ProfileFragment | null, void> {
  const state = useAppState();

  const profile = useActiveProfileVar();

  if (state === ApplicationsState.LOADING) {
    return {
      data: undefined,
      loading: true,
    };
  }

  return {
    data: profile ?? null,
    loading: false,
  };
}
