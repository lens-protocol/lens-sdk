import { EvmAddress } from '@lens-protocol/shared-kernel';

import { ProfileId } from './Profile';

export interface ICredentials {
  readonly address: EvmAddress;
  readonly profileId?: ProfileId;
  readonly authorizationId: string;

  isExpired(): boolean;
}
