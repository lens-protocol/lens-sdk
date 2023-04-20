import { ProfileId, PublicationId, TransactionKind } from '../../entities';
import {
  DelegableSubsidizedCall,
  IProtocolCallPresenter,
  IDelegatedCallGateway,
} from '../transactions/DelegableSubsidizedCall';
import { IUnsignedProtocolCallGateway } from '../transactions/SubsidizedCall';

export type CreateMirrorRequest = {
  profileId: ProfileId;
  publicationId: PublicationId;
  kind: TransactionKind.MIRROR_PUBLICATION;
  delegate: boolean;
};

export type ICreateMirrorCallGateway = IDelegatedCallGateway<CreateMirrorRequest> &
  IUnsignedProtocolCallGateway<CreateMirrorRequest>;

export type ICreateMirrorPresenter = IProtocolCallPresenter;

export class CreateMirror extends DelegableSubsidizedCall<CreateMirrorRequest> {}
