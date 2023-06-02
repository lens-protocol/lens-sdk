import { ContractType } from '../graphql/types';

export type LitAccessCondition = {
  conditionType: LitConditionType;
  contractAddress: string;
  standardContractType: ContractType | '';
  chain: SupportedChains;
  method: LitKnownMethods | '';
  parameters: string[];
  returnValueTest: {
    comparator: LitScalarOperator;
    value: LitKnownParams | string;
  };
};

export type LitEvmAccessCondition = {
  conditionType: LitConditionType;
  contractAddress: string;
  functionName: string;
  functionParams: Array<string>;
  functionAbi: object;
  chain: SupportedChains;
  returnValueTest: {
    key: string;
    comparator: LitScalarOperator;
    value: LitKnownParams | string;
  };
};

export type LitOperator = {
  operator: 'and' | 'or';
};

export const enum LitKnownMethods {
  OWNER_OF = 'ownerOf',
  BALANCE_OF = 'balanceOf',
  BALANCE_OF_BATCH = 'balanceOfBatch',
  HAS_ACCESS = 'hasAccess',
  IS_FOLLOWING = 'isFollowing',
  HAS_COLLECTED = 'hasCollected',
}

export const enum LitKnownParams {
  USER_ADDRESS = ':userAddress',
  ZERO = '0',
}

export const enum SupportedChains {
  ETHEREUM = 'ethereum',
  POLYGON = 'polygon',
  MUMBAI = 'mumbai',
  LINEA_GOERLI = 'lineaGoerli'
}

export enum LitScalarOperator {
  EQUAL = '=',
  NOT_EQUAL = '!=',
  GREATER_THAN = '>',
  GREATER_THAN_OR_EQUAL = '>=',
  LESS_THAN = '<',
  LESS_THAN_OR_EQUAL = '<=',
}

export const enum LitConditionType {
  EVM_BASIC = 'evmBasic',
  EVM_CONTRACT = 'evmContract',
}
