import { EvmAddress } from '@lens-protocol/shared-kernel';

import { TransactionKind } from '../../entities';
import { SubsidizeOnChain } from '../transactions/SubsidizeOnChain';

export type UpdateProfileManagersRequest = {
  kind: TransactionKind.UPDATE_PROFILE_MANAGERS;
  approveSignless?: boolean;
  add?: EvmAddress[];
  remove?: EvmAddress[];
};

export class UpdateProfileManagers extends SubsidizeOnChain<UpdateProfileManagersRequest> {}
