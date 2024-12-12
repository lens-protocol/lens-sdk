import {
  type AccessToken,
  type BigDecimal,
  type BigIntString,
  type BlockchainData,
  type CompactJwt,
  type Cursor,
  type DateTime,
  type EncodedTransaction,
  type EvmAddress,
  type ID,
  type IdToken,
  type LegacyProfileId,
  type PostId,
  type RefreshToken,
  type Signature,
  type TxHash,
  type URI,
  type URL,
  type UUID,
  type UsernameValue,
  type Void,
  never,
} from '@lens-protocol/types';
import { type DocumentDecoration, type FragmentOf, initGraphQLTada } from 'gql.tada';
import type { AccountReportReason, ContentWarning, PageSize } from './enums';
import type { introspection } from './graphql-env';

export const graphql = initGraphQLTada<{
  disableMasking: true;
  introspection: introspection;
  scalars: {
    AccessToken: AccessToken;
    AccountReportReason: AccountReportReason;
    BigDecimal: BigDecimal;
    BigInt: BigIntString;
    BlockchainData: BlockchainData;
    Boolean: boolean;
    ContentWarning: ContentWarning;
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
    PageSize: PageSize;
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

/**
 * @internal
 */
export type RequestOf<Document> = Document extends DocumentDecoration<
  unknown,
  { request: infer Request }
>
  ? Request
  : never;

/**
 * @internal
 */
export type FragmentShape = NonNullable<Parameters<typeof graphql>[1]>[number];

export type TypedDocumentFrom<In extends string, Fragments extends FragmentShape[]> = ReturnType<
  typeof graphql<In, Fragments>
>;

export type FragmentNodeFor<T> = T extends FragmentOf<infer U> ? U : never;

export type Factory<In extends string> = <T extends FragmentNodeFor<unknown>[]>(
  ...fragments: T
) => TypedDocumentFrom<In, T>;

/**
 * @internal
 */
export function factory<const In extends string>(_: In): Factory<In> {
  return <T extends FragmentNodeFor<unknown>[]>(..._fragments: T): TypedDocumentFrom<In, T> => {
    never('This function should never be called');
  };
}
