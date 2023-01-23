import { ILogoutPresenter, LogoutData } from '@lens-protocol/domain/use-cases/wallets';
import { success } from '@lens-protocol/shared-kernel';

import { PromiseResultPresenter } from '../../transactions/adapters/PromiseResultPresenter';

export type LogoutHandler = (data: LogoutData) => void;

export class LogoutPresenter
  extends PromiseResultPresenter<void, never>
  implements ILogoutPresenter
{
  constructor(private readonly logoutHandler: LogoutHandler) {
    super();
  }

  presentLogout(data: LogoutData): void {
    this.logoutHandler(data);
    this.present(success());
  }
}
