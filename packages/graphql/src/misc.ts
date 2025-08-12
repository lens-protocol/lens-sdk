import type { FragmentOf } from 'gql.tada';
import {
  PaginatedResultInfoFragment,
  PayableAmountFragment,
} from './fragments';
import { graphql, type RequestOf } from './graphql';

export const HealthQuery = graphql(
  `query Health {
    value: health
  }`,
);

const AccessControlResultFragment = graphql(`
  fragment AccessControlResult on AccessControlResult {
    address
    createdAt
  }`);
export type AccessControlResult = FragmentOf<
  typeof AccessControlResultFragment
>;

export const AccessControlQuery = graphql(
  `query AccessControl($request: AccessControlRequest!) {
    value: accessControl(request: $request) {
      ...AccessControlResult
    }
  }`,
  [AccessControlResultFragment],
);
export type AccessControlRequest = RequestOf<typeof AccessControlQuery>;

export const TokenDistributionFragment = graphql(
  `
  fragment TokenDistribution on TokenDistribution {
    __typename
    amount {
      ...PayableAmount
    }
    txHash
    timestamp
  }`,
  [PayableAmountFragment],
);
export type TokenDistribution = FragmentOf<typeof TokenDistributionFragment>;

export const TokenDistributionsQuery = graphql(
  `query TokenDistributions($request: TokenDistributionsRequest!) {
    value: tokenDistributions(request: $request) {
      __typename
      items {
        ...TokenDistribution
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }`,
  [TokenDistributionFragment, PaginatedResultInfoFragment],
);
export type TokenDistributionsRequest = RequestOf<
  typeof TokenDistributionsQuery
>;
