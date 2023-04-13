import { activeProfileIdentifierVar } from '@lens-protocol/api-bindings';
import {
  IActiveProfilePresenter,
  ProfileIdentifier,
} from '@lens-protocol/domain/use-cases/profile';

export class ActiveProfilePresenter implements IActiveProfilePresenter {
  async presentActiveProfile(profileIdentifier: ProfileIdentifier | null): Promise<void> {
    activeProfileIdentifierVar(profileIdentifier);
  }
}
