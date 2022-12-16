import {
  IWalletFactory,
  WalletLoginRequest,
} from '@lens-protocol/domain/dist/esm/use-cases/wallets';
import { SupportedTransactionRequest } from '@lens-protocol/domain/use-cases/transactions';

import { ITransactionFactory } from '../../transactions/adapters/ITransactionFactory';
import { ConcreteWallet, ISignerFactory, WalletDataSchema } from './ConcreteWallet';
import { IWalletUnmarshaller } from './WalletGateway';

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
