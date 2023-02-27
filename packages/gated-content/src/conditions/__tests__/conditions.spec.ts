import { ContractType } from '@lens-protocol/api-bindings';
import { mockProfileId } from '@lens-protocol/domain/mocks';
import { mockEthereumAddress } from '@lens-protocol/shared-kernel/mocks';
import { BigNumber } from 'ethers';

import { testing } from '../../__helpers__/env';
import {
  mockAndAccessCondition,
  mockEoaOwnershipAccessCondition,
  mockNftOwnershipAccessCondition,
  mockOrAccessCondition,
  mockProfileOwnershipAccessCondition,
} from '../__helpers__/mocks';
import { transform } from '../index';
import {
  LitConditionType,
  LitKnownMethods,
  LitKnownParams,
  LitScalarOperator,
  SupportedChains,
} from '../types';
import { InvalidAccessCriteriaError } from '../validators';

const ownerProfileId = mockProfileId();
const knownAddress = mockEthereumAddress();

describe(`Given the "${transform.name}" function`, () => {
  describe.each([
    {
      description: 'a simple condition',
      condition: mockOrAccessCondition([
        mockProfileOwnershipAccessCondition({ profileId: ownerProfileId }),
        mockEoaOwnershipAccessCondition({ address: knownAddress }),
      ]),
      expectedLitAccessConditions: [
        {
          conditionType: LitConditionType.EVM_CONTRACT,
          chain: SupportedChains.MUMBAI,
          contractAddress: testing.contractAddress,
          functionName: LitKnownMethods.HAS_ACCESS,
          functionParams: [
            LitKnownParams.USER_ADDRESS,
            BigNumber.from(ownerProfileId).toString(),
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
        { operator: 'or' },
        {
          conditionType: LitConditionType.EVM_BASIC,
          chain: SupportedChains.POLYGON,
          contractAddress: '',
          method: '',
          parameters: [LitKnownParams.USER_ADDRESS],
          returnValueTest: {
            comparator: LitScalarOperator.EQUAL,
            value: knownAddress,
          },
          standardContractType: '',
        },
      ],
    },
    {
      description: 'a nested OR condition',
      condition: mockOrAccessCondition([
        mockProfileOwnershipAccessCondition({ profileId: ownerProfileId }),
        mockOrAccessCondition([
          mockEoaOwnershipAccessCondition({ address: knownAddress }),
          mockNftOwnershipAccessCondition({ contractAddress: knownAddress }),
        ]),
      ]),
      expectedLitAccessConditions: [
        {
          conditionType: LitConditionType.EVM_CONTRACT,
          chain: SupportedChains.MUMBAI,
          contractAddress: testing.contractAddress,
          functionName: LitKnownMethods.HAS_ACCESS,
          functionParams: [
            LitKnownParams.USER_ADDRESS,
            BigNumber.from(ownerProfileId).toString(),
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
        { operator: 'or' },
        [
          {
            conditionType: LitConditionType.EVM_BASIC,
            chain: SupportedChains.POLYGON,
            contractAddress: '',
            method: '',
            parameters: [LitKnownParams.USER_ADDRESS],
            returnValueTest: {
              comparator: LitScalarOperator.EQUAL,
              value: knownAddress,
            },
            standardContractType: '',
          },
          { operator: 'or' },
          {
            conditionType: LitConditionType.EVM_BASIC,
            chain: SupportedChains.ETHEREUM,
            contractAddress: knownAddress.toLowerCase(),
            method: 'balanceOf',
            parameters: [':userAddress'],
            returnValueTest: {
              comparator: LitScalarOperator.GREATER_THAN,
              value: '0',
            },
            standardContractType: ContractType.Erc721,
          },
        ],
      ],
    },
    {
      description: 'a nested AND condition',
      condition: mockOrAccessCondition([
        mockProfileOwnershipAccessCondition({ profileId: ownerProfileId }),
        mockAndAccessCondition([
          mockEoaOwnershipAccessCondition({ address: knownAddress }),
          mockNftOwnershipAccessCondition({ contractAddress: knownAddress }),
        ]),
      ]),
      expectedLitAccessConditions: [
        {
          conditionType: LitConditionType.EVM_CONTRACT,
          chain: SupportedChains.MUMBAI,
          contractAddress: testing.contractAddress,
          functionName: LitKnownMethods.HAS_ACCESS,
          functionParams: [
            LitKnownParams.USER_ADDRESS,
            BigNumber.from(ownerProfileId).toString(),
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
        { operator: 'or' },
        [
          {
            conditionType: LitConditionType.EVM_BASIC,
            chain: SupportedChains.POLYGON,
            contractAddress: '',
            method: '',
            parameters: [LitKnownParams.USER_ADDRESS],
            returnValueTest: {
              comparator: LitScalarOperator.EQUAL,
              value: knownAddress,
            },
            standardContractType: '',
          },
          { operator: 'and' },
          {
            conditionType: LitConditionType.EVM_BASIC,
            chain: SupportedChains.ETHEREUM,
            contractAddress: knownAddress.toLowerCase(),
            method: 'balanceOf',
            parameters: [':userAddress'],
            returnValueTest: {
              comparator: LitScalarOperator.GREATER_THAN,
              value: '0',
            },
            standardContractType: ContractType.Erc721,
          },
        ],
      ],
    },
  ])('when called with $description', ({ condition, expectedLitAccessConditions }) => {
    it('should return the expected Lit AccessControlCondition', () => {
      const actual = transform(condition, testing);

      expect(actual).toMatchObject(expectedLitAccessConditions);
    });
  });

  describe.each([
    {
      description: 'with a root condition that is not an OR condition',
      condition: mockProfileOwnershipAccessCondition(),
    },
    {
      description: 'with an OR condition that has more than 2 criteria',
      condition: mockOrAccessCondition([
        mockProfileOwnershipAccessCondition(),
        mockEoaOwnershipAccessCondition(),
        mockNftOwnershipAccessCondition(),
      ]),
    },
    {
      description: 'with an OR root condition that does not include a profile ownership condition',
      condition: mockOrAccessCondition([
        mockEoaOwnershipAccessCondition(),
        mockNftOwnershipAccessCondition(),
      ]),
    },
    {
      description: 'a nested AND condition with less than 2 criteria',
      condition: mockOrAccessCondition([
        mockProfileOwnershipAccessCondition(),
        mockAndAccessCondition([mockEoaOwnershipAccessCondition()]),
      ]),
    },
    {
      description: 'a nested AND condition with more than 5 criteria',
      condition: mockOrAccessCondition([
        mockProfileOwnershipAccessCondition(),
        mockAndAccessCondition([
          mockEoaOwnershipAccessCondition(),
          mockEoaOwnershipAccessCondition(),
          mockEoaOwnershipAccessCondition(),
          mockEoaOwnershipAccessCondition(),
          mockEoaOwnershipAccessCondition(),
          mockEoaOwnershipAccessCondition(),
        ]),
      ]),
    },
    {
      description: 'a nested OR condition with less than 2 criteria',
      condition: mockOrAccessCondition([
        mockProfileOwnershipAccessCondition(),
        mockOrAccessCondition([mockEoaOwnershipAccessCondition()]),
      ]),
    },
    {
      description: 'a nested OR condition with more than 5 criteria',
      condition: mockOrAccessCondition([
        mockProfileOwnershipAccessCondition(),
        mockOrAccessCondition([
          mockEoaOwnershipAccessCondition(),
          mockEoaOwnershipAccessCondition(),
          mockEoaOwnershipAccessCondition(),
          mockEoaOwnershipAccessCondition(),
          mockEoaOwnershipAccessCondition(),
          mockEoaOwnershipAccessCondition(),
        ]),
      ]),
    },
    {
      description: 'with more than 2 nested levels AND and OR conditions ',
      condition: mockOrAccessCondition([
        mockProfileOwnershipAccessCondition(),
        mockAndAccessCondition([
          mockEoaOwnershipAccessCondition(),
          mockOrAccessCondition([
            mockEoaOwnershipAccessCondition(),
            mockEoaOwnershipAccessCondition(),
          ]),
        ]),
      ]),
    },
  ])('when called with $description', ({ condition }) => {
    it(`should throw a ${InvalidAccessCriteriaError.name}`, () => {
      expect(() => transform(condition, testing)).toThrow(InvalidAccessCriteriaError);
    });
  });
});
