import type {
  AccessToken,
  BigDecimal,
  BigIntString,
  BlockchainData,
  CompactJwt,
  Cursor,
  DateTime,
  EncodedTransaction,
  EvmAddress,
  ID,
  IdToken,
  LegacyProfileId,
  PostId,
  RefreshToken,
  Signature,
  TxHash,
  URI,
  URL,
  UUID,
  UsernameValue,
  Void,
} from '@lens-social/types';
import { initGraphQLTada } from 'gql.tada';
import type { introspection } from './graphql-env';

export const graphql = initGraphQLTada<{
  disableMasking: true;
  introspection: introspection;
  scalars: {
    AccessToken: AccessToken;
    BigDecimal: BigDecimal;
    BigInt: BigIntString;
    BlockchainData: BlockchainData;
    Boolean: boolean;
    Cursor: Cursor;
    DateTime: DateTime;
    EncodedTransaction: EncodedTransaction;
    EvmAddress: EvmAddress;
    Float: number;
    ID: ID;
    IdToken: IdToken;
    Int: number;
    LegacyProfileId: LegacyProfileId;
    LegacyRefreshToken: CompactJwt;
    PostId: PostId;
    RefreshToken: RefreshToken;
    Signature: Signature;
    String: string;
    TxHash: TxHash;
    URI: URI;
    URL: URL;
    UsernameValue: UsernameValue;
    UUID: UUID;
    Void: Void;
  };
}>();
