import { Nfts } from '.';
import {
  buildTestEnvironment,
  describeAuthenticatedScenario,
  existingProfileId,
} from '../__helpers__';

const testConfig = {
  environment: buildTestEnvironment(),
};

describe(`Given the ${Nfts.name} configured to work with the test environment`, () => {
  describe(`and the instance is not authenticated`, () => {
    const nfts = new Nfts(testConfig);

    describe(`when the method ${Nfts.prototype.fetch.name} is called`, () => {
      it(`should run successfully`, async () => {
        await expect(
          nfts.fetch({
            chainIds: [80001],
            ownerAddress: '0xa5653e88D9c352387deDdC79bcf99f0ada62e9c6',
            limit: 10,
          }),
        ).resolves.not.toThrow();
      });
    });

    describe(`when the method ${Nfts.prototype.fetchGalleries.name} is called`, () => {
      it(`should run successfully`, async () => {
        await expect(
          nfts.fetchGalleries({
            profileId: existingProfileId,
          }),
        ).resolves.not.toThrow();
      });
    });
  });

  describeAuthenticatedScenario()((getTestSetup) => {
    describe(`when the method ${Nfts.prototype.ownershipChallenge.name} is called`, () => {
      it(`should run successfully`, async () => {
        const { authentication } = getTestSetup();
        const nfts = new Nfts(testConfig, authentication);

        const result = await nfts.ownershipChallenge({
          ethereumAddress: '0xa5653e88D9c352387deDdC79bcf99f0ada62e9c6',
          nfts: [
            {
              tokenId: '411',
              contractAddress: '0x7582177F9E536aB0b6c721e11f383C326F2Ad1D5',
              chainId: 80001,
            },
          ],
        });

        expect(result.isSuccess()).toBeTruthy();
      });
    });
  });
});
