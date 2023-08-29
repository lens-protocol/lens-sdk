import { ContractType } from '@lens-protocol/api-bindings';
import { mockEthereumAddress } from '@lens-protocol/shared-kernel/mocks';

import { mockNftOwnershipInput } from '../__helpers__/mocks';
import { transformNftCondition } from '../nft-condition';
import { LitConditionType, LitScalarOperator, SupportedChains } from '../types';
import { InvalidAccessCriteriaError } from '../validators';

const ethereumChainId = 1;
const knownAddress = mockEthereumAddress();

describe(`Given the "${transformNftCondition.name}" function`, () => {
  describe.each([
    {
      description: 'a NFT 721 Ownership condition: any token from the specified collection',
      condition: mockNftOwnershipInput({
        chainID: ethereumChainId,
        contractAddress: knownAddress,
        contractType: ContractType.Erc721,
      }),
      expectedLitAccessConditions: [
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
    },

    {
      description: 'a NFT 721 Ownership condition: 1 token from the specified collection',
      condition: mockNftOwnershipInput({
        chainID: ethereumChainId,
        contractAddress: knownAddress,
        contractType: ContractType.Erc721,
        tokenIds: ['1'],
      }),
      expectedLitAccessConditions: [
        {
          conditionType: LitConditionType.EVM_BASIC,
          chain: SupportedChains.ETHEREUM,
          contractAddress: knownAddress.toLowerCase(),
          method: 'ownerOf',
          parameters: ['1'],
          returnValueTest: {
            comparator: LitScalarOperator.EQUAL,
            value: ':userAddress',
          },
          standardContractType: ContractType.Erc721,
        },
      ],
    },

    {
      description: 'a NFT 721 Ownership condition: 2 or more tokens from the specified collection',
      condition: mockNftOwnershipInput({
        chainID: ethereumChainId,
        contractAddress: knownAddress,
        contractType: ContractType.Erc721,
        tokenIds: ['1', '2'],
      }),
      expectedLitAccessConditions: [
        {
          conditionType: LitConditionType.EVM_BASIC,
          chain: SupportedChains.ETHEREUM,
          contractAddress: knownAddress.toLowerCase(),
          method: 'ownerOf',
          parameters: ['1'],
          returnValueTest: {
            comparator: LitScalarOperator.EQUAL,
            value: ':userAddress',
          },
          standardContractType: ContractType.Erc721,
        },
        { operator: 'or' },
        {
          conditionType: LitConditionType.EVM_BASIC,
          chain: SupportedChains.ETHEREUM,
          contractAddress: knownAddress.toLowerCase(),
          method: 'ownerOf',
          parameters: ['2'],
          returnValueTest: {
            comparator: LitScalarOperator.EQUAL,
            value: ':userAddress',
          },
          standardContractType: ContractType.Erc721,
        },
      ],
    },

    {
      description: 'a NFT 721 Ownership condition that has invalid token ID',
      condition: mockNftOwnershipInput({
        chainID: ethereumChainId,
        contractAddress: knownAddress,
        contractType: ContractType.Erc721,
        tokenIds: ['a'],
      }),
      expectedErrorCtor: InvalidAccessCriteriaError,
    },

    {
      description: 'a NFT 721 Ownership condition that has invalid contract address',
      condition: mockNftOwnershipInput({
        chainID: ethereumChainId,
        contractAddress: '0x123',
        contractType: ContractType.Erc721,
      }),
      expectedErrorCtor: InvalidAccessCriteriaError,
    },

    {
      description: 'a NFT 721 Ownership condition that has invalid chain ID',
      condition: mockNftOwnershipInput({
        chainID: 42,
        contractAddress: knownAddress,
        contractType: ContractType.Erc721,
      }),
      expectedErrorCtor: InvalidAccessCriteriaError,
    },

    {
      description: 'a ERC20 Ownership condition that has invalid contract type',
      condition: mockNftOwnershipInput({
        chainID: ethereumChainId,
        contractAddress: knownAddress,
        contractType: ContractType.Erc20,
      }),
      expectedErrorCtor: InvalidAccessCriteriaError,
    },

    {
      description: 'a ERC20 Ownership condition that has invalid contract type',
      condition: mockNftOwnershipInput({
        chainID: ethereumChainId,
        contractAddress: knownAddress,
        contractType: ContractType.Erc20,
      }),
      expectedErrorCtor: InvalidAccessCriteriaError,
    },

    {
      description: 'a ERC1155 Ownership condition that has no token ids set',
      condition: mockNftOwnershipInput({
        chainID: ethereumChainId,
        contractAddress: knownAddress,
        contractType: ContractType.Erc1155,
        tokenIds: undefined,
      }),
      expectedErrorCtor: InvalidAccessCriteriaError,
    },

    {
      description: 'a ERC1155 Ownership condition that has empty token ids set',
      condition: mockNftOwnershipInput({
        chainID: ethereumChainId,
        contractAddress: knownAddress,
        contractType: ContractType.Erc1155,
        tokenIds: [],
      }),
      expectedErrorCtor: InvalidAccessCriteriaError,
    },

    {
      description: 'a ERC1155 Ownership condition: 1 token from the specified collection',
      condition: mockNftOwnershipInput({
        chainID: ethereumChainId,
        contractAddress: knownAddress,
        contractType: ContractType.Erc1155,
        tokenIds: ['1'],
      }),
      expectedLitAccessConditions: [
        {
          conditionType: LitConditionType.EVM_BASIC,
          chain: SupportedChains.ETHEREUM,
          contractAddress: knownAddress.toLowerCase(),
          method: 'balanceOf',
          parameters: [':userAddress', '1'],
          returnValueTest: {
            comparator: LitScalarOperator.GREATER_THAN,
            value: '0',
          },
          standardContractType: ContractType.Erc1155,
        },
      ],
    },

    {
      description: 'a ERC1155 Ownership condition: 2 or more tokens from the specified collection',
      condition: mockNftOwnershipInput({
        chainID: ethereumChainId,
        contractAddress: knownAddress,
        contractType: ContractType.Erc1155,
        tokenIds: ['1', '2'],
      }),
      expectedLitAccessConditions: [
        {
          conditionType: LitConditionType.EVM_BASIC,
          chain: SupportedChains.ETHEREUM,
          contractAddress: knownAddress.toLowerCase(),
          method: 'balanceOfBatch',
          parameters: [':userAddress,:userAddress', '1,2'],
          returnValueTest: {
            comparator: LitScalarOperator.GREATER_THAN,
            value: '0',
          },
          standardContractType: ContractType.Erc1155,
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
