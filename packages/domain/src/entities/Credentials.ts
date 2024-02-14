import { EvmAddress } from '@lens-protocol/shared-kernel';

import { ProfileId } from './Profile';

export type Credentials = {
  readonly address: EvmAddress;
  readonly profileId?: ProfileId;
};
