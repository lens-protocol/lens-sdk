import { updateSessionData } from '@lens-protocol/api-bindings';
import {
  ILogoutPresenter,
  LogoutReason,
} from '@lens-protocol/domain/src/use-cases/authentication/Logout';
import { anonymousSessionData } from '@lens-protocol/domain/use-cases/authentication';

export class LogoutPresenter implements ILogoutPresenter {
  logout(reason: LogoutReason): void {
    updateSessionData(anonymousSessionData(reason));
  }
}
