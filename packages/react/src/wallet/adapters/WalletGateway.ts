import { IResettableWalletGateway } from '@lens-protocol/domain/src/use-cases/authentication/Logout';
import {
  IReadableWalletGateway,
  IWritableWalletGateway,
} from '@lens-protocol/domain/use-cases/authentication';
import { EvmAddress, never } from '@lens-protocol/shared-kernel';
import { IStorage } from '@lens-protocol/storage';
import { z } from 'zod';

import { ConcreteWallet, WalletDataSchema } from './ConcreteWallet';

export interface IWalletUnmarshaller {
  rehydrate(data: WalletDataSchema): ConcreteWallet;
}

export const WalletStorageSchema = z.array(WalletDataSchema);

export type WalletStorageSchema = z.infer<typeof WalletStorageSchema>;

export class WalletGateway
  implements IReadableWalletGateway, IResettableWalletGateway, IWritableWalletGateway
{
  private inMemoryCache: Record<EvmAddress, ConcreteWallet> = {};

  constructor(
    private readonly storage: IStorage<WalletStorageSchema>,
    private readonly factory: IWalletUnmarshaller,
  ) {}

  async getByAddress(address: EvmAddress): Promise<ConcreteWallet | null> {
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
    await this.storage.reset();
  }

  async save(wallet: ConcreteWallet): Promise<void> {
    const wallets = await this.getAll();

    this.inMemoryCache[wallet.address] = wallet;
    await this.storage.set(wallets.concat([wallet]).map((w) => w.toWalletData()));
  }

  private async getAll(): Promise<ConcreteWallet[]> {
    const data = await this.storage.get();

    if (data === null) {
      return [];
    }
    return data.map((d) => this.factory.rehydrate(d));
  }
}
