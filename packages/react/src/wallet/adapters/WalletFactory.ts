import { AnyTransactionRequest } from '@lens-protocol/domain/use-cases/transactions';
import { IWalletFactory } from '@lens-protocol/domain/use-cases/wallets';
import { EvmAddress } from '@lens-protocol/shared-kernel';

import { ITransactionFactory } from '../../transactions/adapters/ITransactionFactory';
import { ConcreteWallet, ISignerFactory, WalletDataSchema } from './ConcreteWallet';
import { IWalletUnmarshaller } from './WalletGateway';

export class WalletFactory implements IWalletUnmarshaller, IWalletFactory {
  constructor(
    private readonly signerFactory: ISignerFactory,
    private readonly transactionFactory: ITransactionFactory<AnyTransactionRequest>,
  ) {}

  async create(address: EvmAddress): Promise<ConcreteWallet> {
    return ConcreteWallet.create(address, this.signerFactory, this.transactionFactory);
  }

  rehydrate(data: WalletDataSchema) {
    return ConcreteWallet.create(data.address, this.signerFactory, this.transactionFactory);
  }
}
