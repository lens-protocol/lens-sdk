import { Wallet } from '@ethersproject/wallet';
import { InMemoryStorageProvider } from '@lens-protocol/storage';

import { LensClient } from '.';
import { buildTestEnvironment } from './__helpers__';

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
      const { id, text } = await client1.authentication.generateChallenge({
        signedBy: walletAddress,
      });
      const signature = await wallet.signMessage(text);

      // authenticate 1st client
      await client1.authentication.authenticate({
        id,
        signature,
      });

      expect(await client1.authentication.isAuthenticated()).toBeTruthy();

      // 2nd client will get accessToken from the stored refreshToken on the first call to any method, including isAuthenticated
      expect(await client2.authentication.isAuthenticated()).toBeTruthy();
    });
  });
});
