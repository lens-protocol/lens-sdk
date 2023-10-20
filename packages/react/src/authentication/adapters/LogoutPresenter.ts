import { updateSessionData } from '@lens-protocol/api-bindings';
import {
  anonymousSessionData,
  ILogoutPresenter,
  LogoutReason,
} from '@lens-protocol/domain/use-cases/authentication';

export class LogoutPresenter implements ILogoutPresenter {
  logout(reason: LogoutReason): void {
    updateSessionData(anonymousSessionData(reason));
  }
}
