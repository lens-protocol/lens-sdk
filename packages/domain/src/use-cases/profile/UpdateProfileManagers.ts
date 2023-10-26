import { EvmAddress } from '@lens-protocol/shared-kernel';

import { TransactionKind } from '../../entities';
import { SignedOnChain } from '../transactions/SignedOnChain';

export type UpdateProfileManagersRequest = {
  kind: TransactionKind.UPDATE_PROFILE_MANAGERS;
  approveSignless?: boolean;
  add?: EvmAddress[];
  remove?: EvmAddress[];
};

export class UpdateProfileManagers extends SignedOnChain<UpdateProfileManagersRequest> {}
