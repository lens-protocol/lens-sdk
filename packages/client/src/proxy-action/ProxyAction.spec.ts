import { ProxyAction } from '.';
import {
  buildTestEnvironment,
  describeAuthenticatedScenario,
  existingProfileId,
  existingPublicationId,
} from '../__helpers__';
import { Authentication } from '../authentication';
import { NotAuthenticatedError } from '../consts/errors';

const testConfig = {
  environment: buildTestEnvironment(),
};

describe(`Given the ${ProxyAction.name} configured to work with the test environment`, () => {
  describe(`and the instance is not authenticated`, () => {
    const authentication = new Authentication(testConfig);
    const proxyAction = new ProxyAction(testConfig, authentication);

    describe(`when ${ProxyAction.prototype.freeFollow.name} method is called`, () => {
      it(`should return a failure`, async () => {
        const result = await proxyAction.freeFollow('');

        expect(result.isFailure()).toBeTruthy();
        expect(() => result.unwrap()).toThrow(NotAuthenticatedError);
      });
    });

    describe(`when ${ProxyAction.prototype.freeCollect.name} method is called`, () => {
      it(`should return a failure`, async () => {
        const result = await proxyAction.freeCollect('');

        expect(result.isFailure()).toBeTruthy();
        expect(() => result.unwrap()).toThrow(NotAuthenticatedError);
      });
    });

    describe(`when ${ProxyAction.prototype.checkStatus.name} method is called`, () => {
      it(`should return a failure`, async () => {
        const result = await proxyAction.checkStatus('7624f076-446d-4f38-8277-326b269fe8d8');

        expect(result.isFailure()).toBeTruthy();
        expect(() => result.unwrap()).toThrow(NotAuthenticatedError);
      });
    });
  });

  describeAuthenticatedScenario({ withNewProfile: true })((getTestSetup) => {
    let actionId: string | undefined;

    describe(`when ${ProxyAction.prototype.freeFollow.name} method is called`, () => {
      it(`should execute with success`, async () => {
        const { authentication } = getTestSetup();
        const proxyAction = new ProxyAction(testConfig, authentication);
        const result = await proxyAction.freeFollow(existingProfileId);

        actionId = result.unwrap();

        expect(result.isSuccess()).toBeTruthy();
      });
    });

    describe(`when ${ProxyAction.prototype.freeCollect.name} method is called`, () => {
      it(`should execute with success`, async () => {
        const { authentication } = getTestSetup();
        const proxyAction = new ProxyAction(testConfig, authentication);
        const result = await proxyAction.freeCollect(existingPublicationId);

        expect(result.isSuccess()).toBeTruthy();
      });
    });

    describe(`when ${ProxyAction.prototype.checkStatus.name} method is called`, () => {
      it(`should execute with success`, async () => {
        const { authentication } = getTestSetup();
        const proxyAction = new ProxyAction(testConfig, authentication);
        const result = await proxyAction.checkStatus(actionId || '');

        expect(result.isSuccess()).toBeTruthy();
      });
    });
  });
});
