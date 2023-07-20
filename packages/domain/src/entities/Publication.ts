import { Amount, Brand, Erc20, EthereumAddress } from '@lens-protocol/shared-kernel';

import { NftContractType, NftId } from './Nft';
import { ProfileId } from './Profile';

export type PublicationId = Brand<string, 'PublicationId'>;

export enum DecryptionCriteriaType {
  NFT_OWNERSHIP = 'nft-ownership',
  ERC20_OWNERSHIP = 'erc20-ownership',
  ADDRESS_OWNERSHIP = 'address-ownership',
  PROFILE_OWNERSHIP = 'profile-ownership',
  FOLLOW_PROFILE = 'follow-profile',
  COLLECT_PUBLICATION = 'collect-publication',
  COLLECT_THIS_PUBLICATION = 'collect-this-publication',
  OR = 'or',
  AND = 'and',
}

export enum Erc20ComparisonOperator {
  Equal = 'EQUAL',
  NotEqual = 'NOT_EQUAL',
  GreaterThan = 'GREATER_THAN',
  GreaterThanOrEqual = 'GREATER_THAN_OR_EQUAL',
  LessThan = 'LESS_THAN',
  LessThanOrEqual = 'LESS_THAN_OR_EQUAL',
}

/**
 * The active wallet must satisfy the NFT ownership criteria
 */
export type NftOwnershipCriterion = {
  type: DecryptionCriteriaType.NFT_OWNERSHIP;
  /**
   * The NFT contract address
   */
  contractAddress: EthereumAddress;
  /**
   * The chain Id where the NFT contract is deployed
   */
  chainId: number;
  /**
   * The NFT contract type
   */
  contractType: NftContractType;
  /**
   * If specified, the active wallet must own the specified NFTs
   */
  tokenIds?: Array<NftId>;
};

/**
 * The active wallet must have the specified amount of ERC20 tokens
 */
export type Erc20OwnershipCriterion = {
  type: DecryptionCriteriaType.ERC20_OWNERSHIP;
  /**
   * The amount of ERC20 tokens
   */
  amount: Amount<Erc20>;
  /**
   * The comparison operator that will be used to compare the active wallet's ERC20 balance with the specified amount
   */
  condition: Erc20ComparisonOperator;
};

/**
 * The active wallet must have the specified address
 */
export type AddressOwnershipCriterion = {
  type: DecryptionCriteriaType.ADDRESS_OWNERSHIP;
  /**
   * The address
   */
  address: EthereumAddress;
};

/**
 * The profile with the specified id must be owned by the active wallet
 */
export type ProfileOwnershipCriterion = {
  type: DecryptionCriteriaType.PROFILE_OWNERSHIP;
  /**
   * The owned profile id
   */
  profileId: ProfileId;
};

/**
 * The profile with the specified id must be followed
 */
export type FollowProfileCriterion = {
  type: DecryptionCriteriaType.FOLLOW_PROFILE;
  /**
   * The followed profile id
   */
  profileId: ProfileId;
};

/**
 * The publication with the specified id must be collected
 */
export type CollectPublicationCriterion = {
  type: DecryptionCriteriaType.COLLECT_PUBLICATION;
  /**
   * The collected publication id
   */
  publicationId: PublicationId;
};

/**
 * This publication must be collected
 */
export type CollectThisPublicationCriterion = {
  type: DecryptionCriteriaType.COLLECT_THIS_PUBLICATION;
};

/**
 * A simple, non-composite criterion
 */
export type SimpleCriterion =
  | NftOwnershipCriterion
  | Erc20OwnershipCriterion
  | AddressOwnershipCriterion
  | ProfileOwnershipCriterion
  | FollowProfileCriterion
  | CollectPublicationCriterion
  | CollectThisPublicationCriterion;

/**
 * At least one criterion in the array must be satisfied
 */
export type OrCriterion<T extends AnyCriterion[]> = {
  type: DecryptionCriteriaType.OR;
  or: T;
};

/**
 * All criteria in the array must be satisfied
 */
export type AndCriterion<T extends AnyCriterion[]> = {
  type: DecryptionCriteriaType.AND;
  and: T;
};

/**
 * A criterion that can be either a simple criterion or a composite criterion
 */
export type AnyCriterion<T extends SimpleCriterion = SimpleCriterion> =
  | SimpleCriterion
  | OrCriterion<T[]>
  | AndCriterion<T[]>;

export type DecryptionCriteria = AnyCriterion<SimpleCriterion>;
