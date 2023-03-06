import {
  AddressOwnershipCriterion,
  AndCriterion,
  AnyCriterion,
  CollectPublicationCriterion,
  CollectThisPublicationCriterion,
  DecryptionCriteria,
  DecryptionCriteriaType,
  Erc20ComparisonOperator,
  Erc20OwnershipCriterion,
  FollowProfileCriterion,
  NftContractType,
  NftOwnershipCriterion,
  OrCriterion,
  ProfileId,
  ProfileOwnershipCriterion,
  PublicationId,
  SimpleCriterion,
} from '@lens-protocol/domain/entities';
import {
  Amount,
  assertJustOne,
  ChainType,
  erc20,
  hasAtLeastOne,
  hasTwoOrMore,
  invariant,
  isNonNullable,
  never,
  TwoAtLeastArray,
} from '@lens-protocol/shared-kernel';

import {
  AccessConditionOutput,
  AndConditionOutput,
  CollectConditionOutput,
  Comment,
  ContractType,
  EoaOwnershipOutput,
  Erc20OwnershipFragment,
  Erc20OwnershipOutput,
  FollowConditionOutput,
  Maybe,
  NftOwnershipOutput,
  OrConditionOutput,
  Post,
  ProfileOwnershipOutput,
  AnyConditionFragment,
  ScalarOperator,
} from '../graphql';
import { FieldReadFunction } from './TypePolicy';

function allButPublicationAuthor(authorId: ProfileId) {
  return (criterion: AnyConditionFragment): boolean => {
    return criterion.profile?.profileId !== authorId;
  };
}

function toNftContractType(contractType: ContractType): NftContractType | null {
  switch (contractType) {
    case ContractType.Erc721:
      return NftContractType.Erc721;
    case ContractType.Erc1155:
      return NftContractType.Erc1155;
  }
  return null;
}

function nftOwnershipCriterion({
  chainID,
  contractAddress,
  contractType,
  tokenIds,
}: NftOwnershipOutput): NftOwnershipCriterion | null {
  const supportedNftContractType = toNftContractType(contractType);

  if (!supportedNftContractType) {
    return null;
  }

  if (tokenIds && hasAtLeastOne(tokenIds)) {
    return {
      type: DecryptionCriteriaType.NFT_OWNERSHIP,
      chainId: chainID,
      contractAddress: contractAddress,
      contractType: supportedNftContractType,
      tokenIds: tokenIds,
    };
  }

  return {
    type: DecryptionCriteriaType.NFT_OWNERSHIP,
    chainId: chainID,
    contractAddress: contractAddress,
    contractType: supportedNftContractType,
  };
}

export function erc20Amount({ from }: { from: Erc20OwnershipFragment }) {
  const asset = erc20({
    chainType: ChainType.POLYGON, // temporary while BE works on returning an Erc20Amount node
    address: from.contractAddress,
    decimals: from.decimals,
    name: 'Unspecified',
    symbol: 'UNSPECIFIED',
  });
  return Amount.erc20(asset, from.amount);
}

function toErc20Comp(operator: ScalarOperator): Erc20ComparisonOperator {
  return operator as string as Erc20ComparisonOperator;
}

function erc20OwnershipCriterion(condition: Erc20OwnershipOutput): Erc20OwnershipCriterion {
  return {
    type: DecryptionCriteriaType.ERC20_OWNERSHIP,
    amount: erc20Amount({ from: condition }),
    condition: toErc20Comp(condition.condition),
  };
}

function addressOwnershipCriterion(condition: EoaOwnershipOutput): AddressOwnershipCriterion {
  return {
    type: DecryptionCriteriaType.ADDRESS_OWNERSHIP,
    address: condition.address,
  };
}

function profileOwnershipCriterion(condition: ProfileOwnershipOutput): ProfileOwnershipCriterion {
  return {
    type: DecryptionCriteriaType.PROFILE_OWNERSHIP,
    profileId: condition.profileId,
  };
}

function followProfile(condition: FollowConditionOutput): FollowProfileCriterion {
  return {
    type: DecryptionCriteriaType.FOLLOW_PROFILE,
    profileId: condition.profileId,
  };
}

type ContextBag = {
  publicationId: PublicationId;
};

function collectPublication(
  condition: CollectConditionOutput,
  { publicationId }: ContextBag,
): CollectPublicationCriterion | CollectThisPublicationCriterion {
  if (condition.thisPublication) {
    return {
      type: DecryptionCriteriaType.COLLECT_THIS_PUBLICATION,
      publicationId,
    };
  }
  return {
    type: DecryptionCriteriaType.COLLECT_PUBLICATION,
    publicationId: condition.publicationId ?? never('Expected publicationId to be defined'),
  };
}

function sanitize({ __typename, ...accessCondition }: AccessConditionOutput) {
  const conditions = Object.values(accessCondition).filter(isNonNullable);
  assertJustOne(conditions);
  return conditions[0];
}

function resolveSimpleCriterion(
  accessCondition: AccessConditionOutput,
  context: ContextBag,
): SimpleCriterion | null {
  const condition = sanitize(accessCondition);

  switch (condition.__typename) {
    case 'EoaOwnershipOutput':
      return addressOwnershipCriterion(condition);
    case 'Erc20OwnershipOutput':
      return erc20OwnershipCriterion(condition);
    case 'NftOwnershipOutput':
      return nftOwnershipCriterion(condition);
    case 'ProfileOwnershipOutput':
      return profileOwnershipCriterion(condition);
    case 'FollowConditionOutput':
      return followProfile(condition);
    case 'CollectConditionOutput':
      return collectPublication(condition, context);
  }
  return null;
}

function andCondition(
  { criteria }: AndConditionOutput,
  context: ContextBag,
): AndCriterion<TwoAtLeastArray<SimpleCriterion>> | null {
  const conditions = criteria
    .map((condition) => resolveSimpleCriterion(condition, context))
    .filter(isNonNullable);

  if (!hasTwoOrMore(conditions)) return null;

  return {
    type: DecryptionCriteriaType.AND,
    and: conditions,
  };
}

function orCondition(
  { criteria }: OrConditionOutput,
  context: ContextBag,
): OrCriterion<TwoAtLeastArray<SimpleCriterion>> | null {
  const conditions = criteria
    .map((condition) => resolveSimpleCriterion(condition, context))
    .filter(isNonNullable);

  if (!hasTwoOrMore(conditions)) return null;

  return {
    type: DecryptionCriteriaType.OR,
    or: conditions,
  };
}

function resolveRootCriterion(
  accessCondition: AccessConditionOutput,
  context: ContextBag,
): Maybe<AnyCriterion> {
  const condition = sanitize(accessCondition);

  switch (condition.__typename) {
    case 'AndConditionOutput':
      return andCondition(condition, context);
    case 'OrConditionOutput':
      return orCondition(condition, context);
  }

  return resolveSimpleCriterion(accessCondition, context);
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

  return resolveRootCriterion(criteria[0], { publicationId: readField('id') ?? never() });
};
