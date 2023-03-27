import { Amount, Brand, Erc20, EthereumAddress } from '@lens-protocol/shared-kernel';

import { NftContractType, NftId } from './Nft';
import { ProfileId } from './Profile';

export type PublicationId = Brand<string, 'PublicationId'>;

export enum ReactionType {
  UPVOTE = 'upvote',
  DOWNVOTE = 'downvote',
}

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

export type NftOwnershipCriterion = {
  type: DecryptionCriteriaType.NFT_OWNERSHIP;
  contractAddress: EthereumAddress;
  chainId: number;
  contractType: NftContractType;
  tokenIds?: Array<NftId>;
};

export type Erc20OwnershipCriterion = {
  type: DecryptionCriteriaType.ERC20_OWNERSHIP;
  amount: Amount<Erc20>;
  condition: Erc20ComparisonOperator;
};

export type AddressOwnershipCriterion = {
  type: DecryptionCriteriaType.ADDRESS_OWNERSHIP;
  address: EthereumAddress;
};

export type ProfileOwnershipCriterion = {
  type: DecryptionCriteriaType.PROFILE_OWNERSHIP;
  profileId: ProfileId;
};

export type FollowProfileCriterion = {
  type: DecryptionCriteriaType.FOLLOW_PROFILE;
  profileId: ProfileId;
};

export type CollectPublicationCriterion = {
  type: DecryptionCriteriaType.COLLECT_PUBLICATION;
  publicationId: PublicationId;
};

export type CollectThisPublicationCriterion = {
  type: DecryptionCriteriaType.COLLECT_THIS_PUBLICATION;
};

export type SimpleCriterion =
  | NftOwnershipCriterion
  | Erc20OwnershipCriterion
  | AddressOwnershipCriterion
  | ProfileOwnershipCriterion
  | FollowProfileCriterion
  | CollectPublicationCriterion
  | CollectThisPublicationCriterion;

export type OrCriterion<T extends AnyCriterion[]> = {
  type: DecryptionCriteriaType.OR;
  or: T;
};

export type AndCriterion<T extends AnyCriterion[]> = {
  type: DecryptionCriteriaType.AND;
  and: T;
};

export type AnyCriterion<T extends SimpleCriterion = SimpleCriterion> =
  | SimpleCriterion
  | OrCriterion<T[]>
  | AndCriterion<T[]>;

export type DecryptionCriteria = AnyCriterion<SimpleCriterion>;
