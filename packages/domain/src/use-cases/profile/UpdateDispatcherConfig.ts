import { ProfileId, TransactionKind } from '../../entities';
import { SubsidizeOnChain } from '../transactions/SubsidizeOnChain';

export type UpdateDispatcherConfigRequest = {
  profileId: ProfileId;
  enabled: boolean;
  kind: TransactionKind.UPDATE_DISPATCHER_CONFIG;
};

export class UpdateDispatcherConfig extends SubsidizeOnChain<UpdateDispatcherConfigRequest> {}
