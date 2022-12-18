import { ApplicationsState, useAppState } from '../lifecycle/adapters/ApplicationPresenter';
import { useActiveProfileVar } from './adapters/ActiveProfilePresenter';

export function useActiveProfile() {
  const state = useAppState();

  const profile = useActiveProfileVar();

  if (state === ApplicationsState.LOADING) {
    return {
      loading: true,
      profile: null,
    };
  }

  return {
    loading: false,
    profile,
  };
}
