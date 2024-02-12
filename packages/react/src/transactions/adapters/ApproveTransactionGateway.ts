import { BigNumber } from '@ethersproject/bignumber';
import { MaxUint256 } from '@ethersproject/constants';
import { bigNumber, erc20 } from '@lens-protocol/blockchain-bindings';
import {
  IPaidTransactionGateway,
  TokenAllowanceLimit,
  TokenAllowanceRequest,
} from '@lens-protocol/domain/use-cases/transactions';
import { Data } from '@lens-protocol/shared-kernel';

import { AbstractContractCallGateway, ContractCallDetails } from './AbstractContractCallGateway';

function resolveApproveAmount(request: TokenAllowanceRequest): BigNumber {
  switch (request.limit) {
    case TokenAllowanceLimit.EXACT:
      return bigNumber(request.amount);
    case TokenAllowanceLimit.INFINITE:
      return MaxUint256;
  }
}

export class ApproveTransactionGateway
  extends AbstractContractCallGateway<TokenAllowanceRequest>
  implements IPaidTransactionGateway<TokenAllowanceRequest>
{
  protected async createCallDetails(request: TokenAllowanceRequest): Promise<ContractCallDetails> {
    const contract = erc20(request.amount.asset.address);

    const amount = resolveApproveAmount(request);

    const encodedData = contract.interface.encodeFunctionData('approve', [request.spender, amount]);

    return {
      contractAddress: request.amount.asset.address,
      encodedData: encodedData as Data,
    };
  }
}
