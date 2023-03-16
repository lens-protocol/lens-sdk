import { mockPublicationId } from '@lens-protocol/domain/mocks';
import { InvariantError } from '@lens-protocol/shared-kernel';
import { BigNumber } from 'ethers';

import { testing } from '../../__helpers__/env';
import { mockCollectConditionInput } from '../__helpers__/mocks';
import { transformCollectCondition } from '../collect-condition';
import { transform } from '../index';
import {
  LitConditionType,
  LitKnownMethods,
  LitKnownParams,
  LitScalarOperator,
  SupportedChains,
} from '../types';
import { InvalidAccessCriteriaError } from '../validators';

describe(`Given the "${transform.name}" function`, () => {
  describe('when called with a Collect Publication condition', () => {
    const publicationId = mockPublicationId();

    it('should return the expected Lit AccessControlCondition for a given publication Id', () => {
      const condition = mockCollectConditionInput({ publicationId });

      const actual = transformCollectCondition(condition, testing);

      const publicationIdParts = publicationId
        .split('-')
        .map((part) => BigNumber.from(part).toString());
      const expectedLitAccessConditions = [
        {
          conditionType: LitConditionType.EVM_CONTRACT,
          chain: SupportedChains.MUMBAI,
          contractAddress: testing.contractAddress,
          functionName: LitKnownMethods.HAS_COLLECTED,
          functionParams: [LitKnownParams.USER_ADDRESS, ...publicationIdParts, '0', '0x'],
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
                name: 'publisherId',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'pubId',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'collectorProfileId',
                type: 'uint256',
              },
              {
                internalType: 'bytes',
                name: 'data',
                type: 'bytes',
              },
            ],
            name: LitKnownMethods.HAS_COLLECTED,
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
        description: 'if with invalid publication Id',
        condition: mockCollectConditionInput({
          publicationId: 'a',
        }),
        expectedErrorCtor: InvalidAccessCriteriaError,
      },
      {
        description: 'if with missing publication Id',
        condition: mockCollectConditionInput({
          thisPublication: null,
        }),
        expectedErrorCtor: InvariantError,
      },
    ])(
      `should throw an $expectedErrorCtor.name $description`,
      ({ condition, expectedErrorCtor }) => {
        expect(() => transformCollectCondition(condition, testing)).toThrow(expectedErrorCtor);
      },
    );
  });
});
