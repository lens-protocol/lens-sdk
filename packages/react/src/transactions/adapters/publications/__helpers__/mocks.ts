import {
  MomokaCommentRequest,
  MomokaMirrorRequest,
  MomokaPostRequest,
  MomokaQuoteRequest,
  OnchainCommentRequest,
  OnchainMirrorRequest,
  OnchainPostRequest,
  OnchainQuoteRequest,
} from '@lens-protocol/api-bindings';
import {
  CreateCommentRequest,
  CreateMirrorRequest,
  CreatePostRequest,
  CreateQuoteRequest,
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

export function mockOnchainMirrorRequest(request: CreateMirrorRequest): OnchainMirrorRequest {
  return {
    mirrorOn: request.mirrorOn,
  };
}

export function mockMomokaMirrorRequest(request: CreateMirrorRequest): MomokaMirrorRequest {
  return {
    mirrorOn: request.mirrorOn,
  };
}

export function mockOnchainQuoteRequest(request: CreateQuoteRequest): OnchainQuoteRequest {
  return {
    quoteOn: request.quoteOn,
    contentURI: request.metadata,
    referenceModule: request.reference && resolveReferenceModuleInput(request.reference),
    openActionModules: request.actions?.map(resolveOpenActionModuleInput),
  };
}

export function mockMomokaQuoteRequest(request: CreateQuoteRequest): MomokaQuoteRequest {
  return {
    quoteOn: request.quoteOn,
    contentURI: request.metadata,
  };
}
