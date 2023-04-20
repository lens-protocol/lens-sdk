import { ProfileId, TransactionKind } from '../../entities';
import {
  IProtocolCallPresenter,
  IUnsignedProtocolCallGateway,
  SubsidizedCall,
} from '../transactions/SubsidizedCall';

export type UpdateDispatcherConfigRequest = {
  profileId: ProfileId;
  enabled: boolean;
  kind: TransactionKind.UPDATE_DISPATCHER_CONFIG;
};

export type IDispatcherConfigCallGateway =
  IUnsignedProtocolCallGateway<UpdateDispatcherConfigRequest>;

export type IUpdateDispatcherConfigPresenter = IProtocolCallPresenter;

export class UpdateDispatcherConfig extends SubsidizedCall<UpdateDispatcherConfigRequest> {}
