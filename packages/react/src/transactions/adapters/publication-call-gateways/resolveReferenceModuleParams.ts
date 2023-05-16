import { ReferenceModuleParams } from '@lens-protocol/api-bindings';
import {
  ReferencePolicyType,
  CreatePostRequest,
  CreateCommentRequest,
} from '@lens-protocol/domain/use-cases/publications';

export function resolveReferenceModuleParams(
  request: CreatePostRequest | CreateCommentRequest,
): ReferenceModuleParams | undefined {
  if (request.reference.type === ReferencePolicyType.FOLLOWERS_ONLY) {
    return {
      followerOnlyReferenceModule: true,
    };
  }

  if (request.reference.type === ReferencePolicyType.DEGREES_OF_SEPARATION) {
    return {
      degreesOfSeparationReferenceModule: request.reference.params,
    };
  }

  return undefined;
}
