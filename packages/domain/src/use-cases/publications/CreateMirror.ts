import { TransactionKind } from '../../entities';
import { PublicationType } from '../../entities/Publication';
import {
  DelegableProtocolCallUseCase,
  IProtocolCallPresenter,
  IDelegableProtocolCallGateway,
} from '../transactions/DelegableProtocolCallUseCase';
import { IUnsignedProtocolCallGateway } from '../transactions/ProtocolCallUseCase';
import { ReferencePolicy } from './types';

export type CreateMirrorRequest = {
  profileId: string;
  publicationId: string;
  publicationType: PublicationType.COMMENT | PublicationType.POST;
  kind: TransactionKind.MIRROR_PUBLICATION;
  delegate: boolean;
  reference: ReferencePolicy;
};

export type ICreateMirrorCallGateway = IDelegableProtocolCallGateway<CreateMirrorRequest> &
  IUnsignedProtocolCallGateway<CreateMirrorRequest>;

export type ICreateMirrorPresenter = IProtocolCallPresenter;

export class CreateMirror extends DelegableProtocolCallUseCase<CreateMirrorRequest> {}
