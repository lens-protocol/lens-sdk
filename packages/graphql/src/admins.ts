import type { FragmentOf } from 'gql.tada';
import {
  AccountFragment,
  PaginatedResultInfoFragment,
  SelfFundedTransactionRequestFragment,
  SponsoredTransactionRequestFragment,
  TransactionWillFailFragment,
} from './fragments';
import { type RequestOf, graphql } from './graphql';

const AddAdminsResultFragment = graphql(
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
  [
    SponsoredTransactionRequestFragment,
    SelfFundedTransactionRequestFragment,
    TransactionWillFailFragment,
  ],
);
export type AddAdminsResult = FragmentOf<typeof AddAdminsResultFragment>;

export const AddAdminsMutation = graphql(
  `mutation AddAdmins($request: AddAdminsRequest!) {
    value: addAdmins(request: $request) {
      ...AddAdminsResult
    }
  }`,
  [AddAdminsResultFragment],
);
export type AddAdminsRequest = RequestOf<typeof AddAdminsMutation>;

const RemoveAdminsResultFragment = graphql(
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
  [
    SponsoredTransactionRequestFragment,
    SelfFundedTransactionRequestFragment,
    TransactionWillFailFragment,
  ],
);
export type RemoveAdminsResult = FragmentOf<typeof RemoveAdminsResultFragment>;

export const RemoveAdminsMutation = graphql(
  `mutation RemoveAdmins($request: RemoveAdminsRequest!) {
    value: removeAdmins(request: $request) {
      ...RemoveAdminsResult
    }
  }`,
  [RemoveAdminsResultFragment],
);
export type RemoveAdminsRequest = RequestOf<typeof RemoveAdminsMutation>;

export const AdminFragment = graphql(
  `fragment Admin on Admin {
    __typename
    account {
      ...Account
    }
    addedAt
  }`,
  [AccountFragment],
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
