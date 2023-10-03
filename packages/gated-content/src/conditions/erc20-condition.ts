import { parseFixed } from '@ethersproject/bignumber';
import { Erc20OwnershipCondition, ConditionComparisonOperator } from '@lens-protocol/metadata';

import {
  LitAccessCondition,
  LitConditionType,
  LitContractType,
  LitKnownMethods,
  LitKnownParams,
  LitScalarOperator,
} from './types';
import { toLitSupportedChainName } from './utils';
import {
  assertValidAddress,
  assertSupportedChainId,
  InvalidAccessCriteriaError,
} from './validators';

export const resolveScalarOperatorSymbol = (
  operator: ConditionComparisonOperator,
): LitScalarOperator => {
  if (operator in LitScalarOperator) return LitScalarOperator[operator];

  throw new InvalidAccessCriteriaError(`Invalid operator: ${String(operator)}`);
};

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
