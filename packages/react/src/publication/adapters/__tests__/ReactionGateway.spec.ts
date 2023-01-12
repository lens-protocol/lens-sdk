import { faker } from '@faker-js/faker';
import { ReactionTypes } from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  createAddReactionMutationMockedResponse,
  createAddReactionMutationWithGraphqlValidationErrorResponse,
  createRemoveReactionMutationMockedResponse,
  createRemoveReactionMutationWithGraphqlValidationErrorResponse,
} from '@lens-protocol/api-bindings/mocks';
import { mockReactionRequest } from '@lens-protocol/domain/mocks';
import { NetworkError, ReactionError } from '@lens-protocol/domain/use-cases/publications';

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
      const result = await gateway.add(request);

      expect(result.isSuccess()).toBe(true);
    });

    it(`should fail with ReactionError if isGraphqlValidationError`, async () => {
      const profileId = faker.datatype.uuid();
      const publicationId = faker.datatype.uuid();

      const apolloClient = createMockApolloClientWithMultipleResponses([
        createAddReactionMutationWithGraphqlValidationErrorResponse({
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
      const result = await gateway.add(request);

      expect(result.isFailure()).toBe(true);
      if (result.isFailure()) {
        expect(result.error).toBeInstanceOf(ReactionError);
      }
    });

    it(`should throw NetworkError if unknown reason`, async () => {
      const apolloClient = createMockApolloClientWithMultipleResponses([
        // no mocks on purpose to trigger network issue
      ]);

      const gateway = new ReactionGateway(apolloClient);
      const request = mockReactionRequest();

      await expect(gateway.add(request)).rejects.toThrow(NetworkError);
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
      const result = await gateway.remove(request);

      expect(result.isSuccess()).toBe(true);
    });

    it(`should fail with ReactionError if isGraphqlValidationError`, async () => {
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
      const result = await gateway.add(request);

      expect(result.isFailure()).toBe(true);
      if (result.isFailure()) {
        expect(result.error).toBeInstanceOf(ReactionError);
      }
    });

    it(`should throw NetworkError if unknown reason`, async () => {
      const apolloClient = createMockApolloClientWithMultipleResponses([
        // no mocks on purpose to trigger network issue
      ]);

      const gateway = new ReactionGateway(apolloClient);
      const request = mockReactionRequest();

      await expect(gateway.remove(request)).rejects.toThrow(NetworkError);
    });
  });
});
