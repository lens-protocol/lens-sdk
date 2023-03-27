import { mockProfileId } from '@lens-protocol/domain/mocks';
import { BigNumber } from 'ethers';

import { testing } from '../../__helpers__/env';
import { mockFollowConditionInput } from '../__helpers__/mocks';
import { transformFollowCondition } from '../follow-condition';
import {
  LitConditionType,
  LitKnownMethods,
  LitKnownParams,
  LitScalarOperator,
  SupportedChains,
} from '../types';
import { InvalidAccessCriteriaError } from '../validators';

describe(`Given the "${transformFollowCondition.name}" function`, () => {
  describe('when called with a Follow Profile condition', () => {
    const profileId = mockProfileId();

    it('should return the expected Lit AccessControlCondition', () => {
      const condition = mockFollowConditionInput({ profileId });

      const actual = transformFollowCondition(condition, testing);

      const expectedLitAccessConditions = [
        {
          conditionType: LitConditionType.EVM_CONTRACT,
          chain: SupportedChains.MUMBAI,
          contractAddress: '0xcc44c4e8066fFA4acfb619A82dCF918263045c87',
          functionName: LitKnownMethods.IS_FOLLOWING,
          functionParams: [
            LitKnownParams.USER_ADDRESS,
            BigNumber.from(profileId).toString(),
            '0',
            '0x',
          ],
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
                internalType: 'uint256',
                name: 'followerProfileId',
                type: 'uint256',
              },
              {
                internalType: 'bytes',
                name: 'data',
                type: 'bytes',
              },
            ],
            name: LitKnownMethods.IS_FOLLOWING,
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
        condition: mockFollowConditionInput({
          profileId: mockProfileId(),
        }),
      },
    ])(`should throw an ${InvalidAccessCriteriaError.name} $description`, ({ condition }) => {
      expect(() => transformFollowCondition(condition, testing)).toThrow(
        InvalidAccessCriteriaError,
      );
    });
  });
});
