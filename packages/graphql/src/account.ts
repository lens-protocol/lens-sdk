import type { FragmentOf, VariablesOf } from 'gql.tada';
import {
  Account,
  SponsoredTransactionRequest,
  TransactionRequest,
  TransactionWillFail,
} from './fragments';
import { graphql } from './graphql';

export const AccountQuery = graphql(
  `query Account($request: AccountRequest!) {
    value: account(request: $request) {
      ...Account
    }
  }`,
  [Account],
);
export type AccountQueryVariables = VariablesOf<typeof AccountQuery>;

const SetAccountMetadataResponse = graphql(
  `fragment SetAccountMetadataResponse on SetAccountMetadataResponse {
    __typename
    hash
  }`,
);
export type SetAccountMetadataResponse = FragmentOf<typeof SetAccountMetadataResponse>;

const SetAccountMetadataResult = graphql(
  `fragment SetAccountMetadataResult on SetAccountMetadataResult {
    ...on SetAccountMetadataResponse {
      ...SetAccountMetadataResponse
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
  }`,
  [
    SetAccountMetadataResponse,
    SponsoredTransactionRequest,
    TransactionRequest,
    TransactionWillFail,
  ],
);
export type SetAccountMetadataResult = FragmentOf<typeof SetAccountMetadataResult>;

export const SetAccountMetadataMutation = graphql(
  `mutation SetAccountMetadata($request: SetAccountMetadataRequest!) {
    value: setAccountMetadata(request: $request) {
      ...SetAccountMetadataResult
    }
  }`,
  [SetAccountMetadataResult],
);
export type SetAccountMetadataVariables = VariablesOf<typeof SetAccountMetadataMutation>;
