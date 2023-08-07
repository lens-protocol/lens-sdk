import { InMemoryStorageProvider } from '@lens-protocol/storage';
import { Wallet } from 'ethers';

import { LensClient } from '.';
import { buildTestEnvironment } from './__helpers__';
import { Profile } from './profile';
import { Publication } from './publication';
import { Search } from './search';

const testConfig = {
  environment: buildTestEnvironment(),
};

describe(`Given the ${LensClient.name} configured for the test environment`, () => {
  const client = new LensClient(testConfig);

  describe(`when accessing the ${Profile.name} module`, () => {
    it(`should return a new instance of ${Profile.name}`, () => {
      expect(client.profile).toBeInstanceOf(Profile);
    });
  });

  describe(`when accessing the ${Publication.name} module`, () => {
    it(`should return a new instance of ${Publication.name}`, () => {
      expect(client.publication).toBeInstanceOf(Publication);
    });
  });

  describe(`when accessing the ${Search.name} module`, () => {
    it(`should return a new instance of ${Search.name}`, () => {
      expect(client.search).toBeInstanceOf(Search);
    });
  });
});

describe(`Given storage and two ${LensClient.name} instances sharing the same storage`, () => {
  const storage = new InMemoryStorageProvider();
  const config = {
    environment: buildTestEnvironment(),
    storage,
  };
  const client1 = new LensClient(config);
  const client2 = new LensClient(config);

  describe(`when 1st client is authenticated`, () => {
    it(`should allow 2nd client to trigger methods that require authentication`, async () => {
      const wallet = Wallet.createRandom();
      const walletAddress = await wallet.getAddress();
      const challenge = await client1.authentication.generateChallenge(walletAddress);
      const signature = await wallet.signMessage(challenge);

      // authenticate 1st client
      await client1.authentication.authenticate(walletAddress, signature);

      expect(await client1.authentication.isAuthenticated()).toBeTruthy();

      // 2nd client will get accessToken from the stored refreshToken on the first call to any method, including isAuthenticated
      expect(await client2.authentication.isAuthenticated()).toBeTruthy();
    });
  });
});
