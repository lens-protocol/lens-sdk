import { ContractType } from '@lens-protocol/api-bindings';

export enum AccessConditionType {
  And = 'and',
  Or = 'or',
  Eoa = 'eoa',
  Token = 'token',
  Nft = 'nft',
  Profile = 'profile',
  Follow = 'follow',
  Collect = 'collect',
}

const SUPPORTED_ACCESS_CONDITION_KEYS = Object.values(AccessConditionType);

export function isAccessConditionType(key: string | symbol | number): key is AccessConditionType {
  return SUPPORTED_ACCESS_CONDITION_KEYS.includes(key as AccessConditionType);
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
}

export enum SupportedChainId {
  ETHEREUM = 1,
  POLYGON = 137,
  MUMBAI = 80001,
}

const SUPPORTED_CHAIN_IDS = Object.values(SupportedChainId);

export function isSupportedChainId(chainId: number): chainId is SupportedChainId {
  return SUPPORTED_CHAIN_IDS.includes(chainId);
}

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

export type LitAccessControlCondition = LitAccessCondition | LitEvmAccessCondition | LitOperator;

export type LitNestedAccessControlCondition<T> = T | Array<LitNestedAccessControlCondition<T>>;
