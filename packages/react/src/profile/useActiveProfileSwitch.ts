import { ProfileId } from '@lens-protocol/domain/dist/entities';
import { success } from '@lens-protocol/shared-kernel';

import { useSwitchActiveProfileController } from './adapters/useSwitchActiveProfileController';
import { Operation, useOperation } from '../helpers';

export type ActiveProfileSwitchOperation = Operation<void, never, [ProfileId]>;

export function useActiveProfileSwitch(): ActiveProfileSwitchOperation {
  const switchActiveProfile = useSwitchActiveProfileController();

  return useOperation(async (profileId: ProfileId) => {
    await switchActiveProfile({ profileId });
    return success();
  });
}
