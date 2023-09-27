import { FieldReadFunction } from '@apollo/client';
import {
  AddressOwnershipCriterion,
  AndCriterion,
  AnyCriterion,
  CollectPublicationCriterion,
  CollectThisPublicationCriterion,
  DecryptionCriteriaType,
  Erc20ComparisonOperator,
  Erc20OwnershipCriterion,
  FollowProfileCriterion,
  NftContractType,
  NftOwnershipCriterion,
  OrCriterion,
  ProfileId,
  ProfileOwnershipCriterion,
  SimpleCriterion,
} from '@lens-protocol/domain/entities';
import {
  Amount,
  assertJustOne,
  ChainType,
  erc20,
  hasAtLeastOne,
  hasJustOne,
  hasTwoOrMore,
  invariant,
  isNonNullable,
  never,
  TwoAtLeastArray,
  assertNever,
} from '@lens-protocol/shared-kernel';

import {
  AndConditionOutput,
  CollectConditionOutput,
  ContractType,
  EoaOwnershipOutput,
  Erc20OwnershipOutput,
  FollowConditionOutput,
  Maybe,
  NftOwnershipOutput,
  OrConditionOutput,
  ProfileOwnershipOutput,
  AnyConditionOutput,
  ScalarOperator,
  LeafConditionOutput,
  Profile,
  MetadataOutput,
} from '../../lens';

function allButPublicationAuthor(authorId: ProfileId) {
  return (criterion: AnyConditionOutput): boolean => {
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

  switch (supportedNftContractType) {
    case NftContractType.Erc721:
      return {
        type: DecryptionCriteriaType.NFT_OWNERSHIP,
        chainId: chainID,
        contractAddress: contractAddress,
        contractType: supportedNftContractType,
        tokenIds: tokenIds ?? undefined,
      };
    case NftContractType.Erc1155:
      if (tokenIds && hasAtLeastOne(tokenIds)) {
        return {
          type: DecryptionCriteriaType.NFT_OWNERSHIP,
          chainId: chainID,
          contractAddress: contractAddress,
          contractType: supportedNftContractType,
          tokenIds: tokenIds,
        };
      }

      return null;
    default:
      assertNever(supportedNftContractType, 'NFT contract type is not supported');
  }
}

export function erc20Amount({ from }: { from: Erc20OwnershipOutput }) {
  const asset = erc20({
    chainType: ChainType.POLYGON, // temporary while BE works on returning an Erc20Amount node
    address: from.contractAddress,
    decimals: from.decimals,
    name: from.name,
    symbol: from.symbol,
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

function collectPublication(
  condition: CollectConditionOutput,
): CollectPublicationCriterion | CollectThisPublicationCriterion {
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

function sanitize({ __typename, ...accessCondition }: Partial<AnyConditionOutput>) {
  const conditions = Object.values(accessCondition).filter(isNonNullable);
  assertJustOne(conditions);
  return conditions[0];
}

function resolveSimpleCriterion(accessCondition: LeafConditionOutput): SimpleCriterion | null {
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
      return collectPublication(condition);
  }
  return null;
}

function andCondition({
  criteria,
}: AndConditionOutput): AndCriterion<TwoAtLeastArray<SimpleCriterion>> | null {
  const conditions = criteria
    .map((condition) => resolveSimpleCriterion(condition))
    .filter(isNonNullable);

  if (!hasTwoOrMore(conditions)) return null;

  return {
    type: DecryptionCriteriaType.AND,
    and: conditions,
  };
}

function orCondition({
  criteria,
}: OrConditionOutput): OrCriterion<TwoAtLeastArray<SimpleCriterion>> | null {
  const conditions = criteria
    .map((condition) => resolveSimpleCriterion(condition))
    .filter(isNonNullable);

  if (!hasTwoOrMore(conditions)) return null;

  return {
    type: DecryptionCriteriaType.OR,
    or: conditions,
  };
}

function resolveRootCriterion(accessCondition: AnyConditionOutput): Maybe<AnyCriterion> {
  const condition = sanitize(accessCondition);

  switch (condition.__typename) {
    case 'AndConditionOutput':
      return andCondition(condition);
    case 'OrConditionOutput':
      return orCondition(condition);
  }

  return resolveSimpleCriterion(accessCondition);
}

export const decryptionCriteria: FieldReadFunction = (_, { canRead, readField }) => {
  const isGated = readField('isGated') ?? never();

  if (!isGated) return null;

  // we MUST be careful with these assertions as they rely on intrinsic knowledge of the schema
  const author = (readField('profile') as Profile) ?? never();
  const metadata = (readField('metadata') as MetadataOutput) ?? never();

  if (!metadata.encryptionParams || !metadata.encryptionParams.accessCondition.or) {
    return null;
  }

  invariant(canRead(author), 'Expected to be able to read publication author');

  const authorId = readField('id', author) as ProfileId;

  const criteria = metadata.encryptionParams.accessCondition.or.criteria.filter(
    allButPublicationAuthor(authorId),
  );

  if (hasJustOne(criteria)) {
    return resolveRootCriterion(criteria[0]);
  }

  return null;
};
