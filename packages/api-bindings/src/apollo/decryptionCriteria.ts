import { ProfileId } from '@lens-protocol/domain/entities';
import { assertJustOne, hasAtLeastOne, invariant, never } from '@lens-protocol/shared-kernel';

import {
  AccessConditionOutput,
  AndConditionOutput,
  CollectConditionOutput,
  Comment,
  ContractType,
  EoaOwnershipOutput,
  Erc20OwnershipOutput,
  FollowConditionOutput,
  Maybe,
  NftOwnershipOutput,
  OrConditionOutput,
  Post,
  ProfileOwnershipOutput,
  RootCriterionFragment,
} from '../graphql';
import {
  AddressOwnership,
  AndCriterion,
  AnyCriterion,
  CollectPublication,
  CollectThisPublication,
  SimpleCriterion,
  DecryptionCriteriaType,
  DecryptionCriteria,
  Erc20Ownership,
  FollowProfile,
  NftOwnership,
  OrCriterion,
  ProfileOwnership,
  TwoAtLeastArray,
} from '../graphql/DecryptionCriteria';
import { FieldReadFunction } from './TypePolicy';

function allButPublicationAuthor(authorId: ProfileId) {
  return (criterion: RootCriterionFragment): boolean => {
    return criterion.profile?.profileId !== authorId;
  };
}

function isSupportedNFTContractType(
  contractType: ContractType,
): contractType is ContractType.Erc721 | ContractType.Erc1155 {
  return [ContractType.Erc721, ContractType.Erc1155].includes(contractType);
}

function nftOwnership({
  chainID,
  contractAddress,
  contractType,
  tokenIds,
}: NftOwnershipOutput): NftOwnership | null {
  if (!isSupportedNFTContractType(contractType)) {
    return null;
  }

  if (tokenIds && hasAtLeastOne(tokenIds)) {
    return {
      type: DecryptionCriteriaType.NFT_OWNERSHIP,
      chainId: chainID,
      contractAddress: contractAddress,
      contractType: contractType,
      tokenIds: tokenIds,
    };
  }

  return {
    type: DecryptionCriteriaType.NFT_OWNERSHIP,
    chainId: chainID,
    contractAddress: contractAddress,
    contractType: contractType,
  };
}

function erc20Ownership(condition: Erc20OwnershipOutput): Erc20Ownership {
  return {
    type: DecryptionCriteriaType.ERC20_OWNERSHIP,
    amount: condition.amount,
    chainId: condition.chainID,
    condition: condition.condition,
    contractAddress: condition.contractAddress,
    decimals: condition.decimals,
  };
}

function addressOwnership(condition: EoaOwnershipOutput): AddressOwnership {
  return {
    type: DecryptionCriteriaType.ADDRESS_OWNERSHIP,
    address: condition.address,
  };
}

function profileOwnership(condition: ProfileOwnershipOutput): ProfileOwnership {
  return {
    type: DecryptionCriteriaType.PROFILE_OWNERSHIP,
    profileId: condition.profileId,
  };
}

function followProfile(condition: FollowConditionOutput): FollowProfile {
  return {
    type: DecryptionCriteriaType.FOLLOW_PROFILE,
    profileId: condition.profileId,
  };
}

function collectPublication(
  condition: CollectConditionOutput,
): CollectPublication | CollectThisPublication {
  if (condition.thisPublication) {
    return {
      type: DecryptionCriteriaType.COLLECT_THIS_PUBLICATION,
    };
  }
  return {
    type: DecryptionCriteriaType.COLLECT_PUBLICATION,
    publicationId: condition.publicationId ?? never('Expected publicationId to be defined'),
  };
}

function isNonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

function sanitize({ __typename, ...accessCondition }: AccessConditionOutput) {
  const conditions = Object.values(accessCondition).filter(isNonNullable);
  assertJustOne(conditions);
  return conditions[0];
}

function resolveSimpleCriterion(accessCondition: AccessConditionOutput): SimpleCriterion | null {
  const condition = sanitize(accessCondition);

  switch (condition.__typename) {
    case 'EoaOwnershipOutput':
      return addressOwnership(condition);
    case 'Erc20OwnershipOutput':
      return erc20Ownership(condition);
    case 'NftOwnershipOutput':
      return nftOwnership(condition);
    case 'ProfileOwnershipOutput':
      return profileOwnership(condition);
    case 'FollowConditionOutput':
      return followProfile(condition);
    case 'CollectConditionOutput':
      return collectPublication(condition);
  }
  return null;
}

function hasTwoOrMore<T>(items: ReadonlyArray<T>): items is TwoAtLeastArray<T> {
  return items.length >= 2;
}

function andCondition({ criteria }: AndConditionOutput): AndCriterion<SimpleCriterion> | null {
  const conditions = criteria.map(resolveSimpleCriterion).filter(isNonNullable);

  if (!hasTwoOrMore(conditions)) return null;

  return {
    type: DecryptionCriteriaType.AND,
    and: conditions,
  };
}

function orCondition({ criteria }: OrConditionOutput): OrCriterion<SimpleCriterion> | null {
  const conditions = criteria.map(resolveSimpleCriterion).filter(isNonNullable);

  if (!hasTwoOrMore(conditions)) return null;

  return {
    type: DecryptionCriteriaType.OR,
    or: conditions,
  };
}

function resolveRootCriterion(accessCondition: AccessConditionOutput): Maybe<AnyCriterion> {
  const condition = sanitize(accessCondition);

  switch (condition.__typename) {
    case 'AndConditionOutput':
      return andCondition(condition);
    case 'OrConditionOutput':
      return orCondition(condition);
  }

  return resolveSimpleCriterion(accessCondition);
}

export const decryptionCriteria: FieldReadFunction<Maybe<DecryptionCriteria>, Comment | Post> = (
  _,
  { canRead, readField },
) => {
  const isGated = readField('isGated') ?? never();

  if (!isGated) return null;

  const author = readField('profile') ?? never();
  const metadata = readField('metadata') ?? never();

  invariant(
    metadata.encryptionParams?.accessCondition.or,
    'Expected encryptionParams.accessCondition.or to be defined',
  );

  invariant(canRead(author), 'Expected to be able to read publication author');

  const authorId = readField('id', author) as ProfileId;

  const criteria = metadata.encryptionParams.accessCondition.or.criteria.filter(
    allButPublicationAuthor(authorId),
  );

  assertJustOne(criteria);

  return resolveRootCriterion(criteria[0]);
};
