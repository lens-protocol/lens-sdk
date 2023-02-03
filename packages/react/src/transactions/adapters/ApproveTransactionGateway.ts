import { TransactionRequest } from '@ethersproject/providers';
import { erc20, bigNumber } from '@lens-protocol/blockchain-bindings';
import { Wallet, UnsignedTransaction } from '@lens-protocol/domain/entities';
import {
  IApproveTransactionGateway,
  TokenAllowanceLimit,
  TokenAllowanceRequest,
} from '@lens-protocol/domain/use-cases/wallets';
import {
  Amount,
  BigDecimal,
  ChainType,
  CryptoAsset,
  CryptoNativeAsset,
  getID,
} from '@lens-protocol/shared-kernel';
import { BigNumber, constants } from 'ethers';

import { ITransactionRequest } from '../../wallet/adapters/ConcreteWallet';
import { IProviderFactory } from '../../wallet/adapters/IProviderFactory';
import {
  Eip1559GasPriceEstimator,
  TransactionExecutionSpeed,
} from '../infrastructure/Eip1559GasPriceEstimator';

export class UnsignedApproveTransaction<
    Request extends TokenAllowanceRequest = TokenAllowanceRequest,
  >
  extends UnsignedTransaction<Request>
  implements ITransactionRequest
{
  constructor(
    chainType: ChainType,
    request: Request,
    readonly transactionRequest: TransactionRequest,
  ) {
    super(getID(), chainType, request);
  }
}

function createCryptoNativeAmountFactoryFor(
  asset: CryptoAsset,
): CryptoNativeAmountFactory<CryptoNativeAsset> {
  switch (asset.chainType) {
    case ChainType.ETHEREUM:
      return (value) => Amount.ether(value);
    case ChainType.POLYGON:
      return (value) => Amount.matic(value);
  }
}

export type CryptoNativeAmountFactory<T extends CryptoNativeAsset> = (
  value: BigDecimal,
) => Amount<T>;

function resolveApproveAmount(request: TokenAllowanceRequest): BigNumber {
  switch (request.limit) {
    case TokenAllowanceLimit.EXACT:
      return bigNumber(request.amount);
    case TokenAllowanceLimit.INFINITE:
      return constants.MaxUint256;
  }
}

export class ApproveTransactionGateway implements IApproveTransactionGateway {
  constructor(private readonly providerFactory: IProviderFactory) {}

  async createApproveTransaction(
    request: TokenAllowanceRequest,
    wallet: Wallet,
  ): Promise<UnsignedApproveTransaction> {
    const provider = await this.providerFactory.createProvider({
      chainType: request.amount.asset.chainType,
    });
    const contract = erc20(request.amount.asset.address, provider);

    const amount = resolveApproveAmount(request);

    const gasLimit = await contract.estimateGas.approve(request.spender, amount, {
      from: wallet.address,
    });

    const gasEstimator = new Eip1559GasPriceEstimator(
      provider,
      createCryptoNativeAmountFactoryFor(request.amount.asset),
    );

    const gasPriceEstimate = await gasEstimator.estimate(TransactionExecutionSpeed.FAST);

    const transactionRequest = await contract.populateTransaction.approve(request.spender, amount, {
      from: wallet.address,
      gasLimit,
      maxFeePerGas: bigNumber(gasPriceEstimate.maxFeePerGas),
      maxPriorityFeePerGas: bigNumber(gasPriceEstimate.maxPriorityFeePerGas),
      type: 2, // EIP-1559
    });

    return new UnsignedApproveTransaction(
      request.amount.asset.chainType,
      request,
      transactionRequest,
    );
  }
}
