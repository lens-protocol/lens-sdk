import { Wallet } from '@lens-protocol/domain/entities';
import { IStorage } from '@lens-protocol/storage';
import { mockStorage } from '@lens-protocol/storage/mocks';
import { mock } from 'jest-mock-extended';

import { mockITransactionFactory } from '../../../transactions/adapters/__helpers__/mocks';
import { mockConcreteWallet } from '../__helpers__/mocks';
import { ISignerFactory } from '../ConcreteWallet';
import { WalletFactory } from '../WalletFactory';
import { WalletGateway, WalletStorageSchema } from '../WalletGateway';

function setupWalletGateway({ storage }: { storage: IStorage<WalletStorageSchema> }) {
  const signerFactory = mock<ISignerFactory>();
  const transactionFactory = mockITransactionFactory();
  const walletFactory = new WalletFactory(signerFactory, transactionFactory);
  return new WalletGateway(storage, walletFactory);
}

describe(`Given an instance of the ${WalletGateway.name}`, () => {
  describe(`when "${WalletGateway.prototype.getByAddress.name}" method is invoked`, () => {
    it(`should retrieve the ${Wallet.name} instance by address`, async () => {
      const wallet1 = mockConcreteWallet();
      const wallet2 = mockConcreteWallet();
      const storage = mockStorage<WalletStorageSchema>([wallet1, wallet2]);

      const gateway = setupWalletGateway({ storage });

      const actual = await gateway.getByAddress(wallet2.address);

      expect(actual).toBeInstanceOf(Wallet);
      expect(actual?.address).toEqual(wallet2.address);
    });

    it(`should cache the ${Wallet.name} instance in an in-memory cache for subsequent calls`, async () => {
      const wallet1 = mockConcreteWallet();
      const wallet2 = mockConcreteWallet();
      const storage = mockStorage<WalletStorageSchema>([wallet1, wallet2]);

      const gateway = setupWalletGateway({ storage });

      expect(await gateway.getByAddress(wallet2.address)).toBe(
        await gateway.getByAddress(wallet2.address),
      );
    });

    it(`should retrieve the ${Wallet.name} instance even if address is in a different format`, async () => {
      const wallet1 = mockConcreteWallet();
      const storage = mockStorage<WalletStorageSchema>([wallet1]);

      const gateway = setupWalletGateway({ storage });

      const retrievedWallet = await gateway.getByAddress(wallet1.address.toUpperCase());

      expect(retrievedWallet?.address).toEqual(wallet1.address);
    });
  });

  describe(`when "${WalletGateway.prototype.save.name}" method is invoked`, () => {
    it(`should cache the ${Wallet.name} instance in an in-memory cache to support subsequent reads`, async () => {
      const newWallet = mockConcreteWallet();
      const storage = mockStorage<WalletStorageSchema>([]);

      const gateway = setupWalletGateway({ storage });

      await gateway.save(newWallet);

      expect(await gateway.getByAddress(newWallet.address)).toBe(newWallet);
    });
  });
});
