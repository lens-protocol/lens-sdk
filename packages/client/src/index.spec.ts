import { Wallet } from 'ethers';

import { LensAuth, LensClient, staging } from '.';

describe(`Given the staging environment and a wallet`, () => {
  const lens = new LensClient({
    environment: staging,
  });

  const wallet = new Wallet(
    'ca9a3a3d4026e6228713e683a9c45ef65a538b2f9336813bd597f5effa38668d', // found on reddit
  );

  describe(`when using this spec as a playground`, () => {
    it(`returns success or not`, async () => {
      const address = await wallet.getAddress();

      const auth = new LensAuth(lens);
      const challenge = await auth.generateChallenge(address);

      const signature = await wallet.signMessage(challenge);
      const { accessToken, refreshToken } = await auth.generateCredentials(address, signature);

      expect(accessToken.length).toBeGreaterThan(1);
      expect(refreshToken.length).toBeGreaterThan(1);
    });
  });
});
