import { updateSessionData } from '@lens-protocol/api-bindings';
import { IBootstrapPresenter, SessionData } from '@lens-protocol/domain/use-cases/authentication';

export class BootstrapPresenter implements IBootstrapPresenter {
  present(session: SessionData): void {
    updateSessionData(session);
  }
}
