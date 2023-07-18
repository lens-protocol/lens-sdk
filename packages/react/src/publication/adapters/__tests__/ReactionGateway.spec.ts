import { ReactionTypes, ValidationError } from '@lens-protocol/api-bindings';
import {
  mockLensApolloClient,
  mockAddReactionResponse,
  mockRemoveReactionResponse,
  mockRemoveReactionResponseWithGraphqlValidationError,
} from '@lens-protocol/api-bindings/mocks';
import { ReactionType } from '@lens-protocol/domain/entities';
import { mockProfileId, mockPublicationId, mockReactionRequest } from '@lens-protocol/domain/mocks';

import { ExtendedReactionRequest, ReactionGateway } from '../ReactionGateway';

describe(`Given an instance of the ${ReactionGateway.name}`, () => {
  describe(`and the ${ReactionGateway.prototype.add.name} method`, () => {
    it(`should add reaction with success`, async () => {
      const profileId = mockProfileId();
      const publicationId = mockPublicationId();

      const apolloClient = mockLensApolloClient([
        mockAddReactionResponse({
          variables: {
            publicationId,
            profileId,
            reaction: ReactionTypes.Upvote,
          },
        }),
      ]);

      const gateway = new ReactionGateway(apolloClient);
      const request = mockReactionRequest<ExtendedReactionRequest>({
        publicationId,
        profileId,
        existingReactionType: undefined,
      });

      await gateway.add(request);
    });

    describe(`and there is already an existing reaction`, () => {
      it(`should first remove existing reaction before adding a new one`, async () => {
        const profileId = mockProfileId();
        const publicationId = mockPublicationId();

        const apolloClient = mockLensApolloClient([
          mockRemoveReactionResponse({
            variables: {
              publicationId,
              profileId,
              reaction: ReactionTypes.Downvote,
            },
          }),
          mockAddReactionResponse({
            variables: {
              publicationId,
              profileId,
              reaction: ReactionTypes.Upvote,
            },
          }),
        ]);

        const gateway = new ReactionGateway(apolloClient);
        const request = mockReactionRequest<ExtendedReactionRequest>({
          publicationId,
          profileId,
          existingReactionType: ReactionType.DOWNVOTE,
        });

        await gateway.add(request);
      });
    });
  });

  describe(`and the ${ReactionGateway.prototype.remove.name} method`, () => {
    it(`should remove reaction with success`, async () => {
      const profileId = mockProfileId();
      const publicationId = mockPublicationId();

      const apolloClient = mockLensApolloClient([
        mockRemoveReactionResponse({
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
        mockRemoveReactionResponseWithGraphqlValidationError({
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
