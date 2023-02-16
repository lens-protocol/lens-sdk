import { mumbaiSandbox } from '../consts/environments';
import { NotAuthenticatedError } from '../consts/errors';
import { ProxyAction } from './ProxyAction';

const testConfig = {
  environment: mumbaiSandbox,
};

describe(`Given the ${ProxyAction.name} configured to work with sandbox`, () => {
  describe(`and the instance is not authenticated`, () => {
    const proxyAction = new ProxyAction(testConfig);

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
});
