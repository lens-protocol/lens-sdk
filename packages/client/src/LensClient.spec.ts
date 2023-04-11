import { InMemoryStorageProvider } from '@lens-protocol/storage';
import { Wallet } from 'ethers';

import {
  Explore,
  Feed,
  LensClient,
  Modules,
  Nfts,
  Nonces,
  Notifications,
  Profile,
  ProxyAction,
  Publication,
  Reactions,
  Revenue,
  Search,
  Stats,
  Transaction,
} from '.';
import { buildTestEnvironment } from './__helpers__';

const testConfig = {
  environment: buildTestEnvironment(),
};

describe(`Given the ${LensClient.name} configured for the test environment`, () => {
  const client = new LensClient(testConfig);

  describe(`when accessing the ${Explore.name} module`, () => {
    it(`should return a new instance of ${Explore.name}`, () => {
      expect(client.explore).toBeInstanceOf(Explore);
    });
  });

  describe(`when accessing the ${Feed.name} module`, () => {
    it(`should return a new instance of ${Feed.name}`, () => {
      expect(client.feed).toBeInstanceOf(Feed);
    });
  });

  describe(`when accessing the ${Modules.name} module`, () => {
    it(`should return a new instance of ${Modules.name}`, () => {
      expect(client.modules).toBeInstanceOf(Modules);
    });
  });

  describe(`when accessing the ${Nfts.name} module`, () => {
    it(`should return a new instance of ${Nfts.name}`, () => {
      expect(client.nfts).toBeInstanceOf(Nfts);
    });
  });

  describe(`when accessing the ${Nonces.name} module`, () => {
    it(`should return a new instance of ${Nonces.name}`, () => {
      expect(client.nonces).toBeInstanceOf(Nonces);
    });
  });

  describe(`when accessing the ${Notifications.name} module`, () => {
    it(`should return a new instance of ${Notifications.name}`, () => {
      expect(client.notifications).toBeInstanceOf(Notifications);
    });
  });

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

  describe(`when accessing the ${ProxyAction.name} module`, () => {
    it(`should return a new instance of ${ProxyAction.name}`, () => {
      expect(client.proxyAction).toBeInstanceOf(ProxyAction);
    });
  });

  describe(`when accessing the ${Reactions.name} module`, () => {
    it(`should return a new instance of ${Reactions.name}`, () => {
      expect(client.reactions).toBeInstanceOf(Reactions);
    });
  });

  describe(`when accessing the ${Revenue.name} module`, () => {
    it(`should return a new instance of ${Revenue.name}`, () => {
      expect(client.revenue).toBeInstanceOf(Revenue);
    });
  });

  describe(`when accessing the ${Search.name} module`, () => {
    it(`should return a new instance of ${Search.name}`, () => {
      expect(client.search).toBeInstanceOf(Search);
    });
  });

  describe(`when accessing the ${Stats.name} module`, () => {
    it(`should return a new instance of ${Stats.name}`, () => {
      expect(client.stats).toBeInstanceOf(Stats);
    });
  });

  describe(`when accessing the ${Transaction.name} module`, () => {
    it(`should return a new instance of ${Transaction.name}`, () => {
      expect(client.transaction).toBeInstanceOf(Transaction);
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
