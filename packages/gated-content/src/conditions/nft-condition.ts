import { ContractType, NftOwnershipInput } from '@lens-protocol/api-bindings';
import { assertNever, never } from '@lens-protocol/shared-kernel';

import {
  AccessConditionType,
  LitAccessCondition,
  LitConditionType,
  LitKnownMethods,
  LitKnownParams,
  LitOperator,
  LitScalarOperator,
} from './types';
import { insertObjectInBetweenArrayElements, toLitSupportedChainName } from './utils';
import {
  InvalidAccessCriteriaError,
  assertValidAddress,
  assertSupportedChainId,
  assertSupportedNftContractType,
  assertValidTokenIds,
} from './validators';

const _handleOwnsAtLeastOneNftFromCollection = (): Partial<LitAccessCondition> => ({
  method: LitKnownMethods.BALANCE_OF,
  parameters: [LitKnownParams.USER_ADDRESS],
  returnValueTest: {
    comparator: LitScalarOperator.GREATER_THAN,
    value: LitKnownParams.ZERO,
  },
});

const _handleOwnsOneSpecificNftFromCollection = (tokenId: string): Partial<LitAccessCondition> => {
  return {
    method: LitKnownMethods.OWNER_OF,
    parameters: [tokenId],
    returnValueTest: {
      comparator: LitScalarOperator.EQUAL,
      value: LitKnownParams.USER_ADDRESS,
    },
  };
};

const _handleOwnsOneSpecificNftFromERC1155Collection = (
  tokenId: string,
): Partial<LitAccessCondition> => {
  return {
    method: LitKnownMethods.BALANCE_OF,
    parameters: [LitKnownParams.USER_ADDRESS, tokenId],
    returnValueTest: {
      comparator: LitScalarOperator.GREATER_THAN,
      value: LitKnownParams.ZERO,
    },
  };
};

const _handleOwnsMultipleFromERC1155Collection = (
  tokenIds: string[],
): Partial<LitAccessCondition> => ({
  method: LitKnownMethods.BALANCE_OF_BATCH,
  parameters: [tokenIds.map(() => LitKnownParams.USER_ADDRESS).join(','), tokenIds.join(',')],
  returnValueTest: {
    comparator: LitScalarOperator.GREATER_THAN,
    value: '0',
  },
});

export const transformNftCondition = (
  condition: NftOwnershipInput,
): Array<LitAccessCondition | LitOperator> => {
  assertValidAddress(condition.contractAddress);
  assertSupportedChainId(condition.chainID);
  assertSupportedNftContractType(condition.contractType);
  assertValidTokenIds(condition.tokenIds);

  let partial: Partial<LitAccessCondition>;

  const result: Partial<LitAccessCondition> = {
    conditionType: LitConditionType.EVM_BASIC,
    contractAddress: condition.contractAddress.toLowerCase(),
    standardContractType: condition.contractType,
    chain: toLitSupportedChainName(condition.chainID),
  };

  switch (condition.contractType) {
    case ContractType.Erc721:
      // case owns at least one nft from the collection
      if (!condition.tokenIds || condition.tokenIds.length === 0) {
        partial = _handleOwnsAtLeastOneNftFromCollection();
        // case owns a single specific nft from the collection
      } else if (condition.tokenIds.length === 1) {
        partial = _handleOwnsOneSpecificNftFromCollection(condition.tokenIds[0] ?? never());
        // case owns multiple specific nfts from the collection
      } else {
        // workaround for ERC721 contracts that do not support balanceOfBatch
        const partials: Partial<LitAccessCondition>[] = condition.tokenIds.map((tokenId: string) =>
          _handleOwnsOneSpecificNftFromCollection(tokenId),
        );
        const results = partials.map((p) => Object.assign(p, result) as LitAccessCondition);
        // wrap the condition in an or condition
        return insertObjectInBetweenArrayElements(results, { operator: AccessConditionType.Or });
      }

      break;
    case ContractType.Erc1155:
      if (!condition.tokenIds || condition.tokenIds.length === 0) {
        throw new InvalidAccessCriteriaError(`ERC1155 requires at least one token id`);
      } else if (condition.tokenIds.length === 1) {
        partial = _handleOwnsOneSpecificNftFromERC1155Collection(condition.tokenIds[0] ?? never());
      } else {
        partial = _handleOwnsMultipleFromERC1155Collection(condition.tokenIds);
      }

      break;
    default:
      assertNever(condition.contractType, 'Unsupported contract type');
  }

  return [Object.assign(result, partial) as LitAccessCondition];
};
