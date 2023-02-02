import { Wallet } from 'ethers';

import LensClient, { Credentials, mumbai, Profile, Reaction } from '.';

let credentialsVar: Credentials;
let authenticatedClientVar: LensClient;

async function setupTest(wallet: Wallet) {
  if (authenticatedClientVar && credentialsVar) {
    return {
      authenticatedClient: authenticatedClientVar,
      credentials: credentialsVar,
    };
  }

  authenticatedClientVar = LensClient.init(mumbai);
  const address = await wallet.getAddress();
  const challenge = await authenticatedClientVar.generateChallenge(address);
  const signature = await wallet.signMessage(challenge);

  credentialsVar = await authenticatedClientVar.authenticate(address, signature);

  return {
    authenticatedClient: authenticatedClientVar,
    credentials: credentialsVar,
  };
}

describe(`Given a LensClient configured for testnet and a wallet`, () => {
  const wallet = new Wallet(
    'ca9a3a3d4026e6228713e683a9c45ef65a538b2f9336813bd597f5effa38668d', // found on reddit
  );

  describe(`when authenticating with wallet signature`, () => {
    it(`should authenticate with success`, async () => {
      const {
        credentials: { accessToken, refreshToken },
      } = await setupTest(wallet);

      expect(accessToken.length).toBeGreaterThan(1);
      expect(refreshToken.length).toBeGreaterThan(1);
    });
  });

  describe(`when refreshing authentication from stored credentials`, () => {
    it(`should authenticate with success`, async () => {
      const {
        credentials: { refreshToken: storedRefreshToken },
      } = await setupTest(wallet);
      const client = LensClient.init(mumbai);

      const { accessToken, refreshToken } = await client.refreshCredentials(storedRefreshToken);

      expect(accessToken.length).toBeGreaterThan(1);
      expect(refreshToken.length).toBeGreaterThan(1);
    });
  });

  describe(`when validating an existing accessToken`, () => {
    it(`should pass the validation`, async () => {
      const {
        credentials: { accessToken },
      } = await setupTest(wallet);
      const client = LensClient.init(mumbai);

      const isValid = await client.isAccessTokenValid(accessToken);

      expect(isValid).toBe(true);
    });
  });

  describe(`when accessing the Profile module`, () => {
    it(`should return a new instance of Profile`, async () => {
      const client = LensClient.init(mumbai);

      expect(client.profile).toBeInstanceOf(Profile);
    });
  });

  describe(`when accessing the Reaction module and it requires authentication`, () => {
    it(`should return a new instance of Reaction`, async () => {
      const { authenticatedClient } = await setupTest(wallet);

      expect(authenticatedClient.reaction).toBeInstanceOf(Reaction);
    });
  });

  describe(`when accessing the Reaction module from not authenticated client`, () => {
    it(`should throw a Not authenticated error`, async () => {
      const client = LensClient.init(mumbai);

      expect(() => client.reaction).toThrow('Not authenticated');
    });
  });
});
