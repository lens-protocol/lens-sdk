import type { FragmentOf } from 'gql.tada';
import { SelfFundedTransactionRequest, TransactionWillFail } from './fragments';
import { type RequestOf, graphql } from './graphql';

const CreateGraphResponse = graphql(
  `fragment CreateGraphResponse on CreateGraphResponse {
    __typename
    hash
  }`,
);
export type CreateGraphResponse = FragmentOf<typeof CreateGraphResponse>;

const CreateGraphResult = graphql(
  `fragment CreateGraphResult on CreateGraphResult {
    ...on CreateGraphResponse {
      ...CreateGraphResponse
    }
    ...on SelfFundedTransactionRequest {
      ...SelfFundedTransactionRequest
    }
    ...on TransactionWillFail {
      ...TransactionWillFail
    }
  }`,
  [CreateGraphResponse, SelfFundedTransactionRequest, TransactionWillFail],
);
export type CreateGraphResult = FragmentOf<typeof CreateGraphResult>;

export const CreateGraphMutation = graphql(
  `mutation CreateGraph($request: CreateGraphRequest!) {
    value: createGraph(request: $request) {
      ...CreateGraphResult
    }
  }`,
  [CreateGraphResult],
);
export type CreateGraphRequest = RequestOf<typeof CreateGraphMutation>;
