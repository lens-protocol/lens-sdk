import { CreatePostRequest } from '../publications/CreatePost';
import { CreateProfileRequest } from '../profile/CreateProfile';
import { CreateCommentRequest } from '../publications/CreateComment';
import { CreateMirrorRequest } from '../publications/CreateMirror';
import { FollowRequest, UnconstrainedFollowRequest } from '../profile/FollowProfiles';
import { UnfollowRequest } from '../profile/UnfollowProfile';
import { TokenAllowanceRequest } from '../wallets/TokenAllowance';
import { CollectRequest, FreeCollectRequest } from '../publications/CollectPublication';
import { UpdateCoverImageRequest } from '../profile/UpdateCoverImage';
import { UpdateProfileDetailsRequest } from '../profile/UpdateProfileDetails';
import { UpdateFollowPolicyRequest } from '../profile/UpdateFollowPolicy';
import { UpdateDispatcherConfigRequest } from '../profile/UpdateDispatcherConfig';
import { UpdateProfileImageRequest } from '../profile/UpdateProfileImage';

export type SupportedTransactionRequest =
  | CollectRequest
  | CreateCommentRequest
  | CreateMirrorRequest
  | CreatePostRequest
  | CreateProfileRequest
  | FollowRequest
  | TokenAllowanceRequest
  | UnfollowRequest
  | UpdateCoverImageRequest
  | UpdateDispatcherConfigRequest
  | UpdateFollowPolicyRequest
  | UpdateProfileDetailsRequest
  | UpdateProfileImageRequest;

export type SignlessProtocolCallRequestModel = FreeCollectRequest | UnconstrainedFollowRequest;
