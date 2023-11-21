import { ReactionTypes } from '@lens-protocol/api-bindings';
import { mockProfileId, mockPublicationId } from '@lens-protocol/domain/mocks';

import { ReactionRequest } from '../ReactionGateway';

export function mockReactionRequest(overrides?: Partial<ReactionRequest>): ReactionRequest {
  return {
    profileId: mockProfileId(),
    publicationId: mockPublicationId(),
    reactionType: ReactionTypes.Upvote,
    ...overrides,
  };
}
