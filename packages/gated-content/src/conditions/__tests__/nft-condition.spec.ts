import { NftContractType, toChainId, toEvmAddress, toTokenId } from '@lens-protocol/metadata';

import { mockNetworkAddress, mockNftOwnershipCondition } from '../../__helpers__/mocks';
import { transformNftCondition } from '../nft-condition';
import { LitConditionType, LitContractType, LitScalarOperator, SupportedChains } from '../types';
import { InvalidAccessCriteriaError } from '../validators';

const contract = mockNetworkAddress({
  chainId: toChainId(1),
});

describe(`Given the "${transformNftCondition.name}" function`, () => {
  describe.each([
    {
      description: 'a NFT 721 Ownership condition: any token from the specified collection',
      condition: mockNftOwnershipCondition({
        contract,
        contractType: NftContractType.ERC721,
      }),
      expectedLitAccessConditions: [
        {
          conditionType: LitConditionType.EVM_BASIC,
          chain: SupportedChains.ETHEREUM,
          contractAddress: contract.address.toLowerCase(),
          method: 'balanceOf',
          parameters: [':userAddress'],
          returnValueTest: {
            comparator: LitScalarOperator.GREATER_THAN,
            value: '0',
          },
          standardContractType: LitContractType.ERC721,
        },
      ],
    },

    {
      description: 'a NFT 721 Ownership condition: 1 token from the specified collection',
      condition: mockNftOwnershipCondition({
        contract,
        contractType: NftContractType.ERC721,
        tokenIds: [toTokenId('1')],
      }),
      expectedLitAccessConditions: [
        {
          conditionType: LitConditionType.EVM_BASIC,
          chain: SupportedChains.ETHEREUM,
          contractAddress: contract.address.toLowerCase(),
          method: 'ownerOf',
          parameters: ['1'],
          returnValueTest: {
            comparator: LitScalarOperator.EQUAL,
            value: ':userAddress',
          },
          standardContractType: LitContractType.ERC721,
        },
      ],
    },

    {
      description: 'a NFT 721 Ownership condition: 2 or more tokens from the specified collection',
      condition: mockNftOwnershipCondition({
        contract,
        contractType: NftContractType.ERC721,
        tokenIds: [toTokenId('1'), toTokenId('2')],
      }),
      expectedLitAccessConditions: [
        {
          conditionType: LitConditionType.EVM_BASIC,
          chain: SupportedChains.ETHEREUM,
          contractAddress: contract.address.toLowerCase(),
          method: 'ownerOf',
          parameters: ['1'],
          returnValueTest: {
            comparator: LitScalarOperator.EQUAL,
            value: ':userAddress',
          },
          standardContractType: LitContractType.ERC721,
        },
        { operator: 'or' },
        {
          conditionType: LitConditionType.EVM_BASIC,
          chain: SupportedChains.ETHEREUM,
          contractAddress: contract.address.toLowerCase(),
          method: 'ownerOf',
          parameters: ['2'],
          returnValueTest: {
            comparator: LitScalarOperator.EQUAL,
            value: ':userAddress',
          },
          standardContractType: LitContractType.ERC721,
        },
      ],
    },

    {
      description: 'a NFT 721 Ownership condition that has invalid token ID',
      condition: mockNftOwnershipCondition({
        contract,
        contractType: NftContractType.ERC721,
        tokenIds: [toTokenId('a')],
      }),
      expectedErrorCtor: InvalidAccessCriteriaError,
    },

    {
      description: 'a NFT 721 Ownership condition that has invalid contract address',
      condition: mockNftOwnershipCondition({
        contract: mockNetworkAddress({
          address: toEvmAddress('0x123'),
        }),
        contractType: NftContractType.ERC721,
      }),
      expectedErrorCtor: InvalidAccessCriteriaError,
    },

    {
      description: 'a NFT 721 Ownership condition that has invalid chain ID',
      condition: mockNftOwnershipCondition({
        contract: mockNetworkAddress({
          chainId: toChainId(123),
        }),
        contractType: NftContractType.ERC721,
      }),
      expectedErrorCtor: InvalidAccessCriteriaError,
    },

    {
      description: 'a ERC1155 Ownership condition that has no token ids set',
      condition: mockNftOwnershipCondition({
        contract,
        contractType: NftContractType.ERC1155,
        tokenIds: undefined,
      }),
      expectedErrorCtor: InvalidAccessCriteriaError,
    },

    {
      description: 'a ERC1155 Ownership condition that has empty token ids set',
      condition: mockNftOwnershipCondition({
        contract,
        contractType: NftContractType.ERC1155,
        tokenIds: [],
      }),
      expectedErrorCtor: InvalidAccessCriteriaError,
    },

    {
      description: 'a ERC1155 Ownership condition: 1 token from the specified collection',
      condition: mockNftOwnershipCondition({
        contract,
        contractType: NftContractType.ERC1155,
        tokenIds: [toTokenId('1')],
      }),
      expectedLitAccessConditions: [
        {
          conditionType: LitConditionType.EVM_BASIC,
          chain: SupportedChains.ETHEREUM,
          contractAddress: contract.address.toLowerCase(),
          method: 'balanceOf',
          parameters: [':userAddress', '1'],
          returnValueTest: {
            comparator: LitScalarOperator.GREATER_THAN,
            value: '0',
          },
          standardContractType: NftContractType.ERC1155,
        },
      ],
    },

    {
      description: 'a ERC1155 Ownership condition: 2 or more tokens from the specified collection',
      condition: mockNftOwnershipCondition({
        contract,
        contractType: NftContractType.ERC1155,
        tokenIds: [toTokenId('1'), toTokenId('2')],
      }),
      expectedLitAccessConditions: [
        {
          conditionType: LitConditionType.EVM_BASIC,
          chain: SupportedChains.ETHEREUM,
          contractAddress: contract.address.toLowerCase(),
          method: 'balanceOfBatch',
          parameters: [':userAddress,:userAddress', '1,2'],
          returnValueTest: {
            comparator: LitScalarOperator.GREATER_THAN,
            value: '0',
          },
          standardContractType: NftContractType.ERC1155,
        },
      ],
    },
  ])(
    `when called with $description AccessCondition`,
    ({ condition, expectedLitAccessConditions, expectedErrorCtor }) => {
      if (expectedLitAccessConditions) {
        it('should return the expected Lit AccessControlCondition', () => {
          const actual = transformNftCondition(condition);

          expect(actual).toEqual(expectedLitAccessConditions);
        });
      }

      if (expectedErrorCtor) {
        it(`should throw a ${expectedErrorCtor.name}`, () => {
          expect(() => transformNftCondition(condition)).toThrow(expectedErrorCtor);
        });
      }
    },
  );
});
