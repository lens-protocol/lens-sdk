import { JsonRpcProvider } from '@ethersproject/providers';
import { bigNumber } from '@lens-protocol/blockchain-bindings';
import { UnsignedTransaction, Wallet } from '@lens-protocol/domain/entities';
import {
  AnyTransactionRequest,
  IPaidTransactionGateway,
} from '@lens-protocol/domain/use-cases/transactions';
import { Amount, ChainType, Data, EvmAddress } from '@lens-protocol/shared-kernel';
import { BigNumberish, BytesLike } from 'ethers';
import { v4 } from 'uuid';

import { RequiredConfig } from '../../config';
import { ITransactionRequest } from '../../wallet/adapters/ConcreteWallet';
import { IProviderFactory } from '../../wallet/adapters/IProviderFactory';
import { Eip1559GasPriceEstimator, TransactionExecutionSpeed } from './Eip1559GasPriceEstimator';

export type Eip1559TransactionRequest = {
  to: string;
  from: string;
  nonce?: BigNumberish;

  gasLimit?: BigNumberish;

  data: BytesLike;
  value?: BigNumberish;
  chainId?: number;

  type: 2;

  maxPriorityFeePerGas?: BigNumberish;
  maxFeePerGas?: BigNumberish;
};

export class UnsignedContractCallTransaction<TRequest extends AnyTransactionRequest>
  extends UnsignedTransaction<TRequest>
  implements ITransactionRequest
{
  constructor(request: TRequest, readonly transactionRequest: Eip1559TransactionRequest) {
    super(v4(), ChainType.POLYGON, request);
  }
}

export type ContractCallDetails = {
  contractAddress: EvmAddress;
  encodedData: Data;
  value?: BigNumberish;
};

export abstract class AbstractContractCallGateway<TRequest extends AnyTransactionRequest>
  implements IPaidTransactionGateway<TRequest>
{
  constructor(
    protected readonly config: RequiredConfig,
    private readonly providerFactory: IProviderFactory,
  ) {}

  async createUnsignedTransaction(
    request: TRequest,
    wallet: Wallet,
  ): Promise<UnsignedTransaction<TRequest>> {
    const provider = await this.providerFactory.createProvider({
      chainType: ChainType.POLYGON,
    });

    const { contractAddress, encodedData, value } = await this.createCallDetails(request, provider);

    // skip gas limit if debug mode is enabled
    if (this.config.debug === true) {
      const transactionRequest: Eip1559TransactionRequest = {
        to: contractAddress,
        from: wallet.address,
        data: encodedData,
        value,
        type: 2, // EIP-1559
      };

      return new UnsignedContractCallTransaction(request, transactionRequest);
    }

    const gasLimit = await provider.estimateGas({
      to: contractAddress,
      from: wallet.address,
      data: encodedData,
      value,
    });

    const gasEstimator = new Eip1559GasPriceEstimator(provider, (v) => Amount.matic(v));
    const gasPriceEstimate = await gasEstimator.estimate(TransactionExecutionSpeed.FAST);

    const transactionRequest: Eip1559TransactionRequest = {
      to: contractAddress,
      from: wallet.address,
      data: encodedData,
      gasLimit,
      maxFeePerGas: bigNumber(gasPriceEstimate.maxFeePerGas),
      maxPriorityFeePerGas: bigNumber(gasPriceEstimate.maxPriorityFeePerGas),
      type: 2, // EIP-1559
      value,
    };

    return new UnsignedContractCallTransaction(request, transactionRequest);
  }

  protected abstract createCallDetails(
    request: TRequest,
    provider: JsonRpcProvider,
  ): Promise<ContractCallDetails>;
}
