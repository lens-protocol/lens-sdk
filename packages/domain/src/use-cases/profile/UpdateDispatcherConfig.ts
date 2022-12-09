import { TransactionKind } from '../../entities';
import {
  IProtocolCallPresenter,
  IUnsignedProtocolCallGateway,
  ProtocolCallUseCase,
} from '../transactions/ProtocolCallUseCase';

export type UpdateDispatcherConfigRequest = {
  profileId: string;
  enabled: boolean;
  kind: TransactionKind.UPDATE_DISPATCHER_CONFIG;
};

export type IDispatcherConfigCallGateway =
  IUnsignedProtocolCallGateway<UpdateDispatcherConfigRequest>;

export type IUpdateDispatcherConfigPresenter = IProtocolCallPresenter;

export class UpdateDispatcherConfig extends ProtocolCallUseCase<UpdateDispatcherConfigRequest> {}
