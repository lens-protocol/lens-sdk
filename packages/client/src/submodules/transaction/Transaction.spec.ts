import { LensClient } from '../../LensClient';
import { buildTestEnvironment } from '../../__helpers__';
import { Transaction } from './Transaction';

describe(`Given the ${Transaction.name} submodule`, () => {
  const client = new LensClient({
    environment: buildTestEnvironment(),
  });
  const transaction = client.transaction;

  describe(`when calling ${Transaction.prototype.status.name} with wrong txHash`, () => {
    it(`should throw the API error`, async () => {
      const forTxHash = 'asdf20-34935ffs'; // wrong txHash
      await expect(transaction.status({ forTxHash })).rejects.toThrow('got invalid value');
    });
  });

  describe(`when calling ${Transaction.prototype.waitUntilComplete.name} with wrong txHash`, () => {
    it(`should fail quickly on API error`, async () => {
      const forTxHash = 'asdf20-34935ffs'; // wrong txHash
      await expect(transaction.waitUntilComplete({ forTxHash })).rejects.toThrow(
        'got invalid value',
      );
    });
  });
});
