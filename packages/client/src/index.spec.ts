import { Wallet } from 'ethers';

import { LensAuth, LensClient, LensProfile, LensProfileWithAuth, staging } from '.';

describe(`Given the staging environment and a wallet`, () => {
  const lens = new LensClient({
    environment: staging,
  });

  const wallet = new Wallet(
    'ca9a3a3d4026e6228713e683a9c45ef65a538b2f9336813bd597f5effa38668d', // found on reddit
  );

  describe(`when experimenting with multiple lens sub-clients`, () => {
    it(`returns success`, async () => {
      const address = await wallet.getAddress();

      const auth = new LensAuth(lens);
      const challenge = await auth.generateChallenge(address);

      const signature = await wallet.signMessage(challenge);
      const credentials = await auth.generateCredentials(address, signature);

      const profileClientAuth = new LensProfileWithAuth(lens, credentials.accessToken);

      const profileClient = new LensProfile(lens);

      const defaultProfile = await profileClient.getDefaultProfile(address);

      console.log(profileClientAuth, defaultProfile?.id);
      // get profiles owned by address
      // set default profile
      // get default profile
      // enable dispatcher
      // follow

      // await profileClientAuth.enableDispatcher()
      // await profileClientAuth.follow('0x53a8'); // still not working

      // const profileClient = new LensProfile(lens);
      // const profile = await profileClient.getProfileByHandle('redditcompromised.test');

      // expect(profile).toMatchObject({
      //   id: '0x63ef',
      //   handle: 'redditcompromised.test',
      // });
    });
  });
});
