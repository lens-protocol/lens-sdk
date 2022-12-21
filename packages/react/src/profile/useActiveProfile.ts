import { ProfileFieldsFragment } from '@lens-protocol/api';

import { ReadResult } from '../helpers';
import { ApplicationsState, useAppState } from '../lifecycle/adapters/ApplicationPresenter';
import { useActiveProfileVar } from './adapters/ActiveProfilePresenter';

export function useActiveProfile(): ReadResult<ProfileFieldsFragment | null> {
  const state = useAppState();

  const profile = useActiveProfileVar();

  if (state === ApplicationsState.LOADING) {
    return {
      loading: true,
      data: undefined,
    };
  }

  if (!profile) {
    return {
      loading: false,
      data: null,
    };
  }

  return {
    loading: false,
    data: profile,
  };
}
