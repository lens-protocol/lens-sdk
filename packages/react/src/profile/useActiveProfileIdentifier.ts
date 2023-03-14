import { ProfileIdentifier } from '@lens-protocol/domain/use-cases/profile';

import { ReadResult } from '../helpers/reads';
import { ApplicationsState, useAppState } from '../lifecycle/adapters/ApplicationPresenter';
import { useActiveProfileIdentifierVar } from './adapters/ActiveProfilePresenter';

export function useActiveProfileIdentifier(): ReadResult<ProfileIdentifier | null> {
  const state = useAppState();
  const identifier = useActiveProfileIdentifierVar();

  if (state !== ApplicationsState.READY) {
    return {
      data: undefined,
      error: undefined,
      loading: true,
    };
  }

  return {
    data: identifier,
    error: undefined,
    loading: false,
  };
}
