import type { FragmentOf } from 'gql.tada';
import { graphql } from '../graphql';

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
