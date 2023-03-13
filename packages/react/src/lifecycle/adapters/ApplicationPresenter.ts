import { makeVar, useReactiveVar } from '@apollo/client';
import { IApplicationPresenter } from '@lens-protocol/domain/use-cases/lifecycle';

export enum ApplicationsState {
  LOADING = 'LOADING',
  READY = 'READY',
}

const applicationState = makeVar<ApplicationsState>(ApplicationsState.LOADING);

export class ApplicationPresenter implements IApplicationPresenter {
  signalReady(): void {
    applicationState(ApplicationsState.READY);
  }
}

export function useAppState() {
  return useReactiveVar(applicationState);
}
