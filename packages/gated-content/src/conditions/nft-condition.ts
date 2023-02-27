import { BigNumber } from '@ethersproject/bignumber';
import { ContractType, NftOwnershipInput } from '@lens-protocol/api-bindings';

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
  let token;
  try {
    token = BigNumber.from(tokenId).toString();
  } catch (e: unknown) {
    throw new InvalidAccessCriteriaError(`Invalid token id: ${tokenId}`);
  }
  return {
    method: LitKnownMethods.OWNER_OF,
    parameters: [token],
    returnValueTest: {
      comparator: LitScalarOperator.EQUAL,
      value: LitKnownParams.USER_ADDRESS,
    },
  };
};

const _handleOwnsMultipleFromERC1155Collection = (
  tokenIds: string[],
): Partial<LitAccessCondition> => ({
  method: LitKnownMethods.BALANCE_OF_BATCH,
  parameters: [
    LitKnownParams.USER_ADDRESS.repeat(tokenIds.length).slice(0, -1),
    tokenIds.join(','),
  ],
});

export const transformNftCondition = (
  condition: NftOwnershipInput,
): Array<LitAccessCondition | LitOperator> => {
  assertValidAddress(condition.contractAddress);
  assertSupportedChainId(condition.chainID);
  assertSupportedNftContractType(condition.contractType);

  let partial: Partial<LitAccessCondition>;

  const result: Partial<LitAccessCondition> = {
    conditionType: LitConditionType.EVM_BASIC,
    contractAddress: condition.contractAddress.toLowerCase(),
    standardContractType: condition.contractType,
    chain: toLitSupportedChainName(condition.chainID),
  };

  // case owns at least one nft from the collection
  if (!condition.tokenIds || condition.tokenIds.length === 0) {
    partial = _handleOwnsAtLeastOneNftFromCollection();
    // case owns a single specific nft from the collection
  } else if (condition.tokenIds.length === 1) {
    partial = _handleOwnsOneSpecificNftFromCollection(condition.tokenIds[0]);
    // case owns multiple specific nfts from the collection
  } else {
    // workaround for ERC721 contracts that do not support balanceOfBatch
    if (condition.contractType === ContractType.Erc721) {
      const partials: Partial<LitAccessCondition>[] = condition.tokenIds.map((tokenId: string) =>
        _handleOwnsOneSpecificNftFromCollection(tokenId),
      );
      const results = partials.map((p) => Object.assign(p, result) as LitAccessCondition);
      // wrap the condition in an or condition
      return insertObjectInBetweenArrayElements(results, { operator: AccessConditionType.Or });
    }
    partial = _handleOwnsMultipleFromERC1155Collection(condition.tokenIds);
  }
  return [Object.assign(result, partial) as LitAccessCondition];
};
