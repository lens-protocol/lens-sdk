import { SupportedTransactionRequest } from '@lens-protocol/domain/use-cases/transactions';
import { IWalletFactory, WalletLoginRequest } from '@lens-protocol/domain/use-cases/wallets';

import { ConcreteWallet, ISignerFactory, WalletDataSchema } from './ConcreteWallet';
import { IWalletUnmarshaller } from './WalletGateway';
import { ITransactionFactory } from '../../transactions/adapters/ITransactionFactory';

export class WalletFactory implements IWalletUnmarshaller, IWalletFactory {
  constructor(
    private readonly signerFactory: ISignerFactory,
    private readonly transactionFactory: ITransactionFactory<SupportedTransactionRequest>,
  ) {}

  async create(request: WalletLoginRequest): Promise<ConcreteWallet> {
    return ConcreteWallet.create(request, this.signerFactory, this.transactionFactory);
  }

  rehydrate(data: WalletDataSchema) {
    return ConcreteWallet.create(data, this.signerFactory, this.transactionFactory);
  }
}
