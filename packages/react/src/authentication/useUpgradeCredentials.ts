import { Profile } from '@lens-protocol/api-bindings';
import { UpgradeCredentialsRequest } from '@lens-protocol/domain/use-cases/authentication';

import { UseDeferredTask, useDeferredTask } from '../helpers/tasks';
import { useUpgradeCredentialsController } from './adapters/useUpgradeCredentialsController';

export type { UpgradeCredentialsRequest };

/**
 * Upgrade credentials from "just wallet" to "with profile".
 *
 * @category Authentication
 * @group Hooks
 */
export function useUpgradeCredentials(): UseDeferredTask<
  Profile,
  Error,
  UpgradeCredentialsRequest
> {
  const upgrade = useUpgradeCredentialsController();
  return useDeferredTask(upgrade);
}
