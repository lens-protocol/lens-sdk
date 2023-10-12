import { MomokaPostRequest, OnchainPostRequest } from '@lens-protocol/api-bindings';
import { CreatePostRequest } from '@lens-protocol/domain/use-cases/publications';

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
