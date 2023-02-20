import { ProfileId } from '@lens-protocol/domain/entities';
import { assertJustOne, hasAtLeastOne, invariant, never } from '@lens-protocol/shared-kernel';

import {
  AccessConditionOutput,
  Comment,
  ContractType,
  Maybe,
  NftOwnershipOutput,
  Post,
  RootCriterionFragment,
} from '../graphql';
import {
  AnyCondition,
  ConditionType,
  DecryptionCriteria,
  NftOwnership,
} from '../graphql/DecryptionCriteria';
import { FieldReadFunction } from './TypePolicy';

function allButPublicationAuthor(authorId: ProfileId) {
  return (criterion: RootCriterionFragment): boolean => {
    return criterion.profile?.profileId !== authorId;
  };
}

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];
function entriesOf<T extends object>(obj: T) {
  return Object.entries(obj) as Entries<T>;
}

type AccessConditionOutputEntry = Entries<AccessConditionOutput>[number];
type SafeAccessConditionOutputEntries<T = AccessConditionOutputEntry[]> = {
  [K in keyof T]: T[K] extends Maybe<infer R> ? R : T[K];
};

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
      chainID: chainID,
      contractAddress: contractAddress,
      contractType: contractType,
      tokenIds: tokenIds,
    };
  }

  return {
    type: ConditionType.NFT_OWNERSHIP,
    chainID: chainID,
    contractAddress: contractAddress,
    contractType: contractType,
  };
}

function resolveCondition({ ...condition }: AccessConditionOutput): Maybe<AnyCondition> {
  const safeEntries = entriesOf(condition).reduce((conditions, entry) => {
    if (entry[0] === '__typename') return conditions;
    if (entry[1] === null) return conditions;

    conditions.push(entry);
    return conditions;
  }, [] as SafeAccessConditionOutputEntries);

  assertJustOne(safeEntries);

  const [key, value] = safeEntries[0];

  invariant(value, '');

  switch (key) {
    // case 'and':
    //   return {};
    // case 'or':
    //   return {};
    // case 'eoa':
    //   return {};
    // case 'token':
    //   return {};
    case 'nft':
      return nftOwnership(value);
    // case 'profile':
    //   return {};
    // case 'follow':
    //   return {};
    // case 'collect':
    //   return {};
  }
  return null;
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

  return resolveCondition(criteria[0]);
};
