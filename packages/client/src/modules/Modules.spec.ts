import { CollectModules, FollowModules, ReferenceModules } from '.';
import { setupRandomAuthentication } from '../authentication/__helpers__/setupAuthentication';
import { mumbaiSandbox } from '../consts/environments';
import { Modules } from './Modules';

const testConfig = {
  environment: mumbaiSandbox,
};

describe(`Given the ${Modules.name} configured to work with sandbox`, () => {
  describe(`and the instance is authenticated`, () => {
    const getAuthentication = setupRandomAuthentication();

    describe(`when ${Modules.prototype.fetchEnabled.name} method is called`, () => {
      it(`should execute with success`, async () => {
        const authentication = getAuthentication();
        const modules = new Modules(testConfig, authentication);

        const result = await modules.fetchEnabled();

        expect(result.isSuccess()).toBeTruthy();
      });
    });

    describe(`when ${Modules.prototype.fetchEnabledCurrencies.name} method is called`, () => {
      it(`should execute with success`, async () => {
        const authentication = getAuthentication();
        const modules = new Modules(testConfig, authentication);

        const result = await modules.fetchEnabledCurrencies();

        expect(result.isSuccess()).toBeTruthy();
      });
    });

    describe(`when ${Modules.prototype.approvedAllowanceAmount.name} method is called`, () => {
      it(`should execute with success`, async () => {
        const authentication = getAuthentication();
        const modules = new Modules(testConfig, authentication);

        const result = await modules.approvedAllowanceAmount({
          currencies: ['0x3C68CE8504087f89c640D02d133646d98e64ddd9'],
          collectModules: [CollectModules.LimitedFeeCollectModule],
          followModules: [FollowModules.FeeFollowModule],
          referenceModules: [ReferenceModules.FollowerOnlyReferenceModule],
        });

        expect(result.isSuccess()).toBeTruthy();
      });
    });

    describe(`when ${Modules.prototype.generateCurrencyApprovalData.name} method is called`, () => {
      it(`should execute with success`, async () => {
        const authentication = getAuthentication();
        const modules = new Modules(testConfig, authentication);

        const result = await modules.generateCurrencyApprovalData({
          currency: '0xD40282e050723Ae26Aeb0F77022dB14470f4e011',
          value: '10',
          collectModule: CollectModules.LimitedFeeCollectModule,
        });

        expect(result.isSuccess()).toBeTruthy();
      });
    });
  });
});
