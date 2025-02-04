import type { FragmentOf } from 'gql.tada';
import { graphql } from '../graphql';

export const TransactionWillFailFragment = graphql(`
  fragment TransactionWillFail on TransactionWillFail {
    __typename
    reason
  }
`);
export type TransactionWillFail = FragmentOf<typeof TransactionWillFailFragment>;

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

const Eip712TransactionRequestFragment = graphql(
  `fragment Eip712TransactionRequest on Eip712TransactionRequest {
    __typename
    type
    to
    from
    nonce
    gasLimit
    maxFeePerGas
    maxPriorityFeePerGas
    data
    value
    chainId
    customData {
      __typename
      gasPerPubdata
      factoryDeps
      customSignature
      paymasterParams {
        __typename
        paymaster
        paymasterInput
      }
    }
  }`,
);
export type Eip712TransactionRequest = FragmentOf<typeof Eip712TransactionRequestFragment>;

export const SponsoredTransactionRequestFragment = graphql(
  `fragment SponsoredTransactionRequest on SponsoredTransactionRequest {
    __typename
    reason
    sponsoredReason
    raw {
      ...Eip712TransactionRequest
    }
  }`,
  [Eip712TransactionRequestFragment],
);
export type SponsoredTransactionRequest = FragmentOf<typeof SponsoredTransactionRequestFragment>;
