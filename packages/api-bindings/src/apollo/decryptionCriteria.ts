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
  AndCondition,
  AnyCondition,
  CollectPublication,
  CollectThisPublication,
  Condition,
  ConditionType,
  DecryptionCriteria,
  Erc20Ownership,
  FollowProfile,
  NftOwnership,
  OrCondition,
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
      type: ConditionType.NFT_OWNERSHIP,
      chainId: chainID,
      contractAddress: contractAddress,
      contractType: contractType,
      tokenIds: tokenIds,
    };
  }

  return {
    type: ConditionType.NFT_OWNERSHIP,
    chainId: chainID,
    contractAddress: contractAddress,
    contractType: contractType,
  };
}

function erc20Ownership(condition: Erc20OwnershipOutput): Erc20Ownership {
  return {
    type: ConditionType.ERC20_OWNERSHIP,
    amount: condition.amount,
    chainId: condition.chainID,
    condition: condition.condition,
    contractAddress: condition.contractAddress,
    decimals: condition.decimals,
  };
}

function addressOwnership(condition: EoaOwnershipOutput): AddressOwnership {
  return {
    type: ConditionType.ADDRESS_OWNERSHIP,
    address: condition.address,
  };
}

function profileOwnership(condition: ProfileOwnershipOutput): ProfileOwnership {
  return {
    type: ConditionType.PROFILE_OWNERSHIP,
    profileId: condition.profileId,
  };
}

function followProfile(condition: FollowConditionOutput): FollowProfile {
  return {
    type: ConditionType.FOLLOW_PROFILE,
    profileId: condition.profileId,
  };
}

function collectPublication(
  condition: CollectConditionOutput,
): CollectPublication | CollectThisPublication {
  if (condition.thisPublication) {
    return {
      type: ConditionType.COLLECT_THIS_PUBLICATION,
    };
  }
  return {
    type: ConditionType.COLLECT_PUBLICATION,
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

function resolveSimpleCondition(accessCondition: AccessConditionOutput): Condition | null {
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

function andCondition({ criteria }: AndConditionOutput): AndCondition<Condition> | null {
  const conditions = criteria.map(resolveSimpleCondition).filter(isNonNullable);

  if (!hasTwoOrMore(conditions)) return null;

  return {
    type: ConditionType.AND,
    and: conditions,
  };
}

function orCondition({ criteria }: OrConditionOutput): OrCondition<Condition> | null {
  const conditions = criteria.map(resolveSimpleCondition).filter(isNonNullable);

  if (!hasTwoOrMore(conditions)) return null;

  return {
    type: ConditionType.OR,
    or: conditions,
  };
}

function resolveRootCondition(accessCondition: AccessConditionOutput): Maybe<AnyCondition> {
  const condition = sanitize(accessCondition);

  switch (condition.__typename) {
    case 'AndConditionOutput':
      return andCondition(condition);
    case 'OrConditionOutput':
      return orCondition(condition);
  }

  return resolveSimpleCondition(accessCondition);
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

  return resolveRootCondition(criteria[0]);
};
