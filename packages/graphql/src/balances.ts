import type { FragmentOf } from 'gql.tada';
import {
  type Erc20Amount,
  Erc20AmountFragment,
  type NativeAmount,
  NativeAmountFragment,
  SelfFundedTransactionRequestFragment,
  SponsoredTransactionRequestFragment,
  TransactionWillFailFragment,
} from './fragments';
import { type RequestOf, graphql } from './graphql';

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
export type AnyAccountBalance = Erc20Amount | NativeAmount | Erc20BalanceError | NativeBalanceError;

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
  `mutation Withdraw ($request: WithdrawRequest!) {
    value: withdraw(request: $request) {
      ...WithdrawResult
    }
  }`,
  [WithdrawResultFragment],
);
export type WithdrawRequest = RequestOf<typeof WithdrawMutation>;
