import { erc20, bigNumber } from '@lens-protocol/blockchain-bindings';
import {
  IPaidTransactionGateway,
  TokenAllowanceLimit,
  TokenAllowanceRequest,
} from '@lens-protocol/domain/use-cases/transactions';
import { Amount, BigDecimal, CryptoNativeAsset, Data } from '@lens-protocol/shared-kernel';
import { BigNumber, constants } from 'ethers';

import { AbstractContractCallGateway, ContractCallDetails } from './AbstractContractCallGateway';

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

export class ApproveTransactionGateway
  extends AbstractContractCallGateway<TokenAllowanceRequest>
  implements IPaidTransactionGateway<TokenAllowanceRequest>
{
  protected async createEncodedData(request: TokenAllowanceRequest): Promise<ContractCallDetails> {
    const contract = erc20(request.amount.asset.address);

    const amount = resolveApproveAmount(request);

    const encodedData = contract.interface.encodeFunctionData('approve', [request.spender, amount]);

    return {
      contractAddress: request.amount.asset.address,
      encodedData: encodedData as Data,
    };
  }
}
