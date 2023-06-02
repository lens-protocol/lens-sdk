import { LensError } from './error';
import {
  AndConditionOutput as AndCondition,
  EncryptionParamsOutput,
  EoaOwnershipOutput as EoaOwnership,
  Erc20OwnershipOutput as Erc20TokenOwnership,
  NftOwnershipOutput as NftOwnership,
  OrConditionOutput as OrCondition,
  FollowConditionOutput as FollowCondition,
  CollectConditionOutput as CollectCondition,
  ProfileOwnershipOutput as ProfileOwnership,
  PublicationMetadataV2Input as MetadataV2,
} from './graphql/types';

type EncryptedMetadata = MetadataV2 & {
  encryptionParams: EncryptionParamsOutput;
};

type EncryptMetadataResponse = {
  contentURI?: string;
  encryptedMetadata?: EncryptedMetadata;
  error?: LensError;
};

type DecryptMetadataResponse = {
  decrypted?: MetadataV2;
  error?: LensError;
};

enum LensEnvironment {
  'Polygon' = 'polygon',
  'Mumbai' = 'mumbai',
  'MumbaiSandbox' = 'mumbai-sandbox',
  'LineaGoerli' = 'lineaGoerli',
}

type AuthSig = {
  sig: string;
  derivedVia: string;
  signedMessage: string;
  address: string;
};

const enum AccessConditionType {
  And = 'and',
  Or = 'or',
  Eoa = 'eoa',
  Token = 'token',
  Nft = 'nft',
  Profile = 'profile',
  Follow = 'follow',
  Collect = 'collect',
}

type AssetCondition = NftOwnership | Erc20TokenOwnership | EoaOwnership;

type BooleanCondition = AndCondition | OrCondition;

type AccessCondition = BooleanCondition | AssetCondition;

export {
  AuthSig,
  LensEnvironment,
  MetadataV2,
  EncryptedMetadata,
  EncryptMetadataResponse,
  DecryptMetadataResponse,
  AccessConditionType,
  AccessCondition,
  AndCondition,
  AssetCondition,
  BooleanCondition,
  OrCondition,
  NftOwnership,
  Erc20TokenOwnership,
  EoaOwnership,
  FollowCondition,
  CollectCondition,
  ProfileOwnership,
};
