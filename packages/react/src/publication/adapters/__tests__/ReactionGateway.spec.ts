import { ReactionTypes, ValidationError } from '@lens-protocol/api-bindings';
import {
  mockLensApolloClient,
  createAddReactionMockedResponse,
  createRemoveReactionMockedResponse,
  createRemoveReactionMockedResponseWithGraphqlValidationError,
} from '@lens-protocol/api-bindings/mocks';
import { mockProfileId, mockPublicationId, mockReactionRequest } from '@lens-protocol/domain/mocks';

import { ReactionGateway } from '../ReactionGateway';

describe(`Given an instance of the ${ReactionGateway.name}`, () => {
  describe(`and the ${ReactionGateway.prototype.add.name} method`, () => {
    it(`should add reaction with success`, async () => {
      const profileId = mockProfileId();
      const publicationId = mockPublicationId();

      const apolloClient = mockLensApolloClient([
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
      const publicationId = mockPublicationId();

      const apolloClient = mockLensApolloClient([
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
      const publicationId = mockPublicationId();
      const apolloClient = mockLensApolloClient([
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
      const apolloClient = mockLensApolloClient([
        // no mocks on purpose to trigger network issue
      ]);

      const gateway = new ReactionGateway(apolloClient);
      const request = mockReactionRequest();

      await expect(gateway.remove(request)).rejects.toThrow();
    });
  });
});
