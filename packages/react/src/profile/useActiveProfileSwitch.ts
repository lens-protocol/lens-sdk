import { ProfileId } from '@lens-protocol/domain/entities';
import { success } from '@lens-protocol/shared-kernel';

import { Operation, useOperation } from '../helpers/operations';
import { useSwitchActiveProfileController } from './adapters/useSwitchActiveProfileController';

export type ActiveProfileSwitchOperation = Operation<void, never, [ProfileId]>;

/**
 * @category Profiles
 * @group Hooks
 */
export function useActiveProfileSwitch(): ActiveProfileSwitchOperation {
  const switchActiveProfile = useSwitchActiveProfileController();

  return useOperation(async (profileId: ProfileId) => {
    await switchActiveProfile({ profileId });
    return success();
  });
}
