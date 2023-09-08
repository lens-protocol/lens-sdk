import { toEvmAddress } from '@lens-protocol/metadata';

import { mockEoaOwnershipCondition, mockEvmAddress } from '../../__helpers__/mocks';
import { transformEoaCondition } from '../eoa-condition';
import { LitConditionType, LitKnownParams, LitScalarOperator, SupportedChains } from '../types';
import { InvalidAccessCriteriaError } from '../validators';

const knownAddress = mockEvmAddress();

describe(`Given the "${transformEoaCondition.name}" function`, () => {
  describe('when called with an EOA Ownership condition', () => {
    it('should return the expected Lit AccessControlCondition', () => {
      const condition = mockEoaOwnershipCondition({ address: knownAddress });

      const actual = transformEoaCondition(condition);

      const expectedLitAccessConditions = [
        {
          conditionType: LitConditionType.EVM_BASIC,
          chain: SupportedChains.POLYGON,
          contractAddress: '',
          method: '',
          parameters: [LitKnownParams.USER_ADDRESS],
          returnValueTest: {
            comparator: LitScalarOperator.EQUAL,
            value: condition.address,
          },
          standardContractType: '',
        },
      ];
      expect(actual).toEqual(expectedLitAccessConditions);
    });

    it(`should throw a ${InvalidAccessCriteriaError.name}`, () => {
      const condition = mockEoaOwnershipCondition({ address: toEvmAddress('0x123') });
      expect(() => transformEoaCondition(condition)).toThrow(InvalidAccessCriteriaError);
    });
  });
});
