import type { FragmentOf } from 'gql.tada';
import { graphql } from '../graphql';

const Eip712TransactionRequest = graphql(
  `fragment Eip712TransactionRequest on Eip712TransactionRequest {
    __typename
    type
    to
    from
    nonce
    gasLimit
    gasPrice
    data
    value
    chainId
    customData {
      gasPerPubdata
      factoryDeps
      customSignature
      paymasterParams {
        paymaster
        paymasterInput
      }
    }
  }`,
);
export type Eip712TransactionRequest = FragmentOf<typeof Eip712TransactionRequest>;

export const SponsoredTransactionRequest = graphql(
  `fragment SponsoredTransactionRequest on SponsoredTransactionRequest {
    __typename
    reason
    sponsoredReason
    raw {
      ...Eip712TransactionRequest
    }
  }`,
  [Eip712TransactionRequest],
);
export type SponsoredTransactionRequest = FragmentOf<typeof SponsoredTransactionRequest>;
