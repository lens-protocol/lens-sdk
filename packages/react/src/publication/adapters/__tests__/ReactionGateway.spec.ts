import { faker } from '@faker-js/faker';
import { ReactionTypes, ValidationError } from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  createAddReactionMutationMockedResponse,
  createRemoveReactionMutationMockedResponse,
  createRemoveReactionMutationWithGraphqlValidationErrorResponse,
} from '@lens-protocol/api-bindings/mocks';
import { mockReactionRequest } from '@lens-protocol/domain/mocks';

import { ReactionGateway } from '../ReactionGateway';

describe(`Given an instance of the ${ReactionGateway.name}`, () => {
  describe(`and the ${ReactionGateway.prototype.add.name} method`, () => {
    it(`should add reaction with success`, async () => {
      const profileId = faker.datatype.uuid();
      const publicationId = faker.datatype.uuid();

      const apolloClient = createMockApolloClientWithMultipleResponses([
        createAddReactionMutationMockedResponse({
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
      const profileId = faker.datatype.uuid();
      const publicationId = faker.datatype.uuid();

      const apolloClient = createMockApolloClientWithMultipleResponses([
        createRemoveReactionMutationMockedResponse({
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
      const profileId = faker.datatype.uuid();
      const publicationId = faker.datatype.uuid();
      const apolloClient = createMockApolloClientWithMultipleResponses([
        createRemoveReactionMutationWithGraphqlValidationErrorResponse({
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
