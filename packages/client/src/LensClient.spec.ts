import LensClient, { Profile, Reactions, Search } from '.';
import { mumbaiSandbox } from './consts/environments';

const testConfig = {
  environment: mumbaiSandbox,
};

describe(`Given the LensClient configured for sandbox`, () => {
  // BE CAREFUL, below test causes race condition
  // with setupTestCredentials helper used in other tests
  // the same wallet is authenticated twice

  // describe(`when authenticating with wallet signature`, () => {
  //   it(`should authenticate without throwing`, async () => {
  //     const wallet = setupTestWallet();
  //     const client = LensClient.init(testConfig);
  //     const address = await wallet.getAddress();
  //     const challenge = await client.generateChallenge(address);
  //     const signature = await wallet.signMessage(challenge);

  //     await expect(client.authenticate(address, signature)).resolves.not.toThrow();
  //   });
  // });

  describe(`when accessing the Profile module`, () => {
    it(`should return a new instance of Profile`, async () => {
      const client = LensClient.init(testConfig);

      expect(client.profile).toBeInstanceOf(Profile);
    });
  });

  describe(`when accessing the Reaction module`, () => {
    it(`should return a new instance of Reaction`, async () => {
      const client = LensClient.init(testConfig);

      expect(client.reactions).toBeInstanceOf(Reactions);
    });
  });

  describe(`when accessing the Search module`, () => {
    it(`should return a new instance of Search`, async () => {
      const client = LensClient.init(testConfig);

      expect(client.search).toBeInstanceOf(Search);
    });
  });
});
