import { CreateProfileRequest } from '../profile/CreateProfile';
import { FollowRequest, UnconstrainedFollowRequest } from '../profile/FollowProfiles';
import { UnfollowRequest } from '../profile/UnfollowProfile';
import { UpdateCoverImageRequest } from '../profile/UpdateCoverImage';
import { UpdateDispatcherConfigRequest } from '../profile/UpdateDispatcherConfig';
import { UpdateFollowPolicyRequest } from '../profile/UpdateFollowPolicy';
import { UpdateProfileDetailsRequest } from '../profile/UpdateProfileDetails';
import { UpdateProfileImageRequest } from '../profile/UpdateProfileImage';
import { CollectRequest, FreeCollectRequest } from '../publications/CollectPublication';
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
  | UpdateCoverImageRequest
  | UpdateDispatcherConfigRequest
  | UpdateFollowPolicyRequest
  | UpdateProfileDetailsRequest
  | UpdateProfileImageRequest;

export type SignlessProtocolCallRequestModel = FreeCollectRequest | UnconstrainedFollowRequest;
