import { mumbaiSandbox } from '../consts/environments';
import { PublicationMainFocus } from '../graphql/types.generated';
import { Publication } from './Publication';

const testConfig = {
  environment: mumbaiSandbox,
};

describe(`Given the ${Publication.name} configured to work with testnet`, () => {
  const publication = new Publication(testConfig);

  describe(`when a method ${Publication.prototype.fetch.name} is called`, () => {
    it(`should return the requested publication`, async () => {
      const id = '0x014e-0x0a';
      const result = await publication.fetch({ publicationId: id });

      expect(result).toMatchObject({
        id,
      });
    });
  });

  describe(`when a method ${Publication.prototype.fetchAll.name} is called`, () => {
    it(`should run successfully`, async () => {
      await expect(publication.fetchAll({ profileId: '0x50' })).resolves.not.toThrow();
    });
  });

  describe(`when a method ${Publication.prototype.whoCollected.name} is called`, () => {
    it(`should run successfully`, async () => {
      await expect(
        publication.whoCollected({ publicationId: '0x014e-0x0a' }),
      ).resolves.not.toThrow();
    });
  });

  describe(`when a method ${Publication.prototype.validateMetadata.name} is called`, () => {
    it(`should run successfully`, async () => {
      const result = await publication.validateMetadata({
        name: 'Test',
        attributes: [],
        content: 'Test',
        locale: 'en',
        mainContentFocus: PublicationMainFocus.TextOnly,
        metadata_id: '1',
        version: '2.0.0',
      });

      expect(result).toMatchObject({ valid: true });
    });
  });
});
