import type { FragmentOf } from 'gql.tada';
import { graphql } from '../graphql';

export const BooleanValue = graphql(
  `fragment BooleanValue on BooleanValue {
    __typename
    optimistic
    onChain
  }`,
);
export type BooleanValue = FragmentOf<typeof BooleanValue>;

export const NetworkAddress = graphql(
  `fragment NetworkAddress on NetworkAddress {
    __typename
    address
    chainId
  }`,
);
export type NetworkAddress = FragmentOf<typeof NetworkAddress>;

export const Erc20 = graphql(
  `fragment Erc20 on Erc20 {
    __typename
    name
    symbol
    decimals
    contract {
      ...NetworkAddress
    }
  }`,
  [NetworkAddress],
);
export type Erc20 = FragmentOf<typeof Erc20>;

export const Asset = graphql(
  `fragment Asset on Asset {
    ...on Erc20 {
      ...Erc20
    }
  }`,
  [Erc20],
);
export type Asset = FragmentOf<typeof Asset>;

export const Amount = graphql(
  `fragment Amount on Amount {
    __typename
    asset {
      ...Asset
    }
    value
  }`,
  [Asset],
);
export type Amount = FragmentOf<typeof Amount>;

export const ActionInputInfo = graphql(
  `fragment ActionInputInfo on ActionInputInfo {
    __typename
    type
    name
  }`,
);
export type ActionInputInfo = FragmentOf<typeof ActionInputInfo>;
