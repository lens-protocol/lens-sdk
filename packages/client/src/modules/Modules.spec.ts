import { Modules } from '.';
import { buildTestEnvironment, describeAuthenticatedScenario } from '../__helpers__';
import { CollectModules, FollowModules, ReferenceModules } from '../graphql/types.generated';

const testConfig = {
  environment: buildTestEnvironment(),
};

const whitelistedCurrencyAddress = '0x3C68CE8504087f89c640D02d133646d98e64ddd9';

describe(`Given the ${Modules.name} configured to work with the test environment`, () => {
  describeAuthenticatedScenario()((getTestSetup) => {
    describe(`when ${Modules.prototype.fetchEnabled.name} method is called`, () => {
      it(`should execute with success`, async () => {
        const { authentication } = getTestSetup();
        const modules = new Modules(testConfig, authentication);

        const result = await modules.fetchEnabled();

        expect(result.isSuccess()).toBeTruthy();
      });
    });

    describe(`when ${Modules.prototype.fetchEnabledCurrencies.name} method is called`, () => {
      it(`should execute with success`, async () => {
        const { authentication } = getTestSetup();
        const modules = new Modules(testConfig, authentication);

        const result = await modules.fetchEnabledCurrencies();

        expect(result.isSuccess()).toBeTruthy();
      });
    });

    describe(`when ${Modules.prototype.approvedAllowanceAmount.name} method is called`, () => {
      it(`should execute with success`, async () => {
        const { authentication } = getTestSetup();
        const modules = new Modules(testConfig, authentication);

        const result = await modules.approvedAllowanceAmount({
          currencies: [whitelistedCurrencyAddress],
          collectModules: [CollectModules.LimitedFeeCollectModule],
          followModules: [FollowModules.FeeFollowModule],
          referenceModules: [ReferenceModules.FollowerOnlyReferenceModule],
        });

        expect(result.isSuccess()).toBeTruthy();
      });
    });

    describe(`when ${Modules.prototype.generateCurrencyApprovalData.name} method is called`, () => {
      it(`should execute with success`, async () => {
        const { authentication } = getTestSetup();
        const modules = new Modules(testConfig, authentication);

        const result = await modules.generateCurrencyApprovalData({
          currency: whitelistedCurrencyAddress,
          value: '10',
          collectModule: CollectModules.LimitedFeeCollectModule,
        });

        expect(result.isSuccess()).toBeTruthy();
      });
    });
  });
});
