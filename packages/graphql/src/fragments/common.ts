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
    value
  }`,
);
export type IntKeyValue = FragmentOf<typeof IntKeyValueFragment>;

const IntNullableKeyValueFragment = graphql(
  `fragment IntNullableKeyValue on IntNullableKeyValue {
    __typename
    key
    value
  }`,
);
export type IntNullableKeyValue = FragmentOf<typeof IntNullableKeyValueFragment>;

const AddressKeyValueFragment = graphql(
  `fragment AddressKeyValue on AddressKeyValue {
    __typename
    key
    value 
  }`,
);
export type AddressKeyValue = FragmentOf<typeof AddressKeyValueFragment>;

const StringKeyValueFragment = graphql(
  `fragment StringKeyValue on StringKeyValue {
    __typename
    key
    value
  }`,
);
export type StringKeyValue = FragmentOf<typeof StringKeyValueFragment>;

const BooleanKeyValueFragment = graphql(
  `fragment BooleanKeyValue on BooleanKeyValue {
    __typename
    key
    value
  }`,
);
export type BooleanKeyValue = FragmentOf<typeof BooleanKeyValueFragment>;

const RawKeyValueFragment = graphql(
  `fragment RawKeyValue on RawKeyValue {
    __typename
    key
    value
  }`,
);
export type RawKeyValue = FragmentOf<typeof RawKeyValueFragment>;

const BigDecimalKeyValueFragment = graphql(
  `fragment BigDecimalKeyValue on BigDecimalKeyValue {
    __typename
    key
    value
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
    value {
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
    value {
      ...ArrayData
    }
  }`,
  [ArrayDataFragment],
);
export type ArrayKeyValue = FragmentOf<typeof ArrayKeyValueFragment>;

export const ExtraDataFragment = graphql(
  `fragment ExtraData on ExtraData {
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
export type ExtraData =
  | IntKeyValue
  | IntNullableKeyValue
  | AddressKeyValue
  | StringKeyValue
  | BooleanKeyValue
  | RawKeyValue
  | BigDecimalKeyValue
  | DictionaryKeyValue
  | ArrayKeyValue;

export const UnknownActionFragment = graphql(
  `fragment UnknownAction on UnknownAction {
    __typename
    actionAddress
  }`,
);
export type UnknownAction = FragmentOf<typeof UnknownActionFragment>;
