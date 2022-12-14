import { JsonRpcSigner } from '@ethersproject/providers';
import { Wallet } from '@lens-protocol/domain/entities';
import { ChainType, success } from '@lens-protocol/shared-kernel';
import { IStorage } from '@lens-protocol/storage';
import { mockStorage } from '@lens-protocol/storage/mocks';
import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import { mockITransactionFactory } from '../../../transactions/adapters/__helpers__/mocks';
import { ExternalWallet } from '../ExternalWallet';
import { ExternalWalletFactory } from '../ExternalWalletFactory';
import { ExternalWalletGateway, WalletStorageSchema } from '../ExternalWalletGateway';
import { mockExternalWallet, mockISignerFactory } from '../__helpers__/mocks';

const chainType = ChainType.POLYGON;

function setupExternalWalletGateway({
  storage,
  wallet = mockExternalWallet(),
}: {
  storage: IStorage<WalletStorageSchema>;
  wallet?: ExternalWallet;
}) {
  const signer = mock<JsonRpcSigner>();
  when(signer.getAddress).mockResolvedValue(wallet.address);
  const ethersProviderFactory = mockISignerFactory({
    walletType: wallet.type,
    chainType,
    signerResult: success(signer),
  });

  const transactionFactory = mockITransactionFactory();
  const externalWalletFactory = new ExternalWalletFactory(
    ethersProviderFactory,
    transactionFactory,
  );
  return new ExternalWalletGateway(storage, externalWalletFactory);
}

describe(`Given an instance of the ${ExternalWalletGateway.name}`, () => {
  describe(`when "${ExternalWalletGateway.prototype.connect.name}" method is invoked`, () => {
    const existingWallet = mockExternalWallet();
    const newWallet = mockExternalWallet();

    it(`should connect and persist the new ${Wallet.name} alongside existing ones`, async () => {
      const storage = mockStorage<WalletStorageSchema>([existingWallet]);

      const gateway = setupExternalWalletGateway({ storage, wallet: newWallet });
      await gateway.connect(newWallet.type, chainType);

      expect(storage.set).toHaveBeenCalledWith([
        existingWallet.toWalletData(),
        newWallet.toWalletData(),
      ]);
    });

    it(`should return the cached ${Wallet.name} instance if it exists`, async () => {
      const storage = mockStorage<WalletStorageSchema>();

      const gateway = setupExternalWalletGateway({ storage, wallet: newWallet });
      const firstCallResult = await gateway.connect(newWallet.type, chainType);
      const secondCallResult = await gateway.connect(newWallet.type, chainType);
      const walletByAddress = await gateway.getByAddress(newWallet.address);

      expect(firstCallResult.unwrap()).toBe(secondCallResult.unwrap());
      expect(secondCallResult.unwrap()).toBe(walletByAddress);
    });
  });

  describe(`when "${ExternalWalletGateway.prototype.getByAddress.name}" method is invoked`, () => {
    it(`should retrieve the ${Wallet.name} instance by address`, async () => {
      const wallet1 = mockExternalWallet();
      const wallet2 = mockExternalWallet();
      const storage = mockStorage<WalletStorageSchema>([wallet1, wallet2]);

      const gateway = setupExternalWalletGateway({ storage });

      const actual = await gateway.getByAddress(wallet2.address);

      expect(actual).toBeInstanceOf(Wallet);
      expect(actual?.address).toEqual(wallet2.address);
    });

    it(`should cache the ${Wallet.name} instance in an in-memory cache for subsequent calls`, async () => {
      const wallet1 = mockExternalWallet();
      const wallet2 = mockExternalWallet();
      const storage = mockStorage<WalletStorageSchema>([wallet1, wallet2]);

      const gateway = setupExternalWalletGateway({ storage });

      expect(await gateway.getByAddress(wallet2.address)).toBe(
        await gateway.getByAddress(wallet2.address),
      );
    });
  });

  describe(`when "${ExternalWalletGateway.prototype.reset.name}" method is invoked`, () => {
    it(`should remove all the ${Wallet.name} entities from the underlying storage provider`, async () => {
      const wallet1 = mockExternalWallet();
      const wallet2 = mockExternalWallet();
      const storage = mockStorage<WalletStorageSchema>([wallet1, wallet2]);

      const gateway = setupExternalWalletGateway({ storage });

      await gateway.reset();

      expect(await gateway.getByAddress(wallet1.address)).toBeNull();
      expect(await gateway.getByAddress(wallet2.address)).toBeNull();
    });
  });
});
