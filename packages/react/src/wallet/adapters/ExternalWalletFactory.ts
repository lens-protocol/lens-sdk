import { WalletType, WalletConnectionError } from '@lens-protocol/domain/entities';
import { SupportedTransactionRequest } from '@lens-protocol/domain/use-cases/transactions';
import { ChainType, failure, PromiseResult, success } from '@lens-protocol/shared-kernel';

import { ITransactionFactory } from '../../transactions/adapters/ITransactionFactory';
import { ExternalWallet, WalletDataSchema } from './ExternalWallet';
import { IExternalWalletFactory } from './ExternalWalletGateway';
import { ISignerFactory } from './ISignerFactory';

export class ExternalWalletFactory implements IExternalWalletFactory {
  constructor(
    private readonly signerFactory: ISignerFactory,
    private readonly transactionFactory: ITransactionFactory<SupportedTransactionRequest>,
  ) {}

  async create(
    type: WalletType,
    chainType: ChainType,
  ): PromiseResult<ExternalWallet, WalletConnectionError> {
    const result = await this.signerFactory.createSigner({ walletType: type, chainType });

    if (result.isFailure()) {
      return failure(result.error);
    }

    const address = await result.value.getAddress();

    const wallet = ExternalWallet.create(
      {
        address,
        type,
      },
      this.signerFactory,
      this.transactionFactory,
    );

    return success(wallet);
  }

  rehydrate(data: WalletDataSchema) {
    return ExternalWallet.create(data, this.signerFactory, this.transactionFactory);
  }
}
