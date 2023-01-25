import { LensClient, staging } from './index';

describe(`Given the ${LensClient.name} configured to work with staging environment`, () => {
  const config = {
    environment: staging,
  };
  const lensClient = new LensClient(config);

  describe(`when a method from Auth module is called`, () => {
    it(`returns the challenge for an address`, async () => {
      const address = '0x3fC47cdDcFd59dce20694b575AFc1D94186775b0';
      const result = await lensClient.auth.generateChallenge(address);

      expect(result).toContain('Sign in with ethereum to lens');
    });
  });

  describe(`when a method from Profile module is called`, () => {
    it(`returns the requested profile`, async () => {
      const result = await lensClient.profile.getProfileByHandle('kristestnet.test');

      expect(result).toMatchObject({
        id: '0x53a8',
        handle: 'kristestnet.test',
      });
    });
  });

  describe(`when a method from Publication module is called`, () => {
    it(`returns the requested profile`, async () => {
      const result = await lensClient.publication.getPublicationById('0x53a8-0x0f');

      expect(result).toMatchObject({
        __typename: 'Post',
        id: '0x53a8-0x0f',
      });
    });
  });
});
