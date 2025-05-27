import type { FragmentOf } from 'gql.tada';
import { graphql } from '../graphql';

export const BooleanValueFragment = graphql(
  `fragment BooleanValue on BooleanValue {
    __typename
    optimistic
    onChain
  }`,
);
export type BooleanValue = FragmentOf<typeof BooleanValueFragment>;

const IntKeyValueFragment = graphql(
  `fragment IntKeyValue on IntKeyValue {
    __typename
    key
    int
  }`,
);
export type IntKeyValue = FragmentOf<typeof IntKeyValueFragment>;

const IntNullableKeyValueFragment = graphql(
  `fragment IntNullableKeyValue on IntNullableKeyValue {
    __typename
    key
    optionalInt
  }`,
);
export type IntNullableKeyValue = FragmentOf<typeof IntNullableKeyValueFragment>;

const AddressKeyValueFragment = graphql(
  `fragment AddressKeyValue on AddressKeyValue {
    __typename
    key
    address 
  }`,
);
export type AddressKeyValue = FragmentOf<typeof AddressKeyValueFragment>;

const StringKeyValueFragment = graphql(
  `fragment StringKeyValue on StringKeyValue {
    __typename
    key
    string
  }`,
);
export type StringKeyValue = FragmentOf<typeof StringKeyValueFragment>;

const BooleanKeyValueFragment = graphql(
  `fragment BooleanKeyValue on BooleanKeyValue {
    __typename
    key
    boolean
  }`,
);
export type BooleanKeyValue = FragmentOf<typeof BooleanKeyValueFragment>;

export const RawKeyValueFragment = graphql(
  `fragment RawKeyValue on RawKeyValue {
    __typename
    key
    data
  }`,
);
export type RawKeyValue = FragmentOf<typeof RawKeyValueFragment>;

const BigDecimalKeyValueFragment = graphql(
  `fragment BigDecimalKeyValue on BigDecimalKeyValue {
    __typename
    key
    bigDecimal
  }`,
);
export type BigDecimalKeyValue = FragmentOf<typeof BigDecimalKeyValueFragment>;

const PrimitiveDataFragment = graphql(
  `fragment PrimitiveData on PrimitiveData {
    ...on IntKeyValue {
      ...IntKeyValue
    }
    ...on IntNullableKeyValue {
      ...IntNullableKeyValue
    }
    ...on AddressKeyValue {
      ...AddressKeyValue
    }
    ...on StringKeyValue {
      ...StringKeyValue
    }
    ...on BooleanKeyValue {
      ...BooleanKeyValue
    }
    ...on RawKeyValue {
      ...RawKeyValue
    }
    ...on BigDecimalKeyValue {
      ...BigDecimalKeyValue
    }
  }`,
  [
    IntKeyValueFragment,
    IntNullableKeyValueFragment,
    AddressKeyValueFragment,
    StringKeyValueFragment,
    BooleanKeyValueFragment,
    RawKeyValueFragment,
    BigDecimalKeyValueFragment,
  ],
);
export type PrimitiveData =
  | IntKeyValue
  | IntNullableKeyValue
  | AddressKeyValue
  | StringKeyValue
  | BooleanKeyValue
  | RawKeyValue
  | BigDecimalKeyValue;

const DictionaryKeyValueFragment = graphql(
  `fragment DictionaryKeyValue on DictionaryKeyValue {
    __typename
    key
    dictionary {
      ...PrimitiveData
    }
  }`,
  [PrimitiveDataFragment],
);
export type DictionaryKeyValue = FragmentOf<typeof DictionaryKeyValueFragment>;

const ArrayDataFragment = graphql(
  `fragment ArrayData on ArrayData {
    ...on IntKeyValue {
      ...IntKeyValue
    }
    ...on IntNullableKeyValue {
      ...IntNullableKeyValue
    }
    ...on AddressKeyValue {
      ...AddressKeyValue
    }
    ...on StringKeyValue {
      ...StringKeyValue
    }
    ...on BooleanKeyValue {
      ...BooleanKeyValue
    }
    ...on RawKeyValue {
      ...RawKeyValue
    }
    ...on BigDecimalKeyValue {
      ...BigDecimalKeyValue
    }
    ...on DictionaryKeyValue {
      ...DictionaryKeyValue
    }
  }`,
  [
    IntKeyValueFragment,
    IntNullableKeyValueFragment,
    AddressKeyValueFragment,
    StringKeyValueFragment,
    BooleanKeyValueFragment,
    RawKeyValueFragment,
    BigDecimalKeyValueFragment,
    DictionaryKeyValueFragment,
  ],
);
export type ArrayData =
  | IntKeyValue
  | IntNullableKeyValue
  | AddressKeyValue
  | StringKeyValue
  | BooleanKeyValue
  | RawKeyValue
  | BigDecimalKeyValue
  | DictionaryKeyValue;

