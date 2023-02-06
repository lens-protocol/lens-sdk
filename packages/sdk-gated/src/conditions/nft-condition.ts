import { BigNumber } from '@ethersproject/bignumber';
import { InvalidAccessCriteriaError } from '../error';
import { ContractType, NftOwnershipOutput } from '../graphql/types';
import {
  LitAccessCondition,
  LitConditionType,
  LitKnownMethods,
  LitKnownParams,
  LitOperator,
  LitScalarOperator,
} from '../lit/types';
import { AccessConditionType } from '../types';
import { chainIdToString } from '../utils';
import {
  validateAddress,
  validateChainID,
  validateContractType,
  validateTokenIds,
} from '../validators';
import { insertObjectInBetweenArrayElements } from './utils';

export const validateNftCondition = (condition: NftOwnershipOutput): void => {
  validateAddress(condition.contractAddress);
  validateChainID(condition.chainID);
  validateContractType(condition.contractType);
  validateTokenIds(condition.tokenIds);
};

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
  } catch (e: any) {
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
  tokenIds: string[]
): Partial<LitAccessCondition> => ({
  method: LitKnownMethods.BALANCE_OF_BATCH,
  parameters: [
    LitKnownParams.USER_ADDRESS.repeat(tokenIds.length).slice(0, -1),
    tokenIds.join(','),
  ],
});

export const transformNftCondition = (
  condition: NftOwnershipOutput
): Array<LitAccessCondition | LitOperator> => {
  let partial: Partial<LitAccessCondition>;
  let result: Partial<LitAccessCondition> = {
    conditionType: LitConditionType.EVM_BASIC,
    contractAddress: condition.contractAddress.toLowerCase(),
    standardContractType: condition.contractType,
    chain: chainIdToString(condition.chainID),
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
        _handleOwnsOneSpecificNftFromCollection(tokenId)
      );
      const results = partials.map(
        (partial) => Object.assign(partial, result) as LitAccessCondition
      );
      // wrap the condition in an or condition
      return insertObjectInBetweenArrayElements(results, { operator: AccessConditionType.Or });
    }
    partial = _handleOwnsMultipleFromERC1155Collection(condition.tokenIds);
  }
  return [Object.assign(result, partial) as LitAccessCondition];
};
