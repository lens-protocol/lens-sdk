import type { FragmentOf } from 'gql.tada';
import {
  Erc20AmountFragment,
  NativeAmountFragment,
  SelfFundedTransactionRequestFragment,
  SponsoredTransactionRequestFragment,
  TransactionWillFailFragment,
} from './fragments';
import { graphql, type RequestOf } from './graphql';

const Erc20BalanceErrorFragment = graphql(
  `fragment Erc20BalanceError on Erc20BalanceError {
    __typename
    reason
    token
  }`,
);
export type Erc20BalanceError = FragmentOf<typeof Erc20BalanceErrorFragment>;
const NativeBalanceErrorFragment = graphql(
  `fragment NativeBalanceError on NativeBalanceError {
    __typename
    reason
  }`,
);
export type NativeBalanceError = FragmentOf<typeof NativeBalanceErrorFragment>;

const AnyAccountBalanceFragment = graphql(
  `fragment AnyAccountBalance on AnyAccountBalance {
    __typename
    ...on Erc20Amount {
      ...Erc20Amount
    }
    ...on NativeAmount {
      ...NativeAmount
    }
    ...on Erc20BalanceError {
      ...Erc20BalanceError
    }
    ...on NativeBalanceError {
      ...NativeBalanceError
    }
  }`,
  [
    Erc20AmountFragment,
    NativeAmountFragment,
    Erc20BalanceErrorFragment,
    NativeBalanceErrorFragment,
  ],
);
export type AnyAccountBalance = FragmentOf<typeof AnyAccountBalanceFragment>;

export const AccountBalancesQuery = graphql(
  `query AccountBalances($request: AccountBalancesRequest!) {
    value: accountBalances(request: $request) {
      ...AnyAccountBalance
    }
  }`,
  [AnyAccountBalanceFragment],
);
export type AccountBalancesRequest = RequestOf<typeof AccountBalancesQuery>;

export const InsufficientFundsFragment = graphql(`
  fragment InsufficientFunds on InsufficientFunds {
    __typename
    reason
  }
`);
export type InsufficientFunds = FragmentOf<typeof InsufficientFundsFragment>;

export const SignerErc20ApprovalRequiredFragment = graphql(
  `fragment SignerErc20ApprovalRequired on SignerErc20ApprovalRequired {
    __typename
    reason
    amount {
      ...Erc20Amount
    }
  }
`,
  [Erc20AmountFragment],
);
export type SignerErc20ApprovalRequired = FragmentOf<
  typeof SignerErc20ApprovalRequiredFragment
>;

const WithdrawResultFragment = graphql(
  `fragment WithdrawResult on WithdrawResult{
    ...on SponsoredTransactionRequest {
      ...SponsoredTransactionRequest
    }
    ...on SelfFundedTransactionRequest {
      ...SelfFundedTransactionRequest
    }
    ...on InsufficientFunds {
      ...InsufficientFunds
    }
    ...on TransactionWillFail {
      ...TransactionWillFail
    }
  }`,
  [
    SelfFundedTransactionRequestFragment,
    SponsoredTransactionRequestFragment,
    InsufficientFundsFragment,
    TransactionWillFailFragment,
  ],
);
export type WithdrawResult = FragmentOf<typeof WithdrawResultFragment>;

export const WithdrawMutation = graphql(
  `mutation Withdraw($request: WithdrawRequest!) {
    value: withdraw(request: $request) {
      ...WithdrawResult
    }
  }`,
  [WithdrawResultFragment],
);
export type WithdrawRequest = RequestOf<typeof WithdrawMutation>;

const DepositResultFragment = graphql(
  `fragment DepositResult on DepositResult{
    ...on SponsoredTransactionRequest {
      ...SponsoredTransactionRequest
    }
    ...on SelfFundedTransactionRequest {
      ...SelfFundedTransactionRequest
    }
    ...on InsufficientFunds {
      ...InsufficientFunds
    }
    ...on TransactionWillFail {
      ...TransactionWillFail
    }
  }`,
  [
    SelfFundedTransactionRequestFragment,
    SponsoredTransactionRequestFragment,
    InsufficientFundsFragment,
    TransactionWillFailFragment,
  ],
);
export type DepositResult = FragmentOf<typeof DepositResultFragment>;

export const DepositMutation = graphql(
  `mutation Deposit($request: DepositRequest!) {
    value: deposit(request: $request) {
      ...DepositResult
    }
  }`,
  [DepositResultFragment],
);
export type DepositRequest = RequestOf<typeof DepositMutation>;

const WrapTokensResultFragment = graphql(
  `fragment WrapTokensResult on WrapTokensResult{
    ...on SponsoredTransactionRequest {
      ...SponsoredTransactionRequest
    }
    ...on SelfFundedTransactionRequest {
      ...SelfFundedTransactionRequest
    }
    ...on InsufficientFunds {
      ...InsufficientFunds
    }
    ...on TransactionWillFail {
      ...TransactionWillFail
    }
  }`,
  [
    SelfFundedTransactionRequestFragment,
    SponsoredTransactionRequestFragment,
    InsufficientFundsFragment,
    TransactionWillFailFragment,
  ],
);
export type WrapTokensResult = FragmentOf<typeof WrapTokensResultFragment>;

export const WrapTokensMutation = graphql(
  `mutation WrapTokens($request: WrapTokensRequest!) {
    value: wrapTokens(request: $request) {
      ...WrapTokensResult
    }
  }`,
  [WrapTokensResultFragment],
);
export type WrapTokensRequest = RequestOf<typeof WrapTokensMutation>;

const UnwrapTokensResultFragment = graphql(
  `fragment UnwrapTokensResult on UnwrapTokensResult{
    ...on SponsoredTransactionRequest {
      ...SponsoredTransactionRequest
    }
    ...on SelfFundedTransactionRequest {
      ...SelfFundedTransactionRequest
    }
    ...on InsufficientFunds {
      ...InsufficientFunds
    }
    ...on TransactionWillFail {
      ...TransactionWillFail
    }
  }`,
  [
    SelfFundedTransactionRequestFragment,
    SponsoredTransactionRequestFragment,
    InsufficientFundsFragment,
    TransactionWillFailFragment,
  ],
);
export type UnwrapTokensResult = FragmentOf<typeof UnwrapTokensResultFragment>;

export const UnwrapTokensMutation = graphql(
  `mutation UnwrapTokens($request: UnwrapTokensRequest!) {
    value: unwrapTokens(request: $request) {
      ...UnwrapTokensResult
    }
  }`,
  [UnwrapTokensResultFragment],
);
export type UnwrapTokensRequest = RequestOf<typeof UnwrapTokensMutation>;

export const AnyBalanceFragment = graphql(
  `fragment AnyBalance on AnyBalance {
    __typename
    ...on Erc20Amount {
      ...Erc20Amount
    }
    ...on NativeAmount {
      ...NativeAmount
    }
    ...on Erc20BalanceError {
      ...Erc20BalanceError
    }
    ...on NativeBalanceError {
      ...NativeBalanceError
    }
  }`,
  [
    Erc20AmountFragment,
    NativeAmountFragment,
    Erc20BalanceErrorFragment,
    NativeBalanceErrorFragment,
  ],
);
export type AnyBalance = FragmentOf<typeof AnyBalanceFragment>;

export const BalancesBulkQuery = graphql(
  `query BalancesBulk($request: BalancesBulkRequest!) {
    value: balancesBulk(request: $request) {
      ...AnyBalance
    }
  }`,
  [AnyBalanceFragment],
);
export type BalancesBulkRequest = RequestOf<typeof BalancesBulkQuery>;
