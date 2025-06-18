import type { FragmentOf } from 'gql.tada';
import {
  AccountManagerFragment,
  PaginatedResultInfoFragment,
  SelfFundedTransactionRequestFragment,
  SponsoredTransactionRequestFragment,
  TransactionWillFailFragment,
} from '../fragments';
import { graphql, type RequestOf } from '../graphql';

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
  [AccountManagerFragment, PaginatedResultInfoFragment],
);

export type AccountManagersRequest = RequestOf<typeof AccountManagersQuery>;

const AddAccountManagerResultFragment = graphql(
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
  [
    SelfFundedTransactionRequestFragment,
    SponsoredTransactionRequestFragment,
    TransactionWillFailFragment,
  ],
);
export type AddAccountManagerResult = FragmentOf<
  typeof AddAccountManagerResultFragment
>;

export const AddAccountManagerMutation = graphql(
  `mutation AddAccountManager($request: AddAccountManagerRequest!) {
    value: addAccountManager(request: $request) {
      ...AddAccountManagerResult
    }
  }`,
  [AddAccountManagerResultFragment],
);
export type AddAccountManagerRequest = RequestOf<
  typeof AddAccountManagerMutation
>;

const RemoveAccountManagerResultFragment = graphql(
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
  [
    SelfFundedTransactionRequestFragment,
    SponsoredTransactionRequestFragment,
    TransactionWillFailFragment,
  ],
);
export type RemoveAccountManagerResult = FragmentOf<
  typeof RemoveAccountManagerResultFragment
>;

export const RemoveAccountManagerMutation = graphql(
  `mutation RemoveAccountManager($request: RemoveAccountManagerRequest!) {
    value: removeAccountManager(request: $request) {
      ...RemoveAccountManagerResult
    }
  }`,
  [RemoveAccountManagerResultFragment],
);
export type RemoveAccountManagerRequest = RequestOf<
  typeof RemoveAccountManagerMutation
>;

const UpdateAccountManagerResultFragment = graphql(
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
  [
    SelfFundedTransactionRequestFragment,
    SponsoredTransactionRequestFragment,
    TransactionWillFailFragment,
  ],
);
export type UpdateAccountManagerResult = FragmentOf<
  typeof UpdateAccountManagerResultFragment
>;

export const UpdateAccountManagerMutation = graphql(
  `mutation RemoveAccountManager($request: UpdateAccountManagerRequest!) {
    value: updateAccountManager(request: $request) {
      ...UpdateAccountManagerResult
    }
  }`,
  [UpdateAccountManagerResultFragment],
);
export type UpdateAccountManagerRequest = RequestOf<
  typeof UpdateAccountManagerMutation
>;

export const HideManagedAccountMutation = graphql(
  `mutation HideManagedAccount($request: HideManagedAccountRequest!) {
    value: hideManagedAccount(request: $request)
  }`,
);
export type HideManagedAccountRequest = RequestOf<
  typeof HideManagedAccountMutation
>;

export const UnhideManagedAccountMutation = graphql(
  `mutation UnhideManagedAccount($request: UnhideManagedAccountRequest!) {
    value: unhideManagedAccount(request: $request)
  }`,
);
export type UnhideManagedAccountRequest = RequestOf<
  typeof UnhideManagedAccountMutation
>;
