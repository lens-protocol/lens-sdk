import { Wallet, WalletConnectionError, WalletType } from '@lens-protocol/domain/entities';
import {
  IExternalWalletGateway,
  IResettableWalletGateway,
  IWalletGateway,
} from '@lens-protocol/domain/use-cases/wallets';
import {
  ChainType,
  EthereumAddress,
  never,
  PromiseResult,
  success,
} from '@lens-protocol/shared-kernel';
import { IStorage } from '@lens-protocol/storage';
import { z } from 'zod';

import { ExternalWallet, WalletDataSchema } from './ExternalWallet';

export interface IExternalWalletFactory {
  create(
    type: WalletType,
    chainType: ChainType,
  ): PromiseResult<ExternalWallet, WalletConnectionError>;

  rehydrate(data: WalletDataSchema): ExternalWallet;
}

export const WalletStorageSchema = z.array(WalletDataSchema);

export type WalletStorageSchema = z.infer<typeof WalletStorageSchema>;

export class ExternalWalletGateway
  implements IWalletGateway, IExternalWalletGateway, IResettableWalletGateway
{
  private inMemoryCache: Record<EthereumAddress, ExternalWallet> = {};

  constructor(
    private readonly storage: IStorage<WalletStorageSchema>,
    private readonly factory: IExternalWalletFactory,
  ) {}

  async connect(
    walletType: WalletType,
    chainType: ChainType,
  ): PromiseResult<Wallet, WalletConnectionError> {
    const result = await this.factory.create(walletType, chainType);

    if (result.isFailure()) {
      return result;
    }
    const wallet = result.value;

    if (wallet.address in this.inMemoryCache) {
      const cached = this.inMemoryCache[wallet.address] as Wallet;
      return success(cached);
    }

    await this.add(wallet);
    return result;
  }

  private async add(wallet: ExternalWallet): Promise<void> {
    const wallets = await this.getAll();

    this.inMemoryCache[wallet.address] = wallet;
    await this.storage.set(wallets.concat([wallet]).map((w) => w.toWalletData()));
  }

  async getByAddress(address: EthereumAddress): Promise<Wallet | null> {
    if (this.inMemoryCache[address]) {
      return this.inMemoryCache[address] ?? never();
    }
    const wallets = await this.getAll();
    const wallet = wallets.find((w) => w.address === address) ?? null;

    if (wallet) {
      this.inMemoryCache[address] = wallet;
    }
    return wallet;
  }

  async reset(): Promise<void> {
    await this.storage.set([]);
  }

  private async getAll(): Promise<ExternalWallet[]> {
    const data = await this.storage.get();

    if (data === null) {
      return [];
    }
    return data.map((d) => this.factory.rehydrate(d));
  }
}
