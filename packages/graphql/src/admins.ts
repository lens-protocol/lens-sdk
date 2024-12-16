import type { FragmentOf } from 'gql.tada';
import {
  PaginatedResultInfoFragment,
  SelfFundedTransactionRequest,
  SponsoredTransactionRequest,
  TransactionWillFail,
} from './fragments';
import { type RequestOf, graphql } from './graphql';

const AddAdminsResult = graphql(
  `fragment AddAdminsResult on AddAdminsResult {
    ...on SponsoredTransactionRequest {
      ...SponsoredTransactionRequest
    }
    ...on SelfFundedTransactionRequest {
      ...SelfFundedTransactionRequest
    }
    ...on TransactionWillFail {
      ...TransactionWillFail
    }
  }`,
  [SponsoredTransactionRequest, SelfFundedTransactionRequest, TransactionWillFail],
);
export type AddAdminsResult = FragmentOf<typeof AddAdminsResult>;

export const AddAdminsMutation = graphql(
  `mutation AddAdmins($request: AddAdminsRequest!) {
    value: addAdmins(request: $request) {
      ...AddAdminsResult
    }
  }`,
  [AddAdminsResult],
);
export type AddAdminsRequest = RequestOf<typeof AddAdminsMutation>;

const RemoveAdminsResult = graphql(
  `fragment RemoveAdminsResult on RemoveAdminsResult {
    ...on SponsoredTransactionRequest {
      ...SponsoredTransactionRequest
    }
    ...on SelfFundedTransactionRequest {
      ...SelfFundedTransactionRequest
    }
    ...on TransactionWillFail {
      ...TransactionWillFail
    }
  }`,
  [SponsoredTransactionRequest, SelfFundedTransactionRequest, TransactionWillFail],
);
export type RemoveAdminsResult = FragmentOf<typeof RemoveAdminsResult>;

export const RemoveAdminsMutation = graphql(
  `mutation RemoveAdmins($request: RemoveAdminsRequest!) {
    value: removeAdmins(request: $request) {
      ...RemoveAdminsResult
    }
  }`,
  [RemoveAdminsResult],
);
export type RemoveAdminsRequest = RequestOf<typeof RemoveAdminsMutation>;

export const AdminFragment = graphql(
  `fragment Admin on Admin {
    __typename
    address
    addedAt
  }`,
);
export type Admin = FragmentOf<typeof AdminFragment>;

export const AdminsForQuery = graphql(
  `query AdminsFor($request: AdminsForRequest!) {
    value: adminsFor(request: $request) {
      __typename
      items {
        ...Admin
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }`,
  [AdminFragment, PaginatedResultInfoFragment],
);
export type AdminsForRequest = RequestOf<typeof AdminsForQuery>;
