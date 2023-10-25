import { JustProtocolRequest } from '../../entities';
import { CreateProfileRequest } from '../profile/CreateProfile';
import { FollowRequest } from '../profile/FollowProfile';
import { LinkHandleRequest } from '../profile/LinkHandle';
import { SetProfileMetadataRequest } from '../profile/SetProfileMetadata';
import { UnblockProfilesRequest } from '../profile/UnblockProfiles';
import { UnfollowRequest } from '../profile/UnfollowProfile';
import { UnlinkHandleRequest } from '../profile/UnlinkHandle';
import { UpdateFollowPolicyRequest } from '../profile/UpdateFollowPolicy';
import { UpdateProfileManagersRequest } from '../profile/UpdateProfileManagers';
import { CreateCommentRequest } from '../publications/CreateComment';
import { CreateMirrorRequest } from '../publications/CreateMirror';
import { CreatePostRequest } from '../publications/CreatePost';
import { CreateQuoteRequest } from '../publications/CreateQuote';
import { OpenActionRequest } from '../publications/OpenAction';
import { TokenAllowanceRequest } from './TokenAllowance';

export type AnyTransactionRequest =
  | OpenActionRequest
  | CreateCommentRequest
  | CreateMirrorRequest
  | CreatePostRequest
  | CreateQuoteRequest
  | CreateProfileRequest
  | FollowRequest
  | TokenAllowanceRequest
  | UnblockProfilesRequest
  | UnfollowRequest
  | UpdateProfileManagersRequest
  | UpdateFollowPolicyRequest
  | SetProfileMetadataRequest
  | LinkHandleRequest
  | UnlinkHandleRequest;

export type ProtocolTransactionRequest = JustProtocolRequest<AnyTransactionRequest>;
