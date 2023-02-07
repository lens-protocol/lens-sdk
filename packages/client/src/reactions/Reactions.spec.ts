import { ReactionTypes, Reactions } from '.';
import { setupAuthentication } from '../authentication/__helpers__/setupAuthentication';
import { mumbaiSandbox } from '../consts/environments';

const testConfig = {
  environment: mumbaiSandbox,
};

describe(`Given the ${Reactions.name} configured to work with sandbox`, () => {
  describe(`when the instance is not authenticated and method ${Reactions.prototype.add.name} is called`, () => {
    it(`should throw an error`, async () => {
      const reactions = new Reactions(testConfig);

      const reactionRequest = {
        profileId: '0x0185',
        publicationId: '0x05-0x04',
        reaction: ReactionTypes.Upvote,
      };

      await expect(reactions.add(reactionRequest)).rejects.toThrow('Not Authenticated');
    });
  });

  describe(`when the instance is authenticated and method ${Reactions.prototype.add.name} is called`, () => {
    it(`should execute with success`, async () => {
      const authentication = await setupAuthentication();
      const reactions = new Reactions(testConfig, authentication);

      const reactionRequest = {
        profileId: '0x0185',
        publicationId: '0x05-0x04',
        reaction: ReactionTypes.Upvote,
      };

      await expect(reactions.add(reactionRequest)).resolves.not.toThrow();
    });
  });
});
