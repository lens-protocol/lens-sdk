import { Wallet } from 'ethers';

import LensClient, { Credentials, mumbai, ReactionTypes } from '.';

let credentials: Credentials;
const getCredentials = async (wallet: Wallet) => {
  if (credentials) {
    return credentials;
  }
  const client = LensClient.init(mumbai);
  const address = await wallet.getAddress();
  const challenge = await client.generateChallenge(address);
  const signature = await wallet.signMessage(challenge);

  credentials = await client.authenticate(address, signature);
  return credentials;
};

const getAuthenticatedClient = async (wallet: Wallet) => {
  const client = LensClient.init(mumbai);
  const address = await wallet.getAddress();
  const challenge = await client.generateChallenge(address);
  const signature = await wallet.signMessage(challenge);

  await client.authenticate(address, signature);
  return client;
};

describe(`Given a LensClient configured for testnet and a wallet`, () => {
  const wallet = new Wallet(
    'ca9a3a3d4026e6228713e683a9c45ef65a538b2f9336813bd597f5effa38668d', // found on reddit
  );

  describe(`when authenticating with wallet signature`, () => {
    it(`authenticates with success`, async () => {
      const { accessToken, refreshToken } = await getCredentials(wallet);

      expect(accessToken.length).toBeGreaterThan(1);
      expect(refreshToken.length).toBeGreaterThan(1);
    });
  });

  describe(`when refreshing authentication from stored credentials`, () => {
    it(`authenticates with success`, async () => {
      const { refreshToken: storedRefreshToken } = await getCredentials(wallet);
      const client = LensClient.init(mumbai);

      const { accessToken, refreshToken } = await client.refreshCredentials(storedRefreshToken);

      expect(accessToken.length).toBeGreaterThan(1);
      expect(refreshToken.length).toBeGreaterThan(1);
    });
  });

  describe(`when checking if access token is valid`, () => {
    it(`returns true`, async () => {
      const { accessToken } = await getCredentials(wallet);
      const client = LensClient.init(mumbai);

      const isValid = await client.isAccessTokenValid(accessToken);

      expect(isValid).toBe(true);
    });
  });

  describe(`when adding a reaction that requires authentication`, () => {
    it(`adds a reaction with success`, async () => {
      const client = await getAuthenticatedClient(wallet);
      const address = await wallet.getAddress();
      const myProfile = await client.profile.fetchDefault(address);

      if (!myProfile) {
        return;
      }

      const reactionRequest = {
        profileId: myProfile.id,
        publicationId: '0x18-0x37',
        reaction: ReactionTypes.Upvote,
      };

      await expect(client.reaction.add(reactionRequest)).resolves.not.toThrow();
    });
  });

  describe(`when calling a reaction from not authenticated client`, () => {
    it(`throws an error`, async () => {
      const client = LensClient.init(mumbai);
      const address = await wallet.getAddress();
      const myProfile = await client.profile.fetchDefault(address);

      if (!myProfile) {
        return;
      }

      expect(() => client.reaction).toThrow('Not authenticated');
    });
  });
});
