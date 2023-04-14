import { TransactionRequest } from '@ethersproject/providers';
import { bigNumber } from '@lens-protocol/blockchain-bindings';
import { Wallet, UnsignedTransaction } from '@lens-protocol/domain/entities';
import {
  Data,
  IPayTransactionGateway,
  SupportedTransactionRequest,
} from '@lens-protocol/domain/use-cases/transactions';
import { Amount, ChainType, EthereumAddress } from '@lens-protocol/shared-kernel';
import { v4 } from 'uuid';

import { ITransactionRequest } from '../../wallet/adapters/ConcreteWallet';
import { IProviderFactory } from '../../wallet/adapters/IProviderFactory';
import {
  Eip1559GasPriceEstimator,
  TransactionExecutionSpeed,
} from '../infrastructure/Eip1559GasPriceEstimator';

type Distribute<TUnion, TAdd> = TUnion extends unknown ? TUnion & TAdd : never;

type RawTransactionDetails = {
  contractAddress: EthereumAddress;
  encodedData: Data;
};

export type SelfFundedProtocolCallRequest = Distribute<
  SupportedTransactionRequest,
  RawTransactionDetails
>;

export class UnsignedSelfFundedProtocolCallTransaction<
    Request extends SelfFundedProtocolCallRequest = SelfFundedProtocolCallRequest,
  >
  extends UnsignedTransaction<Request>
  implements ITransactionRequest
{
  constructor(request: Request, readonly transactionRequest: TransactionRequest) {
    super(v4(), ChainType.POLYGON, request);
  }
}

export class SelfFundedProtocolCallGateway<T extends SelfFundedProtocolCallRequest>
  implements IPayTransactionGateway<T>
{
  constructor(private readonly providerFactory: IProviderFactory) {}

  async prepareSelfFundedTransaction(request: T, wallet: Wallet): Promise<UnsignedTransaction<T>> {
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
