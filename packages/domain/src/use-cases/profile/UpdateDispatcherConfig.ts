import { ProfileId, TransactionKind } from '../../entities';
import { SubsidizedCall } from '../transactions/SubsidizedCall';

export type UpdateDispatcherConfigRequest = {
  profileId: ProfileId;
  enabled: boolean;
  kind: TransactionKind.UPDATE_DISPATCHER_CONFIG;
};

export class UpdateDispatcherConfig extends SubsidizedCall<UpdateDispatcherConfigRequest> {}
