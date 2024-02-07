import { AnyTransactionRequest } from '@lens-protocol/domain/use-cases/transactions';
import { IWalletGateway } from '@lens-protocol/domain/use-cases/wallets';
import { EvmAddress, never } from '@lens-protocol/shared-kernel';
import { z } from 'zod';

import { ITransactionFactory } from '../../transactions/adapters/ITransactionFactory';
import { ConcreteWallet, ISignerFactory, WalletDataSchema } from './ConcreteWallet';

export const WalletStorageSchema = z.array(WalletDataSchema);

export type WalletStorageSchema = z.infer<typeof WalletStorageSchema>;

export class WalletGateway implements IWalletGateway {
  private inMemoryCache: Record<EvmAddress, ConcreteWallet> = {};

  constructor(
    private readonly signerFactory: ISignerFactory,
    private readonly transactionFactory: ITransactionFactory<AnyTransactionRequest>,
  ) {}

  async getByAddress(address: EvmAddress): Promise<ConcreteWallet> {
    const key = address.toLowerCase();

    if (this.inMemoryCache[key]) {
      return this.inMemoryCache[key] ?? never();
    }

    const wallet = ConcreteWallet.create(address, this.signerFactory, this.transactionFactory);

    this.inMemoryCache[key] = wallet;

    return wallet;
  }
}
