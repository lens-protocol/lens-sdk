import type { FragmentOf, VariablesOf } from 'gql.tada';
import {
  Account,
  SelfFundedTransactionRequest,
  SponsoredTransactionRequest,
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

    ...on SelfFundedTransactionRequest {
      ...SelfFundedTransactionRequest
    }

    ...on TransactionWillFail {
      ...TransactionWillFail
    }
  }`,
  [
    SetAccountMetadataResponse,
    SponsoredTransactionRequest,
    SelfFundedTransactionRequest,
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

const CreateAccountResponse = graphql(
  `fragment CreateAccountResponse on CreateAccountResponse {
    __typename
    hash
  }`,
);
export type CreateAccountResponse = FragmentOf<typeof CreateAccountResponse>;

const CreateAccountWithUsernameResult = graphql(
  `fragment CreateAccountWithUsernameResult on CreateAccountWithUsernameResult {
    ...on CreateAccountResponse {
      ...CreateAccountResponse
    }

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
    CreateAccountResponse,
    SponsoredTransactionRequest,
    SelfFundedTransactionRequest,
    TransactionWillFail,
  ],
);
export type CreateAccountWithUsernameResult = FragmentOf<typeof CreateAccountWithUsernameResult>;

export const CreateAccountWithUsernameMutation = graphql(
  `mutation CreateAccountWithUsername($request: CreateAccountWithUsernameRequest!) {
    value: createAccountWithUsername(request: $request) {
      ...CreateAccountWithUsernameResult
    }
  }`,
  [CreateAccountWithUsernameResult],
);

export type CreateAccountWithUsernameVariables = VariablesOf<
  typeof CreateAccountWithUsernameMutation
>;
