import { TransactionRequest } from '@ethersproject/providers';
import { bigNumber } from '@lens-protocol/blockchain-bindings';
import { Wallet, UnsignedTransaction } from '@lens-protocol/domain/entities';
import {
  AnyTransactionRequest,
  IPaidTransactionGateway,
} from '@lens-protocol/domain/use-cases/transactions';
import { Amount, ChainType, Data, EvmAddress } from '@lens-protocol/shared-kernel';
import { v4 } from 'uuid';

import { ITransactionRequest } from '../../wallet/adapters/ConcreteWallet';
import { IProviderFactory } from '../../wallet/adapters/IProviderFactory';
import { Eip1559GasPriceEstimator, TransactionExecutionSpeed } from './Eip1559GasPriceEstimator';

export class UnsignedContractCallTransaction<TRequest extends AnyTransactionRequest>
  extends UnsignedTransaction<TRequest>
  implements ITransactionRequest
{
  constructor(request: TRequest, readonly transactionRequest: TransactionRequest) {
    super(v4(), ChainType.POLYGON, request);
  }
}

export type ContractCallDetails = {
  contractAddress: EvmAddress;
  encodedData: Data;
};

export abstract class AbstractContractCallGateway<TRequest extends AnyTransactionRequest>
  implements IPaidTransactionGateway<TRequest>
{
  constructor(private readonly providerFactory: IProviderFactory) {}

  async createUnsignedTransaction(
    request: TRequest,
    wallet: Wallet,
  ): Promise<UnsignedTransaction<TRequest>> {
    const provider = await this.providerFactory.createProvider({
      chainType: ChainType.POLYGON,
    });

    const { contractAddress, encodedData } = await this.createEncodedData(request);

    const gasLimit = await provider.estimateGas({
      to: contractAddress,
      from: wallet.address,

      data: encodedData,
    });

    const gasEstimator = new Eip1559GasPriceEstimator(provider, (value) => Amount.matic(value));

    const gasPriceEstimate = await gasEstimator.estimate(TransactionExecutionSpeed.FAST);

    const transactionRequest = {
      to: contractAddress,
      from: wallet.address,

      data: encodedData,
      gasLimit,
      maxFeePerGas: bigNumber(gasPriceEstimate.maxFeePerGas),
      maxPriorityFeePerGas: bigNumber(gasPriceEstimate.maxPriorityFeePerGas),
      type: 2, // EIP-1559
    };

    return new UnsignedContractCallTransaction(request, transactionRequest);
  }

  protected abstract createEncodedData(request: TRequest): Promise<ContractCallDetails>;
}
