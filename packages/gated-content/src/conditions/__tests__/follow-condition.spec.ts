import { toProfileId } from '@lens-protocol/metadata';
import { BigNumber } from 'ethers';

import {
  mockAccessControlContract,
  mockFollowCondition,
  mockProfileId,
} from '../../__helpers__/mocks';
import { transformFollowCondition } from '../follow-condition';
import { LitConditionType, LitKnownMethods, LitKnownParams, LitScalarOperator } from '../types';
import { toLitSupportedChainName } from '../utils';
import { InvalidAccessCriteriaError } from '../validators';

const contract = mockAccessControlContract();

describe(`Given the "${transformFollowCondition.name}" function`, () => {
  describe('when called with a Follow Profile condition', () => {
    const profileId = mockProfileId();

    it('should return the expected Lit AccessControlCondition', () => {
      const condition = mockFollowCondition({ follow: profileId });

      const actual = transformFollowCondition(condition, contract);

      const expectedLitAccessConditions = [
        {
          conditionType: LitConditionType.EVM_CONTRACT,
          chain: toLitSupportedChainName(contract.chainId),
          contractAddress: contract.address,
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
        condition: mockFollowCondition({
          follow: toProfileId('invalid-profile-id'),
        }),
      },
    ])(`should throw an ${InvalidAccessCriteriaError.name} $description`, ({ condition }) => {
      expect(() => transformFollowCondition(condition, contract)).toThrow(
        InvalidAccessCriteriaError,
      );
    });
  });
});
