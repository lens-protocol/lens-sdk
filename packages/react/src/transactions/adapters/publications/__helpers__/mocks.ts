import {
  MomokaCommentRequest,
  MomokaPostRequest,
  OnchainCommentRequest,
  OnchainPostRequest,
} from '@lens-protocol/api-bindings';
import {
  CreateCommentRequest,
  CreatePostRequest,
} from '@lens-protocol/domain/use-cases/publications';

import { resolveOpenActionModuleInput } from '../resolveOpenActionModuleInput';
import { resolveReferenceModuleInput } from '../resolveReferenceModuleInput';

export function mockOnchainPostRequest(request: CreatePostRequest): OnchainPostRequest {
  return {
    contentURI: request.metadata,
    referenceModule: request.reference && resolveReferenceModuleInput(request.reference),
    openActionModules: request.actions?.map(resolveOpenActionModuleInput),
  };
}

export function mockMomokaPostRequest(request: CreatePostRequest): MomokaPostRequest {
  return {
    contentURI: request.metadata,
  };
}

export function mockOnchainCommentRequest(request: CreateCommentRequest): OnchainCommentRequest {
  return {
    commentOn: request.commentOn,
    contentURI: request.metadata,
    referenceModule: request.reference && resolveReferenceModuleInput(request.reference),
    openActionModules: request.actions?.map(resolveOpenActionModuleInput),
  };
}

export function mockMomokaCommentRequest(request: CreateCommentRequest): MomokaCommentRequest {
  return {
    commentOn: request.commentOn,
    contentURI: request.metadata,
  };
}
