import LensClient, { Profile, Reactions, Search, Explore, Revenue } from '.';
import { mumbaiSandbox } from './consts/environments';

const testConfig = {
  environment: mumbaiSandbox,
};

describe(`Given the LensClient configured for sandbox`, () => {
  const client = new LensClient(testConfig);

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
      expect(client.search).toBeInstanceOf(Search);
    });
  });

  describe(`when accessing the Explore module`, () => {
    it(`should return a new instance of Explore`, async () => {
      expect(client.explore).toBeInstanceOf(Explore);
    });
  });

  describe(`when accessing the Revenue module`, () => {
    it(`should return a new instance of Revenue`, async () => {
      expect(client.revenue).toBeInstanceOf(Revenue);
    });
  });
});
