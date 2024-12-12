import type { FragmentOf } from 'gql.tada';
import {
  AccountManager,
  PaginatedResultInfoFragment,
  SelfFundedTransactionRequest,
  SponsoredTransactionRequest,
  TransactionWillFail,
} from '../fragments';
import { type RequestOf, graphql } from '../graphql';

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
  [AccountManager, PaginatedResultInfoFragment],
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

const UpdateAccountManagerResult = graphql(
  `fragment UpdateAccountManagerResult on UpdateAccountManagerResult{
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
export type UpdateAccountManagerResult = FragmentOf<typeof UpdateAccountManagerResult>;

export const UpdateAccountManagerMutation = graphql(
  `mutation RemoveAccountManager($request: UpdateAccountManagerRequest!) {
    value: updateAccountManager(request: $request) {
      ...UpdateAccountManagerResult
    }
  }`,
  [UpdateAccountManagerResult],
);
export type UpdateAccountManagerRequest = RequestOf<typeof UpdateAccountManagerMutation>;

export const HideManagedAccountMutation = graphql(
  `mutation HideManagedAccount($request: HideManagedAccountRequest!) {
    value: hideManagedAccount(request: $request)
  }`,
);
export type HideManagedAccountRequest = RequestOf<typeof HideManagedAccountMutation>;

export const UnhideManagedAccountMutation = graphql(
  `mutation UnhideManagedAccount($request: UnhideManagedAccountRequest!) {
    value: unhideManagedAccount(request: $request)
  }`,
);
export type UnhideManagedAccountRequest = RequestOf<typeof UnhideManagedAccountMutation>;
