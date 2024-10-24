import type { FragmentOf, VariablesOf } from 'gql.tada';
import { graphql } from './graphql';

const PostResponse = graphql(`
  fragment PostResponse on PostResponse {
    __typename
    hash
  }
`);
export type PostResponse = FragmentOf<typeof PostResponse>;

const Eip712TransactionRequest = graphql(`
  fragment Eip712TransactionRequest on Eip712TransactionRequest {
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
  }
`);
export type Eip712TransactionRequest = FragmentOf<typeof Eip712TransactionRequest>;

const SponsoredTransactionRequest = graphql(
  `
  fragment SponsoredTransactionRequest on SponsoredTransactionRequest {
    __typename
    encoded
    raw {
      ...Eip712TransactionRequest
    }
  }
`,
  [Eip712TransactionRequest],
);
export type SponsoredTransactionRequest = FragmentOf<typeof SponsoredTransactionRequest>;

const Eip1559TransactionRequest = graphql(`
  fragment Eip1559TransactionRequest on Eip1559TransactionRequest {
    __typename
    type
    to
    nonce
    gasLimit
    maxPriorityFeePerGas
    maxFeePerGas
    data
    value
    chainId
  }
`);
export type Eip1559TransactionRequest = FragmentOf<typeof Eip1559TransactionRequest>;

const TransactionRequest = graphql(
  `
  fragment TransactionRequest on TransactionRequest {
    __typename
    encoded
    raw {
      ...Eip1559TransactionRequest
    }
  }
`,
  [Eip1559TransactionRequest],
);
export type TransactionRequest = FragmentOf<typeof TransactionRequest>;

const TransactionWillFail = graphql(`
  fragment TransactionWillFail on TransactionWillFail {
    __typename
    reason
  }
`);
export type TransactionWillFail = FragmentOf<typeof TransactionWillFail>;

const PostResult = graphql(
  `
  fragment PostResult on PostResult {
    ...on PostResponse {
      ...PostResponse
    }

    ...on SponsoredTransactionRequest {
      ...SponsoredTransactionRequest
    }

    ...on TransactionRequest {
      ...TransactionRequest
    }

    ...on TransactionWillFail {
      ...TransactionWillFail
    }
  }
`,
  [PostResponse, SponsoredTransactionRequest, TransactionRequest, TransactionWillFail],
);
export type PostResult = FragmentOf<typeof PostResult>;

export const PostMutation = graphql(
  `
  mutation Post($request: CreatePostRequest!) {
    value: post(request: $request) {
      ...PostResult
    }
  }
`,
  [PostResult],
);

export type PostVariables = VariablesOf<typeof PostMutation>;
