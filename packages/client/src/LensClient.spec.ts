import LensClient, {
  Explore,
  Profile,
  Publication,
  ProxyAction,
  Reactions,
  Revenue,
  Search,
  Transaction,
  Notifications,
  Feed,
  Stats,
  Nonces,
} from '.';
import { mumbaiSandbox } from './consts/environments';

const testConfig = {
  environment: mumbaiSandbox,
};

describe(`Given the LensClient configured for sandbox`, () => {
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
