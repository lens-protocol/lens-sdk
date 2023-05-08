import { ProfileId, TransactionKind } from '../../entities';
import { DelegableSigning } from '../transactions/DelegableSigning';
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

export class UpdateProfileImage extends DelegableSigning<UpdateProfileImageRequest> {}
