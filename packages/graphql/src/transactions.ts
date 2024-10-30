import type { FragmentOf, VariablesOf } from 'gql.tada';
import { graphql } from './graphql';

export const PendingTransactionStatus = graphql(
  `fragment PendingTransactionStatus on PendingTransactionStatus {
    __typename
    blockTimestamp
  }`,
);
export type PendingTransactionStatus = FragmentOf<typeof PendingTransactionStatus>;

export const FinishedTransactionStatus = graphql(
  `fragment FinishedTransactionStatus on FinishedTransactionStatus {
    __typename
    blockTimestamp
  }`,
);
export type FinishedTransactionStatus = FragmentOf<typeof FinishedTransactionStatus>;

export const FailedTransactionStatus = graphql(
  `fragment FailedTransactionStatus on FailedTransactionStatus {
    __typename
    blockTimestamp
    reason
  }`,
);
export type FailedTransactionStatus = FragmentOf<typeof FailedTransactionStatus>;

export const NotFoundTransaction = graphql(
  `fragment NotFoundTransaction on NotFoundTransaction {
    __typename
    reason
  }`,
);
export type NotFoundTransaction = FragmentOf<typeof NotFoundTransaction>;

export const TransactionStatusResult = graphql(
  `fragment TransactionStatusResult on TransactionStatusResult {
    ...on PendingTransactionStatus {
      ...PendingTransactionStatus
    }
    ...on FinishedTransactionStatus {
      ...FinishedTransactionStatus
    }
    ...on FailedTransactionStatus {
      ...FailedTransactionStatus
    }
    ...on NotFoundTransaction {
      ...NotFoundTransaction
    }
  }`,
  [
    PendingTransactionStatus,
    FinishedTransactionStatus,
    FailedTransactionStatus,
    NotFoundTransaction,
  ],
);
export type TransactionStatusResult = FragmentOf<typeof TransactionStatusResult>;

export const TransactionStatusQuery = graphql(
  `query TransactionStatus($request: TransactionStatusRequest!) {
    value: transactionStatus(request: $request) {
      ...TransactionStatusResult
    }
  }`,
  [TransactionStatusResult],
);

export type TransactionStatusVariables = VariablesOf<typeof TransactionStatusQuery>;
