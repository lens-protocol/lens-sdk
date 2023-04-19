import { Reactions } from '.';
import {
  buildTestEnvironment,
  describeAuthenticatedScenario,
  existingProfileId,
  existingPublicationId,
} from '../__helpers__';
import { NotAuthenticatedError } from '../consts/errors';
import { ReactionTypes } from '../graphql/types.generated';

const testConfig = {
  environment: buildTestEnvironment(),
};

describe(`Given the ${Reactions.name} configured to work with the test environment`, () => {
  describe(`and the instance is not authenticated`, () => {
    const reactions = new Reactions(testConfig);

    const reactionRequest = {
      profileId: existingProfileId,
      publicationId: existingPublicationId,
      reaction: ReactionTypes.Upvote,
    };

    describe(`when ${Reactions.prototype.add.name} method is called`, () => {
      it(`should return a failure`, async () => {
        const result = await reactions.add(reactionRequest);

        expect(result.isFailure()).toBeTruthy();
        expect(() => result.unwrap()).toThrow(NotAuthenticatedError);
      });
    });

    describe(`when ${Reactions.prototype.remove.name} method is called`, () => {
      it(`should return a failure`, async () => {
        const result = await reactions.remove(reactionRequest);

        expect(result.isFailure()).toBeTruthy();
        expect(() => result.unwrap()).toThrow(NotAuthenticatedError);
      });
    });

    describe(`when ${Reactions.prototype.toPublication.name} method is called`, () => {
      it(`should run successfully`, async () => {
        await expect(
          reactions.toPublication({
            publicationId: existingPublicationId,
          }),
        ).resolves.not.toThrow();
      });
    });
  });

  describeAuthenticatedScenario({ withNewProfile: true })((getTestSetup) => {
    describe(`when ${Reactions.prototype.add.name} method is called`, () => {
      it(`should execute with success`, async () => {
        const { authentication, profileId } = getTestSetup();
        const reactions = new Reactions(testConfig, authentication);
        const reactionRequest = {
          profileId,
          publicationId: existingPublicationId,
          reaction: ReactionTypes.Upvote,
        };

        const result = await reactions.add(reactionRequest);

        expect(result.isSuccess()).toBeTruthy();
        expect(result.unwrap()).toBe(undefined);
      });
    });

    describe(`when ${Reactions.prototype.remove.name} method is called`, () => {
      it(`should execute with success`, async () => {
        const { authentication, profileId } = getTestSetup();
        const reactions = new Reactions(testConfig, authentication);
        const reactionRequest = {
          profileId,
          publicationId: existingPublicationId,
          reaction: ReactionTypes.Upvote,
        };

        const result = await reactions.remove(reactionRequest);

        expect(result.isSuccess()).toBeTruthy();
        expect(result.unwrap()).toBe(undefined);
      });
    });
  });
});
