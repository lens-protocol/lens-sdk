import { JustProtocolRequest } from '../../entities';
import { CreateProfileRequest } from '../profile/CreateProfile';
import { FollowRequest } from '../profile/FollowProfiles';
import { UnfollowRequest } from '../profile/UnfollowProfile';
import { UpdateFollowPolicyRequest } from '../profile/UpdateFollowPolicy';
import { UpdateProfileDetailsRequest } from '../profile/UpdateProfileDetails';
import { UpdateProfileImageRequest } from '../profile/UpdateProfileImage';
import { UpdateProfileManagersRequest } from '../profile/UpdateProfileManagers';
import { CollectRequest } from '../publications/CollectPublication';
import { CreateCommentRequest } from '../publications/CreateComment';
import { CreateMirrorRequest } from '../publications/CreateMirror';
import { CreatePostRequest } from '../publications/CreatePost';
import { TokenAllowanceRequest } from '../wallets/TokenAllowance';

export type AnyTransactionRequest =
  | CollectRequest
  | CreateCommentRequest
  | CreateMirrorRequest
  | CreatePostRequest
  | CreateProfileRequest
  | FollowRequest
  | TokenAllowanceRequest
  | UnfollowRequest
  | UpdateProfileManagersRequest
  | UpdateFollowPolicyRequest
  | UpdateProfileDetailsRequest
  | UpdateProfileImageRequest;

export type ProtocolTransactionRequest = JustProtocolRequest<AnyTransactionRequest>;
