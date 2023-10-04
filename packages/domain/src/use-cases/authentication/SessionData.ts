import { EvmAddress } from '@lens-protocol/shared-kernel';

import { ProfileId } from '../../entities';

/**
 * Describes the details of an authenticated session.
 */
export type SessionData = {
  /**
   * The Profile Owner or an authorized Profile Manager.
   */
  address: EvmAddress;
  /**
   * The authenticated Profile ID.
   */
  profileId: ProfileId;
};
