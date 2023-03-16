import { parseFixed } from '@ethersproject/bignumber';
import { ContractType, Erc20OwnershipInput, ScalarOperator } from '@lens-protocol/api-bindings';

import {
  LitAccessCondition,
  LitConditionType,
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

export const resolveScalarOperatorSymbol = (operator: ScalarOperator): LitScalarOperator => {
  switch (operator) {
    case ScalarOperator.Equal:
      return LitScalarOperator.EQUAL;
    case ScalarOperator.GreaterThan:
      return LitScalarOperator.GREATER_THAN;
    case ScalarOperator.GreaterThanOrEqual:
      return LitScalarOperator.GREATER_THAN_OR_EQUAL;
    case ScalarOperator.LessThan:
      return LitScalarOperator.LESS_THAN;
    case ScalarOperator.LessThanOrEqual:
      return LitScalarOperator.LESS_THAN_OR_EQUAL;
    case ScalarOperator.NotEqual:
      return LitScalarOperator.NOT_EQUAL;
    default:
      throw new InvalidAccessCriteriaError(`Invalid operator: ${String(operator)}`);
  }
};

function parseConditionAmount(condition: Erc20OwnershipInput): string {
  try {
    return parseFixed(condition.amount, condition.decimals).toString();
  } catch (e: unknown) {
    throw new InvalidAccessCriteriaError(`Invalid amount: ${condition.amount}`);
  }
}

export const transformErc20Condition = (
  condition: Erc20OwnershipInput,
): Array<LitAccessCondition> => {
  assertValidAddress(condition.contractAddress);
  assertSupportedChainId(condition.chainID);

  return [
    {
      conditionType: LitConditionType.EVM_BASIC,
      contractAddress: condition.contractAddress.toLowerCase(),
      standardContractType: ContractType.Erc20,
      chain: toLitSupportedChainName(condition.chainID),
      method: LitKnownMethods.BALANCE_OF,
      parameters: [LitKnownParams.USER_ADDRESS],
      returnValueTest: {
        comparator: resolveScalarOperatorSymbol(condition.condition),
        value: parseConditionAmount(condition),
      },
    },
  ];
};
