import { JustProtocolRequest } from '../../entities';
import { CreateProfileRequest } from '../profile/CreateProfile';
import { FollowRequest } from '../profile/FollowProfile';
import { UnfollowRequest } from '../profile/UnfollowProfile';
import { UpdateFollowPolicyRequest } from '../profile/UpdateFollowPolicy';
import { SetProfileMetadataRequest } from '../profile/UpdateProfileDetails';
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
  | UnfollowRequest
  | UpdateProfileManagersRequest
  | UpdateFollowPolicyRequest
  | SetProfileMetadataRequest;

export type ProtocolTransactionRequest = JustProtocolRequest<AnyTransactionRequest>;