const ArrayKeyValueFragment = graphql(
  `fragment ArrayKeyValue on ArrayKeyValue {
    __typename
    key
    array {
      ...ArrayData
    }
  }`,
  [ArrayDataFragment],
);
export type ArrayKeyValue = FragmentOf<typeof ArrayKeyValueFragment>;

export const AnyKeyValueFragment = graphql(
  `fragment AnyKeyValue on AnyKeyValue {
    ...on IntKeyValue {
      ...IntKeyValue
    }
    ...on IntNullableKeyValue {
      ...IntNullableKeyValue
    }
    ...on AddressKeyValue {
      ...AddressKeyValue
    }
    ...on StringKeyValue {
      ...StringKeyValue
    }
    ...on BooleanKeyValue {
      ...BooleanKeyValue
    }
    ...on RawKeyValue {
      ...RawKeyValue
    }
    ...on BigDecimalKeyValue {
      ...BigDecimalKeyValue
    }
    ...on DictionaryKeyValue {
      ...DictionaryKeyValue
    }
    ...on ArrayKeyValue {
      ...ArrayKeyValue
    }
  }`,
  [
    IntKeyValueFragment,
    IntNullableKeyValueFragment,
    AddressKeyValueFragment,
    StringKeyValueFragment,
    BooleanKeyValueFragment,
    RawKeyValueFragment,
    BigDecimalKeyValueFragment,
    DictionaryKeyValueFragment,
    ArrayKeyValueFragment,
  ],
);
export type AnyKeyValue =
  | IntKeyValue
  | IntNullableKeyValue
  | AddressKeyValue
  | StringKeyValue
  | BooleanKeyValue
  | RawKeyValue
  | BigDecimalKeyValue
  | DictionaryKeyValue
  | ArrayKeyValue;

export const KeyValuePairFragment = graphql(
  `fragment KeyValuePair on KeyValuePair {
    __typename
    key
    name
    type
  }`,
);
export type KeyValuePair = FragmentOf<typeof KeyValuePairFragment>;

export const ActionMetadataFragment = graphql(
  `fragment ActionMetadata on ActionMetadata {
    __typename
    id
    name
    source
    authors
    configureParams {
      ...KeyValuePair
    }
    description
    executeParams {
      ...KeyValuePair
    }
    setDisabledParams {
      ...KeyValuePair
    }
  }`,
  [KeyValuePairFragment],
);
export interface ActionMetadata extends FragmentOf<typeof ActionMetadataFragment> {}

export const UnknownPostActionFragment = graphql(
  `fragment UnknownPostAction on UnknownPostAction {
    __typename
    address
    config {
      ...AnyKeyValue
    }
    metadata {
      ...ActionMetadata
    }
  }`,
  [AnyKeyValueFragment, ActionMetadataFragment],
);
export type UnknownPostAction = FragmentOf<typeof UnknownPostActionFragment>;

export const FollowerOnFragment = graphql(
  `fragment FollowerOn on FollowerOn {
    __typename
    globalGraph
    graph
  }`,
);
export type FollowerOn = FragmentOf<typeof FollowerOnFragment>;

export const NetworkAddressFragment = graphql(
  `fragment NetworkAddress on NetworkAddress {
    __typename
    address
    chainId
  }`,
);
export type NetworkAddress = FragmentOf<typeof NetworkAddressFragment>;

export const Erc20Fragment = graphql(
  `fragment Erc20 on Erc20 {
    __typename
    name
    symbol
    decimals
    contract {
      ...NetworkAddress
    }
  }`,
  [NetworkAddressFragment],
);
export type Erc20 = FragmentOf<typeof Erc20Fragment>;

export const Erc20AmountFragment = graphql(
  `fragment Erc20Amount on Erc20Amount {
    __typename
    asset {
      ...Erc20
    }
    value
  }`,
  [Erc20Fragment],
);
export type Erc20Amount = FragmentOf<typeof Erc20AmountFragment>;

export const NativeTokenFragment = graphql(
  `fragment NativeToken on NativeToken {
    __typename
    name
    symbol
    decimals
    contract {
      ...NetworkAddress
    }
  }`,
  [NetworkAddressFragment],
);
export type NativeToken = FragmentOf<typeof NativeTokenFragment>;

export const NativeAmountFragment = graphql(
  `fragment NativeAmount on NativeAmount {
    __typename
    asset {
      ...NativeToken
    }
    value
  }`,
  [NativeTokenFragment],
);
export type NativeAmount = FragmentOf<typeof NativeAmountFragment>;

export const PayableAmountFragment = graphql(
  `fragment PayableAmount on PayableAmount {
    ...on Erc20Amount {
      ...Erc20Amount
    }
    ...on NativeAmount {
      ...NativeAmount
    }
  }`,
  [Erc20AmountFragment, NativeAmountFragment],
);
export type PayableAmount = FragmentOf<typeof PayableAmountFragment>;
