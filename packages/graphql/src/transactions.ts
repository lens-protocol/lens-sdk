import type { FragmentOf } from 'gql.tada';
import { type RequestOf, graphql } from './graphql';

const SubOperationStatusFragment = graphql(
  `fragment SubOperationStatus on SubOperationStatus {
    __typename
    operation
    status
  }`,
);
export type SubOperationStatus = FragmentOf<typeof SubOperationStatusFragment>;

const PendingTransactionStatusFragment = graphql(
  `fragment PendingTransactionStatus on PendingTransactionStatus {
    __typename
    blockTimestamp
    summary {
      ...SubOperationStatus
    }
  }`,
  [SubOperationStatusFragment],
);
export type PendingTransactionStatus = FragmentOf<typeof PendingTransactionStatusFragment>;

const FinishedTransactionStatusFragment = graphql(
  `fragment FinishedTransactionStatus on FinishedTransactionStatus {
    __typename
    blockTimestamp
    summary {
      ...SubOperationStatus
    }
  }`,
  [SubOperationStatusFragment],
);
export type FinishedTransactionStatus = FragmentOf<typeof FinishedTransactionStatusFragment>;

const FailedTransactionStatusFragment = graphql(
  `fragment FailedTransactionStatus on FailedTransactionStatus {
    __typename
    blockTimestamp
    reason
    summary {
      ...SubOperationStatus
    }
  }`,
  [SubOperationStatusFragment],
);
export type FailedTransactionStatus = FragmentOf<typeof FailedTransactionStatusFragment>;

const NotIndexedYetStatusFragment = graphql(
  `fragment NotIndexedYetStatus on NotIndexedYetStatus {
    __typename
    reason
    txHasMined
  }`,
);
export type NotIndexedYetStatus = FragmentOf<typeof NotIndexedYetStatusFragment>;

const TransactionStatusResultFragment = graphql(
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
    ...on NotIndexedYetStatus {
      ...NotIndexedYetStatus
    }
  }`,
  [
    PendingTransactionStatusFragment,
    FinishedTransactionStatusFragment,
    FailedTransactionStatusFragment,
    NotIndexedYetStatusFragment,
  ],
);
export type TransactionStatusResult = FragmentOf<typeof TransactionStatusResultFragment>;

export const TransactionStatusQuery = graphql(
  `query TransactionStatus($request: TransactionStatusRequest!) {
    value: transactionStatus(request: $request) {
      ...TransactionStatusResult
    }
  }`,
  [TransactionStatusResultFragment],
);

export type TransactionStatusRequest = RequestOf<typeof TransactionStatusQuery>;
