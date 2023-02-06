import { BigNumber, parseFixed } from '@ethersproject/bignumber';
import { ContractType, Erc20OwnershipOutput, ScalarOperator } from '../graphql/types';
import {
  LitAccessCondition,
  LitConditionType,
  LitKnownMethods,
  LitKnownParams,
} from '../lit/types';
import { chainIdToString } from '../utils';
import {
  validateAddress,
  validateAmount,
  validateChainID,
  validateScalarCondition,
} from '../validators';
import { getScalarOperatorSymbol } from './utils';

export const validateErc20Condition = (condition: Erc20OwnershipOutput): void => {
  validateAddress(condition.contractAddress);
  validateChainID(condition.chainID);
  validateAmount(condition.amount, condition.decimals);
  validateScalarCondition(condition.condition as ScalarOperator);
};

export const transformErc20Condition = (
  condition: Erc20OwnershipOutput
): Array<LitAccessCondition> => {
  const value = parseFixed(condition.amount, condition.decimals).toString();
  return [
    {
      conditionType: LitConditionType.EVM_BASIC,
      contractAddress: condition.contractAddress.toLowerCase(),
      standardContractType: ContractType.Erc20,
      chain: chainIdToString(condition.chainID),
      method: LitKnownMethods.BALANCE_OF,
      parameters: [LitKnownParams.USER_ADDRESS],
      returnValueTest: {
        comparator: getScalarOperatorSymbol(condition.condition),
        value,
      },
    },
  ];
};
