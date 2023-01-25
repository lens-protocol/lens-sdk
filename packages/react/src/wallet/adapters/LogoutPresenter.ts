import { ILogoutPresenter, LogoutData } from '@lens-protocol/domain/use-cases/wallets';
import { invariant, Result } from '@lens-protocol/shared-kernel';

import { PromiseResultPresenter } from '../../transactions/adapters/PromiseResultPresenter';

export type LogoutHandler = (data: LogoutData) => void;

export class LogoutPresenter
  extends PromiseResultPresenter<LogoutData, never>
  implements ILogoutPresenter
{
  constructor(private readonly logoutHandler: LogoutHandler) {
    super();
  }

  override present(data: Result<LogoutData, never>): void {
    invariant(
      data.isSuccess(),
      'Unknown error received while presenting logging out result. This is likely a `@lens-protocol/react` bug.',
    );
    this.logoutHandler(data.unwrap());
    super.present(data);
  }
}
