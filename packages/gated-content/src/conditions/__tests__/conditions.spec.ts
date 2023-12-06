import {
  accessCondition,
  AccessCondition,
  andCondition,
  ConditionType,
  orCondition,
  toChainId,
} from '@lens-protocol/metadata';
import { BigNumber } from 'ethers';

import * as metadata from '../../__helpers__/mocks';
import * as gql from '../../graphql/__helpers__/mocks';
import { transformFromGql, transformFromRaw } from '../index';
import {
  DecryptionContext,
  LitConditionType,
  LitContractType,
  LitKnownMethods,
  LitKnownParams,
  LitScalarOperator,
  SupportedChains,
} from '../types';
import { toLitSupportedChainName } from '../utils';
import { InvalidAccessCriteriaError } from '../validators';

const ownerProfileId = metadata.mockProfileId();
const knownAddress = metadata.mockEvmAddress();
const contract = metadata.mockAccessControlContract();

describe(`Given the conditions helpers`, () => {
  describe.each([
    {
      description: 'a simple condition',
      raw: accessCondition([
        metadata.mockProfileOwnershipCondition({ profileId: ownerProfileId }),
        metadata.mockEoaOwnershipCondition({ address: knownAddress }),
      ]),
      api: gql.mockRootCondition({
        criteria: [
          gql.mockProfileOwnershipCondition({ profileId: ownerProfileId }),
          gql.mockEoaOwnershipCondition({ address: knownAddress }),
        ],
      }),
      expectedLitAccessConditions: [
        {
          conditionType: LitConditionType.EVM_CONTRACT,
          chain: toLitSupportedChainName(contract.chainId),
          contractAddress: contract.address,
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
      raw: accessCondition([
        metadata.mockProfileOwnershipCondition({ profileId: ownerProfileId }),
        orCondition([
          metadata.mockEoaOwnershipCondition({ address: knownAddress }),
          metadata.mockNftOwnershipCondition({
            contract: metadata.mockNetworkAddress({ address: knownAddress, chainId: toChainId(1) }),
          }),
        ]),
      ]),
      api: gql.mockRootCondition({
        criteria: [
          gql.mockProfileOwnershipCondition({ profileId: ownerProfileId }),
          gql.mockOrCondition({
            criteria: [
              gql.mockEoaOwnershipCondition({ address: knownAddress }),
              gql.mockNftOwnershipCondition({
                contract: gql.mockNetworkAddress({ address: knownAddress, chainId: 1 }),
              }),
            ],
          }),
        ],
      }),
      expectedLitAccessConditions: [
        {
          conditionType: LitConditionType.EVM_CONTRACT,
          chain: toLitSupportedChainName(contract.chainId),
          contractAddress: contract.address,
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
            method: LitKnownMethods.BALANCE_OF,
            parameters: [':userAddress'],
            returnValueTest: {
              comparator: LitScalarOperator.GREATER_THAN,
              value: '0',
            },
            standardContractType: LitContractType.ERC721,
          },
        ],
      ],
    },
    {
      description: 'a nested AND condition',
      raw: accessCondition([
        metadata.mockProfileOwnershipCondition({ profileId: ownerProfileId }),
        andCondition([
          metadata.mockEoaOwnershipCondition({ address: knownAddress }),
          metadata.mockNftOwnershipCondition({
            contract: metadata.mockNetworkAddress({ address: knownAddress, chainId: toChainId(1) }),
          }),
        ]),
      ]),
      api: gql.mockRootCondition({
        criteria: [
          gql.mockProfileOwnershipCondition({ profileId: ownerProfileId }),
          gql.mockAndCondition({
            criteria: [
              gql.mockEoaOwnershipCondition({ address: knownAddress }),
              gql.mockNftOwnershipCondition({
                contract: gql.mockNetworkAddress({ address: knownAddress, chainId: 1 }),
              }),
            ],
          }),
        ],
      }),
      expectedLitAccessConditions: [
        {
          conditionType: LitConditionType.EVM_CONTRACT,
          chain: toLitSupportedChainName(contract.chainId),
          contractAddress: contract.address,
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
            method: LitKnownMethods.BALANCE_OF,
            parameters: [':userAddress'],
            returnValueTest: {
              comparator: LitScalarOperator.GREATER_THAN,
              value: '0',
            },
            standardContractType: LitContractType.ERC721,
          },
        ],
      ],
    },
  ])(`and $description`, ({ raw, api, expectedLitAccessConditions }) => {
    describe(`when calling "${transformFromRaw.name}"`, () => {
      it('should return the expected Lit AccessControlCondition', () => {
        const actual = transformFromRaw(raw, contract);

        expect(actual).toMatchObject(expectedLitAccessConditions);
      });
    });

    describe(`when calling "${transformFromGql.name}"`, () => {
      const context: DecryptionContext = {
        profileId: metadata.mockProfileId(),
      };

      it('should return the expected Lit AccessControlCondition', () => {
        const strategy = gql.mockPublicationMetadataLitEncryption({
          accessCondition: api,
        });
        const actual = transformFromGql(strategy, contract, context);

        expect(actual).toMatchObject(expectedLitAccessConditions);
      });
    });
  });

  describe.each([
    {
      description: 'with a root condition that is not an OR condition',
      condition: metadata.mockProfileOwnershipCondition(),
    },
    {
      description: 'with an OR root condition that has more than 2 criteria',
      condition: {
        type: ConditionType.OR,
        criteria: [
          metadata.mockProfileOwnershipCondition(),
          metadata.mockEoaOwnershipCondition(),
          metadata.mockNftOwnershipCondition(),
        ],
      },
    },
    {
      description: 'with an OR root condition that does not include a profile ownership condition',
      condition: {
        type: ConditionType.OR,
        criteria: [metadata.mockEoaOwnershipCondition(), metadata.mockNftOwnershipCondition()],
      },
    },
    {
      description: 'a nested AND condition with less than 2 criteria',
      condition: {
        type: ConditionType.OR,
        criteria: [
          metadata.mockProfileOwnershipCondition(),
          {
            type: ConditionType.AND,
            criteria: [metadata.mockEoaOwnershipCondition()],
          },
        ],
      },
    },
    {
      description: 'a nested AND condition with more than 5 criteria',
      condition: {
        type: ConditionType.OR,
        criteria: [
          metadata.mockProfileOwnershipCondition(),
          {
            type: ConditionType.AND,
            criteria: [
              metadata.mockEoaOwnershipCondition(),
              metadata.mockEoaOwnershipCondition(),
              metadata.mockEoaOwnershipCondition(),
              metadata.mockEoaOwnershipCondition(),
              metadata.mockEoaOwnershipCondition(),
              metadata.mockEoaOwnershipCondition(),
            ],
          },
        ],
      },
    },
    {
      description: 'a nested OR condition with less than 2 criteria',
      condition: {
        type: ConditionType.OR,
        criteria: [
          metadata.mockProfileOwnershipCondition(),
          {
            type: ConditionType.OR,
            criteria: [metadata.mockEoaOwnershipCondition()],
          },
        ],
      },
    },
    {
      description: 'a nested OR condition with more than 5 criteria',
      condition: {
        type: ConditionType.OR,
        criteria: [
          metadata.mockProfileOwnershipCondition(),
          {
            type: ConditionType.OR,
            criteria: [
              metadata.mockEoaOwnershipCondition(),
              metadata.mockEoaOwnershipCondition(),
              metadata.mockEoaOwnershipCondition(),
              metadata.mockEoaOwnershipCondition(),
              metadata.mockEoaOwnershipCondition(),
              metadata.mockEoaOwnershipCondition(),
            ],
          },
        ],
      },
    },
    {
      description: 'with more than 2 nested levels AND and OR conditions ',
      condition: {
        type: ConditionType.OR,
        criteria: [
          metadata.mockProfileOwnershipCondition(),
          {
            type: ConditionType.AND,
            criteria: [
              metadata.mockEoaOwnershipCondition(),
              orCondition([
                metadata.mockEoaOwnershipCondition(),
                metadata.mockEoaOwnershipCondition(),
              ]),
            ],
          },
        ],
      },
    },
  ])(`when calling "${transformFromRaw.name}" with $description`, ({ condition }) => {
    it(`should throw a ${InvalidAccessCriteriaError.name}`, () => {
      expect(() => transformFromRaw(condition as AccessCondition, contract)).toThrow(
        InvalidAccessCriteriaError,
      );
    });
  });
});
