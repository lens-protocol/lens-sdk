import { ProfileId } from '@lens-protocol/domain/entities';
import { success } from '@lens-protocol/shared-kernel';

import { Operation, useOperation } from '../helpers';
import { useSwitchActiveProfileController } from './adapters/useSwitchActiveProfileController';

export type ActiveProfileSwitchOperation = Operation<void, never, [ProfileId]>;

export function useActiveProfileSwitch(): ActiveProfileSwitchOperation {
  const switchActiveProfile = useSwitchActiveProfileController();

  return useOperation(async (profileId: ProfileId) => {
    await switchActiveProfile({ profileId });
    return success();
  });
}
