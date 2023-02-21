import { setupRandomAuthentication } from '../authentication/__helpers__/setupAuthentication';
import { mumbaiSandbox } from '../consts/environments';
import { Feed } from './Feed';

const testConfig = {
  environment: mumbaiSandbox,
};

describe(`Given the ${Feed.name} configured to work with sandbox`, () => {
  const getAuthentication = setupRandomAuthentication();

  describe(`when the method ${Feed.prototype.fetch.name} is called`, () => {
    it('should execute with success', async () => {
      const auth = getAuthentication();
      const feed = new Feed(testConfig, auth);

      await expect(
        feed.fetch({
          profileId: '0x0185',
          limit: 10,
        }),
      ).resolves.not.toThrow();
    });
  });

  describe(`when the method ${Feed.prototype.fetchHighlights.name} is called`, () => {
    it('should execute with success', async () => {
      const auth = getAuthentication();
      const feed = new Feed(testConfig, auth);

      await expect(
        feed.fetchHighlights({
          profileId: '0x0185',
          limit: 10,
        }),
      ).resolves.not.toThrow();
    });
  });
});
