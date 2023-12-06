import { toProfileId } from '@lens-protocol/metadata';
import { BigNumber } from 'ethers';

import {
  mockAccessControlContract,
  mockProfileId,
  mockProfileOwnershipCondition,
} from '../../__helpers__/mocks';
import { transformProfileCondition } from '../profile-condition';
import { LitConditionType, LitKnownMethods, LitKnownParams, LitScalarOperator } from '../types';
import { toLitSupportedChainName } from '../utils';
import { InvalidAccessCriteriaError } from '../validators';

const contract = mockAccessControlContract();

describe(`Given the "${transformProfileCondition.name}" function`, () => {
  describe('when called with a Profile Ownership condition', () => {
    const profileId = mockProfileId();

    it('should return the expected Lit AccessControlCondition', () => {
      const condition = mockProfileOwnershipCondition({ profileId });

      const actual = transformProfileCondition(condition, contract);

      const expectedLitAccessConditions = [
        {
          conditionType: LitConditionType.EVM_CONTRACT,
          chain: toLitSupportedChainName(contract.chainId),
          contractAddress: contract.address,
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
        condition: mockProfileOwnershipCondition({
          profileId: toProfileId('invalid-profile-id'),
        }),
      },
    ])(`should throw an ${InvalidAccessCriteriaError.name} $description`, ({ condition }) => {
      expect(() => transformProfileCondition(condition, contract)).toThrow(
        InvalidAccessCriteriaError,
      );
    });
  });
});
