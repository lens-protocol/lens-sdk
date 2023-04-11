import { buildReportingReasonInputParams, Publication, PublicationReportReason } from '.';
import {
  buildTestEnvironment,
  describeAuthenticatedScenario,
  existingProfileId,
  existingPublicationId,
} from '../__helpers__';
import { PublicationMainFocus } from '../graphql/types.generated';

const testConfig = {
  environment: buildTestEnvironment(),
};

describe(`Given the ${Publication.name} configured to work with the test environment`, () => {
  describe(`and is not authenticated`, () => {
    const publication = new Publication(testConfig);

    describe(`when the method ${Publication.prototype.fetch.name} is called`, () => {
      it(`should return the requested publication`, async () => {
        const id = existingPublicationId;
        const result = await publication.fetch({ publicationId: id });

        expect(result).toMatchObject({
          id,
        });
      });
    });

    describe(`when the method ${Publication.prototype.fetchAll.name} is called`, () => {
      it(`should run successfully`, async () => {
        await expect(publication.fetchAll({ profileId: existingProfileId })).resolves.not.toThrow();
      });
    });

    describe(`when the method ${Publication.prototype.allWalletsWhoCollected.name} is called`, () => {
      it(`should run successfully`, async () => {
        await expect(
          publication.allWalletsWhoCollected({ publicationId: existingPublicationId }),
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
            profileId: existingProfileId,
          }),
        ).resolves.not.toThrow();
      });
    });

    describe(`when the method ${Publication.prototype.metadataStatus.name} is called`, () => {
      it(`should run successfully`, async () => {
        await expect(
          publication.metadataStatus({
            publicationId: existingPublicationId,
          }),
        ).resolves.not.toThrow();
      });
    });
  });

  describeAuthenticatedScenario()((getTestSetup) => {
    describe(`when the method ${Publication.prototype.report.name} is called`, () => {
      it(`should run successfully`, async () => {
        const { authentication } = getTestSetup();
        const publication = new Publication(testConfig, authentication);

        await expect(
          publication.report({
            publicationId: existingPublicationId,
            reason: buildReportingReasonInputParams(PublicationReportReason.FAKE_ENGAGEMENT),
            additionalComments: 'comment',
          }),
        ).resolves.not.toThrow();
      });
    });
  });
});
