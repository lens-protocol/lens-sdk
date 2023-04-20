import { ProfileId, TransactionKind } from '../../entities';
import {
  DelegableSubsidizedCall,
  IDelegatedCallGateway,
} from '../transactions/DelegableSubsidizedCall';
import {
  IUnsignedProtocolCallGateway,
  IProtocolCallPresenter,
} from '../transactions/SubsidizedCall';
import { NftOwnershipSignature } from './ProveNftOwnership';

/**
 * @alpha
 */
export type UpdateNftProfileImageRequest = {
  kind: TransactionKind.UPDATE_PROFILE_IMAGE;
  profileId: ProfileId;
  signature: NftOwnershipSignature;
  delegate: boolean;
};

export type UpdateOffChainProfileImageRequest = {
  url: string;
  kind: TransactionKind.UPDATE_PROFILE_IMAGE;
  profileId: ProfileId;
  delegate: boolean;
};

export type UpdateProfileImageRequest =
  | UpdateNftProfileImageRequest
  | UpdateOffChainProfileImageRequest;

export type IProfileImageCallGateway = IDelegatedCallGateway<UpdateProfileImageRequest> &
  IUnsignedProtocolCallGateway<UpdateProfileImageRequest>;

export type IUpdateProfileImagePresenter = IProtocolCallPresenter;

export class UpdateProfileImage extends DelegableSubsidizedCall<UpdateProfileImageRequest> {}
