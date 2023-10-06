import { toChainId, ConditionComparisonOperator, toEvmAddress } from '@lens-protocol/metadata';

import {
  mockAmount,
  mockAsset,
  mockErc20OwnershipCondition,
  mockNetworkAddress,
} from '../../__helpers__/mocks';
import { transformErc20Condition } from '../erc20-condition';
import { LitConditionType, LitContractType, SupportedChains } from '../types';
import { resolveScalarOperatorSymbol } from '../utils';
import { InvalidAccessCriteriaError } from '../validators';

describe(`Given the "${transformErc20Condition.name}" function`, () => {
  describe('when called with an Erc20 Ownership condition', () => {
    const operatorPairs = Object.values(ConditionComparisonOperator).map((operator) => ({
      operator,
      expectedLitOperator: resolveScalarOperatorSymbol(operator),
    }));

    it.each(operatorPairs)(
      'should support $operator comparisons',
      ({ operator, expectedLitOperator }) => {
        const condition = mockErc20OwnershipCondition({
          condition: operator,
        });

        const actual = transformErc20Condition(condition);

        const expectedLitAccessConditions = [
          {
            conditionType: LitConditionType.EVM_BASIC,
            chain: SupportedChains.ETHEREUM,
            contractAddress: condition.amount.asset.contract.address.toLowerCase(),
            method: 'balanceOf',
            parameters: [':userAddress'],
            returnValueTest: {
              comparator: expectedLitOperator,
              value: '100000000000000000000',
            },
            standardContractType: LitContractType.ERC20,
          },
        ];
        expect(actual).toEqual(expectedLitAccessConditions);
      },
    );

    it('should transform decimal amounts as expected', () => {
      const condition = mockErc20OwnershipCondition({
        amount: mockAmount({
          asset: mockAsset({ decimals: 18 }),
          value: '0.1',
        }),
      });

      const actual = transformErc20Condition(condition);

      expect(actual).toMatchObject([
        {
          returnValueTest: {
            value: '100000000000000000',
          },
        },
      ]);
    });

    it.each([
      {
        description: 'if with invalid contract address',
        condition: mockErc20OwnershipCondition({
          amount: mockAmount({
            asset: mockAsset({
              contract: mockNetworkAddress({
                address: toEvmAddress('0x123'),
              }),
            }),
          }),
        }),
      },

      {
        description: 'if with invalid chain ID',
        condition: mockErc20OwnershipCondition({
          amount: mockAmount({
            asset: mockAsset({
              contract: mockNetworkAddress({
                chainId: toChainId(42),
              }),
            }),
          }),
        }),
      },

      {
        description: 'if with invalid condition amount',
        condition: mockErc20OwnershipCondition({
          amount: mockAmount({
            value: 'a',
          }),
        }),
      },

      {
        description: 'if with invalid comparison operator',
        condition: mockErc20OwnershipCondition({
          condition: 'a' as ConditionComparisonOperator,
        }),
      },
    ])(`should throw an ${InvalidAccessCriteriaError.name} $description`, ({ condition }) => {
      expect(() => transformErc20Condition(condition)).toThrow(InvalidAccessCriteriaError);
    });
  });
});
