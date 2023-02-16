import { ReactionTypes, Reactions } from '.';
import { setupAuthentication } from '../authentication/__helpers__/setupAuthentication';
import { testWalletProfileId } from '../authentication/__helpers__/setupTestWallet';
import { mumbaiSandbox } from '../consts/environments';
import { NotAuthenticatedError } from '../consts/errors';

const testConfig = {
  environment: mumbaiSandbox,
};

describe(`Given the ${Reactions.name} configured to work with sandbox`, () => {
  describe(`and the instance is not authenticated`, () => {
    const reactions = new Reactions(testConfig);

    const reactionRequest = {
      profileId: testWalletProfileId,
      publicationId: '0x05-0x04',
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
  });

  describe(`and the instance is authenticated`, () => {
    const getAuthentication = setupAuthentication();
    const reactionRequest = {
      profileId: testWalletProfileId,
      publicationId: '0x05-0x04',
      reaction: ReactionTypes.Upvote,
    };

    describe(`when ${Reactions.prototype.add.name} method is called`, () => {
      it(`should execute with success`, async () => {
        const authentication = getAuthentication();
        const reactions = new Reactions(testConfig, authentication);

        const result = await reactions.add(reactionRequest);

        expect(result.isSuccess()).toBeTruthy();
        expect(result.unwrap()).toBe(undefined);
      });
    });

    describe(`when ${Reactions.prototype.remove.name} method is called`, () => {
      it(`should execute with success`, async () => {
        const authentication = getAuthentication();
        const reactions = new Reactions(testConfig, authentication);

        const result = await reactions.remove(reactionRequest);

        expect(result.isSuccess()).toBeTruthy();
        expect(result.unwrap()).toBe(undefined);
      });
    });
  });
});
