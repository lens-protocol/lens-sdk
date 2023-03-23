import { TransactionKind } from '../../entities';
import {
  DelegableProtocolCallUseCase,
  IDelegableProtocolCallGateway,
} from '../transactions/DelegableProtocolCallUseCase';
import {
  IUnsignedProtocolCallGateway,
  IProtocolCallPresenter,
} from '../transactions/ProtocolCallUseCase';
import { NftOwnershipSignature } from './ProveNftOwnership';

/**
 * @alpha
 */
export type UpdateNftProfileImageRequest = {
  kind: TransactionKind.UPDATE_PROFILE_IMAGE;
  profileId: string;
  signature: NftOwnershipSignature;
  delegate: boolean;
};

export type UpdateOffChainProfileImageRequest = {
  url: string;
  kind: TransactionKind.UPDATE_PROFILE_IMAGE;
  profileId: string;
  delegate: boolean;
};

export type UpdateProfileImageRequest =
  | UpdateNftProfileImageRequest
  | UpdateOffChainProfileImageRequest;

export type IProfileImageCallGateway = IDelegableProtocolCallGateway<UpdateProfileImageRequest> &
  IUnsignedProtocolCallGateway<UpdateProfileImageRequest>;

export type IUpdateProfileImagePresenter = IProtocolCallPresenter;

export class UpdateProfileImage extends DelegableProtocolCallUseCase<UpdateProfileImageRequest> {}
