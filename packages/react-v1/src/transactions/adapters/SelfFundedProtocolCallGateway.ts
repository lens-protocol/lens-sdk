import { TransactionRequest } from '@ethersproject/providers';
import { bigNumber } from '@lens-protocol/blockchain-bindings';
import { Wallet, UnsignedTransaction } from '@lens-protocol/domain/entities';
import {
  IPayTransactionGateway,
  ProtocolTransactionRequest,
} from '@lens-protocol/domain/use-cases/transactions';
import { Amount, ChainType } from '@lens-protocol/shared-kernel';
import { v4 } from 'uuid';

import { ITransactionRequest } from '../../wallet/adapters/ConcreteWallet';
import { IProviderFactory } from '../../wallet/adapters/IProviderFactory';
import {
  Eip1559GasPriceEstimator,
  TransactionExecutionSpeed,
} from '../infrastructure/Eip1559GasPriceEstimator';
import { SelfFundedProtocolTransactionRequest } from './SelfFundedProtocolTransactionRequest';

export class UnsignedSelfFundedProtocolCallTransaction<
    TRequest extends ProtocolTransactionRequest,
    TSelfFundedRequest extends SelfFundedProtocolTransactionRequest<TRequest> = SelfFundedProtocolTransactionRequest<TRequest>,
  >
  extends UnsignedTransaction<TSelfFundedRequest>
  implements ITransactionRequest
{
  constructor(request: TSelfFundedRequest, readonly transactionRequest: TransactionRequest) {
    super(v4(), ChainType.POLYGON, request);
  }
}

export class SelfFundedProtocolCallGateway<
  TRequest extends ProtocolTransactionRequest,
  TSelfFundedRequest extends SelfFundedProtocolTransactionRequest<TRequest> = SelfFundedProtocolTransactionRequest<TRequest>,
> implements IPayTransactionGateway<TSelfFundedRequest>
{
  constructor(private readonly providerFactory: IProviderFactory) {}

  async prepareSelfFundedTransaction(
    request: TSelfFundedRequest,
    wallet: Wallet,
  ): Promise<UnsignedTransaction<TSelfFundedRequest>> {
    const provider = await this.providerFactory.createProvider({
      chainType: ChainType.POLYGON,
    });

    const gasLimit = await provider.estimateGas({
      to: request.contractAddress,
      from: wallet.address,
      data: request.encodedData,
    });

    const gasEstimator = new Eip1559GasPriceEstimator(provider, (value) => Amount.matic(value));

    const gasPriceEstimate = await gasEstimator.estimate(TransactionExecutionSpeed.FAST);

    const transactionRequest = {
      to: request.contractAddress,
      from: wallet.address,
      data: request.encodedData,
      gasLimit,
      maxFeePerGas: bigNumber(gasPriceEstimate.maxFeePerGas),
      maxPriorityFeePerGas: bigNumber(gasPriceEstimate.maxPriorityFeePerGas),
      type: 2, // EIP-1559
    };

    return new UnsignedSelfFundedProtocolCallTransaction(request, transactionRequest);
  }
}
