import LensClient, { Profile, Reactions, Search, Explore } from '.';
import { mumbaiSandbox } from './consts/environments';

const testConfig = {
  environment: mumbaiSandbox,
};

describe(`Given the LensClient configured for sandbox`, () => {
  const client = new LensClient(testConfig);

  describe(`when checking authentication features exposed by the client`, () => {
    it(`should offer ${LensClient.prototype.generateChallenge.name} function`, async () => {
      expect(typeof client.generateChallenge).toEqual('function');
    });

    it(`should offer ${LensClient.prototype.authenticate.name} function`, async () => {
      expect(typeof client.authenticate).toEqual('function');
    });

    it(`should offer ${LensClient.prototype.isAuthenticated.name} function`, async () => {
      expect(typeof client.isAuthenticated).toEqual('function');
    });
  });

  describe(`when accessing the Profile module`, () => {
    it(`should return a new instance of Profile`, async () => {
      expect(client.profile).toBeInstanceOf(Profile);
    });
  });

  describe(`when accessing the Reaction module`, () => {
    it(`should return a new instance of Reaction`, async () => {
      expect(client.reactions).toBeInstanceOf(Reactions);
    });
  });

  describe(`when accessing the Search module`, () => {
    it(`should return a new instance of Search`, async () => {
      const client = LensClient.init(testConfig);

      expect(client.search).toBeInstanceOf(Search);
    });
  });

  describe(`when accessing the Explore module`, () => {
    it(`should return a new instance of Explore`, async () => {
      const client = LensClient.init(testConfig);

      expect(client.explore).toBeInstanceOf(Explore);
    });
  });
});
