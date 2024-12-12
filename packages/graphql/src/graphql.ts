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
  type FragmentOf,
  type TadaDocumentNode,
  initGraphQLTada,
} from 'gql.tada';
import type { AccountReportReason, PageSize } from './enums';
import type { PaginatedResultInfo } from './fragments';
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

type GetDocumentNode<
  In extends string = string,
  Fragments extends FragmentShape[] = FragmentShape[],
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

export type RequestFrom<In extends string> = RequestOf<GetDocumentNode<In, FragmentShape[]>>;

// biome-ignore lint/suspicious/noExplicitAny: simplifies necessary type assertions
export type StandardDocumentNode<Value = any, Request = any> = TadaDocumentNode<
  StandardData<Value>,
  { request: Request }
>;

type FragmentDocumentFrom<
  In extends string,
  Fragments extends FragmentShape[],
  Document extends GetDocumentNode<In, Fragments> = GetDocumentNode<In, Fragments>,
> = Document extends FragmentShape ? Document : never;

type FragmentDocumentForEach<Nodes extends AnyGqlNode[]> = {
  [K in keyof Nodes]: FragmentDocumentFor<Nodes[K]>;
};

/**
 * @internal
 */
export type DynamicFragmentDocument<
  In extends string,
  StaticNodes extends AnyGqlNode[],
> = FragmentDocumentFrom<In, FragmentDocumentForEach<StaticNodes>> & {
  __phantom: In;
};

/**
 * @internal
 */
export function fragment<In extends string, StaticNodes extends AnyGqlNode[]>(
  input: In,
  staticFragments: FragmentDocumentForEach<StaticNodes> = [] as FragmentDocumentForEach<StaticNodes>,
): DynamicFragmentDocument<In, StaticNodes> {
  return graphql(input, staticFragments) as DynamicFragmentDocument<In, StaticNodes>;
}

/**
 * @internal
 */
export type DynamicFragmentOf<
  Document,
  DynamicNodes extends AnyGqlNode[],
> = Document extends DynamicFragmentDocument<infer In, infer StaticNodes>
  ? FragmentOf<FragmentDocumentFrom<In, FragmentDocumentForEach<[...DynamicNodes, ...StaticNodes]>>>
  : never;

export type Paginated<T> = {
  items: readonly T[];
  pageInfo: PaginatedResultInfo;
};
