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
} from '@lens-protocol/types';
import {
  type DocumentDecoration,
  type TadaDocumentNode,
  type VariablesOf,
  initGraphQLTada,
} from 'gql.tada';
import type { PageSize } from './enums';
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
export type UnknownFragmentShape = NonNullable<Parameters<typeof graphql>[1]>[number];

/**
 * @internal
 */

export type TypedDocumentFrom<
  In extends string,
  Fragments extends UnknownFragmentShape[],
> = ReturnType<typeof graphql<In, Fragments>>;

export type AnyGqlNode<TTypename extends string = string> = { __typename: TTypename };

export type AnyVariables = Record<string, unknown>;

export type FragmentDocumentFor<TGqlNode extends AnyGqlNode> = TGqlNode extends AnyGqlNode<
  infer TTypename
>
  ? TadaDocumentNode<
      TGqlNode,
      AnyVariables,
      {
        fragment: TTypename;
        on: TTypename;
        masked: false;
      }
    >
  : never;

/**
 * A standardized data object.
 *
 * All GQL operations should alias their results to `value` to ensure interoperability
 * with this client interface.
 */
export type StandardData<T> = { value: T };

export type Factory<In extends string> = <
  Nodes extends AnyGqlNode[],
  Fragments extends { [K in keyof Nodes]: FragmentDocumentFor<Nodes[K]> },
  Document extends TypedDocumentFrom<In, Fragments>,
>(
  ...fragments: Fragments
) => TadaDocumentNode<StandardData<First<Nodes>>, VariablesOf<Document>>;

type First<T extends unknown[]> = T extends [infer First, ...unknown[]] ? First : never;

/**
 * @internal
 */
export function factory<const In extends string>(operation: In): Factory<In> {
  return <
    Nodes extends AnyGqlNode[],
    Fragments extends { [K in keyof Nodes]: FragmentDocumentFor<Nodes[K]> },
    Document extends TypedDocumentFrom<In, Fragments>,
    Result extends StandardData<First<Nodes>>,
    Variables extends VariablesOf<Document>,
  >(
    ...fragments: Fragments
  ): TadaDocumentNode<Result, Variables> => {
    return graphql(operation, fragments) as TadaDocumentNode<Result, Variables>;
  };
}

/**
 * @internal
 */
export type RequestOfFactory<F extends Factory<string>> = F extends Factory<infer In>
  ? RequestOf<TypedDocumentFrom<In, Parameters<F>>>
  : never;
