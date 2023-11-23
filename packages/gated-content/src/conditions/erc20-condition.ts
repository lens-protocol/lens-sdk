import { parseFixed } from '@ethersproject/bignumber';
import { Erc20OwnershipCondition } from '@lens-protocol/metadata';

import {
  LitAccessCondition,
  LitConditionType,
  LitContractType,
  LitKnownMethods,
  LitKnownParams,
} from './types';
import { toLitSupportedChainName, resolveScalarOperatorSymbol } from './utils';
import {
  assertValidAddress,
  assertSupportedChainId,
  InvalidAccessCriteriaError,
} from './validators';

function parseConditionAmount(condition: Erc20OwnershipCondition): string {
  try {
    return parseFixed(condition.amount.value, condition.amount.asset.decimals).toString();
  } catch (e: unknown) {
    throw new InvalidAccessCriteriaError(`Invalid amount: ${condition.amount.value}`);
  }
}

export const transformErc20Condition = (
  condition: Erc20OwnershipCondition,
): Array<LitAccessCondition> => {
  assertValidAddress(condition.amount.asset.contract.address);
  assertSupportedChainId(condition.amount.asset.contract.chainId);

  return [
    {
      conditionType: LitConditionType.EVM_BASIC,
      contractAddress: condition.amount.asset.contract.address.toLowerCase(),
      standardContractType: LitContractType.ERC20,
      chain: toLitSupportedChainName(condition.amount.asset.contract.chainId),
      method: LitKnownMethods.BALANCE_OF,
      parameters: [LitKnownParams.USER_ADDRESS],
      returnValueTest: {
        comparator: resolveScalarOperatorSymbol(condition.condition),
        value: parseConditionAmount(condition),
      },
    },
  ];
};
