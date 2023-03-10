import { buildReportingReasonInputParams, Publication, PublicationReportReason } from '.';
import { setupRandomAuthentication } from '../authentication/__helpers__/setupAuthentication';
import { mumbaiSandbox } from '../consts/environments';
import { PublicationMainFocus } from '../graphql/types.generated';

const testConfig = {
  environment: mumbaiSandbox,
};

describe(`Given the ${Publication.name} configured to work with sandbox`, () => {
  describe(`and is not authenticated`, () => {
    const publication = new Publication(testConfig);

    describe(`when the method ${Publication.prototype.fetch.name} is called`, () => {
      it(`should return the requested publication`, async () => {
        const id = '0x014e-0x0a';
        const result = await publication.fetch({ publicationId: id });

        expect(result).toMatchObject({
          id,
        });
      });
    });

    describe(`when the method ${Publication.prototype.fetchAll.name} is called`, () => {
      it(`should run successfully`, async () => {
        await expect(publication.fetchAll({ profileId: '0x50' })).resolves.not.toThrow();
      });
    });

    describe(`when the method ${Publication.prototype.allWalletsWhoCollected.name} is called`, () => {
      it(`should run successfully`, async () => {
        await expect(
          publication.allWalletsWhoCollected({ publicationId: '0x014e-0x0a' }),
        ).resolves.not.toThrow();
      });
    });

    describe(`when the method ${Publication.prototype.validateMetadata.name} is called`, () => {
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

    describe(`when the method ${Publication.prototype.allForSale.name} is called`, () => {
      it(`should run successfully`, async () => {
        await expect(
          publication.allForSale({
            profileId: '0x014e',
          }),
        ).resolves.not.toThrow();
      });
    });

    describe(`when the method ${Publication.prototype.metadataStatus.name} is called`, () => {
      it(`should run successfully`, async () => {
        await expect(
          publication.metadataStatus({
            publicationId: '0x014e-0x0a',
          }),
        ).resolves.not.toThrow();
      });
    });
  });

  describe(`and is authenticated`, () => {
    const getAuthentication = setupRandomAuthentication();

    describe(`when the method ${Publication.prototype.report.name} is called`, () => {
      it(`should run successfully`, async () => {
        const authentication = getAuthentication();
        const publication = new Publication(testConfig, authentication);

        await expect(
          publication.report({
            publicationId: '0x014e-0x0a',
            reason: buildReportingReasonInputParams(PublicationReportReason.FAKE_ENGAGEMENT),
            additionalComments: 'comment',
          }),
        ).resolves.not.toThrow();
      });
    });
  });
});
