import { Interface } from '@ethersproject/abi';
import { toChainId, ConditionComparisonOperator, toEvmAddress } from '@lens-protocol/metadata';

import { mockNetworkAddress, mockAdvancedContractCondition } from '../../__helpers__/mocks';
import { transformAdvancedContractCondition } from '../advanced-contract-condition';
import { LitConditionType, SupportedChains } from '../types';
import { resolveScalarOperatorSymbol } from '../utils';
import { InvalidAccessCriteriaError } from '../validators';

describe(`Given the "${transformAdvancedContractCondition.name}" function`, () => {
  describe('when called with an Advanced Contract condition', () => {
    const operatorPairs = Object.values(ConditionComparisonOperator).map((operator) => ({
      operator,
      expectedLitOperator: resolveScalarOperatorSymbol(operator),
    }));

    it.each(operatorPairs)(
      'should support $operator comparisons',
      ({ operator, expectedLitOperator }) => {
        const condition = mockAdvancedContractCondition({
          comparison: operator,
        });

        const actual = transformAdvancedContractCondition(condition);

        const expectedLitAccessConditions = [
          {
            conditionType: LitConditionType.EVM_CONTRACT,
            chain: SupportedChains.ETHEREUM,
            contractAddress: condition.contract.address.toLowerCase(),
            functionAbi: new Interface([
              'function balanceOf(address) view returns (uint256)',
            ]).getFunction(condition.functionName),
            functionName: 'balanceOf',
            functionParams: [':userAddress'],
            returnValueTest: {
              comparator: expectedLitOperator,
              value: '1',
              key: '',
            },
          },
        ];
        expect(actual).toEqual(expectedLitAccessConditions);
      },
    );

    it.each([
      {
        description: 'if with invalid contract address',
        condition: mockAdvancedContractCondition({
          contract: mockNetworkAddress({
            address: toEvmAddress('0x000000000000000000000000000000000000000000000000'),
          }),
        }),
      },

      {
        description: 'if with invalid chain ID',
        condition: mockAdvancedContractCondition({
          contract: mockNetworkAddress({
            chainId: toChainId(2),
          }),
        }),
      },

      {
        description: 'if with invalid comparison value',
        condition: mockAdvancedContractCondition({
          comparison: ConditionComparisonOperator.GREATER_THAN,
          value: 'a',
        }),
      },

      {
        description: 'if with invalid comparison operator',
        condition: mockAdvancedContractCondition({
          comparison: 'a' as ConditionComparisonOperator,
        }),
      },
    ])(`should throw an ${InvalidAccessCriteriaError.name} $description`, ({ condition }) => {
      expect(() => transformAdvancedContractCondition(condition)).toThrow(
        InvalidAccessCriteriaError,
      );
    });
  });
});
