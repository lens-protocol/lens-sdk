import { TransactionKind } from '../../entities';
import {
  IProtocolCallPresenter,
  IUnsignedProtocolCallGateway,
  ProtocolCallUseCase,
} from '../transactions/ProtocolCallUseCase';
import { NftOwnershipSignature } from './ProveNftOwnership';

export type UpdateNftProfileImageRequest = {
  kind: TransactionKind.UPDATE_PROFILE_IMAGE;
  profileId: string;
  signature: NftOwnershipSignature;
};

export type UpdateOffChainProfileImageRequest = {
  url: string;
  kind: TransactionKind.UPDATE_PROFILE_IMAGE;
  profileId: string;
};

export type UpdateProfileImageRequest =
  | UpdateNftProfileImageRequest
  | UpdateOffChainProfileImageRequest;

export type IProfileImageCallGateway = IUnsignedProtocolCallGateway<UpdateProfileImageRequest>;

export type IUpdateProfileImagePresenter = IProtocolCallPresenter;

export class UpdateProfileImage extends ProtocolCallUseCase<UpdateProfileImageRequest> {}
