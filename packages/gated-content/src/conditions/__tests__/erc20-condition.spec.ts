import { ContractType, ScalarOperator } from '@lens-protocol/api-bindings';
import { mockEthereumAddress } from '@lens-protocol/shared-kernel/mocks';

import { mockErc20OwnershipInput } from '../__helpers__/mocks';
import { resolveScalarOperatorSymbol, transformErc20Condition } from '../erc20-condition';
import { LitConditionType, SupportedChains } from '../types';
import { InvalidAccessCriteriaError } from '../validators';

const knownAddress = mockEthereumAddress();

describe(`Given the "${transformErc20Condition.name}" function`, () => {
  describe('when called with an Erc20 Ownership condition', () => {
    const operatorPairs = Object.values(ScalarOperator).map((operator) => ({
      operator,
      expectedLitOperator: resolveScalarOperatorSymbol(operator),
    }));

    it.each(operatorPairs)(
      'should support $operator comparisons',
      ({ operator, expectedLitOperator }) => {
        const condition = mockErc20OwnershipInput({
          condition: operator,
          contractAddress: knownAddress,
        });

        const actual = transformErc20Condition(condition);

        const expectedLitAccessConditions = [
          {
            conditionType: LitConditionType.EVM_BASIC,
            chain: SupportedChains.ETHEREUM,
            contractAddress: knownAddress.toLowerCase(),
            method: 'balanceOf',
            parameters: [':userAddress'],
            returnValueTest: {
              comparator: expectedLitOperator,
              value: '100000000000000000000',
            },
            standardContractType: ContractType.Erc20,
          },
        ];
        expect(actual).toEqual(expectedLitAccessConditions);
      },
    );

    it('should transform decimal amounts as expected', () => {
      const condition = mockErc20OwnershipInput({
        amount: '0.1',
        decimals: 18,
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
        condition: mockErc20OwnershipInput({
          contractAddress: '0x123',
        }),
      },

      {
        description: 'if with invalid chain ID',
        condition: mockErc20OwnershipInput({
          chainID: 42,
        }),
      },

      {
        description: 'if with invalid condition amount',
        condition: mockErc20OwnershipInput({
          amount: 'a',
        }),
      },

      {
        description: 'if with invalid comparison operator',
        condition: mockErc20OwnershipInput({
          condition: 'a' as ScalarOperator,
        }),
      },
    ])(`should throw an ${InvalidAccessCriteriaError.name} $description`, ({ condition }) => {
      expect(() => transformErc20Condition(condition)).toThrow(InvalidAccessCriteriaError);
    });
  });
});
