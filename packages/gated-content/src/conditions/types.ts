import { EvmAddress } from '@lens-protocol/shared-kernel';

export enum LitScalarOperator {
  EQUAL = '=',
  NOT_EQUAL = '!=',
  GREATER_THAN = '>',
  GREATER_THAN_OR_EQUAL = '>=',
  LESS_THAN = '<',
  LESS_THAN_OR_EQUAL = '<=',
}

export enum LitConditionType {
  EVM_BASIC = 'evmBasic',
  EVM_CONTRACT = 'evmContract',
}

export enum LitOperatorType {
  AND = 'and',
  OR = 'or',
}

export type LitOperator = {
  operator: LitOperatorType;
};

export enum LitKnownMethods {
  OWNER_OF = 'ownerOf',
  BALANCE_OF = 'balanceOf',
  BALANCE_OF_BATCH = 'balanceOfBatch',
  HAS_ACCESS = 'hasAccess',
  IS_FOLLOWING = 'isFollowing',
  HAS_COLLECTED = 'hasCollected',
}

export enum LitKnownParams {
  USER_ADDRESS = ':userAddress',
  ZERO = '0',
}

export enum LitContractType {
  ERC20 = 'ERC20',
  ERC721 = 'ERC721',
  ERC1155 = 'ERC1155',
}

export enum SupportedChains {
  ETHEREUM = 'ethereum',
  POLYGON = 'polygon',
  /**
   * @deprecated Mumbai is no longer supported.
   */
  MUMBAI = 'mumbai',
  AMOY = 'amoy',
  LINEA_GOERLI = 'lineaGoerli',
}

export enum SupportedChainId {
  ETHEREUM = 1,
  POLYGON = 137,
  /**
   * @deprecated Mumbai is no longer supported.
   */
  MUMBAI = 80001,
  AMOY = 80002,
  LINEA_GOERLI = 59140,
}

const SUPPORTED_CHAIN_IDS = Object.values(SupportedChainId);

export function isSupportedChainId(chainId: number): chainId is SupportedChainId {
  return SUPPORTED_CHAIN_IDS.includes(chainId);
}

export type LitAccessCondition = {
  conditionType: LitConditionType;
  contractAddress: string;
  standardContractType: LitContractType | '';
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

export type DecryptionContext = {
  /**
   * Identifies the Profile ID of the user who is trying to decrypt the metadata.
   *
   * This is used to determine whether the user has access to the metadata.
   * The {@link Signer} provided in the constructor MUST be the owner OR
   * an authorized Profile Manager of the specified Profile.
   */
  profileId?: string;
};

/**
 * @internal
 */
export type AccessControlContract = {
  address: EvmAddress;
  chainId: SupportedChainId;
};
