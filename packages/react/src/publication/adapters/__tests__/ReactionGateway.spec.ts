import { faker } from '@faker-js/faker';
import { ReactionTypes, ValidationError } from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  createAddReactionMockedResponse,
  createRemoveReactionMockedResponse,
  createRemoveReactionMockedResponseWithGraphqlValidationError,
} from '@lens-protocol/api-bindings/mocks';
import { mockProfileId, mockReactionRequest } from '@lens-protocol/domain/mocks';

import { ReactionGateway } from '../ReactionGateway';

describe(`Given an instance of the ${ReactionGateway.name}`, () => {
  describe(`and the ${ReactionGateway.prototype.add.name} method`, () => {
    it(`should add reaction with success`, async () => {
      const profileId = mockProfileId();
      const publicationId = faker.datatype.uuid();

      const apolloClient = createMockApolloClientWithMultipleResponses([
        createAddReactionMockedResponse({
          variables: {
            publicationId,
            profileId,
            reaction: ReactionTypes.Upvote,
          },
        }),
      ]);

      const gateway = new ReactionGateway(apolloClient);
      const request = mockReactionRequest({
        publicationId,
        profileId,
      });

      await gateway.add(request);
    });
  });

  describe(`and the ${ReactionGateway.prototype.remove.name} method`, () => {
    it(`should remove reaction with success`, async () => {
      const profileId = mockProfileId();
      const publicationId = faker.datatype.uuid();

      const apolloClient = createMockApolloClientWithMultipleResponses([
        createRemoveReactionMockedResponse({
          variables: {
            publicationId,
            profileId,
            reaction: ReactionTypes.Upvote,
          },
        }),
      ]);

      const gateway = new ReactionGateway(apolloClient);
      const request = mockReactionRequest({
        publicationId,
        profileId,
      });

      await gateway.remove(request);
    });

    it(`should be resilient to ${ValidationError.name} and resolve the promise`, async () => {
      const profileId = mockProfileId();
      const publicationId = faker.datatype.uuid();
      const apolloClient = createMockApolloClientWithMultipleResponses([
        createRemoveReactionMockedResponseWithGraphqlValidationError({
          variables: {
            publicationId,
            profileId,
            reaction: ReactionTypes.Upvote,
          },
        }),
      ]);

      const gateway = new ReactionGateway(apolloClient);
      const request = mockReactionRequest({
        publicationId,
        profileId,
      });

      await gateway.remove(request);
    });

    it(`should propagate any other error`, async () => {
      const apolloClient = createMockApolloClientWithMultipleResponses([
        // no mocks on purpose to trigger network issue
      ]);

      const gateway = new ReactionGateway(apolloClient);
      const request = mockReactionRequest();

      await expect(gateway.remove(request)).rejects.toThrow();
    });
  });
});
