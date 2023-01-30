import { makeVar, useReactiveVar } from '@apollo/client';
import {
  IActiveProfilePresenter,
  ProfileIdentifier,
} from '@lens-protocol/domain/use-cases/profile';

export const activeProfileVar = makeVar<ProfileIdentifier | null>(null);

export class ActiveProfilePresenter implements IActiveProfilePresenter {
  async presentActiveProfile(profileIdentifier: ProfileIdentifier | null): Promise<void> {
    activeProfileVar(profileIdentifier);
  }
}

export function useActiveProfileVar() {
  return useReactiveVar(activeProfileVar);
}
