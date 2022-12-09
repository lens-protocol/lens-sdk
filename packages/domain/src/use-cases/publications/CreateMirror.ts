import { TransactionKind } from '../../entities';
import { PublicationType } from '../../entities/Publication';
import {
  DelegableProtocolCallUseCase,
  IProtocolCallPresenter,
  IProtocolCallGateway,
} from '../transactions/DelegableProtocolCallUseCase';

export type CreateMirrorRequest = {
  profileId: string;
  publicationId: string;
  publicationType: PublicationType.COMMENT | PublicationType.POST;
  kind: TransactionKind.MIRROR_PUBLICATION;
  delegate: boolean;
};

export type IMirrorCallGateway = IProtocolCallGateway<CreateMirrorRequest>;

export type IMirrorCreationPresenter = IProtocolCallPresenter;

export class CreateMirror extends DelegableProtocolCallUseCase<CreateMirrorRequest> {}
