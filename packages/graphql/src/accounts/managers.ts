import type { FragmentOf } from 'gql.tada';
import {
  PaginatedResultInfo,
  SelfFundedTransactionRequest,
  SponsoredTransactionRequest,
  TransactionWillFail,
} from '../fragments';
import { type RequestOf, graphql } from '../graphql';

const AccountManager = graphql(
  `fragment AccountManager on AccountManager {
    __typename
    addedAt
    manager
    isLensManager
    permissions {
      canExecuteTransactions
      canSetMetadataUri
      canTransferNative
      canTransferTokens
    }
  }`,
);
export type AccountManager = FragmentOf<typeof AccountManager>;

export const AccountManagersQuery = graphql(
  `query AccountManagers($request: AccountManagersRequest!) {
    value: accountManagers(request: $request) {
      items {
        ...AccountManager
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }`,
  [AccountManager, PaginatedResultInfo],
);

export type AccountManagersRequest = RequestOf<typeof AccountManagersQuery>;

const AddAccountManagerResult = graphql(
  `fragment AddAccountManagerResult on AddAccountManagerResult{
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
  [SelfFundedTransactionRequest, SponsoredTransactionRequest, TransactionWillFail],
);
export type AddAccountManagerResult = FragmentOf<typeof AddAccountManagerResult>;

export const AddAccountManagerMutation = graphql(
  `mutation AddAccountManager($request: AddAccountManagerRequest!) {
    value: addAccountManager(request: $request) {
      ...AddAccountManagerResult
    }
  }`,
  [AddAccountManagerResult],
);
export type AddAccountManagerRequest = RequestOf<typeof AddAccountManagerMutation>;

const RemoveAccountManagerResult = graphql(
  `fragment RemoveAccountManagerResult on RemoveAccountManagerResult{
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
  [SelfFundedTransactionRequest, SponsoredTransactionRequest, TransactionWillFail],
);
export type RemoveAccountManagerResult = FragmentOf<typeof RemoveAccountManagerResult>;

export const RemoveAccountManagerMutation = graphql(
  `mutation RemoveAccountManager($request: RemoveAccountManagerRequest!) {
    value: removeAccountManager(request: $request) {
      ...RemoveAccountManagerResult
    }
  }`,
  [RemoveAccountManagerResult],
);
export type RemoveAccountManagerRequest = RequestOf<typeof RemoveAccountManagerMutation>;
