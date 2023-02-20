import { ProfileId, PublicationId } from '@lens-protocol/domain/entities';
import { EthereumAddress, NonEmptyArray, Overwrite } from '@lens-protocol/shared-kernel';

import { ContractType, ScalarOperator } from './generated';

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

export type NftOwnershipCriterion = {
  type: DecryptionCriteriaType.NFT_OWNERSHIP;
  contractAddress: EthereumAddress;
  chainId: number;
  contractType: ContractType.Erc721 | ContractType.Erc1155;
  tokenIds?: NonEmptyArray<string>;
};

export type Erc20OwnershipCriterion = {
  type: DecryptionCriteriaType.ERC20_OWNERSHIP;
  amount: string;
  chainId: number;
  contractAddress: EthereumAddress;
  decimals: number;
  condition: ScalarOperator;
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

export type TwoAtLeastArray<T> = Overwrite<
  [T, T, ...T[]],
  {
    map<U>(
      callbackfn: (value: T, index: number, array: T[]) => U,
      thisArg?: unknown,
    ): TwoAtLeastArray<U>;
  }
>;

export type OrCriterion<T> = { type: DecryptionCriteriaType.OR; or: TwoAtLeastArray<T> };

export type AndCriterion<T> = { type: DecryptionCriteriaType.AND; and: TwoAtLeastArray<T> };

export type AnyCriterion =
  | SimpleCriterion
  | OrCriterion<SimpleCriterion>
  | AndCriterion<SimpleCriterion>;

/**
 * The criteria to decrypt a gated publication.
 *
 * @example a formatting function for the criteria:
 *
 * function format(criterion: AnyCriterion): string {
 *   switch (criterion.type) {
 *     case DecryptionCriteriaType.NFT_OWNERSHIP:
 *       return `own_nft(${criterion.contractAddress})`;
 *     case DecryptionCriteriaType.ERC20_OWNERSHIP:
 *       return `have_erc20(${criterion.criterion} than ${criterion.amount})`;
 *     case DecryptionCriteriaType.ADDRESS_OWNERSHIP:
 *       return `own_address(${criterion.address})`;
 *     case DecryptionCriteriaType.PROFILE_OWNERSHIP:
 *       return `own_profile(${criterion.profileId})`;
 *     case DecryptionCriteriaType.FOLLOW_PROFILE:
 *       return `follow_profile(${criterion.profileId})`;
 *     case DecryptionCriteriaType.COLLECT_PUBLICATION:
 *       return `have_collected(${criterion.publicationId})`;
 *     case DecryptionCriteriaType.COLLECT_THIS_PUBLICATION:
 *       return `have_collected_this_publication(${criterion.publicationId})`;
 *     case DecryptionCriteriaType.OR:
 *       return `or(${criterion.or.map(format).join(', ')})`;
 *     case DecryptionCriteriaType.AND:
 *       return `and(${criterion.and.map(format).join(', ')})`;
 *   }
 * }
 */
export type DecryptionCriteria = AnyCriterion;
