import { toPublicationId } from '@lens-protocol/metadata';
import { BigNumber } from 'ethers';

import {
  mockAccessControlContract,
  mockCollectCondition,
  mockProfileId,
  mockPublicationId,
} from '../../__helpers__/mocks';
import { transformCollectCondition } from '../collect-condition';
import {
  DecryptionContext,
  LitConditionType,
  LitKnownMethods,
  LitKnownParams,
  LitScalarOperator,
} from '../types';
import { toLitSupportedChainName } from '../utils';
import { InvalidAccessCriteriaError } from '../validators';

const contract = mockAccessControlContract();

describe(`Given the "${transformCollectCondition.name}" function`, () => {
  describe('when called with a Collect Publication condition', () => {
    const publicationId = mockPublicationId();

    it('should return the expected Lit AccessControlCondition for a given publication Id', () => {
      const condition = mockCollectCondition({ publicationId });

      const actual = transformCollectCondition(condition, contract);

      const publicationIdParts = publicationId
        .split('-')
        .map((part) => BigNumber.from(part).toString());
      const expectedLitAccessConditions = [
        {
          conditionType: LitConditionType.EVM_CONTRACT,
          chain: toLitSupportedChainName(contract.chainId),
          contractAddress: contract.address,
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

    it('should include the `collectorProfileId parameter if provided in the `context`', () => {
      const context: DecryptionContext = {
        profileId: mockProfileId(),
      };
      const condition = mockCollectCondition({ publicationId });

      const actual = transformCollectCondition(condition, contract, context);

      const publicationIdParts = publicationId
        .split('-')
        .map((part) => BigNumber.from(part).toString());
      expect(actual).toMatchObject([
        {
          functionParams: [
            LitKnownParams.USER_ADDRESS,
            ...publicationIdParts,
            context.profileId,
            '0x',
          ],
        },
      ]);
    });

    it.each([
      {
        description: 'if with invalid publication Id',
        condition: mockCollectCondition({
          publicationId: toPublicationId('a'),
        }),
        expectedErrorCtor: InvalidAccessCriteriaError,
      },
    ])(
      `should throw an $expectedErrorCtor.name $description`,
      ({ condition, expectedErrorCtor }) => {
        expect(() => transformCollectCondition(condition, contract)).toThrow(expectedErrorCtor);
      },
    );
  });
});
