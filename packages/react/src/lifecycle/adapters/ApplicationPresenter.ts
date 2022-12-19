import { makeVar, useReactiveVar } from '@apollo/client';
import { IApplicationPresenter } from '@lens-protocol/domain/use-cases/lifecycle';

export enum ApplicationsState {
  LOADING,
  READY,
}

const applicationState = makeVar<ApplicationsState>(ApplicationsState.LOADING);

export class ApplicationPresenter implements IApplicationPresenter {
  signalReady(): void {
    applicationState(ApplicationsState.READY);
  }
}

export const useAppState = () => {
  return useReactiveVar(applicationState);
};
