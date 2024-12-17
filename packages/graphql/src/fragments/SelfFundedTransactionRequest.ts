import type { FragmentOf } from 'gql.tada';
import { graphql } from '../graphql';

const Eip1559TransactionRequestFragment = graphql(
  `fragment Eip1559TransactionRequest on Eip1559TransactionRequest {
    __typename
    type
    from
    to
    nonce
    gasLimit
    maxPriorityFeePerGas
    maxFeePerGas
    data
    value
    chainId
  }`,
);
export type Eip1559TransactionRequest = FragmentOf<typeof Eip1559TransactionRequestFragment>;

export const SelfFundedTransactionRequestFragment = graphql(
  `fragment SelfFundedTransactionRequest on SelfFundedTransactionRequest {
    __typename
    reason
    selfFundedReason
    raw {
      ...Eip1559TransactionRequest
    }
  }`,
  [Eip1559TransactionRequestFragment],
);
export type SelfFundedTransactionRequest = FragmentOf<typeof SelfFundedTransactionRequestFragment>;
