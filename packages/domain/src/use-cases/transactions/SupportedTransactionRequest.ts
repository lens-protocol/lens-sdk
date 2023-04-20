import { ProtocolCallKind, TransactionRequestModel } from '../../entities';
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

type PickByKind<T extends TransactionRequestModel, K extends T['kind']> = T extends { kind: K }
  ? T
  : never;

export type ProtocolCallRequest = PickByKind<SupportedTransactionRequest, ProtocolCallKind>;
