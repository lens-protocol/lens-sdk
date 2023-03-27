import { mockProfileId } from '@lens-protocol/domain/mocks';
import { BigNumber } from 'ethers';

import { testing } from '../../__helpers__/env';
import { mockProfileOwnershipInput } from '../__helpers__/mocks';
import { transformProfileCondition } from '../profile-condition';
import {
  LitConditionType,
  LitKnownMethods,
  LitKnownParams,
  LitScalarOperator,
  SupportedChains,
} from '../types';
import { InvalidAccessCriteriaError } from '../validators';

describe(`Given the "${mockProfileOwnershipInput.name}" function`, () => {
  describe('when called with a Profile Ownership condition', () => {
    const profileId = mockProfileId();

    it('should return the expected Lit AccessControlCondition', () => {
      const condition = mockProfileOwnershipInput({ profileId });

      const actual = transformProfileCondition(condition, testing);

      const expectedLitAccessConditions = [
        {
          conditionType: LitConditionType.EVM_CONTRACT,
          chain: SupportedChains.MUMBAI,
          contractAddress: testing.contractAddress,
          functionName: LitKnownMethods.HAS_ACCESS,
          functionParams: [LitKnownParams.USER_ADDRESS, BigNumber.from(profileId).toString(), '0x'],
          functionAbi: {
            constant: true,
            inputs: [
              {
                internalType: 'address',
                name: 'requestorAddress',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'profileId',
                type: 'uint256',
              },
              {
                internalType: 'bytes',
                name: 'data',
                type: 'bytes',
              },
            ],
            name: 'hasAccess',
            outputs: [
              {
                internalType: 'bool',
                name: '',
                type: 'bool',
              },
            ],
            stateMutability: 'view',
            type: 'function',
          },
          returnValueTest: {
            comparator: LitScalarOperator.EQUAL,
            key: '',
            value: 'true',
          },
        },
      ];
      expect(actual).toEqual(expectedLitAccessConditions);
    });

    it.each([
      {
        description: 'if with invalid profile Id',
        condition: mockProfileOwnershipInput({
          profileId: mockProfileId(),
        }),
      },
    ])(`should throw an ${InvalidAccessCriteriaError.name} $description`, ({ condition }) => {
      expect(() => transformProfileCondition(condition, testing)).toThrow(
        InvalidAccessCriteriaError,
      );
    });
  });
});
