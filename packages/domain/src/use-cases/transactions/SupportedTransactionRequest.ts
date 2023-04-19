import { TransactionKind } from '../../entities';
import { CreateProfileRequest } from '../profile/CreateProfile';
import { FollowRequest } from '../profile/FollowProfiles';
import { UnfollowRequest } from '../profile/UnfollowProfile';
import { UpdateDispatcherConfigRequest } from '../profile/UpdateDispatcherConfig';
import { UpdateFollowPolicyRequest } from '../profile/UpdateFollowPolicy';
import { UpdateProfileDetailsRequest } from '../profile/UpdateProfileDetails';
import { UpdateProfileImageRequest } from '../profile/UpdateProfileImage';
import { CollectRequest } from '../publications/CollectPublication';
import { CreateCommentRequest } from '../publications/CreateComment';
import { CreateMirrorRequest } from '../publications/CreateMirror';
import { CreatePostRequest } from '../publications/CreatePost';
import { TokenAllowanceRequest } from '../wallets/TokenAllowance';

export type SupportedTransactionRequest =
  | CollectRequest
  | CreateCommentRequest
  | CreateMirrorRequest
  | CreatePostRequest
  | CreateProfileRequest
  | FollowRequest
  | TokenAllowanceRequest
  | UnfollowRequest
  | UpdateDispatcherConfigRequest
  | UpdateFollowPolicyRequest
  | UpdateProfileDetailsRequest
  | UpdateProfileImageRequest;

export const ProtocolCallKinds = [
  TransactionKind.COLLECT_PUBLICATION,
  TransactionKind.CREATE_COMMENT,
  TransactionKind.CREATE_POST,
  TransactionKind.CREATE_PROFILE,
  TransactionKind.FOLLOW_PROFILES,
  TransactionKind.MIRROR_PUBLICATION,
  TransactionKind.UPDATE_PROFILE_IMAGE,
  TransactionKind.UNFOLLOW_PROFILE,
  TransactionKind.UPDATE_PROFILE_DETAILS,
  TransactionKind.UPDATE_FOLLOW_POLICY,
  TransactionKind.UPDATE_DISPATCHER_CONFIG,
];
