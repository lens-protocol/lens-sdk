import { LogoutReason } from '@lens-protocol/domain/use-cases/authentication';
import { success } from '@lens-protocol/shared-kernel';

import { useSharedDependencies } from '../../shared';

export function useLogoutController() {
  const { logout } = useSharedDependencies();

  return async () => {
    await logout.execute(LogoutReason.USER_INITIATED);
    return success();
  };
}
