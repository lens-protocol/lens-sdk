import type { FragmentOf } from 'gql.tada';
import {
  SelfFundedTransactionRequestFragment,
  SponsoredTransactionRequestFragment,
  TransactionWillFailFragment,
} from './fragments';
import { type RequestOf, graphql } from './graphql';

const TransferPrimitiveOwnershipResultFragment = graphql(
  `fragment TransferPrimitiveOwnershipResult on TransferPrimitiveOwnershipResult {
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
export type TransferPrimitiveOwnershipResult = FragmentOf<
  typeof TransferPrimitiveOwnershipResultFragment
>;

export const TransferPrimitiveOwnershipMutation = graphql(
  `mutation TransferPrimitiveOwnership($request: TransferPrimitiveOwnershipRequest!) {
    value: transferPrimitiveOwnership(request: $request) {
      ...TransferPrimitiveOwnershipResult
    }
  }`,
  [TransferPrimitiveOwnershipResultFragment],
);
export type TransferPrimitiveOwnershipRequest = RequestOf<
  typeof TransferPrimitiveOwnershipMutation
>;
