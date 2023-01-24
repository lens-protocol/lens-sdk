import { Transaction } from '.';
import { buildTestEnvironment } from '../__helpers__';
import { Authentication } from '../authentication';
import { NotAuthenticatedError } from '../consts/errors';

const testConfig = {
  environment: buildTestEnvironment(),
};

describe(`Given the ${Transaction.name} configured to work with the test environment`, () => {
  describe(`and the instance is not authenticated`, () => {
    const authentication = new Authentication(testConfig);
    const transaction = new Transaction(testConfig, authentication);

    describe(`when ${Transaction.prototype.broadcast.name} method is called`, () => {
      it(`should return a failure`, async () => {
        const result = await transaction.broadcast({ id: '', signature: '' });

        expect(result.isFailure()).toBeTruthy();
        expect(() => result.unwrap()).toThrow(NotAuthenticatedError);
      });
    });

    describe(`when ${Transaction.prototype.wasIndexed.name} method is called`, () => {
      it(`should return a failure`, async () => {
        const result = await transaction.wasIndexed('');

        expect(result.isFailure()).toBeTruthy();
        expect(() => result.unwrap()).toThrow(NotAuthenticatedError);
      });
    });
  });
});
