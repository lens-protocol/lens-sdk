import { Authentication } from '../authentication';
import { mumbaiSandbox } from '../consts/environments';
import { NotAuthenticatedError } from '../consts/errors';
import { Transaction } from './Transaction';

const testConfig = {
  environment: mumbaiSandbox,
};

describe(`Given the ${Transaction.name} configured to work with sandbox`, () => {
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
