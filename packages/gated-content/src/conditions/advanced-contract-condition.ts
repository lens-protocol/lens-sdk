import { Interface } from '@ethersproject/abi';
import { BigNumber } from '@ethersproject/bignumber';
import { AdvancedContractCondition, ConditionComparisonOperator } from '@lens-protocol/metadata';
import { invariant, assertError } from '@lens-protocol/shared-kernel';

import { LitConditionType, LitEvmAccessCondition } from './types';
import { toLitSupportedChainName, resolveScalarOperatorSymbol } from './utils';
import {
  assertValidAddress,
  assertSupportedChainId,
  InvalidAccessCriteriaError,
} from './validators';

export const transformAdvancedContractCondition = (
  condition: AdvancedContractCondition,
): Array<LitEvmAccessCondition> => {
  assertValidAddress(condition.contract.address);
  assertSupportedChainId(condition.contract.chainId);
  assertValidAbi(condition.abi, condition.functionName);
  assertValidFunctionParams(condition);
  assertValidComparison(condition);

  return [
    {
      conditionType: LitConditionType.EVM_CONTRACT,
      contractAddress: condition.contract.address.toLowerCase(),
      chain: toLitSupportedChainName(condition.contract.chainId),
      functionName: condition.functionName,
      functionParams: condition.params || [],
      functionAbi: new Interface([condition.abi]).getFunction(condition.functionName),
      returnValueTest: {
        key: '',
        comparator: resolveScalarOperatorSymbol(condition.comparison),
        value: condition.value,
      },
    },
  ];
};

function assertValidAbi(humanReadableAbi: string, functionName: string): void {
  try {
    const fn = new Interface([humanReadableAbi]).getFunction(functionName);

    // assert view function
    invariant(fn.stateMutability === 'view', 'You can only use view functions');

    // assert single output
    invariant(
      Array.isArray(fn.outputs) && fn.outputs.length === 1,
      'The function must return 1 value',
    );

    // assert output is boolean or uint
    invariant(
      fn.outputs[0] &&
        (fn.outputs[0].type === 'bool' || /^uint(8|16|32|64|128|256)$/.test(fn.outputs[0].type)),
      'The function must return a boolean or uint[8|16|32|64|128|256]',
    );
  } catch (e: unknown) {
    throw new InvalidAccessCriteriaError(
      `Invalid abi: ${humanReadableAbi} or function: ${functionName}. Only view functions returning a single boolean or uint output are supported`,
    );
  }
}

/**
 * verifies arguments are valid, as well as the prefixed `:userAddress` param exists
 * @param condition - the user provided condition object
 */
function assertValidFunctionParams(condition: AdvancedContractCondition): void {
  try {
    const fn = new Interface([condition.abi]).getFunction(condition.functionName);
    let userAddressParamFound = false;

    invariant(fn.inputs.length === condition.params.length, 'wrong number of params');

    fn.inputs.forEach((input, index) => {
      const param = condition.params[index];

      invariant(param, `param ${input.name || input.type} is missing`);

      if (input.baseType === 'array' || input.baseType === 'tuple') {
        invariant(
          Array.isArray(param) && param.length > 0,
          `param ${input.name} expects an array argument`,
        );

        if (param.includes(':userAddress')) {
          userAddressParamFound = true;
        }
      }

      if (input.baseType === 'address') {
        if (param === ':userAddress') {
          userAddressParamFound = true;
        } else {
          assertValidAddress(param);
        }
      } else if (input.baseType.includes('int')) {
        BigNumber.from(param);
      } else if (input.baseType === 'bool') {
        invariant(
          param === 'true' || param === 'false',
          `param ${input.name} is invalid, must be a boolean)`,
        );
      } else if (input.baseType === 'bytes') {
        invariant(
          /^0x[0-9A-Fa-f]+$/.test(param),
          `param ${input.name} is invalid, must be a hex string)`,
        );
      }
    });

    invariant(userAddressParamFound, `param :userAddress is missing`);
  } catch (e: unknown) {
    assertError(e);
    throw new InvalidAccessCriteriaError(e.message);
  }
}

/**
 * verifies the comparison is valid based on the function output type
 * @param condition - the user provided condition object
 */
function assertValidComparison(condition: AdvancedContractCondition): void {
  try {
    invariant(
      Object.values(ConditionComparisonOperator).includes(condition.comparison),
      `comparison operator ${condition.comparison} is unsupported`,
    );

    // get function return type
    const fn = new Interface([condition.abi]).getFunction(condition.functionName);

    invariant(
      Array.isArray(fn.outputs) && fn.outputs.length === 1 && fn.outputs[0],
      'function should have a single output',
    );

    // for bool, array, tuple results we only allow equal/not equal
    if (['bool', 'string', 'bytes', 'address', 'array', 'tuple'].includes(fn.outputs[0].baseType)) {
      invariant(
        condition.comparison === ConditionComparisonOperator.EQUAL ||
          condition.comparison === ConditionComparisonOperator.NOT_EQUAL,
        `comparison ${condition.comparison} is invalid for function return type ${fn.outputs[0].type}`,
      );
    }

    // for uint results we allow all comparisons but we check the provided value
    if (/^uint(8|16|32|64|128|256)$/.test(fn.outputs[0].baseType)) {
      BigNumber.from(condition.value);
    }
  } catch (e: unknown) {
    assertError(e);
    throw new InvalidAccessCriteriaError(e.message);
  }
}
