import { Wallet } from '@lens-protocol/domain/entities';
import { mockEvmAddress } from '@lens-protocol/shared-kernel/mocks';
import { mock } from 'jest-mock-extended';

import { mockITransactionFactory } from '../../../transactions/adapters/__helpers__/mocks';
import { ISignerFactory } from '../ConcreteWallet';
import { WalletGateway } from '../WalletGateway';

function setupWalletGateway() {
  const signerFactory = mock<ISignerFactory>();
  const transactionFactory = mockITransactionFactory();
  return new WalletGateway(signerFactory, transactionFactory);
}

const address = mockEvmAddress();

describe(`Given an instance of the ${WalletGateway.name}`, () => {
  describe(`when "${WalletGateway.prototype.getByAddress.name}" method is invoked`, () => {
    it(`should retrieve the ${Wallet.name} instance by address`, async () => {
      const gateway = setupWalletGateway();

      const wallet = await gateway.getByAddress(address);

      expect(wallet).toBeInstanceOf(Wallet);
      expect(wallet.address).toEqual(address);
    });

    it(`should cache the ${Wallet.name} instance in an in-memory cache for subsequent calls`, async () => {
      const gateway = setupWalletGateway();

      const wallet1 = await gateway.getByAddress(address);
      const wallet2 = await gateway.getByAddress(address);

      expect(wallet1).toBe(wallet2);
    });

    it(`should retrieve the ${Wallet.name} instance by address in a case-insensitive manner`, async () => {
      const gateway = setupWalletGateway();

      const wallet1 = await gateway.getByAddress(address);
      const wallet2 = await gateway.getByAddress(address.toUpperCase());

      expect(wallet1).toBe(wallet2);
    });
  });
});
