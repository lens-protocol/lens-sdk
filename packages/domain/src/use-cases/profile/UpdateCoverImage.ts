import { TransactionKind } from '../../entities';
import {
  DelegableProtocolCallUseCase,
  IDelegableProtocolCallGateway,
} from '../transactions/DelegableProtocolCallUseCase';
import { IProtocolCallPresenter } from '../transactions/ProtocolCallUseCase';

export type UpdateCoverImageRequest = {
  profileId: string;
  url: string | null;
  kind: TransactionKind.UPDATE_COVER_IMAGE;
  delegate: boolean;
};

export type ICoverImageCallGateway = IDelegableProtocolCallGateway<UpdateCoverImageRequest>;

export type IUpdateCoverImagePresenter = IProtocolCallPresenter;

export class UpdateCoverImage extends DelegableProtocolCallUseCase<UpdateCoverImageRequest> {}
