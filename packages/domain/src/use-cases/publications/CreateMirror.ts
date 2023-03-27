import { ProfileId, TransactionKind } from '../../entities';
import {
  DelegableProtocolCallUseCase,
  IProtocolCallPresenter,
  IDelegableProtocolCallGateway,
} from '../transactions/DelegableProtocolCallUseCase';
import { IUnsignedProtocolCallGateway } from '../transactions/ProtocolCallUseCase';

export type CreateMirrorRequest = {
  profileId: ProfileId;
  publicationId: string;
  kind: TransactionKind.MIRROR_PUBLICATION;
  delegate: boolean;
};

export type ICreateMirrorCallGateway = IDelegableProtocolCallGateway<CreateMirrorRequest> &
  IUnsignedProtocolCallGateway<CreateMirrorRequest>;

export type ICreateMirrorPresenter = IProtocolCallPresenter;

export class CreateMirror extends DelegableProtocolCallUseCase<CreateMirrorRequest> {}
