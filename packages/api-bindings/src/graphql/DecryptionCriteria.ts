import { ProfileId, PublicationId } from '@lens-protocol/domain/entities';
import { EthereumAddress, NonEmptyArray, Overwrite } from '@lens-protocol/shared-kernel';

import { ClientErc20Amount } from './ClientErc20Amount';
import { ContractType, ScalarOperator } from './generated';

export enum ConditionType {
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

export type NftOwnership = {
  type: ConditionType.NFT_OWNERSHIP;
  contractAddress: EthereumAddress;
  chainID: number;
  contractType: ContractType.Erc721 | ContractType.Erc1155;
  tokenIds?: NonEmptyArray<string>;
};

export type Erc20Ownership = {
  type: ConditionType.ERC20_OWNERSHIP;
  amount: ClientErc20Amount;
  condition: ScalarOperator;
};

export type AddressOwnership = {
  type: ConditionType.ADDRESS_OWNERSHIP;
  address: EthereumAddress;
};

export type ProfileOwnership = {
  type: ConditionType.PROFILE_OWNERSHIP;
  profileId: ProfileId;
};

export type FollowProfile = {
  type: ConditionType.FOLLOW_PROFILE;
  profileId: ProfileId;
};

export type CollectPublication = {
  type: ConditionType.COLLECT_PUBLICATION;
  publicationId: PublicationId;
};

export type CollectThisPublication = {
  type: ConditionType.COLLECT_THIS_PUBLICATION;
  publicationId: PublicationId;
};

export type Condition =
  | NftOwnership
  | Erc20Ownership
  | AddressOwnership
  | ProfileOwnership
  | FollowProfile
  | CollectPublication
  | CollectThisPublication;

export type TwoAtLeastArray<T> = Overwrite<
  [T, T, ...T[]],
  {
    map<U>(
      callbackfn: (value: T, index: number, array: T[]) => U,
      thisArg?: unknown,
    ): TwoAtLeastArray<U>;
  }
>;

export type OrCondition<T> = { type: ConditionType.OR; or: TwoAtLeastArray<T> };

export type AndCondition<T> = { type: ConditionType.AND; and: TwoAtLeastArray<T> };

export type AnyCondition = Condition | OrCondition<Condition> | AndCondition<Condition>;

/**
 * The criteria to decrypt a gated publication.
 *
 * @example a formatting function for the criteria:
 *
 * function format(condition: AnyCondition): string {
 *   switch (condition.type) {
 *     case ConditionType.NFT_OWNERSHIP:
 *       return `own_nft(${condition.contractAddress})`;
 *     case ConditionType.ERC20_OWNERSHIP:
 *       return `have_erc20(${condition.condition} than ${condition.amount})`;
 *     case ConditionType.ADDRESS_OWNERSHIP:
 *       return `own_address(${condition.address})`;
 *     case ConditionType.PROFILE_OWNERSHIP:
 *       return `own_profile(${condition.profileId})`;
 *     case ConditionType.FOLLOW_PROFILE:
 *       return `follow_profile(${condition.profileId})`;
 *     case ConditionType.COLLECT_PUBLICATION:
 *       return `have_collected(${condition.publicationId})`;
 *     case ConditionType.COLLECT_THIS_PUBLICATION:
 *       return `have_collected_this_publication(${condition.publicationId})`;
 *     case ConditionType.OR:
 *       return `or(${condition.or.map(format).join(', ')})`;
 *     case ConditionType.AND:
 *       return `and(${condition.and.map(format).join(', ')})`;
 *   }
 * }
 */
export type DecryptionCriteria = AnyCondition;
